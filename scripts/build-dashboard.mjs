#!/usr/bin/env node
/**
 * Build a single self-contained React dashboard from the Playwright JSON
 * reporter output → reports/dashboard/index.html.
 *
 * Shows: total pass/fail/skipped, the TIMING panel (wall clock vs budget,
 * parallel efficiency, long pole, slowest tests/files — the same numbers
 * src/reporters/TimingReporter.ts prints to the console), a per-feature
 * breakdown, one card per failing test (error message + screenshot), and every
 * test case with its screenshot thumbnail.
 *
 * MULTI-LANE — `npm run test:pr` is two Playwright invocations (parallel bulk +
 * serial tail). With REPORT_SLICE set (see playwright.config.ts) each writes its
 * own `reports/json/results-<lane>.json` + `reports/timing/timing-<lane>.json`,
 * and this script merges them into ONE dashboard so the PR gate is a single view
 * instead of two half-runs where the second overwrote the first.
 *
 * USAGE
 *   node scripts/build-dashboard.mjs                       # auto-discover lanes
 *   node scripts/build-dashboard.mjs a.json b.json         # explicit inputs
 *
 * Durable: re-run any time to refresh. It only reads reports/json/ +
 * reports/timing/ + the test-results dirs; it never runs tests itself
 * (see scripts/run-dashboard.mjs / scripts/run-pr-dashboard.mjs for that).
 */
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  statSync,
  rmSync,
} from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const JSON_DIR = path.join(ROOT, 'reports/json');
const TIMING_DIR = path.join(ROOT, 'reports/timing');
const OUT_DIR = path.join(ROOT, 'reports/dashboard');
const ASSETS_DIR = path.join(OUT_DIR, 'assets');

/**
 * Discovery has to tell "the two lanes I just ran" apart from "a results file
 * left over from last week", because both live in reports/json/. Rule: take the
 * newest results file and keep only the ones written within this window of it —
 * the lanes of one `test:pr` are minutes apart, a stale file is hours or days.
 */
const STALE_WINDOW_MS = Number(process.env.DASHBOARD_STALE_HOURS ?? 3) * 3600_000;

const LANE_LABELS = {
  all: 'Toàn bộ (một lần chạy)',
  fast: 'Fast lane — song song',
  serial: 'Serial tail — @exclusive, 1 worker',
};

const laneOf = (file) =>
  path
    .basename(file)
    .replace(/^results-?/, '')
    .replace(/\.json$/, '') || 'all';

const discoverInputs = () => {
  if (!existsSync(JSON_DIR)) return [];
  const candidates = readdirSync(JSON_DIR)
    .filter((f) => /^results(-[\w.-]+)?\.json$/.test(f))
    .map((f) => path.join(JSON_DIR, f))
    .map((p) => ({ p, mtime: statSync(p).mtimeMs }));
  if (!candidates.length) return [];

  const newest = Math.max(...candidates.map((c) => c.mtime));
  const fresh = candidates.filter((c) => newest - c.mtime <= STALE_WINDOW_MS);
  const dropped = candidates.filter((c) => !fresh.includes(c));
  for (const d of dropped) {
    // Never silently truncate: a dropped lane would read as "not covered".
    console.log(
      `  (bỏ qua ${path.relative(ROOT, d.p)} — cũ hơn ${Math.round((newest - d.mtime) / 3600_000)}h so với lần chạy mới nhất)`,
    );
  }
  return fresh.sort((a, b) => a.mtime - b.mtime).map((c) => c.p);
};

const explicit = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const inputs = explicit.length ? explicit.map((f) => path.resolve(ROOT, f)) : discoverInputs();

if (!inputs.length) {
  console.error(
    `Không tìm thấy reports/json/results*.json. Chạy test trước (npm run test:pr hoặc npm run dashboard).`,
  );
  process.exit(1);
}

const stripAnsi = (s) => String(s ?? '').replace(/\x1b\[[0-9;]*m/g, '');
const round1 = (n) => Number(Number(n ?? 0).toFixed(1));

// tests/e2e/orders/foo.spec.ts -> feature "orders"; tests/Bug/foo.spec.ts -> "Bug"
const featureOf = (file) => {
  const parts = file.split(/[\\/]/).filter(Boolean);
  const CATEGORY = new Set(['e2e', 'regression', 'smoke', 'api']);
  if (parts.length > 2 && CATEGORY.has(parts[0])) return parts[1];
  return parts[0] ?? 'other';
};

const readJson = (p) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
};

