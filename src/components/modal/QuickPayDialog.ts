import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

/**
 * "Quick Pay" dialog — opened from the Home service catalogue's first tile
 * ("Quick Pay"), one of the two special tiles (with "Gift Card") that don't
 * require an existing order/service to be picked first.
 *
 * Selector strategy: role/text captured via Playwright MCP scan on 2026-07-15
 * (`http://localhost:1420/home`, Amelia staff selected). Real dialog fields:
 *   - heading "Quick Pay"
 *   - textbox "Custom Amount" (placeholder `$0.00`)
 *   - textbox "Service Name"
 *   - textbox "Add note" with a "0/80" character counter
 *   - switch "Apply Discount"
 *   - button "Add" (disabled until required fields are filled)
 *
 * Per docs/linear/order-flow.md §"Service List": if no staff is selected yet,
 * clicking "Quick Pay" instead shows a "Select Staff First" popup with a
 * "Done" button — {@link expectSelectStaffFirst} asserts that path.
 */
export class QuickPayDialog extends BaseComponent {
  readonly heading: Locator;
  readonly customAmountInput: Locator;
  readonly serviceNameInput: Locator;
  readonly noteInput: Locator;
  readonly applyDiscountSwitch: Locator;
  readonly addButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    const dialog = page.getByRole('dialog').filter({ hasText: 'Quick Pay' });
    super(page, dialog);
    this.heading = dialog.getByRole('heading', { name: 'Quick Pay' });
    this.customAmountInput = dialog.getByRole('textbox', { name: 'Custom Amount' });
    this.serviceNameInput = dialog.getByRole('textbox', { name: 'Service Name' });
    this.noteInput = dialog.getByRole('textbox', { name: 'Add note' });
    this.applyDiscountSwitch = dialog.getByRole('switch');
    this.addButton = dialog.getByRole('button', { name: 'Add', exact: true });
    this.closeButton = dialog.getByRole('button', { name: 'Close' });
  }

  async waitForVisible(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 5_000 });
  }

  /** Opens by clicking the "Quick Pay" tile in the service catalogue. */
  static async open(page: Page): Promise<QuickPayDialog> {
    await page.getByRole('heading', { name: 'Quick Pay' }).click();
    const dialog = new QuickPayDialog(page);
    await dialog.waitForVisible().catch(() => undefined); // may show "Select Staff First" instead
    return dialog;
  }

  /** Assert the "Select Staff First" guard popup (no staff on the order yet). */
  async expectSelectStaffFirst(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Select Staff First' })).toBeVisible();
    await expect(
      this.page.getByText('Please select a staff before choosing services.'),
    ).toBeVisible();
  }

  async dismissSelectStaffFirst(): Promise<void> {
    await this.page.getByRole('button', { name: 'Done' }).click();
  }

  async fillAmount(amount: string): Promise<void> {
    await this.customAmountInput.fill(amount);
  }

  async fillServiceName(name: string): Promise<void> {
    await this.serviceNameInput.fill(name);
  }

  async fillNote(note: string): Promise<void> {
    await this.noteInput.fill(note);
  }

  async toggleApplyDiscount(): Promise<void> {
    await this.applyDiscountSwitch.click();
  }

  async isAddEnabled(): Promise<boolean> {
    return this.addButton.isEnabled();
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
