import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { claimStaff, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — today's roster follows Time Keeping.
 *
 * On the CURRENT day the board lists only staff with an OPEN shift, so checking
 * a staff in puts them on the board and checking them out takes them off again.
 *
 * These two cases are the only ones in the Turn suite that write clock-in
 * records. They stay parallel-safe by driving THIS worker's own staff (claimed
 * from the live roster by worker slot, the same rule HomePage uses), and they
 * always clock that staff back out afterwards.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-10, 11)
 */

test.describe(`Turn — check-in / check-out ${Tag.REGRESSION}`, () => {
  let staffName = '';

  test.beforeEach(async ({ timeKeepingDialog, workerIndex }) => {
    await timeKeepingDialog.goto();
    staffName = await claimStaff(timeKeepingDialog, workerIndex);
    test.skip(staffName === '', missingDataMessage('Time Keeping shows no staff to clock in'));
    await timeKeepingDialog.search(staffName);
  });

  test.afterEach(async ({ timeKeepingDialog }) => {
    if (!staffName) return;
    // Never leave a shift open for the next spec / the next run.
    await timeKeepingDialog.goto();
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkOut(staffName);
  });

  test("TC-TURN-10: checking a staff in puts them on today's board", async ({
    timeKeepingDialog,
    turnBoardPage,
  }) => {
    await timeKeepingDialog.checkOut(staffName);
    await timeKeepingDialog.close();

    await turnBoardPage.goto();
    const before = await turnBoardPage.readRows();
    expect(before.map((r) => r.name)).not.toContain(staffName);
    await turnBoardPage.close();

    await timeKeepingDialog.goto();
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkIn(staffName);
    await timeKeepingDialog.close();

    await turnBoardPage.goto();
    const after = await turnBoardPage.readRows();
    expect(after.map((r) => r.name)).toContain(staffName);
    expect(after).toHaveLength(before.length + 1);
    await expect(turnBoardPage.emptyState).toBeHidden();
  });

  test('TC-TURN-11: checking them out again takes them off the board', async ({
    timeKeepingDialog,
    turnBoardPage,
  }) => {
    await timeKeepingDialog.checkIn(staffName);
    await timeKeepingDialog.close();

    await turnBoardPage.goto();
    expect(await turnBoardPage.staffNames()).toContain(staffName);
    await turnBoardPage.close();

    await timeKeepingDialog.goto();
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkOut(staffName);
    await timeKeepingDialog.close();

    await turnBoardPage.goto();
    const rows = await turnBoardPage.readRows();
    expect(rows.map((r) => r.name)).not.toContain(staffName);
    // Only assert the empty state when this staff was the last one on shift —
    // another worker's staff may still be clocked in.
    if (rows.length === 0) await expect(turnBoardPage.emptyState).toBeVisible();
  });
});