rmSync(ASSETS_DIR, { recursive: true, force: true });
mkdirSync(ASSETS_DIR, { recursive: true });

/** file|suite|title|project — one logical test case, whichever lane ran it. */
const keyOf = (r) => [r.file, r.suite, r.title, r.project].join('|');
const rowsByKey = new Map();
const lanes = [];

for (const input of inputs) {
  const lane = laneOf(input);
  const raw = readJson(input);
  if (!raw) {
    console.log(`  (bỏ qua ${path.relative(ROOT, input)} — không đọc được JSON)`);
    continue;
  }

  const laneRows = [];

  const walk = (suite, describeChain) => {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const results = test.results ?? [];
        const last = results[results.length - 1];
        // Tests that never ran (e.g. skipped by annotation, or the run aborted
        // before reaching them) have an empty results array — still "skipped".
        const status = !last
          ? 'skipped'
          : last.status === 'passed'
            ? 'passed'
            : last.status === 'skipped'
              ? 'skipped'
              : 'failed'; // failed | timedOut | interrupted

        const errMsg = last?.error?.message ? stripAnsi(last.error.message) : null;
        const location = last?.error?.location
          ? `${path.relative(ROOT, last.error.location.file)}:${last.error.location.line}`
          : null;

        const shot = last?.attachments?.find((a) => a.name === 'screenshot' && a.path);
        let screenshotRel = null;
        if (shot && existsSync(shot.path)) {
          const id = crypto
            .createHash('md5')
            .update(lane + spec.file + spec.title + test.projectName)
            .digest('hex')
            .slice(0, 12);
          copyFileSync(shot.path, path.join(ASSETS_DIR, `${id}.png`));
          screenshotRel = `assets/${id}.png`;
        }

        laneRows.push({
          lane,
          feature: featureOf(spec.file),
          file: spec.file,
          suite: describeChain,
          title: spec.title,
          project: test.projectName,
          status,
          // Raw Playwright status, so `timedOut` stays distinguishable from a
          // plain assertion failure on the dashboard the way it is in the console.
          rawStatus: last?.status ?? 'skipped',
          duration: last?.duration ?? 0,
          error: errMsg,
          location,
          screenshot: screenshotRel,
          retries: results.length - 1,
        });
      }
    }
    for (const child of suite.suites ?? []) {
      walk(child, describeChain ? `${describeChain} › ${child.title}` : child.title);
    }
  };

  for (const top of raw.suites ?? []) walk(top, '');

  // `pos-setup` runs in BOTH lanes, so the same logical test arrives twice.
  // Keep one row, remember every lane it ran in, and let a failure win over a
  // pass — a setup that broke in the serial tail must not be hidden by the
  // fast lane's green copy of it.
  for (const r of laneRows) {
    const prev = rowsByKey.get(keyOf(r));
    if (!prev) {
      rowsByKey.set(keyOf(r), { ...r, lanes: [r.lane] });
      continue;
    }
    prev.lanes.push(r.lane);
    const worse = { failed: 3, skipped: 2, passed: 1 };
    if (worse[r.status] > worse[prev.status]) Object.assign(prev, r, { lanes: prev.lanes });
  }

  const timingFile = path.join(TIMING_DIR, lane === 'all' ? 'timing.json' : `timing-${lane}.json`);
  const timing = existsSync(timingFile) ? readJson(timingFile) : null;
  const htmlDir = lane === 'all' ? 'reports/html' : `reports/html-${lane}`;

  const laneStats = laneRows.reduce(
    (acc, r) => {
      acc.total++;
      acc[r.status]++;
      return acc;
    },
    { total: 0, passed: 0, failed: 0, skipped: 0 },
  );

  lanes.push({
    name: lane,
    label: LANE_LABELS[lane] ?? lane,
    results: path.relative(ROOT, input).replace(/\\/g, '/'),
    timingFile: timing ? path.relative(ROOT, timingFile).replace(/\\/g, '/') : null,
    // Relative from reports/dashboard/index.html, so the link works over file://
    htmlReport: existsSync(path.join(ROOT, htmlDir, 'index.html'))
      ? `../${path.basename(htmlDir)}/index.html`
      : null,
    startedAt: raw.stats?.startTime ?? null,
    stats: laneStats,
    workers: timing?.workers ?? null,
    wallClockSeconds: timing?.wallClockSeconds ?? round1((raw.stats?.duration ?? 0) / 1000),
    aggregateTestSeconds: timing?.aggregateTestSeconds ?? null,
    hookSeconds: timing?.hookSeconds ?? null,
    failedTestSeconds: timing?.failedTestSeconds ?? null,
    parallelEfficiency: timing?.parallelEfficiency ?? null,
    budgetSeconds: timing?.budgetSeconds ?? null,
    longPoleSeconds: timing?.theoreticalFloorSeconds ?? null,
    slowestTests: timing?.slowestTests ?? null,
    slowestFiles: timing?.slowestFiles ?? null,
  });
}

