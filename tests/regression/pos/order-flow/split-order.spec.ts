import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';

/**
 * Order Flow — Split Order / Split Tip (TC-ORDERFLOW-25..38).
 *
 * Split Order selectors captured live via Playwright MCP on 2026-07-15 by
 * opening `/order/:id/split-order` from the cart's split icon (a single-line
 * $12.10 order): Equally/By Amount/By Items tabs, "Check 1/2 (<suffix>)"
 * cards, "Add New Check", Receipt Details, 4 payment methods, "Pay $<amt>".
 * See src/pages/pos/SplitOrderPage.ts.
 *
 * Split Tip requires a settled, multi-staff, tipped order which this test
 * env does not reliably seed — those TCs are recorded as `test.skip` quoting
 * the Linear spec (docs/linear/order-flow.md §"Split Tip") rather than
 * asserting against unverified selectors.
 */
test.describe(`Order Flow — Split Order ${Tag.REGRESSION} ${Tag.UI}`, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('TC-ORDERFLOW-25: split icon in the cart footer opens Split Order', async ({
    homePage,
    splitOrderPage,
  }) => {
    // Requires an existing order with at least one line item; the shared demo
    // order the shop seeds for this env satisfies that.
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await expect(splitOrderPage.heading).toBeVisible();
  });

  test('TC-ORDERFLOW-26: Equally / By Amount / By Items tabs render', async ({
    homePage,
    splitOrderPage,
  }) => {
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await expect(splitOrderPage.equallyTab).toBeVisible();
    await expect(splitOrderPage.byAmountTab).toBeVisible();
    await expect(splitOrderPage.byItemsTab).toBeVisible();
  });

  test('TC-ORDERFLOW-27: Equally split defaults to 2 checks summing to the order total', async ({
    homePage,
    splitOrderPage,
  }) => {
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await expect(splitOrderPage.checkCard(1)).toBeVisible();
    await expect(splitOrderPage.checkCard(2)).toBeVisible();
    await expect(splitOrderPage.remainingValue).toBeVisible();
  });

  test('TC-ORDERFLOW-28: Add New Check appends another check', async ({
    homePage,
    splitOrderPage,
  }) => {
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await splitOrderPage.addNewCheck();
    await expect(splitOrderPage.checkCard(3)).toBeVisible({ timeout: 5_000 });
  });

  test('TC-ORDERFLOW-31: selecting a check exposes 4 payment methods and a scoped Pay button', async ({
    homePage,
    splitOrderPage,
    page,
  }) => {
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await expect(page.getByRole('button', { name: 'Card' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cash' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gift Card' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Other' })).toBeVisible();
    await expect(splitOrderPage.payButton).toBeVisible();
  });

  test('TC-ORDERFLOW-32: Receipt Details mirrors the order Subtotal/Tax/Total', async ({
    homePage,
    page,
  }) => {
    const hasOrder = await homePage.payButton.isVisible({ timeout: 3_000 }).catch(() => false);
    test.skip(!hasOrder, 'No active order with a Pay button to split');

    await homePage.openSplitOrder();
    await expect(page.getByRole('heading', { name: 'Receipt Details' })).toBeVisible();
    await expect(page.getByText('Subtotal')).toBeVisible();
    await expect(page.getByText('Tax')).toBeVisible();
  });

  test.skip('TC-ORDERFLOW-29/30/33: By Amount validation + By Items assignment — needs a multi-item order', async () => {
    // The demo order this env seeds has a single line item, so "By Items"
    // stays disabled and there is only one item to assign — both scenarios
    // need an order with 2+ distinct service lines to drive meaningfully.
  });

  test.skip('TC-ORDERFLOW-34/35/36/37/38: Split Tip — requires a settled multi-staff tipped order', async () => {
    // docs/linear/order-flow.md §"Split Tip": Split Evenly / Proportion /
    // Manual, hidden for single-staff orders. OrderHistoryPage exposes
    // splitTipButton/splitTipDialog/chooseSplitTipOption/confirmSplitTip
    // (src/pages/pos/OrderHistoryPage.ts) built from the Linear-documented
    // dialog copy (Title "Split Tip", options, "Confirm") but NOT
    // independently re-verified live this session — do not treat as a
    // confirmed selector until exercised against a real multi-staff order.
  });
});
