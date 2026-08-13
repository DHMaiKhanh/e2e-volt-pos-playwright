import { workerStaffFixture as base } from './workerStaff.fixture';
import { HomePage } from '@pages/pos/HomePage';
import { OrderPendingPage } from '@pages/pos/OrderPendingPage';
import { CheckoutPage } from '@pages/pos/CheckoutPage';
import { OtherPaymentPage } from '@pages/pos/OtherPaymentPage';
import { PaymentSuccessPage } from '@pages/pos/PaymentSuccessPage';
import { DailySaleReportPage } from '@pages/pos/DailySaleReportPage';
import { IncomeSummaryPage } from '@pages/pos/IncomeSummaryPage';
import { IncomeStaffPage } from '@pages/pos/IncomeStaffPage';
import { OrderHistoryPage } from '@pages/pos/OrderHistoryPage';
import { TimeTrackingPage } from '@pages/pos/TimeTrackingPage';
import { EmployeeSettingsPage } from '@pages/settings/EmployeeSettingsPage';
import { BusinessInfoPage } from '@pages/settings/BusinessInfoPage';
import { LanguageSettingsPage } from '@pages/settings/LanguageSettingsPage';
import { AccessibilitySettingsPage } from '@pages/settings/AccessibilitySettingsPage';
import { SettingsShellPage } from '@pages/settings/SettingsShellPage';
import { AppointmentPage } from '@pages/pos/AppointmentPage';
import { TurnBoardPage } from '@pages/pos/TurnBoardPage';
import { PasscodeDialog } from '@components/modal/PasscodeDialog';
import { QuickPayDialog } from '@components/modal/QuickPayDialog';
import { AdjustManualTurnDialog } from '@components/modal/AdjustManualTurnDialog';
import { TurnSettingsDialog } from '@components/modal/TurnSettingsDialog';
import { TimeKeepingDialog } from '@components/modal/TimeKeepingDialog';
import { SplitOrderPage } from '@pages/pos/SplitOrderPage';

export interface PagesFixture {
  homePage: HomePage;
  orderPendingPage: OrderPendingPage;
  checkoutPage: CheckoutPage;
  otherPaymentPage: OtherPaymentPage;
  paymentSuccessPage: PaymentSuccessPage;
  dailySaleReportPage: DailySaleReportPage;
  incomeSummaryPage: IncomeSummaryPage;
  incomeStaffPage: IncomeStaffPage;
  orderHistoryPage: OrderHistoryPage;
  timeTrackingPage: TimeTrackingPage;
  employeeSettingsPage: EmployeeSettingsPage;
  businessInfoPage: BusinessInfoPage;
  languageSettingsPage: LanguageSettingsPage;
  accessibilitySettingsPage: AccessibilitySettingsPage;
  settingsShellPage: SettingsShellPage;
  appointmentPage: AppointmentPage;
  turnBoardPage: TurnBoardPage;
  passcodeDialog: PasscodeDialog;
  quickPayDialog: QuickPayDialog;
  adjustManualTurnDialog: AdjustManualTurnDialog;
  turnSettingsDialog: TurnSettingsDialog;
  timeKeepingDialog: TimeKeepingDialog;
  splitOrderPage: SplitOrderPage;
}

export const pagesFixture = base.extend<PagesFixture>({
  // `workerIndex` is what gives each parallel worker its own staff: HomePage
  // claims the Nth staff of the live roster, so no two workers drive the same
  // staff's active order. See src/fixtures/workerStaff.fixture.ts.
  homePage: async ({ page, workerIndex }, use) => {
    await use(new HomePage(page, workerIndex));
  },
  orderPendingPage: async ({ page }, use) => {
    await use(new OrderPendingPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  otherPaymentPage: async ({ page }, use) => {
    await use(new OtherPaymentPage(page));
  },
  paymentSuccessPage: async ({ page }, use) => {
    await use(new PaymentSuccessPage(page));
  },
  dailySaleReportPage: async ({ page }, use) => {
    await use(new DailySaleReportPage(page));
  },
  incomeSummaryPage: async ({ page }, use) => {
    await use(new IncomeSummaryPage(page));
  },
  incomeStaffPage: async ({ page }, use) => {
    await use(new IncomeStaffPage(page));
  },
  orderHistoryPage: async ({ page }, use) => {
    await use(new OrderHistoryPage(page));
  },
  timeTrackingPage: async ({ page }, use) => {
    await use(new TimeTrackingPage(page));
  },
  employeeSettingsPage: async ({ page }, use) => {
    await use(new EmployeeSettingsPage(page));
  },
  businessInfoPage: async ({ page }, use) => {
    await use(new BusinessInfoPage(page));
  },
  languageSettingsPage: async ({ page }, use) => {
    await use(new LanguageSettingsPage(page));
  },
  accessibilitySettingsPage: async ({ page }, use) => {
    await use(new AccessibilitySettingsPage(page));
  },
  settingsShellPage: async ({ page }, use) => {
    await use(new SettingsShellPage(page));
  },
  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
  // The Turn board is a dialog, not a route: it defaults to /home as its host
  // route, and specs that need another one construct their own instance.
  turnBoardPage: async ({ page }, use) => {
    await use(new TurnBoardPage(page));
  },
  passcodeDialog: async ({ page }, use) => {
    await use(new PasscodeDialog(page));
  },
  quickPayDialog: async ({ page }, use) => {
    await use(new QuickPayDialog(page));
  },
  adjustManualTurnDialog: async ({ page }, use) => {
    await use(new AdjustManualTurnDialog(page));
  },
  turnSettingsDialog: async ({ page }, use) => {
    await use(new TurnSettingsDialog(page));
  },
  timeKeepingDialog: async ({ page }, use) => {
    await use(new TimeKeepingDialog(page));
  },
  splitOrderPage: async ({ page }, use) => {
    await use(new SplitOrderPage(page));
  },
});
