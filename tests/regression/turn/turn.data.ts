import type { Page } from '@playwright/test';
import type { TurnBoardRowSnapshot } from '@pages/pos/TurnBoardPage';
import type { TimeKeepingDialog } from '@components/modal/TimeKeepingDialog';

/**
 * Data anchors for the Turn specs.
 *
 * The turn board only renders staff with a clock-in record for the day being
 * viewed, so most cases need a day that HAS data. These are the days the source
 * scan used against the DEV merchant (docs/screens/turn/turn-test-cases.md §1).
 * They are dev-data facts, not product behaviour: when the dev DB is reseeded,
 * update them here — every spec reads them from this file, and each guards with
 * a skip that names this constant.
 */
export interface ReferenceDay {
  /** Short month label as shown in the picker's month dropdown ("Jul"). */
  month: string;
  day: number;
  year: number;
  /** How the date button renders it, MM/DD/YYYY. */
  label: string;
}

export const TURN_DAYS = {
  /** Past day with several clocked-in staff, incl. two with different turn values. */
  WITH_DATA: { month: 'Jul', day: 27, year: 2026, label: '07/27/2026' },
  /** Past day whose only shift was opened AND closed that day. */
  CLOSED_SHIFT: { month: 'Aug', day: 5, year: 2026, label: '08/05/2026' },
  /** Past day nobody clocked in on. */
  EMPTY: { month: 'Aug', day: 12, year: 2026, label: '08/12/2026' },
} as const satisfies Record<string, ReferenceDay>;

/**
 * Staff the source scan pinned the turn-formula numbers to on
 * {@link TURN_DAYS.WITH_DATA}: 11 services / $424.00 for the first, 4 services
 * all under $25 for the second. Matched by prefix because the board shows the
 * nickname, which the roster can extend ("Angela" → "Angela Tyler").
 */
export const REFERENCE_STAFF = {
  /** $424.00 of service sales across 9 successful orders (7 services >= $25, 3 >= $60). */
  HIGH_TURN: 'Angela',
  /** 4 services totalling $46, none of them >= $25. */
  LOW_TURN: 'Alexander2',
} as const;

/** Turn counts the scan measured for {@link REFERENCE_STAFF} on the reference day. */
export const REFERENCE_TURNS = {
  /** service-based + decimals, turn value $100.00. */
  HIGH_AT_100: 4.24,
  /** service-based + decimals, turn value $25.00. */
  HIGH_AT_25: 16.96,
  /** service-based, decimals OFF, turn value $25.00 — services >= $25, not a rounding. */
  HIGH_AT_25_INTEGER: 7,
  /** service-based, decimals OFF, turn value $60.00. */
  HIGH_AT_60_INTEGER: 3,
  /** service-based OFF — successful orders the staff took part in. */
  HIGH_ORDER_COUNT: 9,
  /** Same day, decimals OFF at $25: every service is below the threshold. */
  LOW_AT_25_INTEGER: 0,
  /** service-based OFF — the low-turn staff's successful orders. */
  LOW_ORDER_COUNT: 2,
} as const;

/** Today as the date button renders it (MM/DD/YYYY), in the app's timezone. */
export async function todayLabel(page: Page): Promise<string> {
  // Computed IN the page so it uses the shop timezone Playwright configures for
  // the browser, which is the same clock the board's "today" comes from.
  return page.evaluate(() => {
    const now = new Date();
    const pad = (n: number): string => String(n).padStart(2, '0');
    return `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()}`;
  });
}

/** A board row whose nickname starts with `needle` (case-insensitive). */
export function findRow(
  rows: TurnBoardRowSnapshot[],
  needle: string,
): TurnBoardRowSnapshot | undefined {
  return rows.find((r) => r.name.toLowerCase().startsWith(needle.toLowerCase()));
}

/**
 * Claim this worker's staff from the LIVE Time Keeping roster.
 *
 * Same rule as HomePage.resolveStaffCard: sort the roster and index it by the
 * worker slot, so concurrent workers never drive the same staff. Returns '' when
 * the roster is empty (the caller skips). The dialog must already be open with
 * no search filter applied.
 */
export async function claimStaff(dialog: TimeKeepingDialog, workerIndex: number): Promise<string> {
  const cards = await dialog.readCards();
  const pool = [...new Set(cards.map((c) => c.name))].sort();
  return pool[workerIndex % pool.length] ?? '';
}

/** Message used by every "the dev data moved" skip, so they read the same. */
export function missingDataMessage(what: string): string {
  return `${what} — the DEV data this case is pinned to has changed; update TURN_DAYS / REFERENCE_STAFF in tests/regression/turn/turn.data.ts`;
}