const rows = [...rowsByKey.values()];

const stats = rows.reduce(
  (acc, r) => {
    acc.total++;
    acc[r.status]++;
    return acc;
  },
  { total: 0, passed: 0, failed: 0, skipped: 0 },
);

const byFeature = {};
for (const r of rows) {
  byFeature[r.feature] ??= { feature: r.feature, total: 0, passed: 0, failed: 0, skipped: 0 };
  byFeature[r.feature].total++;
  byFeature[r.feature][r.status]++;
}

/**
 * PERF — the lanes of `test:pr` run one after the other, so the wall clock a
 * developer actually waits is their SUM, not the max. Everything else is
 * additive too; efficiency is recomputed from the merged totals rather than
 * averaged, because averaging a 8-worker lane with a 1-worker lane is meaningless.
 */
const sum = (pick) => round1(lanes.reduce((s, l) => s + (pick(l) ?? 0), 0));
const wallClockSeconds = sum((l) => l.wallClockSeconds);
const aggregateTestSeconds =
  sum((l) => l.aggregateTestSeconds ?? 0) ||
  round1(rows.reduce((s, r) => s + r.duration, 0) / 1000);
const hookSeconds = sum((l) => l.hookSeconds ?? 0);
const failedTestSeconds =
  sum((l) => l.failedTestSeconds ?? 0) ||
  round1(rows.filter((r) => r.status === 'failed').reduce((s, r) => s + r.duration, 0) / 1000);

// Slowest tests: prefer the timing files (they carry hook attribution); fall
// back to the JSON rows when a lane ran without the timing reporter.
const slowestTests = lanes.some((l) => l.slowestTests)
  ? lanes
      .flatMap((l) => (l.slowestTests ?? []).map((t) => ({ ...t, lane: l.name })))
      .sort((a, b) => b.durationMs - a.durationMs)
      .slice(0, 15)
  : [...rows]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 15)
      .map((r) => ({
        title: r.title,
        file: r.file,
        lane: r.lane,
        status: r.rawStatus,
        durationMs: r.duration,
        durationSeconds: round1(r.duration / 1000),
        hookMs: 0,
      }));

const filesAgg = new Map();
for (const l of lanes) {
  for (const f of l.slowestFiles ?? []) {
    const cur = filesAgg.get(f.file) ?? { file: f.file, seconds: 0, tests: 0 };
    cur.seconds = round1(cur.seconds + f.seconds);
    cur.tests += f.tests;
    filesAgg.set(f.file, cur);
  }
}
if (!filesAgg.size) {
  for (const r of rows) {
    const cur = filesAgg.get(r.file) ?? { file: r.file, seconds: 0, tests: 0 };
    cur.seconds = round1(cur.seconds + r.duration / 1000);
    cur.tests += 1;
    filesAgg.set(r.file, cur);
  }
}
const slowestFiles = [...filesAgg.values()].sort((a, b) => b.seconds - a.seconds).slice(0, 12);

const budgetSeconds = Math.max(...lanes.map((l) => l.budgetSeconds ?? 0), 0) || null;
const longPole = slowestTests[0] ?? null;

