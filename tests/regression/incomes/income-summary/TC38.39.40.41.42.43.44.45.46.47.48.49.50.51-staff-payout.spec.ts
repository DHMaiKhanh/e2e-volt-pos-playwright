import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { valueAfterLabel } from '@utils/incomeSummaryDetail';
import { openRecentDetail } from './incomeSummary.helpers';

/**
 * Income Summary — Staff Payout (VP-1048 TC-38…51, 66…70).
 *
 * Anchors on the most recent settled past day. Asserts the UI renders the API
 * values (data-driven correctness) and the section totals reconcile.
 *
 * Documented TARGET formula (VP-1048 doc, ID 44):
 *   Total Staff Payout = Commission + Tip + Salary − Supply Fee − Clean Up
 *                        − Discount Charge − Card Charge(Comm) − Card Charge(Tip)
 * The backend combined the two card-charge lines into ONE field,
 * `staffPayoutCardFeeCharge` (null when 0); a separate "Staff Discount Charge"
 * field does not exist yet. Because the store-level total is assembled per-staff
 * (MAX(commission,salary) + per-staff rounding), it does NOT reconcile exactly
 * from the summed section fields — so TC-44 asserts UI == API (reliable) and the
 * exact component formula + the not-yet-exposed fields land in `fixme`
 * (TC-44(reconcile), TC-68…70). See doc ⚠️ #1/#2/#3.
 *
 * Setting-dependent cases (exact commission %, salary type, pay-split %,
 * pay-period close/estimate) need staff/commission fixtures the shared dev
 * environment can't guarantee, so they're marked `fixme` below.
 */

test.describe(`Income Summary — Staff Payout (real data) ${Tag.REGRESSION}`, () => {
  test('TC-38…43: UI renders the API commission / clean-up / salary values', async ({
    incomeSummaryPage,
    passcodeDialog,
    incomeSummaryService,
  }) => {
    const d = await openRecentDetail(incomeSummaryService, incomeSummaryPage, passcodeDialog);
    test.skip(d === null, 'No settled day with data in the last 30 days');
    if (!d) return;
    const sp = d.sections['Staff Payout'];
    const { row } = d;

    expect(valueAfterLabel(sp, 'Staff Commission'), 'Commission').toBe(row.staffPayoutCommission);
    expect(valueAfterLabel(sp, 'Tip'), 'Tip').toBe(row.staffPayoutTip);
    expect(valueAfterLabel(sp, 'Clean Up Fee'), 'Clean Up Fee').toBe(row.staffPayoutCleanUpFee);
    expect(valueAfterLabel(sp, 'Staff Salary'), 'Staff Salary').toBe(row.staffPayoutSalary);
    expect(valueAfterLabel(sp, 'Total Service'), 'Total Service').toBe(row.staffPayoutTotalService);
  });

  test('TC-44: UI Total Staff Payout matches the API row', async ({
    incomeSummaryPage,
    passcodeDialog,
    incomeSummaryService,
  }) => {
    const d = await openRecentDetail(incomeSummaryService, incomeSummaryPage, passcodeDialog);
    test.skip(d === null, 'No settled day with data in the last 30 days');
    if (!d) return;
    const sp = d.sections['Staff Payout'];
    const { row } = d;

    expect(valueAfterLabel(sp, 'Total Staff Payout'), 'UI Total Staff Payout').toBe(
      row.staffPayoutTotal,
    );
  });

  // TC-44 (component reconciliation): the documented Total (doc ID 44) is
  // Commission + Tip + Salary − Supply Fee − Clean Up − Card Charge. It does NOT
  // reconcile from the summed section fields: the store-level total is built
  // per-staff (commission_salary picks MAX(commission, salary), then rounds per
  // staff), and the card-fee charge is folded in as `staffPayoutCardFeeCharge`.
  // On real data the gap is non-trivial (e.g. settled 2026-06-12 drifts ~$2.81),
  // so an exact `toBe` is unreliable — needs a single-staff fixture to assert the
  // formula deterministically (see doc ⚠️ #1/#2). The salon-side total, which is
  // built from aggregates, IS reconciled exactly in the Salon Earnings spec.
  test.fixme('TC-44(reconcile): Total = Commission + Tip + Salary − Supply Fee − Clean Up − Card Charge (needs single-staff fixture)', () => {});

  // Pay 1 / Pay 2 split (TC-45, 46) depends on a per-staff commission-split
  // setting and only renders under the "Show more" expander with dynamic "%"
  // subtext, so it can't be asserted deterministically on shared-env data.
  // TC-47: with the documented Pay 1/Pay 2 formulas, Pay1 + Pay2 = Total +
  // 0.7×Supply Fee (Supply Fee is only deducted 30% in Pay1), so the three only
  // reconcile when Supply Fee = 0 — see doc open question ⚠️ #1.
  test.fixme('TC-45 + TC-46 + TC-47: Pay 1 / Pay 2 split & their relation to Total (needs split-setting fixture + spec confirmation ⚠️#1)', () => {});

  // TC-48 (Show more / Show less toggle) is covered by the overview spec.
  // Remaining setting-dependent cases need a staff/commission/pay-period fixture
  // to assert the exact rate, salary type, or close-vs-estimate value.
  test.fixme('TC-38(rate)/39/40/41/42/43/49/50/51: commission %, salary types, pay-period close', () => {});

  // TC-66: Total Service = Service Sale − Service Refund. The doc lists this
  // identically under Staff Payout and Salon Earnings, but the backend computes
  // `salon_earnings_total_service` as a residual (service revenue − staff payout
  // share) and `income_service_refund` folds in discount-reversed — so the naive
  // `incomeServiceSale − incomeServiceRefund` identity is NOT guaranteed. Needs
  // spec confirmation on the exact source before a deterministic assertion.
  test.fixme('TC-66: Total Service = Service Sale − Service Refund (confirm source vs salon residual / discount-reversed)', () => {});

  // TC-67: Staff Commission(60%) = (Total Service × 60%) − Staff Supply Share.
  // Needs a known per-staff commission % fixture; also see ⚠️ #2 (the Staff
  // Supply Share is already netted here, so Total must not subtract it again).
  test.fixme('TC-67: Staff Commission(60%) = TotalService×60% − Staff Supply Share (needs commission-% fixture; ⚠️#2 double-count)', () => {});

  // TC-68: Staff Discount Charge (promotion the staff shares back to the owner)
  // has NO GraphQL field yet → pending backend + a promotion-split dataset.
  test.fixme('TC-68: Staff Discount Charge = Σ promotion staff shares with owner (pending API field + data)', () => {});

  // TC-69/70: the doc's two card-charge lines (Commission / Tip) are combined
  // server-side into the single `staffPayoutCardFeeCharge`. These `fixme`s track
  // the per-line UI display (label split); a card-fee-setting dataset is needed
  // to assert the exact split.
  test.fixme('TC-69: Staff Card Charge − Commission as its own line (combined into staffPayoutCardFeeCharge; needs data)', () => {});

  test.fixme('TC-70: Staff Card Charge − Tip as its own line (combined into staffPayoutCardFeeCharge; needs data)', () => {});
});
