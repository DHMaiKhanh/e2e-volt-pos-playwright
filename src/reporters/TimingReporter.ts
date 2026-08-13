import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

/**
 * Timing reporter — the measurement instrument for the "300 tests under 5 min"
 * budget.
 *
 * The stock reporters tell you pass/fail; none of them answer the two questions
 * that actually decide whether a parallel suite fits a wall-clock budget:
 *
 *   1. Where is the aggregate time spent?  (sum of per-test durations)
 *   2. What is the FLOOR?  (the single slowest test — wall-clock can never go
 *      below it, no matter how many workers you add)
 *
 * Both are printed, plus the parallel efficiency actually achieved
 * (aggregate ÷ wall-clock ≈ how many workers were busy on average), so a
 * regression in either dimension is visible immediately.
 *
 * OUTPUT — reports/timing/timing.json  (machine-readable, for CI diffing)
 *          plus a console summary.
 *
 * ENV — PERF_BUDGET_SECONDS  wall-clock budget to check against (default 300)
 *       TIMING_TOP_N         how many slow tests to list (default 25)
 *       TIMING_OUT           output path (default reports/timing/timing.json)
 *       REPORT_SLICE         lane name; suffixes the default output path so the
 *                            two `test:pr` invocations don't overwrite each
 *                            other's timings (see playwright.config.ts)
 */

interface TestTiming {
  title: string;
  file: string;
  project: string;
  durationMs: number;
  status: TestResult['status'];
  /** Wall-clock ms spent in setup/teardown hooks, when Playwright reports steps. */
  hookMs: number;
  retries: number;
}

const secs = (ms: number): string => (ms / 1000).toFixed(1);

/** Pad/truncate to a fixed width so the console table lines up. */
const fit = (s: string, width: number): string =>
  s.length > width ? `${s.slice(0, width - 1)}…` : s.padEnd(width);

export default class TimingReporter implements Reporter {
  private startedAt = 0;
  private timings: TestTiming[] = [];
  private workers = 1;
  private budgetSeconds = Number(process.env.PERF_BUDGET_SECONDS ?? 300);
  private topN = Number(process.env.TIMING_TOP_N ?? 25);

  onBegin(config: FullConfig, _suite: Suite): void {
    this.startedAt = Date.now();
    this.workers = config.workers;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    // `result.duration` covers the test body + its hooks as Playwright measured
    // them, which is what wall-clock accounting needs.
    //
    // Hook attribution is APPROXIMATE and must be clamped. Playwright attributes
    // a `beforeAll` to more than one test's step list, and worker-scoped fixture
    // setup shows up as a hook step too, so the raw sum can exceed the test's own
    // duration (observed: 913s of "hooks" against 821s of tests). Clamping keeps
    // this readable as "share of THIS test spent in setup/teardown" instead of a
    // number that can exceed 100%.
    const rawHookMs = result.steps
      .filter((s) => s.category === 'hook')
      .reduce((sum, s) => sum + (s.duration > 0 ? s.duration : 0), 0);
    const hookMs = Math.min(rawHookMs, result.duration);

    this.timings.push({
      title: test.title,
      // Relative so the JSON is stable across machines/CI checkouts.
      file: path.relative(process.cwd(), test.location.file).replace(/\\/g, '/'),
      project: test.parent.project()?.name ?? 'unknown',
      durationMs: result.duration,
      status: result.status,
      hookMs,
      retries: result.retry,
    });
  }

