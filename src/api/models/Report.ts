/**
 * Volt POS — Daily Sale Report types.
 *
 * All money values are integer **cents** (matches the volt-pos rule:
 * `All amounts stored as integer cents`).
 *
 * Mirrors fragments `storeDailyIncome` / `storeDailyIncomeLive` in
 * `volt-pos/src/routes/_app/incomes/income-daily/-shared/income-daily.gql.ts`.
 */
export interface StoreDailyIncomeRow {
  date: string;
  dailySaleSale: number;
  dailySaleTip: number;
  dailySalePaymentCash: number;
  dailySalePaymentCard: number;
  dailySalePaymentOthers: number;
  dailySalePaymentGiftCardRedemption: number;
  dailySalePaymentAmountCollected: number;
  dailySaleTotalPayment: number;
  incomeTaxAmount: number;
  incomeTotalPayment: number;
  paymentTaxCard: number;
  paymentTaxCash: number;
  paymentTaxOthers: number;
  paymentTaxGiftCardRedemption: number;
  saleIncomeTaxAmount: number;
  saleIncomeTotalPayment: number;
}

export interface StoreDailyIncomeListResponse {
  reportStoreDailyIncomeList: StoreDailyIncomeRow[];
}

export interface StoreDailyIncomeLiveResponse {
  storeDailyIncomeLive: StoreDailyIncomeRow | null;
}

/**
 * Derived totals used in assertions. Matches the formulas the UI is
 * expected to satisfy (see TC-19, 20, 21 in
 * `docs/test-cases/VP-1048-daily-sale-report-test-cases.md`).
 */
export interface DailyIncomeTotals {
  incomeSale: number;
  incomeTip: number;
  incomeTaxCollected: number;
  /** Income Detail: Sale + Tip + Tax Collected */
  incomeTotalPayment: number;

  paymentCard: number;
  paymentCash: number;
  paymentOthers: number;
  /** Card + Cash + Others — excludes Gift Card */
  paymentAmountCollected: number;
  paymentGiftCardRedemption: number;
  /** Payment Detail: Amount Collected + Gift Card Redemption */
  paymentTotalPayment: number;
}
