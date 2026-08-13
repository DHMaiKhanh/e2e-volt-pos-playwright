import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import type { TurnSettingsSnapshot } from '@components/modal/TurnSettingsDialog';
import {
  TURN_DAYS,
  REFERENCE_STAFF,
  REFERENCE_TURNS,
  findRow,
  missingDataMessage,
} from './turn.data';

/**
 * Turn (Turn Board) — Turn Settings, and the counting rules it switches between.
 *
 * `@exclusive`: these cases write `sys_setting.merchant_turn_default`, which is
 * MERCHANT-WIDE — every device and every parallel worker would see the change
 * mid-test. The file is listed in EXCLUSIVE_SPECS in playwright.config.ts so it
 * runs in the serial lane, and afterEach restores the config captured on the
 * first test (TC-TURN-55).
 *
 * Counting rules under test (source doc §4):
 *   service-based + decimals → Σ(service price) / turn value, 2 dp
 *   service-based, no decimals → COUNT of services priced >= turn value
 *   not service-based → count of successful orders
 *
 * Numbers are asserted on a past reference day so a concurrent order cannot move
 * them; each such assertion skips itself if the pinned staff has left the data.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md (TC-TURN-25…35, 55)
 */
test.describe(`Turn — settings ${Tag.REGRESSION} ${Tag.EXCLUSIVE}`, () => {
  /** Merchant config as found at the start of the file — restored after each test. */
  let original: TurnSettingsSnapshot | null = null;

  test.beforeEach(async ({ turnBoardPage, turnSettingsDialog }) => {
    await turnBoardPage.goto();
    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    original ??= await turnSettingsDialog.readSettings();
  });

  test.afterEach(async ({ turnBoardPage, turnSettingsDialog }) => {
    if (!original) return;
    // Navigate fresh: the test may have left any combination of dialogs open.
    await turnBoardPage.goto();
    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();

    const current = await turnSettingsDialog.readSettings();
    const unchanged =
      current.serviceBased === original.serviceBased &&
      current.decimal === original.decimal &&
      current.turnValueCents === original.turnValueCents;
    if (unchanged) {
      await turnSettingsDialog.close();
      return;
    }
    await turnSettingsDialog.applySettings({
      serviceBased: original.serviceBased,
      decimal: original.decimal,
      turnValueCents: original.turnValueCents,
    });
  });

  test('TC-TURN-25: Turn Settings opens showing the stored configuration', async ({
    turnSettingsDialog,
  }) => {
    await expect(turnSettingsDialog.serviceBasedSwitch).toBeVisible();
    await expect(turnSettingsDialog.decimalSwitch).toBeVisible();
    await expect(turnSettingsDialog.turnValueInput).toBeVisible();
    await expect(turnSettingsDialog.helperText).toBeVisible();
    await expect(turnSettingsDialog.saveButton).toBeEnabled();
    expect(await turnSettingsDialog.turnValueText()).toMatch(/^\$[\d,]+\.\d{2}$/);
  });

  test('TC-TURN-26: the Turn value field is a cent mask', async ({ turnSettingsDialog }) => {
    await turnSettingsDialog.fillTurnValue('25');
    expect(await turnSettingsDialog.turnValueText()).toBe('$0.25');

    await turnSettingsDialog.fillTurnValue('2500');
    expect(await turnSettingsDialog.turnValueText()).toBe('$25.00');
  });

  test('TC-TURN-27: the Turn value field drops letters and minus signs', async ({
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.fillTurnValue('abc-99');

    expect(await turnSettingsDialog.turnValueText()).toBe('$0.99');
  });

  test('TC-TURN-28: Escape discards unsaved Turn Settings edits', async ({
    page,
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    const before = await turnSettingsDialog.readSettings();

    await turnSettingsDialog.fillTurnValue('2500');
    await page.keyboard.press('Escape');
    await expect(turnSettingsDialog.dialog).toBeHidden();

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    expect(await turnSettingsDialog.turnValueText()).toBe(before.turnValueText);
    expect(await turnSettingsDialog.isServiceBased()).toBe(before.serviceBased);
    expect(await turnSettingsDialog.isDecimal()).toBe(before.decimal);
  });

  test('TC-TURN-29: saving a new Turn value recomputes the board immediately', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    // Ratio mode: turns = Σ(service price) / turn value.
    await turnSettingsDialog.applySettings({
      serviceBased: true,
      decimal: true,
      turnValueCents: original!.turnValueCents,
    });
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const before = await turnBoardPage.readRows();
    test.skip(
      before.filter((r) => r.turnCount > 0).length === 0,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no staff with turns`),
    );

    // Doubling the threshold must halve every count — no reload in between.
    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    await turnSettingsDialog.setTurnValueCents(original!.turnValueCents * 2);
    await turnSettingsDialog.save();

    const after = await turnBoardPage.readRows();
    expect(after).toHaveLength(before.length);
    for (const row of before) {
      const now = after.find((r) => r.name === row.name);
      expect(now, `row for ${row.name} disappeared after the settings change`).toBeDefined();
      // Both sides are rounded to 2 dp independently, so allow one cent of drift.
      expect(Math.abs(now!.turnCount - row.turnCount / 2)).toBeLessThanOrEqual(0.01);
    }
  });

  test('TC-TURN-30: decimals OFF counts services over the threshold, it does not round', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.applySettings({
      serviceBased: true,
      decimal: true,
      turnValueCents: 2500,
    });
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
    const decimals = await turnBoardPage.readRows();
    test.skip(
      decimals.length === 0,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no rows`),
    );

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    await turnSettingsDialog.setDecimal(false);
    await turnSettingsDialog.save();

    const integers = await turnBoardPage.readRows();
    for (const row of integers) expect(Number.isInteger(row.turnCount)).toBe(true);

    const high = findRow(integers, REFERENCE_STAFF.HIGH_TURN);
    const highDecimal = findRow(decimals, REFERENCE_STAFF.HIGH_TURN);
    const low = findRow(integers, REFERENCE_STAFF.LOW_TURN);
    test.skip(
      !high || !low,
      missingDataMessage(`${REFERENCE_STAFF.HIGH_TURN}/${REFERENCE_STAFF.LOW_TURN} are not listed`),
    );

    expect(highDecimal!.turnCount).toBe(REFERENCE_TURNS.HIGH_AT_25);
    // 7 services priced >= $25 — NOT round(16.96).
    expect(high!.turnCount).toBe(REFERENCE_TURNS.HIGH_AT_25_INTEGER);
    expect(high!.turnCount).not.toBe(Math.round(highDecimal!.turnCount));
    // Every one of this staff's services is under $25, so none of them counts.
    expect(low!.turnCount).toBe(REFERENCE_TURNS.LOW_AT_25_INTEGER);
  });

  test('TC-TURN-31: decimals OFF follows the threshold when it changes', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.applySettings({
      serviceBased: true,
      decimal: false,
      turnValueCents: 6000,
    });
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const rows = await turnBoardPage.readRows();
    const high = findRow(rows, REFERENCE_STAFF.HIGH_TURN);
    test.skip(!high, missingDataMessage(`${REFERENCE_STAFF.HIGH_TURN} is not listed`));

    // 3 services priced >= $60.
    expect(high!.turnCount).toBe(REFERENCE_TURNS.HIGH_AT_60_INTEGER);
  });

  test('TC-TURN-32: turning service-based OFF disables the decimals switch', async ({
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.setServiceBased(true);
    expect(await turnSettingsDialog.isDecimalEnabled()).toBe(true);

    await turnSettingsDialog.setServiceBased(false);

    expect(await turnSettingsDialog.isDecimalEnabled()).toBe(false);
    // The threshold field stays editable even though it no longer applies.
    expect(await turnSettingsDialog.isTurnValueEnabled()).toBe(true);
  });

  test('TC-TURN-33: service-based OFF counts one turn per successful order', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.applySettings({
      serviceBased: false,
      decimal: false,
      turnValueCents: original!.turnValueCents,
    });
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const rows = await turnBoardPage.readRows();
    const high = findRow(rows, REFERENCE_STAFF.HIGH_TURN);
    const low = findRow(rows, REFERENCE_STAFF.LOW_TURN);
    test.skip(
      !high || !low,
      missingDataMessage(`${REFERENCE_STAFF.HIGH_TURN}/${REFERENCE_STAFF.LOW_TURN} are not listed`),
    );

    // Order counts, not sales: canceled and pending orders never count.
    expect(high!.turnCount).toBe(REFERENCE_TURNS.HIGH_ORDER_COUNT);
    expect(low!.turnCount).toBe(REFERENCE_TURNS.LOW_ORDER_COUNT);
  });

  test('TC-TURN-34: only successful orders feed the turn count', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    await turnSettingsDialog.applySettings({
      serviceBased: true,
      decimal: true,
      turnValueCents: 10000,
    });
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);

    const rows = await turnBoardPage.readRows();
    const high = findRow(rows, REFERENCE_STAFF.HIGH_TURN);
    test.skip(!high, missingDataMessage(`${REFERENCE_STAFF.HIGH_TURN} is not listed`));

    // $424.00 of SUCCESSFUL service sales / $100.00. The same day also holds a
    // $246.48 canceled order and two pending ones for this staff — counting any
    // of them would push this well above 4.24.
    expect(high!.turnCount).toBe(REFERENCE_TURNS.HIGH_AT_100);
  });

  test('TC-TURN-35: 🐞 an empty Turn value saves as 0 with no validation', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    // beforeEach leaves Turn Settings open on top of the board — close it so the
    // board's own toolbar is reachable again.
    await turnSettingsDialog.close();
    await turnBoardPage.pickDate(TURN_DAYS.WITH_DATA);
    const before = await turnBoardPage.readRows();
    test.skip(
      before.filter((r) => r.turnCount > 0).length === 0,
      missingDataMessage(`${TURN_DAYS.WITH_DATA.label} has no staff with turns`),
    );

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    await turnSettingsDialog.fillTurnValue('');
    await turnSettingsDialog.save();

    // BUG: Save is accepted, the dialog just closes and turn_value becomes 0.
    // Expected behaviour would be a blocked Save with a "required / > 0" error.
    await expect(turnSettingsDialog.dialog).toBeHidden();
    const after = await turnBoardPage.readRows();
    expect(after.every((r) => r.turnCount === 0)).toBe(true);

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    expect(await turnSettingsDialog.turnValueCents()).toBe(0);
  });

  test('TC-TURN-55: the merchant-wide config can be restored exactly', async ({
    turnBoardPage,
    turnSettingsDialog,
  }) => {
    const saved = await turnSettingsDialog.readSettings();

    await turnSettingsDialog.applySettings({
      serviceBased: true,
      decimal: false,
      turnValueCents: 3300,
    });
    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    expect(await turnSettingsDialog.turnValueCents()).toBe(3300);

    await turnSettingsDialog.applySettings({
      serviceBased: saved.serviceBased,
      decimal: saved.decimal,
      turnValueCents: saved.turnValueCents,
    });

    await turnBoardPage.settingButton.click();
    await turnSettingsDialog.waitForVisible();
    expect(await turnSettingsDialog.readSettings()).toMatchObject({
      serviceBased: saved.serviceBased,
      decimal: saved.decimal,
      turnValueCents: saved.turnValueCents,
    });
  });
});
