import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { TURN_SORT } from '@pages/pos/TurnBoardPage';
import { TURN_DAYS, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — the four sort modes.
 *
 * Driven on a PAST reference day: today's counts move whenever another worker
 * completes an order, which would make ordering assertions race.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-14…18)
 */
test.describe(`Turn — sorting ${Tag.REGRESSION}`, () => {
  test.beforeEach(async ({ turnBoardPage }) => {
    await turnBoardPage.goto();
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
  });

  test('TC-TURN-14: "Fewest turns first" (default) orders turns ascending', async ({
    turnBoardPage,
  }) => {
    expect(await turnBoardPage.currentSortLabel()).toBe(TURN_SORT.FEWEST);

    const rows = await turnBoardPage.readRows();
    test.skip(
      rows.length < 2,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has fewer than 2 rows`),
    );

    const values = rows.map((r) => r.turnCount);
    expect(values).toEqual([...values].sort((a, b) => a - b));
    expect(rows.map((r) => r.rank)).toEqual(rows.map((_, i) => i + 1));
  });

  test('TC-TURN-15: "Most turns first" reverses the order and re-ranks from 1', async ({
    turnBoardPage,
  }) => {
    const ascending = await turnBoardPage.readRows();
    test.skip(
      ascending.length < 2,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has fewer than 2 rows`),
    );

    await turnBoardPage.selectSort(TURN_SORT.MOST);

    const descending = await turnBoardPage.readRows();
    const values = descending.map((r) => r.turnCount);
    expect(values).toEqual([...values].sort((a, b) => b - a));
    expect(descending.map((r) => r.rank)).toEqual(descending.map((_, i) => i + 1));
    expect([...descending.map((r) => r.name)].sort()).toEqual(
      [...ascending.map((r) => r.name)].sort(),
    );
  });

  test('TC-TURN-16: "Earliest check-in first" re-orders the same staff', async ({
    turnBoardPage,
  }) => {
    const byTurns = await turnBoardPage.readRows();
    test.skip(
      byTurns.length < 3,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has fewer than 3 rows`),
    );

    await turnBoardPage.selectSort(TURN_SORT.EARLIEST_CHECKIN);

    const byCheckIn = await turnBoardPage.readRows();
    // Check-in times are not rendered on a row, so only the ORDER of names can
    // be asserted — and whether it happens to differ from the turn order is a
    // property of the day's data. The invariant that always holds is that the
    // same staff are re-ranked 1..n; TC-TURN-17 pins the ordering itself.
    expect([...byCheckIn.map((r) => r.name)].sort()).toEqual(
      [...byTurns.map((r) => r.name)].sort(),
    );
    expect(byCheckIn.map((r) => r.rank)).toEqual(byCheckIn.map((_, i) => i + 1));
  });

  test('TC-TURN-17: "Latest check-in first" is the exact reverse of earliest', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.selectSort(TURN_SORT.EARLIEST_CHECKIN);
    const earliest = await turnBoardPage.staffNames();
    test.skip(
      earliest.length < 3,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has fewer than 3 rows`),
    );

    await turnBoardPage.selectSort(TURN_SORT.LATEST_CHECKIN);

    expect(await turnBoardPage.staffNames()).toEqual([...earliest].reverse());
  });

  test('TC-TURN-18: the sort combobox offers exactly the four modes', async ({
    page,
    turnBoardPage,
  }) => {
    const options = await turnBoardPage.openSortOptions();

    expect(options.map((o) => o.trim())).toEqual([
      TURN_SORT.FEWEST,
      TURN_SORT.MOST,
      TURN_SORT.EARLIEST_CHECKIN,
      TURN_SORT.LATEST_CHECKIN,
    ]);
    await expect(page.getByRole('option', { selected: true })).toHaveText(TURN_SORT.FEWEST);

    await turnBoardPage.closeSortOptions();
  });
});
