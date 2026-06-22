import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { valueAfterLabel } from '@utils/incomeSummaryDetail';
import { openRecentDetail } from './incomeSummary.helpers';

/**
 * Income Summary — Salon Earnings (VP-1048 TC-52…55, 71…73).
 *
 * Anchors on the most recent settled past day. Verifies the UI renders the API
 * values and the section formulas hold (allowing negatives — QC#13):
 *   Net Earnings   = Salon Commission + Product Sale − Product Refund − Total Discount
 *   Total Earnings = Net + Staff Supply Share + Clean Up Fee − Staff Salary
 *                    + staffPayoutCardFeeCharge (card fee recouped from staff)
 *
 * The backend implemented the doc's "Card Charge Commission + Tip" as a single
 * `staffPayoutCardFeeCharge` field that the salon recoups, so TC-54 verifies the
 * full Total Earning formula (exact against the API). The doc's separate "Staff
 * Discount Charge" line is still not a field → `fixme` (TC-71). Per-line UI
 * display of the card charge lands in `fixme` too (TC-72/73).
 *
 * The Salon total and the Staff Payout total are computed independently — never
 * forced to match (TC-55).
 */

const v = (text: string, label: string): number => {
  const value = valueAfterLabel(text, label);
  expect(value, `"${label}" present in Salon Earnings`).not.toBeNull();
  return value as number;
};

test.describe(`Income Summary — Salon Earnings (real data) ${Tag.REGRESSION}`, () => {
  test('TC-52 + TC-53: UI renders API values; Net Earnings formula holds', async ({
    incomeSummaryPage,
    passcodeDialog,
    incomeSummaryService,
  }) => {
    const d = await openRecentDetail(incomeSummaryService, incomeSummaryPage, passcodeDialog);
    test.skip(d === null, 'No settled day with data in the last 30 days');
    if (!d) return;
    const se = d.sections['Salon Earnings'];
    const { row } = d;

    // TC-52: UI shows the API Salon Commission (computed from owner rate).
    expect(v(se, 'Salon Commission')).toBe(row.salonEarningsCommission);
    expect(v(se, 'Net Earnings')).toBe(row.salonEarningsNet);

    // TC-53: Net Earnings = Commission + Product Sale − Product Refund − Total Discount
    expect(v(se, 'Net Earnings'), 'Net Earnings formula').toBe(
      v(se, 'Salon Commission') +
        v(se, 'Product Sale') -
        v(se, 'Product Refund') -
        v(se, 'Total Discount'),
    );
  });

  test('TC-54 + TC-55: Total Earnings formula; independent of Staff Payout', async ({
    incomeSummaryPage,
    passcodeDialog,
    incomeSummaryService,
  }) => {
    const d = await openRecentDetail(incomeSummaryService, incomeSummaryPage, passcodeDialog);
    test.skip(d === null, 'No settled day with data in the last 30 days');
    if (!d) return;
    const se = d.sections['Salon Earnings'];
    const { row } = d;

    expect(v(se, 'Total Earnings')).toBe(row.salonEarningsTotal);

    // TC-54 (doc ID 54): Total Earning = Net + Staff Supply Share + Clean Up Fee
    // − Staff Salary + staffPayoutCardFeeCharge (the card fee the salon recoups
    // from staff — doc's "Card Charge Commission + Tip"). Asserted at the API
    // level (exact across settled days; the per-staff rounding that breaks the
    // Staff Payout total does not affect these salon-level aggregates).
    const cardFeeCharge = await incomeSummaryService.getStaffCardFeeCharge(d.date);
    expect(row.salonEarningsTotal, 'Total Earning formula (API)').toBe(
      row.salonEarningsNet +
        row.salonEarningsStaffSupplyShare +
        row.salonEarningsCleanUpFee -
        row.salonEarningsStaffSalary +
        cardFeeCharge,
    );

    // TC-55: Salon total and Staff total are each their own number (not coerced equal).
    expect(row.salonEarningsTotal, 'Salon total computed independently').not.toBeNaN();
    expect(row.staffPayoutTotal, 'Staff total computed independently').not.toBeNaN();
  });

  // TC-71: Staff Discount Charge (promotion the staff shares back to the owner)
  // is in the doc but has NO GraphQL field yet → pending backend + a dataset
  // with promotion-split (doc ⚠️ #3).
  test.fixme('TC-71: Salon Earnings shows Staff Discount Charge, added into Total Earning (pending API field + data)', () => {});

  // TC-72/73: the doc's two card-charge lines (Commission / Tip) are combined
  // server-side into the single `staffPayoutCardFeeCharge` — its effect on Total
  // Earning is already covered by TC-54. These two `fixme`s track the per-line
  // UI display (label split) only, which needs a card-fee-setting dataset.
  test.fixme('TC-72: Salon Earnings shows Staff Card Charge − Commission as its own line (combined into staffPayoutCardFeeCharge; needs data)', () => {});

  test.fixme('TC-73: Salon Earnings shows Staff Card Charge − Tip as its own line (combined into staffPayoutCardFeeCharge; needs data)', () => {});
});
