import { test as base } from '@playwright/test';
import { HomePage } from '@pages/pos/HomePage';
import { CheckoutPage } from '@pages/pos/CheckoutPage';
import { PaymentSuccessPage } from '@pages/pos/PaymentSuccessPage';
import { PasscodeDialog } from '@components/modal/PasscodeDialog';

export interface PagesFixture {
  homePage: HomePage;
  checkoutPage: CheckoutPage;
  paymentSuccessPage: PaymentSuccessPage;
  passcodeDialog: PasscodeDialog;
}

export const pagesFixture = base.extend<PagesFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentSuccessPage: async ({ page }, use) => {
    await use(new PaymentSuccessPage(page));
  },
  passcodeDialog: async ({ page }, use) => {
    await use(new PasscodeDialog(page));
  },
});
