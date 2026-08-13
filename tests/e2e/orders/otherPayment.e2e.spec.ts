import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { OWNER_PASSCODE } from '@data/static/staff';
import { OTHER_PAYMENT_LABELS } from '@data/static/paymentMethods';

test.describe(`Orders — Other payment method ${Tag.REGRESSION} ${Tag.PAYMENT}`, () => {
  /**
   * Each test builds and pays for its OWN order and asserts only on that order —
   * never on shop-wide totals — so concurrency is safe here. Per-worker staff
   * isolation (src/fixtures/workerStaff.fixture.ts) puts each worker's order on a
   * different staff member, which is what keeps the active-order race away.
   *
   * Needed because `fullyParallel: false` pins a whole file to ONE worker: this
   * file was 200.9s of serial work and was the critical path of its CI shard.
   */
  test.describe.configure({ mode: 'parallel' });

  /**
   * Build-order → pay → verify-success is genuinely long: 24-31s each once six
   * of them run concurrently. They opt out of the fast lane's tight 30s budget
   * here rather than the config raising it for all 259 tests — a global bump
   * measured at ~34s of wall clock, because failing tests would burn it too.
   */
  test.slow();

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  OTHER_PAYMENT_LABELS.forEach(({ label, methodName }) => {
    test(`pays with Other (${label})`, async ({
      homePage,
      otherPaymentPage,
      passcodeDialog,
      paymentSuccessPage,
    }) => {
      await test.step('Build order: staff + single service', async () => {
        await homePage.selectAnyStaff();
        await homePage.selectAnyService();
        await homePage.clickPay();
      });

      await test.step(`Pay with Other tagged "${methodName}"`, async () => {
        // Tip must be set on cashier side before Complete Payment — otherwise
        // the app waits on the (absent) customer-facing display.
        await otherPaymentPage.addTip('100');
        await otherPaymentPage.payWithOther(methodName);
        await passcodeDialog.enterPasscode(OWNER_PASSCODE);
      });

      await test.step('Verify payment success carries the custom label', async () => {
        await paymentSuccessPage.waitForSuccess();
        expect(await paymentSuccessPage.isSuccessful()).toBe(true);
        await paymentSuccessPage.verifyPaymentMethod('Other');
        await paymentSuccessPage.verifyPaymentMethod(methodName);
      });

      await paymentSuccessPage.clickNoReceipt();
    });
  });

  test('Other payment input becomes visible only after selecting Other', async ({
    homePage,
    otherPaymentPage,
  }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();
    await homePage.clickPay();

    await expect(otherPaymentPage.methodNameInput).toBeHidden();
    await otherPaymentPage.selectOther();
    await expect(otherPaymentPage.methodNameInput).toBeVisible();
    expect(await otherPaymentPage.getMethodNameValue()).toBe('');
  });

  test('Other payment with multiple services', async ({
    homePage,
    otherPaymentPage,
    passcodeDialog,
    paymentSuccessPage,
  }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();
    await homePage.selectAnyService();
    await homePage.clickPay();

    await otherPaymentPage.addTip('100');
    await otherPaymentPage.payWithOther('Bank Transfer');
    await passcodeDialog.enterPasscode(OWNER_PASSCODE);

    await paymentSuccessPage.waitForSuccess();
    expect(await paymentSuccessPage.isSuccessful()).toBe(true);
    await paymentSuccessPage.verifyPaymentMethod('Other');
    await paymentSuccessPage.verifyPaymentMethod('Bank Transfer');

    await paymentSuccessPage.clickNoReceipt();
  });

  test('changing the typed name updates the field value before submit', async ({
    homePage,
    otherPaymentPage,
  }) => {
    await homePage.selectAnyStaff();
    await homePage.selectAnyService();
    await homePage.clickPay();

    await otherPaymentPage.selectOther();
    await otherPaymentPage.enterMethodName('First');
    expect(await otherPaymentPage.getMethodNameValue()).toBe('First');

    await otherPaymentPage.enterMethodName('Second');
    expect(await otherPaymentPage.getMethodNameValue()).toBe('Second');
  });
});
