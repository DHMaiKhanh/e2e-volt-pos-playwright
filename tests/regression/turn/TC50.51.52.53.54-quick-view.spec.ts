import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { Urls } from '@constants/urls';
import { claimStaff, missingDataMessage } from './turn.data';

/**
 * Turn (Turn Board) — the floating "TURN" quick-view handle.
 *
 * It lives only on the three operational routes, only while somebody is clocked
 * in today, and its popover is a read-only mirror of today's board plus a
 * "View Turn" button that opens the full dialog. Its edge position is dragged
 * and persisted in `localStorage.turn_quick_view_position`.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-50…54)
 */
test.describe(`Turn — quick view ${Tag.REGRESSION}`, () => {
  let staffName = '';

  test.beforeEach(async ({ timeKeepingDialog, workerIndex }) => {
    // The handle only renders while at least one staff is on shift today.
    await timeKeepingDialog.goto();
    staffName = await claimStaff(timeKeepingDialog, workerIndex);
    test.skip(staffName === '', missingDataMessage('Time Keeping shows no staff to clock in'));
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkIn(staffName);
    await timeKeepingDialog.close();
  });

  test.afterEach(async ({ timeKeepingDialog }) => {
    if (!staffName) return;
    await timeKeepingDialog.goto();
    await timeKeepingDialog.search(staffName);
    await timeKeepingDialog.checkOut(staffName);
  });

  test('TC-TURN-50: the handle appears on the three operational routes only', async ({
    page,
    turnBoardPage,
  }) => {
    for (const route of [Urls.HOME, Urls.ORDER_PENDING, Urls.ORDER_HISTORY]) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(turnBoardPage.quickViewTab, `expected the handle on ${route}`).toBeVisible();
    }

    await page.goto('/time-tracking', { waitUntil: 'domcontentloaded' });
    await expect(turnBoardPage.quickViewTab).toHaveCount(0);
  });

  test("TC-TURN-52: the popover mirrors today's board", async ({ page, turnBoardPage }) => {
    await page.goto(Urls.HOME, { waitUntil: 'domcontentloaded' });

    await turnBoardPage.openQuickView();

    await expect(turnBoardPage.quickViewTab).toHaveAttribute('aria-expanded', 'true');
    const quickRows = await turnBoardPage.readQuickViewRows();
    expect(quickRows.length).toBeGreaterThan(0);
    expect(quickRows.map((r) => r.rank)).toEqual(quickRows.map((_, i) => i + 1));

    await turnBoardPage.clickViewTurn();
    const boardRows = await turnBoardPage.readRows();
    expect(quickRows.map((r) => r.name)).toEqual(boardRows.map((r) => r.name));
    expect(quickRows.map((r) => r.turnText)).toEqual(boardRows.map((r) => r.turnText));
  });

  test('TC-TURN-53: "View Turn" opens the full board and collapses the handle', async ({
    page,
    turnBoardPage,
  }) => {
    await page.goto(Urls.HOME, { waitUntil: 'domcontentloaded' });
    await turnBoardPage.openQuickView();

    await turnBoardPage.clickViewTurn();

    await expect(page).toHaveURL(/\?dialog=turn-board/);
    await expect(turnBoardPage.heading).toBeVisible();
    await expect(turnBoardPage.quickViewPopover).toBeHidden();
    // The open board hides the page behind it from the a11y tree, so the handle
    // is asserted through its markup rather than its role.
    await expect(turnBoardPage.quickViewTabElement).toHaveAttribute('aria-expanded', 'false');
  });

  test('TC-TURN-54: dragging the handle snaps it to an edge and persists the position', async ({
    page,
    turnBoardPage,
  }) => {
    await page.goto(Urls.HOME, { waitUntil: 'domcontentloaded' });
    await expect(turnBoardPage.quickViewTab).toBeVisible();
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();

    await turnBoardPage.dragQuickViewTab({ x: viewport!.width - 30, y: 300 });

    const stored = await turnBoardPage.quickViewPosition();
    expect(stored?.side).toBe('right');
    expect(stored?.topPct).toBeGreaterThanOrEqual(10);
    expect(stored?.topPct).toBeLessThanOrEqual(90);

    // Survives client-side navigation to another quick-view route.
    await page.goto(Urls.ORDER_PENDING, { waitUntil: 'domcontentloaded' });
    await expect(turnBoardPage.quickViewTab).toBeVisible();
    const box = await turnBoardPage.quickViewTab.boundingBox();
    expect(box!.x).toBeGreaterThan(viewport!.width / 2);
    expect(await turnBoardPage.quickViewPosition()).toEqual(stored);
  });
});

/**
 * TC-TURN-51 needs the opposite precondition to the block above — nobody on
 * shift — so it neither seeds nor cleans up, and skips when the shop is busy.
 */
test.describe(`Turn — quick view hidden ${Tag.REGRESSION}`, () => {
  test('TC-TURN-51: the handle is absent while nobody is clocked in today', async ({
    page,
    turnBoardPage,
  }) => {
    await turnBoardPage.goto();
    const rows = await turnBoardPage.readRows();
    test.skip(
      rows.length > 0,
      `${rows.length} staff are clocked in right now — this case needs an idle shop`,
    );
    await turnBoardPage.close();

    await page.goto(Urls.HOME, { waitUntil: 'domcontentloaded' });

    await expect(turnBoardPage.quickViewTab).toHaveCount(0);
  });
});
