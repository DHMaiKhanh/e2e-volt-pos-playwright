import { test as base } from '@playwright/test';
import { STAFF, RESERVED_STAFF_NICKNAMES, type Staff } from '@data/static/staff';

/**
 * Per-worker staff isolation — the change that makes `workers > 1` safe.
 *
 * WHY THIS EXISTS
 * Volt POS keeps ONE active order per staff member, server-side. Two browser
 * sessions that both drive the same staff therefore fight over the same active
 * order: worker A adds a service while worker B deletes the order, and both
 * fail non-deterministically. That race is the documented reason the suite was
 * pinned to `workers: 1`.
 *
 * The race is per-STAFF, not global. Give every Playwright worker its own staff
 * member and the workers stop sharing the mutable resource, so they can run
 * concurrently. `HomePage` reads this fixture and defaults `selectAnyStaff()` to
 * the worker's own staff, which is why no spec file needed to change.
 *
 * RESERVED STAFF
 * A few specs pin a staff by name (`selectStaff(STAFF.AMELIA.nickname)`) *and*
 * assert on that staff's contribution to report totals — see
 * TC19.21.38-live-delta.spec.ts and TC02.04.06.08.22.23.37-refund-cancel.spec.ts.
 * If a parallel worker also created orders for those staff, the delta assertions
 * would measure someone else's order too. They are excluded from the pool so the
 * pinned specs keep exclusive ownership of their staff.
 *
 * CAPACITY
 * The pool bounds how many workers can run with true isolation. Exceeding it
 * throws instead of silently sharing a staff, because silent sharing reintroduces
 * exactly the flake this fixture exists to prevent.
 */

/**
 * Widened up front: `STAFF` is declared `as const`, so `Object.values` would
 * otherwise yield a union of 15 literal object types rather than `Staff[]`.
 */
const ALL_STAFF: readonly Staff[] = Object.values(STAFF);

/**
 * Staff a parallel worker may claim: active, and not reserved by a pinned spec.
 * Inactive staff are excluded because their cards do not render on Home.
 */
export const WORKER_STAFF_POOL: readonly Staff[] = ALL_STAFF.filter(
  (s) => s.status === 'active' && !RESERVED_STAFF_NICKNAMES.has(s.nickname),
);

/** How many workers can run with true per-staff isolation. */
export const MAX_ISOLATED_WORKERS = WORKER_STAFF_POOL.length;

export interface WorkerStaffFixture {
  /**
   * A staff member owned exclusively by this Playwright worker for the whole
   * worker lifetime. Worker-scoped so every test in the worker reuses it.
   *
   * Only a HINT: `STAFF` is a snapshot of one dev shop's seed data, and running
   * against a shop with a different roster makes these nicknames absent. The
   * authoritative claim is {@link workerIndex} against the LIVE roster.
   */
  workerStaff: Staff;

  /**
   * This worker's slot number (Playwright's `parallelIndex`).
   *
   * `HomePage` claims the Nth staff card from the live roster, sorted by name for
   * a deterministic order. That keeps workers on distinct staff even when the
   * shop's roster has nothing to do with `src/data/static/staff.ts` — which is
   * the normal case outside the one dev shop that file was captured from.
   */
  workerIndex: number;
}

/** This fixture set adds no test-scoped fixtures, only a worker-scoped one. */
type NoTestFixtures = Record<never, never>;

export const workerStaffFixture = base.extend<NoTestFixtures, WorkerStaffFixture>({
  workerStaff: [
    async ({}, use, workerInfo) => {
      const { parallelIndex } = workerInfo;

      if (parallelIndex >= WORKER_STAFF_POOL.length) {
        throw new Error(
          `Worker ${parallelIndex} has no staff to claim: the isolation pool holds ` +
            `${WORKER_STAFF_POOL.length} staff (active, minus the ${RESERVED_STAFF_NICKNAMES.size} reserved ` +
            `for pinned specs). Run with at most ${MAX_ISOLATED_WORKERS} workers, or add more active ` +
            `staff to src/data/static/staff.ts. Sharing a staff between workers reintroduces the ` +
            `active-order race this fixture prevents.`,
        );
      }

      // Index by parallelIndex, not workerInfo.workerIndex: the latter keeps
      // incrementing when a worker is torn down and replaced (after a failure),
      // which would walk off the end of the pool mid-run. parallelIndex is the
      // stable slot number.
      await use(WORKER_STAFF_POOL[parallelIndex]);
    },
    { scope: 'worker' },
  ],

  workerIndex: [
    async ({}, use, workerInfo) => {
      await use(workerInfo.parallelIndex);
    },
    { scope: 'worker' },
  ],
});
