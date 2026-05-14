import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

export class PasscodeDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    const dialog = page.getByRole('dialog', { name: 'Enter your passcode' });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = page.getByRole('heading', { name: 'Enter your passcode' });
  }

  async waitForVisible(timeout = 5_000): Promise<void> {
    await expect(this.dialog).toBeVisible({ timeout });
  }

  async enterPasscode(code: string): Promise<void> {
    await this.waitForVisible();
    for (const digit of code) {
      await this.dialog.getByRole('button', { name: digit, exact: true }).click();
      await this.page.waitForTimeout(200);
    }
  }

  async close(): Promise<void> {
    const closeButton = this.dialog.getByRole('button').first();
    await closeButton.click();
  }
}
