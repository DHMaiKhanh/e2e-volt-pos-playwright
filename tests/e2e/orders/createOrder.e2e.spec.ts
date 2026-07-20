import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { OWNER_PASSCODE } from '@data/static/staff';

test.describe(`Orders — create order ${Tag.REGRESSION} ${Tag.PAYMENT}`, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('creates an order with cash payment and completes it', async ({
    homePage,
    checkoutPage,
    passcodeDialog,
    paymentSuccessPage,
  }) => {
    let staffName = '';
    let firstServiceName = '';
    let secondServiceName = '';

    await test.step('Select staff member', async () => {
      staffName = await homePage.selectAnyStaff();
    });

    await test.step('Add services', async () => {
      firstServiceName = await homePage.selectAnyService();
      secondServiceName = await homePage.selectAnyService();
    });

    await test.step('Navigate to checkout', async () => {
      await homePage.clickPay();
    });

    await test.step('Verify order details on checkout', async () => {
      await checkoutPage.waitForReady();
      await checkoutPage.verifyOrderDetails({
        staffName,
        services: [{ name: firstServiceName }, { name: secondServiceName }],
      });
    });

    await test.step('Pay with cash and complete', async () => {
      // Tip must be set on cashier side before Complete Payment — otherwise
      // the app waits on the (absent) customer-facing display. $1.00 here.
      await checkoutPage.addTip('100');
      await checkoutPage.selectPaymentMethod('Cash');
      expect(await checkoutPage.isCompletePaymentEnabled()).toBe(true);
      await checkoutPage.clickCompletePayment();
    });

    await test.step('Enter passcode and verify success', async () => {
      await passcodeDialog.enterPasscode(OWNER_PASSCODE);
      await paymentSuccessPage.waitForSuccess();
      expect(await paymentSuccessPage.isSuccessful()).toBe(true);
      await paymentSuccessPage.verifyPaymentMethod('Cash');
    });

    await paymentSuccessPage.clickNoReceipt();
  });

  test('does not allow pay without selecting a service', async ({ homePage }) => {
    await homePage.selectAnyStaff();
    await expect(homePage.payButton).toBeDisabled();
  });

  test('creates an order with multiple services', async ({
    homePage,
    checkoutPage,
    passcodeDialog,
    paymentSuccessPage,
  }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();
    await homePage.selectAnyService();

    await homePage.clickPay();

    await checkoutPage.addTip('100');
    await checkoutPage.selectPaymentMethod('Cash');
    await checkoutPage.clickCompletePayment();

    await passcodeDialog.enterPasscode(OWNER_PASSCODE);

    await paymentSuccessPage.waitForSuccess();
    expect(await paymentSuccessPage.isSuccessful()).toBe(true);

    await paymentSuccessPage.clickNoReceipt();
  });

  test('creates order with single service and pays with cash', async ({
    homePage,
    checkoutPage,
    passcodeDialog,
    paymentSuccessPage,
  }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();

    await homePage.clickPay();

    await checkoutPage.addTip('100');
    await checkoutPage.selectPaymentMethod('Cash');
    await checkoutPage.clickCompletePayment();

    await passcodeDialog.enterPasscode(OWNER_PASSCODE);

    await paymentSuccessPage.waitForSuccess();
    expect(await paymentSuccessPage.isSuccessful()).toBe(true);

    await paymentSuccessPage.clickNoReceipt();
  });
});
