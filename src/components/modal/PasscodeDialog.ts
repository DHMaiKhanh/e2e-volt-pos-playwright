import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

export class PasscodeDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    // Use a regex so trivial whitespace differences in the dialog title
    // don't make the locator miss.
    const dialog = page.getByRole('dialog', { name: /Enter your passcode/i });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = page.getByRole('heading', { name: /Enter your passcode/i });
  }

  async waitForVisible(timeout = 10_000): Promise<void> {
    await expect(this.dialog).toBeVisible({ timeout });
  }

  /**
   * Enter a passcode digit-by-digit.
   *
   * @param code         The passcode digits to type.
   * @param opts.expectDismiss Default `true` — assert the dialog closes after
   *                     the last digit. Pass `false` for TC-33 (intentionally
   *                     wrong passcode where the dialog must stay open).
   */
  async enterPasscode(code: string, opts: { expectDismiss?: boolean } = {}): Promise<void> {
    const expectDismiss = opts.expectDismiss ?? true;
    await this.waitForVisible();
    // Wait one extra frame so the keypad buttons inside Radix's portal are
    // interactive — the dialog can be visible a beat before its children
    // mount, especially on a cold load.
    await this.dialog
      .getByRole('button', { name: code[0], exact: true })
      .waitFor({ state: 'visible', timeout: 5_000 });

    for (const digit of code) {
      await this.dialog.getByRole('button', { name: digit, exact: true }).click();
      await this.page.waitForTimeout(150);
    }

    if (expectDismiss) {
      // A correct passcode dismisses the dialog; if it stays, downstream
      // waits would otherwise hang silently.
      await expect(this.dialog).toBeHidden({ timeout: 5_000 });
    }
  }

  /** Tick the "Do not require passcode for the next 30 minutes" checkbox. */
  async tickRemember30m(): Promise<void> {
    const checkbox = this.dialog.getByRole('checkbox', {
      name: /Do not require passcode for the next 30 minutes/i,
    });
    if (!(await checkbox.isChecked().catch(() => false))) {
      await checkbox.click();
    }
  }

  /** True if the passcode dialog is currently rendered and visible. */
  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  async close(): Promise<void> {
    const closeButton = this.dialog.getByRole('button').first();
    await closeButton.click();
  }
}
