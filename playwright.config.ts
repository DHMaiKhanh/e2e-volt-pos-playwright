import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import { loadEnv } from './configs/env/loadEnv';
import { shopTimezone } from './src/data/static/shops';
import { MAX_ISOLATED_WORKERS } from './src/fixtures/workerStaff.fixture';

const env = loadEnv();

// Browser timezone = the active shop's zone (each merchant keeps its own books in
// its local time). Driven by `SHOP` / `TZ_ID` so date math + the app's "Today"
// agree. Defaults to the shop map / Asia/Ho_Chi_Minh.
const timezoneId = shopTimezone(process.env.SHOP);

const isCI = !!process.env.CI;

/**
 * LANES
 *
 * `fast` — the PR gate. Runs the parallel-safe tests only, with the wall-clock
 *          budget in mind. Excludes `@exclusive` (global-state mutators) and
 *          `@slow` (specs that create orders and then assert today's shop-wide
 *          totals); both are unsafe next to concurrent workers and are run by
 *          `npm run test:serial` as a short serial tail.
 * `full` — everything, for the nightly run. Conservative worker count.
 *
 * Set with `LANE=fast|full`. See docs/test-performance-optimization.md.
 */
const LANE = (process.env.LANE ?? 'full') as 'fast' | 'full';
const isFast = LANE === 'fast';

/**
 * Worker count.
 *
 * Two independent ceilings apply:
 *  1. CPU — the app under test (Vite dev server + backend) shares this machine
 *     with the browsers, so we leave cores for it rather than taking all of them.
 *  2. STAFF — each worker needs its own staff member to avoid the active-order
 *     race that pinned this suite to 1 worker. That pool is finite; going past
 *     it makes workers share a staff and the race returns as flake.
 */
const cpuCeiling = Math.max(1, Math.floor((os.cpus().length - 4) / 1) || 1);
const defaultWorkers = isFast ? Math.min(8, cpuCeiling, MAX_ISOLATED_WORKERS) : 4;
const workers = process.env.WORKERS ? Number(process.env.WORKERS) : defaultWorkers;

/**
 * Artifact capture.
 *
 * `video: 'retain-on-failure'` RECORDS video for every test and throws it away
 * for the passing ones, so a green run pays the full encoding cost for nothing.
 * The fast lane turns video off and keeps traces on first retry only; the full
 * lane keeps richer artifacts because it is the run people debug from.
 */
const trace = (process.env.TRACE ?? (isFast ? 'on-first-retry' : 'retain-on-failure')) as
  | 'on'
  | 'retain-on-failure'
  | 'off';
const video = (process.env.VIDEO ?? (isFast ? 'off' : 'retain-on-failure')) as
  | 'on'
  | 'retain-on-failure'
  | 'off';

/** Cached passcode grant from tests/setup/pos.setup.ts — see that file for why. */
const POS_STORAGE_STATE = process.env.POS_STORAGE_STATE ?? '.auth/pos-storage-state.json';

const desktop = { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } };

/**
 * ARTIFACT SLICE
 *
 * `test:pr` is TWO Playwright invocations back to back (the parallel bulk, then
 * the serial tail) and every reporter path below is a single fixed file, so the
 * second invocation overwrites the first's results.json / junit / HTML report —
 * and Playwright clears `outputDir` on start, taking the first lane's
 * screenshots with it. A dashboard built afterwards could only ever show the
 * tail (2 spec files), never the 259-test bulk.
 *
 * `REPORT_SLICE=<name>` gives one invocation its own artifact paths
 * (`results-<name>.json`, `test-results-<name>/`, …) so both lanes survive on
 * disk and scripts/build-dashboard.mjs can merge them into one view.
 * Unset — i.e. every other command — keeps the historical paths byte for byte.
 */
const slice = process.env.REPORT_SLICE ? `-${process.env.REPORT_SLICE}` : '';

/** Specs that must never run beside another worker. Kept in one place. */
const EXCLUSIVE_SPECS = [
  '**/tests/regression/settings/TC-passcode-setting.spec.ts',
  '**/tests/regression/settings/TC-language-switch.spec.ts',
  // Turn Settings writes sys_setting.merchant_turn_default, which changes how
  // EVERY worker's turn counts are computed while the test is mid-flight.
  '**/tests/regression/turn/*-settings.spec.ts',
];

