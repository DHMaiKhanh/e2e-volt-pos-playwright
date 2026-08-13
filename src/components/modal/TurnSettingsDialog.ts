import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';
import { Timeouts } from '@configs/constants/timeouts';

/** The three fields of Turn Settings, as displayed. */
export interface TurnSettingsSnapshot {
  serviceBased: boolean;
  decimal: boolean;
  /** Masked display value, e.g. "$100.00". */
  turnValueText: string;
  /** {@link turnValueText} in integer cents — the unit the field is typed in. */
  turnValueCents: number;
}

/**
 * "Turn Settings" — opened from `button "Setting"` on the turn board.
 *
 * MERCHANT-WIDE state: it writes the single `sys_setting.merchant_turn_default`
 * row (`{turn_value, turn_service_based, turn_decimal}`, `turn_value` in CENTS),
 * so every device and every parallel worker sees the change. Specs that touch it
 * must be `@exclusive` and must restore the original values — see
 * {@link readSettings} / {@link applySettings}.
 *
 * The Turn value field is a CENT mask: typing `2500` yields `$25.00`, and any
 * non-digit is dropped. Saving closes the dialog and the board recomputes
 * immediately; ESC/Close discards unsaved edits.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md
 */
export class TurnSettingsDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;
  readonly serviceBasedSwitch: Locator;
  readonly decimalSwitch: Locator;
  readonly turnValueInput: Locator;
  readonly helperText: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;

  static readonly TURN_VALUE_LABEL = 'Turn value (minimum order amount counted as 1 turn)';
  static readonly SERVICE_BASED_LABEL = 'Calculate turns from services instead of orders';
  static readonly DECIMAL_LABEL = 'Calculate turn values with decimals instead of rounding';
  static readonly HELPER_TEXT =
    'The sales amount equal to one turn. Example: at $25, a $50 service counts as 2 turns.';

  constructor(page: Page) {
    const dialog = page.getByRole('dialog', { name: 'Turn Settings' });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = dialog.getByRole('heading', { name: 'Turn Settings' });
    this.serviceBasedSwitch = dialog.getByRole('switch', {
      name: TurnSettingsDialog.SERVICE_BASED_LABEL,
    });
    this.decimalSwitch = dialog.getByRole('switch', { name: TurnSettingsDialog.DECIMAL_LABEL });
    this.turnValueInput = dialog.getByRole('textbox', {
      name: TurnSettingsDialog.TURN_VALUE_LABEL,
    });
    this.helperText = dialog.getByText(TurnSettingsDialog.HELPER_TEXT);
    this.saveButton = dialog.getByRole('button', { name: 'Save', exact: true });
    this.closeButton = dialog.getByRole('button', { name: 'Close' });
  }

  async waitForVisible(timeout: number = Timeouts.SHORT): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout });
    await expect(this.turnValueInput).toBeVisible({ timeout });
  }

  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  async isServiceBased(): Promise<boolean> {
    return (await this.serviceBasedSwitch.getAttribute('aria-checked')) === 'true';
  }

  async isDecimal(): Promise<boolean> {
    return (await this.decimalSwitch.getAttribute('aria-checked')) === 'true';
  }

  async isDecimalEnabled(): Promise<boolean> {
    return this.decimalSwitch.isEnabled();
  }

  async isTurnValueEnabled(): Promise<boolean> {
    return this.turnValueInput.isEnabled();
  }

  /** Masked text of the Turn value field, e.g. "$100.00". */
  async turnValueText(): Promise<string> {
    return this.turnValueInput.inputValue();
  }

  /** Turn value in integer cents — how the field is typed and how it is stored. */
  async turnValueCents(): Promise<number> {
    const digits = (await this.turnValueText()).replace(/\D/g, '');
    return digits === '' ? 0 : Number(digits);
  }

  async setServiceBased(enabled: boolean): Promise<void> {
    if ((await this.isServiceBased()) !== enabled) {
      await this.serviceBasedSwitch.click();
      await expect(this.serviceBasedSwitch).toHaveAttribute('aria-checked', String(enabled));
    }
  }

  async setDecimal(enabled: boolean): Promise<void> {
    if ((await this.isDecimal()) !== enabled) {
      await this.decimalSwitch.click();
      await expect(this.decimalSwitch).toHaveAttribute('aria-checked', String(enabled));
    }
  }

  /**
   * Type into the Turn value field verbatim.
   *
   * The field is a CENT mask, so callers pass the raw keystrokes the case
   * describes (`'2500'` for $25.00, `'abc-99'` to prove filtering).
   */
  async fillTurnValue(raw: string): Promise<void> {
    await this.turnValueInput.fill(raw);
  }

  /** Set the Turn value from an amount in cents (2500 → types "2500"). */
  async setTurnValueCents(cents: number): Promise<void> {
    await this.fillTurnValue(String(cents));
  }

  async save(): Promise<void> {
    await this.saveButton.click();
    // Save closes the dialog; there is no success toast to wait on.
    await expect(this.dialog).toBeHidden({ timeout: Timeouts.MEDIUM });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.dialog).toBeHidden({ timeout: Timeouts.SHORT });
  }

  async readSettings(): Promise<TurnSettingsSnapshot> {
    return {
      serviceBased: await this.isServiceBased(),
      decimal: await this.isDecimal(),
      turnValueText: await this.turnValueText(),
      turnValueCents: await this.turnValueCents(),
    };
  }

  /**
   * Write a whole configuration and save.
   *
   * Order matters: the decimal switch is disabled while service-based is off, and
   * turning service-based off force-clears decimal — so service-based goes first.
   */
  async applySettings(settings: {
    serviceBased: boolean;
    decimal: boolean;
    turnValueCents: number;
  }): Promise<void> {
    await this.setServiceBased(settings.serviceBased);
    if (settings.serviceBased) await this.setDecimal(settings.decimal);
    await this.setTurnValueCents(settings.turnValueCents);
    await this.save();
  }
}
