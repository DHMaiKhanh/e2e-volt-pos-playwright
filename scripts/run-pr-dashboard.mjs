#!/usr/bin/env node
/**
 * The PR gate, with its dashboard: run BOTH lanes of `test:pr` and then build +
 * open the merged pass/fail/timing dashboard — whether the tests passed or not.
 *
 *   npm run test:pr                    # both lanes → dashboard → browser
 *   npm run test:pr -- --no-open       # don't open a browser (CI does this too)
 *   npm run test:pr -- --bail          # skip the serial tail if the fast lane fails
 *   npm run test:pr -- --grep @smoke   # extra args go through to Playwright
 *
 * WHY A SCRIPT AND NOT `test:fast && test:serial`
 *   1. Both lanes must keep their artifacts. Each Playwright invocation writes
 *      one results.json / junit / HTML report and wipes `outputDir` on start, so
 *      run back to back the serial tail erased the fast lane's 259 results and
 *      screenshots. Each lane gets REPORT_SLICE=<lane> here, which moves its
 *      artifacts aside (see playwright.config.ts) so both survive to be merged.
 *   2. `&&` short-circuits: with a red fast lane the serial tail never ran, so
 *      @exclusive coverage silently disappeared exactly when it mattered. Both
 *      lanes run by default now; `--bail` restores the old short-circuit.
 *
 * Exit code is the worst lane's exit code — this is still the gate, so a failing
 * run fails the command. The dashboard is always built first.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  if (i === -1) return false;
  argv.splice(i, 1);
  return true;
};
const noOpen = flag('--no-open') || !!process.env.CI;
const bail = flag('--bail');
const extraArgs = argv; // whatever is left goes to Playwright

const LANES = [
  { name: 'fast', script: 'test:fast', label: 'song song (bulk)' },
  { name: 'serial', script: 'test:serial', label: '@exclusive, 1 worker' },
];

const laneFiles = (lane) => ({
  results: path.join('reports', 'json', `results-${lane}.json`),
  timing: path.join('reports', 'timing', `timing-${lane}.json`),
});

// Stale artifacts from an earlier run would be merged as if they were this
// run's, so clear this run's slots first.
for (const lane of LANES) {
  const f = laneFiles(lane.name);
  rmSync(f.results, { force: true });
  rmSync(f.timing, { force: true });
}

console.log('▶ Kiểm tra app đang chạy...');
const check = spawnSync('node', ['scripts/check-server.mjs'], { stdio: 'inherit', shell: true });
if (check.status !== 0) process.exit(check.status ?? 1);

let worst = 0;
const ran = [];

for (const lane of LANES) {
  console.log(`\n▶ Lane "${lane.name}" — ${lane.label}...`);
  const startedAt = Date.now();
  const res = spawnSync(
    'npm',
    ['run', lane.script, ...(extraArgs.length ? ['--', ...extraArgs] : [])],
    {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, REPORT_SLICE: lane.name },
    },
  );
  const status = res.status ?? 1;
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  ran.push({ ...lane, status, elapsed });
  if (status !== 0) worst = worst || status;
  console.log(
    `  lane "${lane.name}" xong sau ${elapsed}s — exit ${status}` +
      (status !== 0 ? ' (có test fail, vẫn tiếp tục để dựng dashboard)' : ''),
  );
  if (status !== 0 && bail) {
    console.log('  --bail: bỏ qua các lane còn lại.');
    break;
  }
}

const inputs = LANES.map((l) => laneFiles(l.name).results).filter((f) => existsSync(f));
if (!inputs.length) {
  console.error('✗ Không lane nào tạo được results JSON — không có gì để dựng dashboard.');
  process.exit(worst || 1);
}

console.log(`\n▶ Dựng dashboard từ ${inputs.join(' + ')}...`);
const build = spawnSync('node', ['scripts/build-dashboard.mjs', ...inputs], {
  stdio: 'inherit',
  shell: true,
});
if (build.status !== 0) process.exit(build.status);

const dashboardPath = path.resolve('reports/dashboard/index.html');
console.log(`\n▶ Dashboard: ${dashboardPath}`);
for (const l of ran) {
  console.log(`    lane ${l.name.padEnd(7)} ${l.elapsed.padStart(7)}s  exit ${l.status}`);
}

if (!noOpen) {
  // `start` treats its first quoted argument as a window title, so it needs an
  // empty one before the path; open/xdg-open take the path directly.
  const [opener, openArgs] =
    process.platform === 'win32'
      ? ['start', ['""', `"${dashboardPath}"`]]
      : [process.platform === 'darwin' ? 'open' : 'xdg-open', [`"${dashboardPath}"`]];
  spawnSync(opener, openArgs, { shell: true, stdio: 'ignore' });
}

if (worst !== 0) {
  console.log(`\n✗ PR gate FAIL (exit ${worst}) — chi tiết trong dashboard ở trên.`);
}
process.exit(worst);
