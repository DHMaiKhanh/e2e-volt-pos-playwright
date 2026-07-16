import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export type SplitMethod = 'Equally' | 'By Amount' | 'By Items';
export type SplitPaymentMethod = 'Card' | 'Cash' | 'Gift Card' | 'Other';

/**
 * Split Order screen (`/order/:id/split-order`) — reached from the Cart's
 * split icon button (next to Print, before Pay).
 *
 * Selector strategy: role/text captured via Playwright MCP scan on
 * 2026-07-15 against a single-service order (Amelia · Nail Spa, $12.10):
 *   - Method tabs: buttons "Equally" / "By Amount" / "By Items" ("By Items"
 *     is disabled for a single-line-item order per docs/linear/split-order.md)
 *   - Default "Equally" split with N=2 auto-creates 2 checks, each shown as
 *     "Check 1 (66812-1)" / "Check 2 (66812-2)" with its own amount
 *   - "Add New Check" button appends another check
 *   - Summary: "Total Paid" / "Remaining"
 *   - Right panel: "Receipt Details", "Choose payment method" with the same
 *     4 methods as full Checkout (Card/Cash/Gift Card/Other), "Print" and a
 *     "Pay $<amount>" button scoped to the selected check
 */
export class SplitOrderPage extends BasePage {
  protected readonly path = '/split-order';

  readonly backButton: Locator;
  readonly heading: Locator;
  readonly equallyTab: Locator;
  readonly byAmountTab: Locator;
  readonly byItemsTab: Locator;
  readonly addNewCheckButton: Locator;
  readonly totalPaidValue: Locator;
  readonly remainingValue: Locator;
  readonly printButton: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.getByRole('button', { name: 'Back to order' });
    this.heading = page.getByText('Split Order', { exact: true });
    this.equallyTab = page.getByRole('button', { name: 'Equally', exact: true });
    this.byAmountTab = page.getByRole('button', { name: 'By Amount', exact: true });
    this.byItemsTab = page.getByRole('button', { name: 'By Items', exact: true });
    this.addNewCheckButton = page.getByRole('button', { name: 'Add New Check' });
    this.totalPaidValue = page.getByText('Total Paid').locator('..');
    this.remainingValue = page.getByText('Remaining').locator('..');
    this.printButton = page.getByRole('button', { name: 'Print', exact: true });
    this.payButton = page.getByRole('button', { name: /^Pay \$/ });
  }

  async waitForReady(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 10_000 });
  }

  async selectMethod(method: SplitMethod): Promise<void> {
    const tab =
      method === 'Equally'
        ? this.equallyTab
        : method === 'By Amount'
          ? this.byAmountTab
          : this.byItemsTab;
    await tab.click();
  }

  async isMethodEnabled(method: SplitMethod): Promise<boolean> {
    const tab =
      method === 'Equally'
        ? this.equallyTab
        : method === 'By Amount'
          ? this.byAmountTab
          : this.byItemsTab;
    return tab.isEnabled();
  }

  /** Check card by its 1-based index, e.g. "Check 1 (66812-1)". */
  checkCard(index: number): Locator {
    return this.page.getByText(new RegExp(`^Check ${index}$`)).locator('../..');
  }

  /** The "Select #OD...-<n>" toggle button inside a check card. */
  checkSelectButton(index: number): Locator {
    return this.page.getByRole('button', { name: new RegExp(`Select #.*-${index}$`) });
  }

  async addNewCheck(): Promise<void> {
    await this.addNewCheckButton.click();
  }

  async selectPaymentMethod(method: SplitPaymentMethod): Promise<void> {
    await this.page.getByRole('button', { name: new RegExp(`^${method}`) }).click();
  }

  async clickPay(): Promise<void> {
    await this.payButton.click();
  }

  async goBackToOrder(): Promise<void> {
    await this.backButton.click();
  }
}