export default defineConfig({
  testDir: './tests',
  outputDir: `./test-results${slice}`,
  snapshotDir: './tests/visual/__snapshots__',

  /**
   * A test that cannot finish in this window is a pipeline/scan, not a check —
   * those declare their own budget with test.setTimeout().
   *
   * The fast lane gets a tighter budget than the full lane, because this timeout
   * is mostly a price list for failures — a measured run spent ~32% of its
   * aggregate on non-passing tests, so every second here is paid many times over.
   *
   * Measured: raising this 30s -> 40s to rescue 2 falsely-timed-out tests cost
   * ~34s of wall clock (179.6s -> 213.6s), because every FAILING test then burned
   * 40s instead of 30s. With ~a quarter of the lane currently failing, the global
   * timeout is dominated by failures, not by slow passes.
   *
   * So it stays tight, and the few genuinely long tests (the e2e order-payment
   * flows, 24-31s under 6-worker contention) opt out individually with
   * `test.slow()` instead of everyone paying for them.
   */
  timeout: (isFast ? 30 : 60) * 1000,
  expect: {
    timeout: 5 * 1000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
    toMatchSnapshot: { maxDiffPixelRatio: 0.02 },
  },

  /**
   * `fullyParallel: false` keeps the tests inside one FILE on one worker in
   * declaration order — several specs depend on it (bulkCreateOrders runs
   * "Order 1/10".."10/10" in sequence, and beforeEach-built order state is
   * reused down a file). Different FILES still run concurrently across workers,
   * which is where the speedup comes from: 72 files over 8 workers.
   */
  fullyParallel: false,
  forbidOnly: isCI,
  // A retry re-pays the full navigation + setup cost. Worth it on CI for the
  // parallel lane (a genuine cross-worker hiccup should not fail the build),
  // never worth it for deterministic report/i18n mismatches.
  retries: isCI && !isFast ? 1 : 0,
  workers,

  reporter: [
    ['list'],
    ['html', { outputFolder: `reports/html${slice}`, open: 'never' }],
    ['json', { outputFile: `reports/json/results${slice}.json` }],
    ['junit', { outputFile: `reports/junit/results${slice}.xml` }],
    // Wall-clock budget instrument: prints aggregate time, parallel efficiency
    // and the long pole (the slowest single test, below which no amount of
    // parallelism can take the suite). PERF_BUDGET_SECONDS sets the target.
    ['./src/reporters/TimingReporter.ts'],
    // Allure's per-step detail is the most expensive reporter here; the fast
    // lane skips it and CI shards emit `blob` instead so results can be merged.
    ...(isFast
      ? []
      : ([
          [
            'allure-playwright',
            { outputFolder: 'reports/allure-results', detail: true, suiteTitle: true },
          ],
        ] as const)),
    ...(process.env.PW_BLOB_REPORT ? ([['blob']] as const) : []),
  ],

  use: {
    baseURL: env.BASE_URL,
    headless: env.HEADLESS,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace,
    screenshot: (process.env.SCREENSHOT ?? 'only-on-failure') as 'on' | 'only-on-failure' | 'off',
    video,
    locale: 'en-US',
    timezoneId,
    launchOptions: {
      slowMo: env.SLOW_MO,
    },
  },

  projects: [
    {
      // Unlocks the passcode gate once and caches the grant. Everything that
      // touches a gated screen depends on this, which is why it is a project
      // rather than a global setup: Playwright then shows it in the report and
      // fails fast with a clear owner when the app changes.
      name: 'pos-setup',
      testDir: './tests/setup',
      testMatch: 'pos.setup.ts',
      use: desktop,
    },
    {
      name: 'chromium',
      testIgnore: [
        '**/tests/api/**',
        '**/tests/regression/i18n/**',
        '**/*report*/**',
        '**/tests/setup/**',
        ...EXCLUSIVE_SPECS,
      ],
      dependencies: ['pos-setup'],
      use: { ...desktop, storageState: POS_STORAGE_STATE },
    },
    {
      // i18n scans and report/reconciliation screens are flaky-by-nature
      // (locale text drift, aggregated numbers) — a retry just re-runs the
      // same deterministic mismatch, so keep retries off regardless of CI.
      name: 'no-retry',
      testIgnore: ['**/tests/api/**', '**/tests/setup/**'],
      testMatch: ['**/tests/regression/i18n/**/*.spec.ts', '**/*report*/**/*.spec.ts'],
      retries: 0,
      dependencies: ['pos-setup'],
      use: { ...desktop, storageState: POS_STORAGE_STATE },
    },
    {
      /**
       * Global-state mutators: the app language and the merchant-wide
       * "Enable Passcode Verification" switch. While one of these is mid-flight
       * every other worker sees the changed setting, so they get their own
       * project and are run with `--workers=1` as a separate invocation
       * (`npm run test:serial`). Playwright has no per-project worker count,
       * so the isolation comes from the invocation, not from this block.
       */
      name: 'serial',
      testMatch: EXCLUSIVE_SPECS,
      retries: 0,
      dependencies: ['pos-setup'],
      use: { ...desktop, storageState: POS_STORAGE_STATE },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: env.BASE_URL },
    },
    {
      // Logs into the FASTBOY Portal by hand once (SSO can't be scripted)
      // and caches the session at PORTAL_STORAGE_STATE. Run via `npm run auth`.
      name: 'portal-auth',
      testDir: './tests/portal',
      testMatch: 'auth.setup.ts',
      use: { headless: false },
    },
    {
      // Portal specs reuse the session `portal-auth` saved. NOT wired as a
      // `dependencies` project on purpose — SSO needs a human, so re-auth is
      // a deliberate `npm run auth`, not something that should fire on every run.
      name: 'portal',
      testDir: './tests/portal',
      testIgnore: 'auth.setup.ts',
      use: { baseURL: env.PORTAL_BASE_URL, storageState: env.PORTAL_STORAGE_STATE },
    },
    // Uncomment when cross-browser coverage is needed.
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});
