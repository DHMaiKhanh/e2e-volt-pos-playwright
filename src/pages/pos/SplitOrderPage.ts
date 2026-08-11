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
  readonly cashDrawerButton: Locator;
  readonly tipButton: Locator;
  readonly howToSplitByItemButton: Locator;
  readonly receiptDetailsHeading: Locator;
  readonly showMoreButton: Locator;
  readonly showLessButton: Locator;
  readonly numpadDoneButton: Locator;
  readonly numpadBackspaceButton: Locator;
  readonly tipDialogHeading: Locator;
  readonly tipDialogAddButton: Locator;

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
    this.cashDrawerButton = page.getByRole('button', { name: /Cash ?Drawer/i });
    this.tipButton = page.getByRole('button', { name: 'Tip', exact: true });
    this.howToSplitByItemButton = page.getByRole('button', {
      name: 'How to Split Payment by Item?',
    });
    this.receiptDetailsHeading = page.getByRole('heading', { name: 'Receipt Details' });
    this.showMoreButton = page.getByRole('button', { name: 'Show more' });
    this.showLessButton = page.getByRole('button', { name: 'Show less' });
    this.numpadDoneButton = page.getByRole('button', { name: 'Done', exact: true });
    this.numpadBackspaceButton = page.getByRole('button', { name: /backspace/i });
    this.tipDialogHeading = page.getByText('Enter Amount', { exact: true });
    this.tipDialogAddButton = page.getByRole('button', { name: 'Add', exact: true });
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

  /** The "Delete #OD...-<n>" button inside a check card — only rendered when ≥3 checks exist. */
  checkDeleteButton(index: number): Locator {
    return this.page.getByRole('button', { name: new RegExp(`Delete #.*-${index}$`) });
  }

  /** The dollar amount text shown on a check card, e.g. "$606.90". */
  checkAmountText(index: number): Locator {
    return this.checkCard(index).getByText(/\$[\d,]+\.\d{2}/);
  }

  async addNewCheck(): Promise<void> {
    await this.addNewCheckButton.click();
  }

  /** Opens the By Amount numpad dialog by clicking a check's amount. */
  async openAmountEditor(index: number): Promise<void> {
    await this.checkAmountText(index).click();
  }

  /** Presses a numpad digit button ("1".."9", "0", "00") in the open amount dialog. */
  async pressNumpadDigit(digit: string): Promise<void> {
    await this.page.getByRole('button', { name: digit, exact: true }).click();
  }

  async pressNumpadBackspace(): Promise<void> {
    await this.numpadBackspaceButton.click();
  }

  async confirmNumpad(): Promise<void> {
    await this.numpadDoneButton.click();
  }

  /** By Items — checkbox for one item card, labelled "<name> $<price>". */
  itemCheckbox(nameAndPrice: string | RegExp): Locator {
    return this.page.getByRole('checkbox', { name: nameAndPrice });
  }

  async openHowToSplitByItemTooltip(): Promise<void> {
    await this.howToSplitByItemButton.click();
  }

  async toggleReceiptDetails(): Promise<void> {
    const showMoreVisible = await this.showMoreButton.isVisible().catch(() => false);
    if (showMoreVisible) {
      await this.showMoreButton.click();
    } else {
      await this.showLessButton.click();
    }
  }

  async openTipDialog(): Promise<void> {
    await this.tipButton.click();
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
