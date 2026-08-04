import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { OWNER_PASSCODE } from '@data/static/staff';

const ORDER_CONFIGS = [
  { serviceCount: 1 },
  { serviceCount: 1 },
  { serviceCount: 1 },
  { serviceCount: 1 },
  { serviceCount: 1 },
  { serviceCount: 2 },
  { serviceCount: 2 },
  { serviceCount: 2 },
  { serviceCount: 2 },
  { serviceCount: 2 },
];

test.describe(`Orders — bulk create 10 orders ${Tag.REGRESSION} ${Tag.SLOW}`, () => {
  for (let i = 0; i < ORDER_CONFIGS.length; i++) {
    const config = ORDER_CONFIGS[i];

    test(`Order ${i + 1}/10: ${config.serviceCount} service(s)`, async ({
      homePage,
      checkoutPage,
      passcodeDialog,
      paymentSuccessPage,
    }) => {
      await homePage.goto();

      await test.step('Select staff', async () => {
        await homePage.selectAnyStaff();
      });

      await test.step('Add services', async () => {
        for (let j = 0; j < config.serviceCount; j++) {
          await homePage.selectAnyService();
        }
      });

      await test.step('Go to checkout', async () => {
        await homePage.clickPay();
      });

      await test.step('Pay with cash', async () => {
        // Tip must be set on cashier side before Complete Payment — otherwise
        // the app waits on the (absent) customer-facing display.
        await checkoutPage.addTip('100');
        await checkoutPage.selectPaymentMethod('Cash');
        await checkoutPage.clickCompletePayment();
      });

      await test.step('Enter passcode', async () => {
        await passcodeDialog.enterPasscode(OWNER_PASSCODE);
      });

      await test.step('Verify success', async () => {
        await paymentSuccessPage.waitForSuccess();
        expect(await paymentSuccessPage.isSuccessful()).toBe(true);
      });

      await paymentSuccessPage.clickNoReceipt();
    });
  }
});
