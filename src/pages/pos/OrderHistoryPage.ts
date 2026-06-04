import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

/**
 * Order History (`/order-history`) — list + detail view.
 *
 * Selector strategy: visible role/text because Volt POS source uses
 * shadcn primitives without explicit `data-testid` on these flows. Each
 * action method is matched to a known button label from the volt-pos
 * source (`order-history-detail-actions.tsx`).
 *
 * NOTE: this is the minimum surface needed to drive refund/cancel from
 * Cluster D. Extend with filters/search when those scenarios show up.
 */
export class OrderHistoryPage extends BasePage {
  protected readonly path = '/order-history';

  readonly searchInput: Locator;
  readonly refundButton: Locator;
  readonly cancelButton: Locator;
  readonly confirmDialog: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder(/search/i);
    this.refundButton = page.getByRole('button', { name: 'Refund', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.confirmDialog = page.getByRole('dialog');
  }

  async waitForReady(): Promise<void> {
    // The header is always present; wait for it before doing anything.
    await expect(this.page.getByRole('heading', { name: /Order History/i })).toBeVisible();
  }

  /**
   * Open an order's detail page by clicking the row whose accessible text
   * contains the orderCode. The route at `$orderId.tsx` reads the id from
   * the URL — we verify the URL too.
   */
  async openOrder(orderCode: string): Promise<void> {
    const row = this.page.getByRole('listitem').filter({ hasText: orderCode }).first();
    await row.click();
    await expect(this.page).toHaveURL(new RegExp(`/order-history/[^?]+`));
    // Detail page renders a "Receipt" button — wait for it as the readiness
    // signal so the action buttons are mounted.
    await expect(this.page.getByRole('button', { name: 'Receipt' })).toBeVisible();
  }

  /**
   * Cancel an unsettled order. Caller is responsible for being on the order
   * detail page already. The button is gated by order state — if the order
   * has been settled, `canCancel()` returns false and you should skip the test.
   */
  async canCancel(): Promise<boolean> {
    return this.cancelButton.isVisible().catch(() => false);
  }

  async cancelOrder(opts: { reason?: string } = {}): Promise<void> {
    await this.cancelButton.click();
    await expect(this.confirmDialog).toBeVisible();
    if (opts.reason) {
      const reasonField = this.confirmDialog.getByRole('textbox');
      await reasonField.fill(opts.reason);
    }
    // shadcn ConfirmDialog uses a "Confirm" action button — fall back to
    // "Cancel Order" / "Yes" if the wording differs.
    const confirm = this.confirmDialog.getByRole('button', {
      name: /Confirm|Cancel Order|Yes/i,
    });
    await confirm.click();
    await expect(this.confirmDialog).toBeHidden();
  }

  /**
   * Issue a full refund on a settled order. Partial-refund variant takes a
   * service list — extend when needed.
   */
  async canRefund(): Promise<boolean> {
    return this.refundButton.isVisible().catch(() => false);
  }

  async refundOrder(opts: { reason?: string } = {}): Promise<void> {
    await this.refundButton.click();
    await expect(this.confirmDialog).toBeVisible();
    if (opts.reason) {
      const reasonField = this.confirmDialog.getByRole('textbox');
      await reasonField.fill(opts.reason);
    }
    const confirm = this.confirmDialog.getByRole('button', {
      name: /Confirm|Refund|Yes/i,
    });
    await confirm.click();
    await expect(this.confirmDialog).toBeHidden();
  }
}
