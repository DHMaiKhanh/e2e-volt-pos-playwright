import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';

test.describe(`Orders — delete order ${Tag.REGRESSION}`, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('deletes an order before payment', async ({ homePage, page }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();

    await expect(page.getByText(/#OD\d{6}/).first()).toBeVisible();

    await homePage.deleteOrder();

    const confirmButton = page.getByRole('button', { name: /confirm|yes|ok|delete/i });
    if (await confirmButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await confirmButton.click();
    }

    await page.waitForTimeout(1000);

    await expect(page.getByText(/#OD\d{6}/)).toBeHidden();
    await expect(homePage.payButton)
      .toBeDisabled()
      .catch(() => expect(homePage.payButton).toBeHidden());
  });
});
