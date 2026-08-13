import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { TURN_SORT } from '@pages/pos/TurnBoardPage';
import { RESERVED_STAFF_NICKNAMES } from '@data/static/staff';
import { TURN_DAYS, claimStaff, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — "Adjust Manual Turn".
 *
 * One stepper per staff on the board, in the board's sort order. Save writes the
 * DIFFERENCE as an append-only `turn_adjustment` ledger row; Reset only reverts
 * the pending value locally. Neither Save shows a toast, so every assertion here
 * is on `Current: …` and on the board value behind the dialog.
 *
 * Two known defects are pinned here, TC-TURN-47 and TC-TURN-48. They assert the
 * BUGGY behaviour on purpose — when they start failing, the bug is fixed and the
 * expectation is what needs updating.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-36…49)
 */

/** Stepper mechanics — read-only, driven on a past day so nothing is written. */
test.describe(`Turn — adjust stepper ${Tag.REGRESSION}`, () => {
  test.beforeEach(async ({ turnBoardPage, adjustManualTurnDialog }) => {
    await turnBoardPage.goto();
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
    const rows = await turnBoardPage.readRows();
    test.skip(rows.length === 0, missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`));
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
  });

  test('TC-TURN-36: the dialog lists one stepper row per staff on the board', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    // Read the board first: while a child dialog is open Radix marks the board
    // dialog aria-hidden, and a role-based locator can no longer see it.
    await adjustManualTurnDialog.close();
    const boardNames = await turnBoardPage.staffNames();
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();

    const rows = await adjustManualTurnDialog.readRows();

    expect(rows.length).toBeGreaterThan(0);
    for (const [index, row] of rows.entries()) {
      expect(row.currentText).toMatch(/^Current: -?[\d.]+$/);
      await expect(adjustManualTurnDialog.decreaseButton(index)).toBeVisible();
      await expect(adjustManualTurnDialog.increaseButton(index)).toBeVisible();
      await expect(adjustManualTurnDialog.saveButton(index)).toBeVisible();
      await expect(adjustManualTurnDialog.resetButton(index)).toBeVisible();
    }
    // Same staff as the board behind it.
    expect(rows.map((r) => r.name)).toEqual(boardNames);
  });

  test('TC-TURN-37: rows follow the board sort', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    await adjustManualTurnDialog.close();
    await turnBoardPage.selectSort(TURN_SORT.LATEST_CHECKIN);
    const boardOrder = await turnBoardPage.staffNames();
    test.skip(boardOrder.length < 2, missingDataMessage('fewer than 2 rows to order'));

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();

    expect((await adjustManualTurnDialog.readRows()).map((r) => r.name)).toEqual(boardOrder);
  });

  test('TC-TURN-38: Save and Reset start disabled on every row', async ({
    adjustManualTurnDialog,
  }) => {
    for (const row of await adjustManualTurnDialog.readRows()) {
      expect(row.saveEnabled).toBe(false);
      expect(row.resetEnabled).toBe(false);
      expect(row.pending).toBe(row.current);
    }
  });

  test('TC-TURN-39: increasing one row dirties only that row', async ({
    adjustManualTurnDialog,
  }) => {
    const before = await adjustManualTurnDialog.readRows();

    await adjustManualTurnDialog.increase(0);

    const after = await adjustManualTurnDialog.readRows();
    expect(after[0].pending).toBeCloseTo(before[0].current + 1, 2);
    expect(after[0].saveEnabled).toBe(true);
    expect(after[0].resetEnabled).toBe(true);
    for (const row of after.slice(1)) {
      expect(row.saveEnabled).toBe(false);
      expect(row.resetEnabled).toBe(false);
    }
  });

  test('TC-TURN-40: decreasing subtracts exactly 1 and keeps the decimals', async ({
    adjustManualTurnDialog,
  }) => {
    const rows = await adjustManualTurnDialog.readRows();
    const index = rows.findIndex((r) => r.current > 1 && !Number.isInteger(r.current));
    test.skip(
      index < 0,
      missingDataMessage('no staff on this day has a fractional turn count above 1'),
    );

    await adjustManualTurnDialog.decrease(index);

    const after = (await adjustManualTurnDialog.readRows())[index];
    expect(after.pending).toBeCloseTo(rows[index].current - 1, 2);
  });

  test('TC-TURN-41: decreasing clamps at 0 instead of going negative', async ({
    adjustManualTurnDialog,
  }) => {
    const rows = await adjustManualTurnDialog.readRows();
    const index = rows.findIndex((r) => r.current > 0 && r.current < 1);
    test.skip(
      index < 0,
      missingDataMessage('no staff on this day has a turn count between 0 and 1'),
    );

    await adjustManualTurnDialog.decrease(index);

    const after = (await adjustManualTurnDialog.readRows())[index];
    expect(after.pending).toBe(0);
    expect(after.decreaseEnabled).toBe(false);
  });

  test('TC-TURN-42: decrease is already disabled at 0', async ({ adjustManualTurnDialog }) => {
    const rows = await adjustManualTurnDialog.readRows();
    const index = rows.findIndex((r) => r.current === 0);
    test.skip(index < 0, missingDataMessage('no staff on this day has 0 turns'));

    expect(rows[index].decreaseEnabled).toBe(false);
    await expect(adjustManualTurnDialog.increaseButton(index)).toBeEnabled();
  });

  test('TC-TURN-43: Reset reverts only its own row', async ({ adjustManualTurnDialog }) => {
    const before = await adjustManualTurnDialog.readRows();
    test.skip(before.length < 2, missingDataMessage('fewer than 2 rows to compare'));

    await adjustManualTurnDialog.increase(0);
    await adjustManualTurnDialog.increase(1);
    await adjustManualTurnDialog.reset(0);

    const after = await adjustManualTurnDialog.readRows();
    expect(after[0].pending).toBe(before[0].current);
    expect(after[0].saveEnabled).toBe(false);
    expect(after[0].resetEnabled).toBe(false);
    // The other dirty row is untouched.
    expect(after[1].pending).toBeCloseTo(before[1].current + 1, 2);
    expect(after[1].saveEnabled).toBe(true);
  });

  test('TC-TURN-49: Adjust Turn and Setting still open when the board is empty', async ({
    turnBoardPage,
    adjustManualTurnDialog,
    turnSettingsDialog,
  }) => {
    await adjustManualTurnDialog.close();
    await turnBoardPage.pickDate(TURN_DAYS.EMPTY);
    test.skip(
      (await turnBoardPage.readRows()).length > 0,
      missingDataMessage(`${TURN_DAYS.EMPTY.label} is no longer an empty day`),
    );

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    expect(await adjustManualTurnDialog.rowCount()).toBe(0);
    await expect(adjustManualTurnDialog.emptyState).toBeVisible();
    await adjustManualTurnDialog.close();

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    await expect(turnSettingsDialog.saveButton).toBeEnabled();
    await turnSettingsDialog.close();
  });
});

/**
 * Saving adjustments — writes ledger rows, so it drives THIS worker's own staff
 * (clocked in for the day by the spec itself) and undoes every delta it saves.
 */
test.describe(`Turn — adjust saving ${Tag.REGRESSION}`, () => {
  let staffName = '';
  /** Extra staff TC-TURN-47 has to clock in — cleared by afterEach. */
  let borrowedStaff = '';

  test.beforeEach(async ({ timeKeepingDialog, workerIndex, turnBoardPage }) => {
    borrowedStaff = '';
    await timeKeepingDialog.goto();
    staffName = await claimStaff(timeKeepingDialog, workerIndex);
    test.skip(staffName === '', missingDataMessage('Time Keeping shows no staff to clock in'));
    // A staff only reaches today's board while their shift is open.
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkIn(staffName);
    await timeKeepingDialog.close();

    await turnBoardPage.goto();
  });

  test.afterEach(async ({ timeKeepingDialog }) => {
    for (const name of [staffName, borrowedStaff]) {
      if (!name) continue;
      await timeKeepingDialog.goto();
      await timeKeepingDialog.search(name);
      await timeKeepingDialog.checkOut(name);
    }
  });

  test('TC-TURN-44: saving a row updates Current and the board behind it', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    test.slow();
    const boardBefore = await turnBoardPage.rowFor(staffName);
    expect(boardBefore, `${staffName} is not on today's board after checking in`).toBeDefined();

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const index = await adjustManualTurnDialog.indexOf(staffName);
    expect(index).toBeGreaterThanOrEqual(0);
    const before = (await adjustManualTurnDialog.readRows())[index];

    await adjustManualTurnDialog.increase(index);
    await adjustManualTurnDialog.save(index);

    const after = (await adjustManualTurnDialog.readRows())[index];
    expect(after.current).toBeCloseTo(before.current + 1, 2);
    expect(after.pending).toBeCloseTo(before.current + 1, 2);
    expect(after.saveEnabled).toBe(false);
    expect(after.resetEnabled).toBe(false);

    await adjustManualTurnDialog.close();
    await expect
      .poll(async () => (await turnBoardPage.rowFor(staffName))?.turnCount)
      .toBeCloseTo(boardBefore!.turnCount + 1, 2);

    // Undo: the ledger is append-only, so a -1 row is the only way back.
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const undoIndex = await adjustManualTurnDialog.indexOf(staffName);
    await adjustManualTurnDialog.decrease(undoIndex);
    await adjustManualTurnDialog.save(undoIndex);
  });

  test('TC-TURN-45: an adjustment adds to the computed turns, it does not replace them', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    test.slow();
    const computed = (await turnBoardPage.rowFor(staffName))?.turnCount;
    expect(computed, `${staffName} is not on today's board after checking in`).toBeDefined();

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const index = await adjustManualTurnDialog.indexOf(staffName);
    await adjustManualTurnDialog.increase(index);
    await adjustManualTurnDialog.save(index);
    await adjustManualTurnDialog.close();

    // Sales-derived value + 1, not 1.
    await expect
      .poll(async () => (await turnBoardPage.rowFor(staffName))?.turnCount)
      .toBeCloseTo(computed! + 1, 2);

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const undoIndex = await adjustManualTurnDialog.indexOf(staffName);
    await adjustManualTurnDialog.decrease(undoIndex);
    await adjustManualTurnDialog.save(undoIndex);
  });

  test('TC-TURN-46: undoing a saved adjustment needs another Save', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    test.slow();
    const computed = (await turnBoardPage.rowFor(staffName))?.turnCount;
    expect(computed, `${staffName} is not on today's board after checking in`).toBeDefined();

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    let index = await adjustManualTurnDialog.indexOf(staffName);
    await adjustManualTurnDialog.increase(index);
    await adjustManualTurnDialog.save(index);

    // Reset does NOT undo a saved adjustment — it only clears pending edits.
    await adjustManualTurnDialog.close();
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    index = await adjustManualTurnDialog.indexOf(staffName);
    expect((await adjustManualTurnDialog.readRows())[index].current).toBeCloseTo(computed! + 1, 2);

    await adjustManualTurnDialog.decrease(index);
    await adjustManualTurnDialog.save(index);

    expect((await adjustManualTurnDialog.readRows())[index].current).toBeCloseTo(computed!, 2);
    await adjustManualTurnDialog.close();
    await expect
      .poll(async () => (await turnBoardPage.rowFor(staffName))?.turnCount)
      .toBeCloseTo(computed!, 2);
  });

  test('TC-TURN-47: 🐞 saving while a past day is shown writes the delta onto today', async ({
    turnBoardPage,
    adjustManualTurnDialog,
    timeKeepingDialog,
  }) => {
    test.slow();
    // Find a staff who worked the reference day — the delta will be written for
    // one of them, but it lands on TODAY, so they must be on today's board too.
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
    const pastNames = await turnBoardPage.staffNames();
    test.skip(
      pastNames.length === 0,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`),
    );
    const target =
      pastNames.find((name) => name === staffName) ??
      pastNames.find((name) => !RESERVED_STAFF_NICKNAMES.has(name));
    test.skip(
      !target,
      missingDataMessage(`every staff on ${TURN_DAYS.WITH_DATA.label} is reserved`),
    );

    if (target !== staffName) {
      // Borrowed for this case only, and clocked back out by afterEach.
      borrowedStaff = target!;
      await timeKeepingDialog.goto();
      await timeKeepingDialog.search(borrowedStaff);
      await timeKeepingDialog.checkIn(borrowedStaff);
      await timeKeepingDialog.close();
    }

    // Today's number has to be captured BEFORE switching back to the past day.
    await turnBoardPage.goto();
    const todayBefore = (await turnBoardPage.rowFor(target!))?.turnCount;
    expect(todayBefore, `${target} is not on today's board after checking in`).toBeDefined();

    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const pastRows = await adjustManualTurnDialog.readRows();
    const index = pastRows.findIndex((r) => r.name === target);
    const pastBefore = pastRows[index];

    await adjustManualTurnDialog.increase(index);
    await adjustManualTurnDialog.saveAndWaitForLedger(index);

    // BUG: the ledger row is stamped `createdAt = now`, but the board filters
    // adjustments by the day being VIEWED — so the past day never sees it. The
    // row therefore never goes clean: Current is unmoved and Save stays enabled.
    const pastAfter = (await adjustManualTurnDialog.readRows())[index];
    expect(pastAfter.current).toBe(pastBefore.current);
    expect(pastAfter.saveEnabled).toBe(true);
    await adjustManualTurnDialog.close();
    expect((await turnBoardPage.rowFor(target!))?.turnCount).toBe(pastBefore.current);

    // …and today's board picked it up instead.
    await turnBoardPage.goto();
    await expect
      .poll(async () => (await turnBoardPage.rowFor(target!))?.turnCount)
      .toBeCloseTo(todayBefore! + 1, 2);

    // Undo on today, where the delta actually landed.
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const undoIndex = await adjustManualTurnDialog.indexOf(target!);
    await adjustManualTurnDialog.decrease(undoIndex);
    await adjustManualTurnDialog.save(undoIndex);
  });

  test('TC-TURN-48: 🐞 float dust keeps a just-saved row dirty', async ({
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    test.slow();
    const rows = await turnBoardPage.readRows();
    // The defect needs a value whose `- 1` is NOT exactly representable: 1.02
    // leaves dust (0.020000000000000018), 4.25 does not.
    const target = rows.find(
      (r) => r.turnCount > 1 && Math.round((r.turnCount - 1) * 100) / 100 !== r.turnCount - 1,
    );
    test.skip(
      !target,
      missingDataMessage(
        "no staff on today's board has a turn count above 1 that leaves float dust when 1 is subtracted",
      ),
    );

    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();
    const index = await adjustManualTurnDialog.indexOf(target!.name);

    await adjustManualTurnDialog.decrease(index);
    await adjustManualTurnDialog.save(index);

    // BUG: `x.yz - 1` leaves float dust (1.02 - 1 = 0.020000000000000018), which
    // still formats as the saved value but fails the `!==` dirty check, so Save
    // and Reset stay enabled and a second Save would append a no-op ledger row.
    const after = (await adjustManualTurnDialog.readRows())[index];
    expect(after.pendingText).toBe(after.currentText.replace('Current: ', ''));
    expect(after.saveEnabled).toBe(true);
    expect(after.resetEnabled).toBe(true);

    // Undo the -1 that this case had to save.
    await adjustManualTurnDialog.increase(index);
    await adjustManualTurnDialog.save(index);
  });
});
