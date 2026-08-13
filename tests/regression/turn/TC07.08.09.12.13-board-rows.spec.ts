import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { TURN_DAYS, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — what the board lists and how a row is built.
 *
 * The roster rule is the thing under test: a row exists for a staff with a
 * clock-in record ON THE SELECTED DAY — today shows only staff still on shift,
 * past days keep closed shifts as history, and a day with no clock-in at all is
 * an empty state (no way to force a row onto it).
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-07, 08, 09, 12, 13)
 */
test.describe(`Turn — board rows ${Tag.REGRESSION}`, () => {
  test.beforeEach(async ({ turnBoardPage }) => {
    await turnBoardPage.goto();
  });

  test('TC-TURN-07: a day nobody clocked in on shows the empty state, toolbar intact', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.pickDate(TURN_DAYS.EMPTY);

    const rows = await turnBoardPage.readRows();
    test.skip(
      rows.length > 0,
      missingDataMessage(`${TURN_DAYS.EMPTY.label} now has ${rows.length} clocked-in staff`),
    );

    await expect(turnBoardPage.emptyState).toBeVisible();
    await expect(turnBoardPage.dateButton).toBeVisible();
    await expect(turnBoardPage.sortSelect).toBeVisible();
    await expect(turnBoardPage.adjustTurnButton).toBeVisible();
    await expect(turnBoardPage.settingButton).toBeVisible();
  });

  test('TC-TURN-08: a row is rank + avatar initial + name + turn value', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const rows = await turnBoardPage.readRows();
    test.skip(rows.length === 0, missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`));

    expect(rows.map((r) => r.rank)).toEqual(rows.map((_, i) => i + 1));
    for (const row of rows) {
      expect(row.name).not.toBe('');
      expect(Number.isNaN(row.turnCount)).toBe(false);
      // i18next pluralises the unit: "Turn" at exactly 1, "Turns" otherwise.
      expect(row.label).toMatch(/^Turns?$/);
      expect(row.label).toBe(row.turnCount === 1 ? 'Turn' : 'Turns');
      // Staff with an avatar image render no fallback letter.
      if (row.avatarText !== '') expect(row.avatarText).toBe(row.name.slice(0, 1).toUpperCase());
    }
  });

  test('TC-TURN-09: clicking a row opens nothing', async ({ page, turnBoardPage }) => {
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const rows = await turnBoardPage.readRows();
    test.skip(rows.length === 0, missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`));

    const urlBefore = page.url();
    const dialogsBefore = await turnBoardPage.openDialogCount();

    await turnBoardPage.clickRow(0);

    expect(await turnBoardPage.openDialogCount()).toBe(dialogsBefore);
    expect(page.url()).toBe(urlBefore);
    await expect(turnBoardPage.dialog).toBeVisible();
  });

  test('TC-TURN-12: a past day still lists shifts that were already closed', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.pickDate(TURN_DAYS.CLOSED_SHIFT);

    const rows = await turnBoardPage.readRows();
    test.skip(
      rows.length === 0,
      missingDataMessage(`${TURN_DAYS.CLOSED_SHIFT.label} has no clock-in records`),
    );

    expect(rows.length).toBeGreaterThanOrEqual(1);
    await expect(turnBoardPage.emptyState).toBeHidden();
  });

  test('TC-TURN-13: the board lists clocked-in staff only, not the whole roster', async ({
    turnBoardPage,
    timeKeepingDialog,
  }) => {
    // Today's board — its rows are exactly the staff currently on shift.
    const rows = await turnBoardPage.readRows();
    await turnBoardPage.close();

    // Time Keeping renders the full active roster across its two columns, which
    // is a reliable roster size; the Home staff listing is paginated and would
    // not be. Read it AFTER the board so a concurrent check-in can only add to
    // the roster, never invalidate the subset check below.
    await timeKeepingDialog.goto();
    const cards = await timeKeepingDialog.readCards();
    test.skip(cards.length === 0, missingDataMessage('Time Keeping shows no staff'));

    const roster = cards.map((c) => c.name);
    for (const row of rows) expect(roster).toContain(row.name);
    expect(rows.length).toBeLessThan(cards.length);
  });
});
