export const Tag = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  CRITICAL: '@critical',
  SLOW: '@slow',
  FLAKY: '@flaky',
  /**
   * Mutates state that is GLOBAL to the merchant — the app language, the
   * "Enable Passcode Verification" switch, business info — or asserts on
   * shop-wide report totals for TODAY, which another worker creating an order
   * would change underneath it.
   *
   * Per-worker staff isolation (src/fixtures/workerStaff.fixture.ts) does NOT
   * protect these: the resource they touch is not scoped to a staff member. They
   * run in the serial lane, one worker, after the parallel lane has finished.
   */
  EXCLUSIVE: '@exclusive',
  API: '@api',
  UI: '@ui',
  VISUAL: '@visual',
  PAYMENT: '@payment',
  AUTH: '@auth',
} as const;

export type TagKey = keyof typeof Tag;
export type TagValue = (typeof Tag)[TagKey];
