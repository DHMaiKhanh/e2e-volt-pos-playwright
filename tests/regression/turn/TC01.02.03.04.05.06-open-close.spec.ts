import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { TurnBoardPage, TURN_SORT } from '@pages/pos/TurnBoardPage';
import { PasscodeDialog } from '@components/modal/PasscodeDialog';
import { todayLabel } from './turn.data';

/**
 * Turn (Turn Board) — opening and closing the dialog.
 *
 * Turn is NOT a route: it is a dialog the `_app` layout mounts, opened by the
 * `?dialog=turn-board` search param on whatever route is current. The sidebar
 * entry sets that param client-side rather than navigating.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-01…06)
 */
const PASSCODE = process.env.OWNER_PASSCODE || '8888';

test.describe(`Turn — open & close ${Tag.REGRESSION}`, () => {
  test('TC-TURN-01: opening Turn from the sidebar sets ?dialog=turn-board', async ({
    page,
    turnBoardPage,
  }) => {
    await turnBoardPage.gotoRoute();

    await turnBoardPage.openFromSidebar();

    await expect(page.getByRole('dialog', { name: 'Sidebar' })).toBeHidden();
    await expect(page).toHaveURL(/\/home\?dialog=turn-board/);
    await expect(turnBoardPage.heading).toBeVisible();
  });

  test('TC-TURN-02: the deep link opens the board with no passcode gate', async ({
    turnBoardPage,
    passcodeDialog,
  }) => {
    await turnBoardPage.goto();

    expect(await passcodeDialog.isOpen()).toBe(false);
    await expect(turnBoardPage.heading).toBeVisible();
    await expect(turnBoardPage.dateButton).toBeVisible();
    await expect(turnBoardPage.sortSelect).toBeVisible();
    await expect(turnBoardPage.adjustTurnButton).toBeVisible();
    await expect(turnBoardPage.settingButton).toBeVisible();
  });

  test('TC-TURN-03: defaults to today and "Fewest turns first"', async ({
    page,
    turnBoardPage,
  }) => {
    await turnBoardPage.goto();

    expect(await turnBoardPage.dateButtonText()).toContain(await todayLabel(page));
    expect(await turnBoardPage.currentSortLabel()).toBe(TURN_SORT.FEWEST);
  });

  test('TC-TURN-04: Close drops the search param', async ({ page, turnBoardPage }) => {
    await turnBoardPage.goto();

    await turnBoardPage.close();

    await expect(page).toHaveURL(/\/home$/);
    await expect(turnBoardPage.dialog).toBeHidden();
  });

  test('TC-TURN-05: Escape closes one dialog layer at a time', async ({
    page,
    turnBoardPage,
    adjustManualTurnDialog,
  }) => {
    await turnBoardPage.goto();
    await turnBoardPage.adjustTurnButton.click();
    await adjustManualTurnDialog.waitForVisible();

    await page.keyboard.press('Escape');

    await expect(adjustManualTurnDialog.dialog).toBeHidden();
    await expect(turnBoardPage.dialog).toBeVisible();
    await expect(page).toHaveURL(/\?dialog=turn-board/);

    await page.keyboard.press('Escape');

    await expect(turnBoardPage.dialog).toBeHidden();
    await expect(page).toHaveURL(/\/home$/);
  });

  test('TC-TURN-06: on a gated route the passcode gate comes first, then the board', async ({
    page,
  }) => {
    const passcodeDialog = new PasscodeDialog(page);
    // The suite caches a 30-minute passcode grant; this case is ABOUT the gate,
    // so drop the inherited grant before the first navigation.
    await passcodeDialog.armGate();

    const gatedTurnBoard = new TurnBoardPage(page, '/time-tracking');
    // Deliberately NOT gatedTurnBoard.goto(): the board renders behind the gate,
    // so readiness is asserted here instead of waited on.
    await page.goto(gatedTurnBoard.deepLink, { waitUntil: 'domcontentloaded' });

    await passcodeDialog.waitForVisible();
    await expect(passcodeDialog.dialog).toBeVisible();

    // DEVIATION from the source doc, verified 2026-08-13: the doc saw the board
    // rendered behind the gate (it had navigated client-side). On a COLD
    // deep-link this build renders the gate alone — the app shell behind it does
    // not mount at all, so the board is not merely blocked, it is absent.
    await expect(gatedTurnBoard.dialog).toHaveCount(0);

    // The search param survives the gate: unlocking opens the board on the
    // now-rendered route.
    await passcodeDialog.enterPasscode(PASSCODE, { required: true });

    await expect(gatedTurnBoard.heading).toBeVisible();
    await expect(page).toHaveURL(/\/time-tracking\?dialog=turn-board/);
  });
});
