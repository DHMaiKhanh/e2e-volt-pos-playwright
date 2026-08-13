import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { TURN_SORT } from '@pages/pos/TurnBoardPage';
import { TURN_DAYS, todayLabel, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — the day selector.
 *
 * The board is per-day: the date button opens a calendar popover (portaled
 * OUTSIDE the dialog) with month/year dropdowns, every day after today is
 * blocked, and the chosen day survives closing and reopening the dialog but not
 * a page reload.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-19…24)
 */
test.describe(`Turn — date picker ${Tag.REGRESSION}`, () => {
  test.beforeEach(async ({ turnBoardPage }) => {
    await turnBoardPage.goto();
  });

  test('TC-TURN-19: the picker shows month/year dropdowns, a day grid, and today selected', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.openDatePicker();

    await expect(turnBoardPage.monthSelect).toBeVisible();
    await expect(turnBoardPage.yearSelect).toBeVisible();
    await expect(turnBoardPage.calendarGrid).toHaveAccessibleName(/^[A-Za-z]+ \d{4}$/);
    // The weekday row is `aria-hidden`, so it is asserted as markup rather than
    // by the `columnheader` role the source doc's snapshot listed.
    await expect(turnBoardPage.weekdayHeaders).toHaveText([
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
    ]);
    // Today's cell is labelled "Today, <weekday>, <month> <day>, <year>, selected".
    await expect(turnBoardPage.todayCell).toHaveAccessibleName(/selected/i);
  });

  test('TC-TURN-20: every day after today is disabled and cannot be picked', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.openDatePicker();
    const dateBefore = await turnBoardPage.dateButtonText();

    expect(await turnBoardPage.futureDayValues({ onlyEnabled: true })).toEqual([]);

    const future = await turnBoardPage.futureDayValues();
    test.skip(
      future.length === 0,
      'today is the last day rendered in this grid — no future cell to click',
    );
    // force: a disabled control would otherwise fail actionability instead of
    // proving that the click does nothing.
    await turnBoardPage.dayCellByValue(future[0]).click({ force: true });

    expect(await turnBoardPage.dateButtonText()).toBe(dateBefore);
  });

  test('TC-TURN-21: the year dropdown stops at the current year', async ({
    page,
    turnBoardPage,
  }) => {
    await turnBoardPage.openDatePicker();

    const years = (await turnBoardPage.openYearOptions()).map((y) => Number(y.trim()));
    const currentYear = await page.evaluate(() => new Date().getFullYear());

    expect(years.length).toBeGreaterThan(0);
    expect(Math.min(...years)).toBe(1970);
    expect(Math.max(...years)).toBe(currentYear);
    expect(years.filter((y) => y > currentYear)).toEqual([]);
  });

  test('TC-TURN-22: picking a past month + day reloads the board for that day', async ({
    turnBoardPage,
  }) => {
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    expect(await turnBoardPage.dateButtonText()).toContain(TURN_DAYS.WITH_DATA.label);
    await expect(turnBoardPage.calendarPopover).toBeHidden();

    const rows = await turnBoardPage.readRows();
    test.skip(rows.length === 0, missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`));
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  test('TC-TURN-23: the chosen day and sort survive close + reopen', async ({ turnBoardPage }) => {
    await turnBoardPage.pickDate(TURN_DAYS.CLOSED_SHIFT);
    await turnBoardPage.selectSort(TURN_SORT.MOST);

    await turnBoardPage.close();
    await turnBoardPage.openFromSidebar();

    expect(await turnBoardPage.dateButtonText()).toContain(TURN_DAYS.CLOSED_SHIFT.label);
    expect(await turnBoardPage.currentSortLabel()).toBe(TURN_SORT.MOST);
  });

  test('TC-TURN-24: a reload resets the day to today and the sort to the default', async ({
    page,
    turnBoardPage,
  }) => {
    await turnBoardPage.pickDate(TURN_DAYS.CLOSED_SHIFT);
    await turnBoardPage.selectSort(TURN_SORT.MOST);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await turnBoardPage.waitForReady();

    expect(await turnBoardPage.dateButtonText()).toContain(await todayLabel(page));
    expect(await turnBoardPage.currentSortLabel()).toBe(TURN_SORT.FEWEST);
  });
});