const perf = {
  wallClockSeconds,
  budgetSeconds,
  withinBudget: budgetSeconds ? wallClockSeconds <= budgetSeconds : null,
  aggregateTestSeconds,
  hookSeconds,
  failedTestSeconds,
  parallelEfficiency: wallClockSeconds > 0 ? round1(aggregateTestSeconds / wallClockSeconds) : null,
  longPoleSeconds: longPole ? round1(longPole.durationMs / 1000) : null,
  longPoleTitle: longPole?.title ?? null,
  slowestTests,
  slowestFiles,
};

const data = {
  generatedAt: new Date(lanes[0]?.startedAt ?? Date.now()).toISOString(),
  builtAt: new Date().toISOString(),
  durationMs: wallClockSeconds * 1000,
  lanes,
  stats,
  perf,
  features: Object.values(byFeature).sort(
    (a, b) => b.failed - a.failed || a.feature.localeCompare(b.feature),
  ),
  tests: rows,
};

writeFileSync(path.join(OUT_DIR, 'data.json'), JSON.stringify(data), 'utf8');

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>VOLT POS — Test dashboard</title>
<style>
  :root { font-family: -apple-system, Segoe UI, Roboto, sans-serif; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f8fafc; color: #0f172a; }
  header { padding: 24px 32px; background: #0f172a; color: #f8fafc; }
  header h1 { margin: 0 0 4px; font-size: 20px; }
  header .meta { font-size: 13px; opacity: .8; }
  header .verdict { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px;
                    border-radius: 999px; margin-left: 8px; vertical-align: 2px; }
  header .verdict.ok { background: #14532d; color: #bbf7d0; }
  header .verdict.over { background: #7f1d1d; color: #fecaca; }
  main { padding: 24px 32px 60px; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 18px; }
  .card .n { font-size: 28px; font-weight: 700; }
  .card .l { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: .04em; }
  .card .sub { font-size: 12px; color: #94a3b8; margin-top: 4px; }
  .card.pass .n { color: #166534; } .card.fail .n { color: #991b1b; } .card.skip .n { color: #92400e; }
  .card.warn { border-color: #fca5a5; } .card.warn .n { color: #991b1b; }
  h2 { font-size: 15px; text-transform: uppercase; letter-spacing: .05em; color: #334155;
       border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin: 30px 0 14px; }
  table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
  th, td { text-align: left; padding: 8px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
  th { background: #f8fafc; color: #475569; font-weight: 600; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  .bar { height: 8px; border-radius: 4px; background: #e2e8f0; overflow: hidden; display: flex; min-width: 120px; }
  .bar span { display: block; height: 100%; }
  .tbar { height: 8px; border-radius: 4px; background: #38bdf8; }
  .tbar.hook { background: #a78bfa; }
  .tabs { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
  .tab { padding: 6px 14px; border-radius: 999px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; }
  .tab.active { background: #0f172a; color: #fff; border-color: #0f172a; }
  .search { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; width: 260px; margin-bottom: 12px; }
  .toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  tr.feature-row { cursor: pointer; }
  tr.feature-row:hover { background: #f1f5f9; }
  tr.feature-row.selected { background: #e0e7ff; }
  .clear-filter { font-size: 12px; color: #4338ca; background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 999px; padding: 4px 12px; cursor: pointer; margin-bottom: 12px; display: inline-block; }
  .active-feature { font-size: 13px; color: #334155; margin-bottom: 12px; }
  .active-feature b { color: #0f172a; }
  .badge { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; }
  .badge.passed { background: #dcfce7; color: #166534; }
  .badge.failed, .badge.timedOut, .badge.interrupted { background: #fee2e2; color: #991b1b; }
  .badge.skipped { background: #fef3c7; color: #92400e; }
  .lane-pill { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; background: #e0f2fe; color: #075985; margin-right: 4px; }
  .note { font-size: 13px; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-left: 4px solid #38bdf8;
          border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; }
  .note.warn { border-left-color: #f59e0b; background: #fffbeb; color: #78350f; }
  .fail-card { background: #fff; border: 1px solid #fecaca; border-left: 4px solid #dc2626; border-radius: 10px;
               padding: 14px 16px; margin-bottom: 14px; display: grid; grid-template-columns: 1fr 220px; gap: 16px; }
  .fail-card h3 { margin: 0 0 4px; font-size: 14px; }
  .fail-card .meta { font-size: 12px; color: #64748b; margin-bottom: 8px; }
  .fail-card pre { background: #fef2f2; color: #7f1d1d; font-size: 12px; padding: 10px; border-radius: 6px; overflow: auto; max-height: 160px; margin: 0; white-space: pre-wrap; }
  .fail-card img, .thumb { width: 100%; border-radius: 6px; border: 1px solid #e2e8f0; cursor: zoom-in; }
  .thumb-cell { width: 90px; }
  .thumb-cell img { width: 80px; border-radius: 4px; border: 1px solid #e2e8f0; cursor: zoom-in; }
  .row-status-failed { background: #fef2f2; }
  .empty { color: #94a3b8; font-size: 13px; padding: 16px; }
  a { color: #2563eb; }
  footer { padding: 24px 0; color: #94a3b8; font-size: 12px; }
</style></head>
<body>
<div id="root"></div>
<script>window.__DATA__ = ${JSON.stringify(data)};</script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script>
const { useState, useMemo, createElement: h } = React;
const D = window.__DATA__;
const secs = (n) => (n == null ? '–' : Number(n).toFixed(1) + 's');
const mins = (n) => (n == null ? '–' : n >= 90 ? (n / 60).toFixed(1) + ' phút' : Number(n).toFixed(1) + 's');
const pct = (a, b) => (b ? Math.round((100 * a) / b) + '%' : '–');

function StatCard({ label, value, sub, cls }) {
  return h('div', { className: 'card ' + (cls || '') },
    h('div', { className: 'n' }, value),
    h('div', { className: 'l' }, label),
    sub ? h('div', { className: 'sub' }, sub) : null,
  );
}

function Bar({ passed, failed, skipped, total }) {
  const p = (n) => (total ? (100 * n) / total : 0);
  return h('div', { className: 'bar' },
    h('span', { style: { width: p(passed) + '%', background: '#22c55e' } }),
    h('span', { style: { width: p(failed) + '%', background: '#ef4444' } }),
    h('span', { style: { width: p(skipped) + '%', background: '#f59e0b' } }),
  );
}

function TimeBar({ value, max, hook }) {
  const w = max ? Math.max(2, (100 * value) / max) : 0;
  const hw = max && hook ? (100 * hook) / max : 0;
  return h('div', { style: { minWidth: 120 } },
    h('div', { className: 'tbar', style: { width: w + '%' } }),
    hw ? h('div', { className: 'tbar hook', style: { width: hw + '%', marginTop: 2 } }) : null,
  );
}

function Lightbox({ src, onClose }) {
  if (!src) return null;
  return h('div', {
    onClick: onClose,
    style: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,.85)', display: 'flex',
             alignItems: 'center', justifyContent: 'center', zIndex: 50, cursor: 'zoom-out', padding: 24 },
  }, h('img', { src, style: { maxWidth: '95%', maxHeight: '95%', borderRadius: 8 } }));
}

function FailCard({ t, onZoom }) {
  return h('div', { className: 'fail-card' },
    h('div', null,
      h('h3', null, t.title),
      h('div', { className: 'meta' },
        (t.lanes || [t.lane]).map((l) => h('span', { key: l, className: 'lane-pill' }, l)),
        t.feature + ' · ' + t.file + (t.location ? ' · ' + t.location : '') + ' · ' + t.project +
        ' · ' + t.rawStatus + ' · ' + Math.round(t.duration / 1000) + 's'),
      t.error ? h('pre', null, t.error) : h('div', { className: 'empty' }, '(no error message captured)'),
    ),
    t.screenshot
      ? h('img', { src: t.screenshot, onClick: () => onZoom(t.screenshot) })
      : h('div', { className: 'empty' }, 'no screenshot'),
  );
}

/** Wall clock, budget, long pole — the TimingReporter console block, on screen. */
function PerfPanel() {
  const P = D.perf;
  const maxTest = Math.max.apply(null, [1].concat(P.slowestTests.map((t) => t.durationMs)));
  const maxFile = Math.max.apply(null, [1].concat(P.slowestFiles.map((f) => f.seconds)));
  const skipPctNum = D.stats.total ? (100 * D.stats.skipped) / D.stats.total : 0;

  return h('div', null,
    h('h2', null, 'Hiệu năng & thời lượng'),
    h('div', { className: 'cards' },
      h(StatCard, {
        label: 'Wall clock', value: mins(P.wallClockSeconds), cls: P.withinBudget === false ? 'warn' : '',
        sub: P.budgetSeconds
          ? 'ngân sách ' + P.budgetSeconds + 's → ' + (P.withinBudget ? 'TRONG NGÂN SÁCH' : 'VƯỢT NGÂN SÁCH')
          : 'chưa đặt ngân sách',
      }),
      h(StatCard, {
        label: 'Hiệu suất song song', value: (P.parallelEfficiency ?? '–') + 'x',
        sub: 'tổng thời gian test / wall clock',
      }),
      h(StatCard, {
        label: 'Long pole', value: secs(P.longPoleSeconds),
        sub: P.longPoleTitle ? 'sàn cứng: ' + P.longPoleTitle.slice(0, 42) : 'test đơn chậm nhất',
      }),
      h(StatCard, {
        label: 'Setup / teardown', value: pct(P.hookSeconds, P.aggregateTestSeconds),
        sub: secs(P.hookSeconds) + ' / ' + secs(P.aggregateTestSeconds) + ' (xấp xỉ)',
      }),
      h(StatCard, {
        label: 'Đốt bởi test không pass', value: pct(P.failedTestSeconds, P.aggregateTestSeconds),
        cls: P.failedTestSeconds > 0.2 * P.aggregateTestSeconds ? 'warn' : '',
        sub: secs(P.failedTestSeconds) + ' trên tổng ' + secs(P.aggregateTestSeconds),
      }),
    ),

    skipPctNum > 25
      ? h('div', { className: 'note warn' },
          'Skip ' + D.stats.skipped + '/' + D.stats.total + ' (' + Math.round(skipPctNum) + '%) — đây là tín hiệu ' +
          'ĐỘ PHỦ, không phải thời lượng: phần lớn spec tự skip khi không có dữ liệu, nên dataset mỏng sẽ ' +
          'biến độ phủ thật thành con số 0 mà suite vẫn xanh.')
      : null,

    h('h2', null, 'Theo lane'),
    h('table', null,
      h('thead', null, h('tr', null,
        h('th', null, 'Lane'), h('th', { className: 'num' }, 'Test'), h('th', { className: 'num' }, 'Pass'),
        h('th', { className: 'num' }, 'Fail'), h('th', { className: 'num' }, 'Skip'),
        h('th', { className: 'num' }, 'Workers'), h('th', { className: 'num' }, 'Wall clock'),
        h('th', { className: 'num' }, 'Hiệu suất'), h('th', { className: 'num' }, 'Long pole'),
        h('th', null, 'Báo cáo'))),
      h('tbody', null, D.lanes.map((l) => h('tr', { key: l.name, className: l.stats.failed ? 'row-status-failed' : '' },
        h('td', null, h('span', { className: 'lane-pill' }, l.name), l.label),
        h('td', { className: 'num' }, l.stats.total),
        h('td', { className: 'num' }, l.stats.passed),
        h('td', { className: 'num' }, l.stats.failed),
        h('td', { className: 'num' }, l.stats.skipped),
        h('td', { className: 'num' }, l.workers ?? '–'),
        h('td', { className: 'num' }, secs(l.wallClockSeconds)),
        h('td', { className: 'num' }, (l.parallelEfficiency ?? '–') + 'x'),
        h('td', { className: 'num' }, secs(l.longPoleSeconds)),
        h('td', null, l.htmlReport ? h('a', { href: l.htmlReport }, 'HTML report') : h('span', { className: 'empty' }, '–')),
      ))),
    ),

    h('h2', null, 'Test chậm nhất'),
    h('div', { className: 'note' }, 'Thanh xanh = tổng thời lượng test; thanh tím phía dưới = phần setup/teardown (hook) bên trong nó.'),
    h('table', null,
      h('thead', null, h('tr', null,
        h('th', { className: 'num' }, 'Thời gian'), h('th', null, 'Trạng thái'), h('th', null, 'Test case'),
        h('th', null, 'Lane'), h('th', null, 'File'), h('th', null, ''))),
      h('tbody', null, P.slowestTests.map((t, i) => h('tr', { key: i },
        h('td', { className: 'num' }, secs(t.durationSeconds ?? t.durationMs / 1000)),
        h('td', null, h('span', { className: 'badge ' + (t.status === 'passed' ? 'passed' : t.status === 'skipped' ? 'skipped' : 'failed') }, t.status)),
        h('td', null, t.title),
        h('td', null, h('span', { className: 'lane-pill' }, t.lane || '–')),
        h('td', null, t.file),
        h('td', null, h(TimeBar, { value: t.durationMs, max: maxTest, hook: t.hookMs })),
      ))),
    ),

    h('h2', null, 'File tốn thời gian nhất (tổng cộng)'),
    h('table', null,
      h('thead', null, h('tr', null,
        h('th', { className: 'num' }, 'Tổng'), h('th', { className: 'num' }, 'Số test'),
        h('th', null, 'File'), h('th', null, ''))),
      h('tbody', null, P.slowestFiles.map((f, i) => h('tr', { key: i },
        h('td', { className: 'num' }, secs(f.seconds)),
        h('td', { className: 'num' }, f.tests),
        h('td', null, f.file),
        h('td', null, h(TimeBar, { value: f.seconds, max: maxFile })),
      ))),
    ),
  );
}

function App() {
  const [tab, setTab] = useState('all');
  const [lane, setLane] = useState('all');
  const [q, setQ] = useState('');
  const [zoom, setZoom] = useState(null);
  const [feature, setFeature] = useState(null);

  const inLane = (t) => lane === 'all' || (t.lanes || [t.lane]).indexOf(lane) !== -1;

  const filtered = useMemo(() => {
    return D.tests.filter((t) => {
      if (!inLane(t)) return false;
      if (feature && t.feature !== feature) return false;
      if (tab !== 'all' && t.status !== tab) return false;
      if (!q) return true;
      const s = (t.title + ' ' + t.file + ' ' + t.feature).toLowerCase();
      return s.includes(q.toLowerCase());
    });
  }, [tab, q, feature, lane]);

  const failedOnly = useMemo(
    () => D.tests.filter((t) => t.status === 'failed' && (!feature || t.feature === feature) && inLane(t)),
    [feature, lane],
  );

  const selectFeature = (f) => {
    setFeature((prev) => (prev === f ? null : f));
    document.getElementById('all-cases-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const verdict = D.perf.withinBudget;

  return h('div', null,
    h('header', null,
      h('h1', null, 'VOLT POS — Test dashboard',
        verdict === null ? null : h('span', { className: 'verdict ' + (verdict ? 'ok' : 'over') },
          verdict ? 'TRONG NGÂN SÁCH' : 'VƯỢT NGÂN SÁCH')),
      h('div', { className: 'meta' },
        D.stats.total + ' test case · ' + D.lanes.length + ' lane (' + D.lanes.map((l) => l.name).join(' + ') + ')' +
        ' · ' + mins(D.perf.wallClockSeconds) + ' wall clock · chạy lúc ' +
        new Date(D.generatedAt).toLocaleString('vi-VN')),
    ),
    h('main', null,
      h('div', { className: 'cards' },
        h(StatCard, { label: 'Tổng số', value: D.stats.total }),
        h(StatCard, { label: 'Pass', value: D.stats.passed, cls: 'pass', sub: pct(D.stats.passed, D.stats.total) }),
        h(StatCard, { label: 'Fail', value: D.stats.failed, cls: 'fail', sub: pct(D.stats.failed, D.stats.total) }),
        h(StatCard, { label: 'Skip', value: D.stats.skipped, cls: 'skip', sub: pct(D.stats.skipped, D.stats.total) }),
      ),

      h(PerfPanel),

      h('h2', null, 'Theo tính năng'),
      h('div', { className: 'empty', style: { marginBottom: 8 } }, 'Nhấn vào một tính năng để xem tất cả test case của tính năng đó.'),
      h('table', null,
        h('thead', null, h('tr', null,
          h('th', null, 'Tính năng'), h('th', null, 'Tổng'), h('th', null, 'Pass'),
          h('th', null, 'Fail'), h('th', null, 'Skip'), h('th', null, 'Tỉ lệ'))),
        h('tbody', null, D.features.map((f) => h('tr', {
          key: f.feature,
          className: 'feature-row' + (f.failed ? ' row-status-failed' : '') + (feature === f.feature ? ' selected' : ''),
          onClick: () => selectFeature(f.feature),
        },
          h('td', null, f.feature), h('td', null, f.total),
          h('td', null, f.passed), h('td', null, f.failed), h('td', null, f.skipped),
          h('td', null, h(Bar, f)),
        ))),
      ),

      h('h2', null, 'Test case fail (' + failedOnly.length + ') — nguyên nhân' + (feature ? ' · ' + feature : '')),
      failedOnly.length
        ? failedOnly.map((t) => h(FailCard, { key: t.feature + t.title + t.project, t, onZoom: setZoom }))
        : h('div', { className: 'empty' }, 'Không có test fail.'),

      h('h2', { id: 'all-cases-anchor' }, feature ? 'Test case của tính năng: ' + feature : 'Tất cả test case'),
      feature
        ? h('div', { className: 'active-feature' },
            'Đang lọc theo tính năng ',
            h('b', null, feature),
            ' (' + filtered.length + ' test case). ',
            h('span', { className: 'clear-filter', onClick: () => setFeature(null) }, '✕ Xóa lọc'))
        : null,
      h('div', { className: 'tabs' },
        ['all', 'passed', 'failed', 'skipped'].map((s) => h('div', {
          key: s, className: 'tab' + (tab === s ? ' active' : ''), onClick: () => setTab(s),
        }, s === 'all' ? 'Tất cả' : s))),
      D.lanes.length > 1
        ? h('div', { className: 'tabs' },
            ['all'].concat(D.lanes.map((l) => l.name)).map((s) => h('div', {
              key: s, className: 'tab' + (lane === s ? ' active' : ''), onClick: () => setLane(s),
            }, s === 'all' ? 'Mọi lane' : 'lane: ' + s)))
        : null,
      h('input', {
        className: 'search', placeholder: 'Tìm theo tên, file, tính năng…',
        value: q, onChange: (e) => setQ(e.target.value),
      }),
      h('table', null,
        h('thead', null, h('tr', null,
          h('th', null, 'Ảnh'), h('th', null, 'Test case'), h('th', null, 'Tính năng'),
          h('th', null, 'File'), h('th', null, 'Lane'), h('th', null, 'Trạng thái'), h('th', { className: 'num' }, 'Thời gian'))),
        h('tbody', null, filtered.map((t, i) => h('tr', {
          key: t.feature + t.title + t.project + i, className: t.status === 'failed' ? 'row-status-failed' : '',
        },
          h('td', { className: 'thumb-cell' }, t.screenshot
            ? h('img', { src: t.screenshot, onClick: () => setZoom(t.screenshot) })
            : null),
          h('td', null, t.title),
          h('td', null, t.feature),
          h('td', null, t.file),
          h('td', null, (t.lanes || [t.lane]).map((l) => h('span', { key: l, className: 'lane-pill' }, l))),
          h('td', null, h('span', { className: 'badge ' + t.status }, t.rawStatus || t.status)),
          h('td', { className: 'num' }, Math.round(t.duration / 1000) + 's'),
        ))),
      ),
      !filtered.length ? h('div', { className: 'empty' }, 'Không có kết quả khớp.') : null,
    ),
    h('footer', null,
      'Sinh bởi node scripts/build-dashboard.mjs từ ' + D.lanes.map((l) => l.results).join(' + ') +
      ' — chạy npm run test:pr để làm mới.'),
    h(Lightbox, { src: zoom, onClose: () => setZoom(null) }),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
</script>
</body></html>`;

writeFileSync(path.join(OUT_DIR, 'index.html'), html, 'utf8');

console.log(
  `reports/dashboard/index.html rebuilt — ${data.stats.total} test case ` +
    `(pass ${data.stats.passed} / fail ${data.stats.failed} / skip ${data.stats.skipped}) ` +
    `· ${lanes.length} lane: ${lanes.map((l) => `${l.name} ${l.wallClockSeconds}s`).join(', ')} ` +
    `· wall clock ${perf.wallClockSeconds}s${perf.budgetSeconds ? ` / ngân sách ${perf.budgetSeconds}s` : ''}.`,
);
