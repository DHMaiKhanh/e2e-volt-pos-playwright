/**
 * Print the wall-clock budget verdict from the last run's timing data, and
 * exit non-zero when the run blew its budget — so CI can gate on runtime the
 * same way it gates on failures.
 *
 * Reads reports/timing/timing.json (or $TIMING_OUT), written by
 * src/reporters/TimingReporter.ts.
 *
 * Usage:  node scripts/perf-summary.mjs [--budget 300] [--file path]
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const argOf = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const file = argOf('--file', process.env.TIMING_OUT ?? 'reports/timing/timing.json');
const budget = Number(argOf('--budget', process.env.PERF_BUDGET_SECONDS ?? '300'));

if (!fs.existsSync(file)) {
  console.error(`No timing data at ${file}. Run the suite first (the TimingReporter writes it).`);
  process.exit(2);
}

const t = JSON.parse(fs.readFileSync(file, 'utf8'));
const bar = '─'.repeat(72);

console.log(bar);
console.log(`  RUNTIME BUDGET — ${t.totalTests} tests on ${t.workers} worker(s)`);
console.log(bar);
console.log(`  wall clock            ${t.wallClockSeconds}s   budget ${budget}s`);
console.log(`  aggregate test time   ${t.aggregateTestSeconds}s  (hooks ${t.hookSeconds}s)`);
console.log(`  parallel efficiency   ${t.parallelEfficiency}x   ceiling ${t.workers}x`);
console.log(`  long pole             ${t.theoreticalFloorSeconds}s  <- hard floor, no parallelism beats it`);
console.log(`  burned by non-passing ${t.failedTestSeconds}s`);
console.log(`  status                ${JSON.stringify(t.byStatus)}`);

// The two things worth acting on, called out explicitly.
const floorOverBudget = t.theoreticalFloorSeconds > budget;
const lowEfficiency = t.workers > 1 && t.parallelEfficiency < t.workers * 0.5;

console.log('');
if (floorOverBudget) {
  console.log(
    `  ! The slowest single test (${t.theoreticalFloorSeconds}s) alone exceeds the ${budget}s budget.`,
  );
  console.log(`    Split it into per-item tests + test.describe.configure({ mode: 'parallel' }).`);
}
if (lowEfficiency) {
  console.log(
    `  ! Only ~${t.parallelEfficiency} of ${t.workers} workers were busy on average — the run is`,
  );
  console.log(`    long-pole or dependency bound, so adding workers will not help much.`);
}

if (Array.isArray(t.slowestFiles) && t.slowestFiles.length) {
  console.log('\n  slowest files (aggregate):');
  for (const f of t.slowestFiles.slice(0, 8)) {
    console.log(`    ${String(f.seconds).padStart(7)}s  ${String(f.tests).padStart(3)} tests  ${f.file}`);
  }
}

/**
 * Skip-rate gate.
 *
 * A suite that skips most of its tests still exits 0, so "green" can mean
 * "tested almost nothing". That is exactly what a thin or reset dataset looks
 * like: every `test.skip(!found, 'no data')` guard fires at once. Gate on it so
 * a collapse in coverage fails the build the same way a slow run does.
 */
const maxSkipRatio = Number(argOf('--max-skip-ratio', process.env.MAX_SKIP_RATIO ?? '0.35'));
const skipped = t.byStatus?.skipped ?? 0;
const skipRatio = t.totalTests > 0 ? skipped / t.totalTests : 0;
const skipsOk = skipRatio <= maxSkipRatio;

console.log(
  `\n  skipped               ${skipped}/${t.totalTests} (${(skipRatio * 100).toFixed(0)}%)  ` +
    `limit ${(maxSkipRatio * 100).toFixed(0)}%`,
);
if (!skipsOk) {
  console.log(`  ! Coverage collapse: too many tests skipped to trust this run.`);
  console.log(`    Usual cause is the dataset, not the tests — check that the shop still has`);
  console.log(`    staff/orders (tests/setup/pos.setup.ts preflights this).`);
}

const withinBudget = t.wallClockSeconds <= budget;
console.log(`\n${bar}`);
console.log(withinBudget ? `  WITHIN BUDGET` : `  OVER BUDGET by ${(t.wallClockSeconds - budget).toFixed(1)}s`);
if (!skipsOk) console.log(`  SKIP RATE TOO HIGH`);
console.log(bar);

process.exit(withinBudget && skipsOk ? 0 : 1);