  onEnd(result: FullResult): void {
    const wallMs = Date.now() - this.startedAt;
    const aggregateMs = this.timings.reduce((s, t) => s + t.durationMs, 0);
    const hookMs = this.timings.reduce((s, t) => s + t.hookMs, 0);

    const byStatus = this.timings.reduce<Record<string, number>>((acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1;
      return acc;
    }, {});

    // Time burned by tests that did not pass — the "timeout burn" that a
    // failing suite pays for nothing.
    const failedMs = this.timings
      .filter((t) => t.status !== 'passed' && t.status !== 'skipped')
      .reduce((s, t) => s + t.durationMs, 0);

    const slowest = [...this.timings].sort((a, b) => b.durationMs - a.durationMs);
    const longPole = slowest[0];

    // Aggregate per spec file — finds the file worth optimizing, which is often
    // not the file with the single slowest test.
    const perFile = new Map<string, { ms: number; count: number }>();
    for (const t of this.timings) {
      const cur = perFile.get(t.file) ?? { ms: 0, count: 0 };
      cur.ms += t.durationMs;
      cur.count += 1;
      perFile.set(t.file, cur);
    }
    const filesRanked = [...perFile.entries()].sort((a, b) => b[1].ms - a[1].ms);

    // Efficiency: how many workers were busy on average. Well below the
    // configured worker count means the run is long-pole- or dependency-bound,
    // not throughput-bound — adding workers would not help.
    const efficiency = wallMs > 0 ? aggregateMs / wallMs : 0;

    const payload = {
      generatedAt: new Date().toISOString(),
      /** Which lane produced this file — null for a plain single-invocation run. */
      lane: process.env.REPORT_SLICE ?? null,
      wallClockSeconds: Number((wallMs / 1000).toFixed(1)),
      aggregateTestSeconds: Number((aggregateMs / 1000).toFixed(1)),
      hookSeconds: Number((hookMs / 1000).toFixed(1)),
      failedTestSeconds: Number((failedMs / 1000).toFixed(1)),
      budgetSeconds: this.budgetSeconds,
      withinBudget: wallMs / 1000 <= this.budgetSeconds,
      workers: this.workers,
      parallelEfficiency: Number(efficiency.toFixed(2)),
      // The hard floor: with unlimited workers, the suite still cannot finish
      // faster than its slowest single test.
      theoreticalFloorSeconds: longPole ? Number((longPole.durationMs / 1000).toFixed(1)) : 0,
      totalTests: this.timings.length,
      byStatus,
      status: result.status,
      slowestTests: slowest.slice(0, this.topN).map((t) => ({
        ...t,
        durationSeconds: Number((t.durationMs / 1000).toFixed(1)),
      })),
      slowestFiles: filesRanked.slice(0, this.topN).map(([file, v]) => ({
        file,
        seconds: Number((v.ms / 1000).toFixed(1)),
        tests: v.count,
      })),
    };

    const slice = payload.lane ? `-${payload.lane}` : '';
    const out = process.env.TIMING_OUT ?? path.join('reports', 'timing', `timing${slice}.json`);
    try {
      mkdirSync(path.dirname(out), { recursive: true });
      writeFileSync(out, JSON.stringify(payload, null, 2), 'utf8');
    } catch {
      /* reporting must never fail the run */
    }

    const line = '─'.repeat(78);
    const pass = payload.withinBudget
      ? '\x1b[32mWITHIN BUDGET\x1b[0m'
      : '\x1b[31mOVER BUDGET\x1b[0m';

    console.log(`\n${line}`);
    console.log(`  TIMING SUMMARY — ${payload.totalTests} tests on ${this.workers} worker(s)`);
    console.log(line);
    console.log(
      `  Wall clock         ${secs(wallMs)}s   (budget ${this.budgetSeconds}s → ${pass})`,
    );
    console.log(
      `  Aggregate test time ${secs(aggregateMs)}s  of which setup/teardown ~${secs(hookMs)}s (approx)`,
    );
    console.log(
      `  Parallel efficiency ${payload.parallelEfficiency}x  (workers busy on average; ceiling = ${this.workers})`,
    );
    console.log(
      `  Long pole          ${payload.theoreticalFloorSeconds}s  ← wall clock can never go below this`,
    );
    if (longPole) console.log(`                     ${longPole.title.slice(0, 60)}`);
    if (failedMs > 0) {
      console.log(
        `  \x1b[33mBurned by non-passing tests ${secs(failedMs)}s\x1b[0m  (${((failedMs / aggregateMs) * 100).toFixed(0)}% of aggregate)`,
      );
    }
    console.log(
      `  Status counts      ${Object.entries(byStatus)
        .map(([k, v]) => `${k}=${v}`)
        .join('  ')}`,
    );

    // Skips are a COVERAGE signal and they hide behind a green run: most specs
    // here guard themselves with `test.skip(!found, 'no data')`, so a thin or
    // empty dataset silently turns real coverage into nothing while the suite
    // still passes. Surfaced next to the timings so it cannot go unnoticed.
    const skipped = byStatus.skipped ?? 0;
    if (skipped > 0) {
      const pct = ((skipped / payload.totalTests) * 100).toFixed(0);
      const loud = skipped / payload.totalTests > 0.25 ? '\x1b[31m' : '\x1b[33m';
      console.log(
        `  ${loud}Skipped            ${skipped}/${payload.totalTests} (${pct}%)\x1b[0m  ` +
          `— coverage actually exercised, not a timing figure`,
      );
    }

    console.log(`\n  Slowest tests`);
    for (const t of slowest.slice(0, Math.min(this.topN, 15))) {
      console.log(
        `    ${fit(`${secs(t.durationMs)}s`, 8)}${fit(t.status, 10)}${t.title.slice(0, 52)}`,
      );
    }

    console.log(`\n  Slowest files (aggregate)`);
    for (const [file, v] of filesRanked.slice(0, Math.min(this.topN, 12))) {
      console.log(
        `    ${fit(`${secs(v.ms)}s`, 8)}${fit(`${v.count} tests`, 10)}${file.slice(-58)}`,
      );
    }
    console.log(`${line}`);
    console.log(`  Full data → ${out}\n`);
  }
}
