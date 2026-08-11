---
title: Income Report
linearId: c868dd0f-ef6e-4822-96c1-c826cad6663f
url: https://linear.app/fastboy/document/income-report-94d2aa985225
team: VOLT
updatedAt: 2026-07-30T04:26:05.796Z
---

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

Define specs: https://docs.google.com/spreadsheets/d/1NtBfxEsGjaijFWn7rlzR79sLzmeHTAjNqMDatAnY0wo/edit?gid=1736528834#gid=1736528834

## **Daily Sale Report**

Update giao diện, thêm một số thông tin show trong chart: [Business Snapshot](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit?pli=1&tab=t.wgdnihz0qr1u)

- **Daily Sale Report Chart**
  - **Orders** — Tooltip: _Total number of order, excluding cancel/refunds/manual refunds._
  - **Sale** = total sale/refund/partial refund sau Discount và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard) — Tooltip: _Total sale amount of the order, including refund/partial refund values after discount is applied, excluding Tax and Tip._
  - **Total Tips** = total Tip (không tính order Cancel) — Tooltip: _Total tips received, not included in sales revenue but counted in collected amounts._
  - **Total Payment** — Tooltip: _The final revenue includes Gift Card Redemption._
  - **Filter:** Default Today, cho phép xem theo từng ngày được chọn.
- **Daily Sale Report detail:**

  **List Order Detail**
  - Order #: orderCode
  - Sale: total amount service sale/refund trên order sau Discount
  - Tax = Tax trên order
  - Tip = Tip (Total tip trên order)
  - Total = Total Sale + Tip + Tax

  **INCOME DETAIL**
  - Sale = Total Sale/Refund amount sau Discount
  - Tip = Total tip
  - Tax Collected = total Tax
  - **Total Payment = Sale + Tip + Tax Collected**

  **PAYMENT DETAIL**
  - Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card)
  - Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash)
  - Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others)
  - **Amount Collected = Card + Cash + Others**
  - Gift Card Redemption: Total gift card redemption
  - **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

## **Income Summary**

- **Income Summary chart**
  - **Filter**: date range và chọn xem data bên dưới theo Day/Week/Month.
    - Default: Day - Today.
    - Chọn Day: show list report cho từng ngày theo date range được chọn, 1 day là 1 record.
    - Chọn Week: show list report theo week của năm hiện tại, show đến week hiện tại (1 week = 1 record). Filter date show: 2026. Nếu chọn năm quá khứ, show list report theo tất cả week của năm đó.
    - Chọn Month: show list report theo tháng của năm hiện tại, show đến tháng hiện tại (1 tháng = 1 record). Nếu chọn năm quá khứ thì show đủ 12 tháng.
  - **Total Income:** Total Net Income, theo thời gian đã chọn và luôn compare với khoảng thời gian đó trước đó.
    - Total Income chart theo 3 thông số:
      - **Gross Income**: Total amount of sales, sau discount và trước refunds. Does not include tips, tax và gift card loads/activations. _(Note: gift card loads — tiền nạp vào GiftCard, không cộng vào report của POS.)_
      - **Net Income**: Total sale amount sau discount, sau refund/partial refund, không tính Tip/Tax, không tính order Cancel, không tính gift card loads/activations.
      - **Total Tip**
  - **Total Income table:** Date; Sale (total sale/refund/partial refund sau discount, không tính Tip/Tax, không tính order Cancel); Tip; Tax; Total Payment (Sale + Tip + Tax, final revenue includes Gift Card Redemption).
- **Income Summary detail**

  **PAYMENT DETAILS**
  - Card = Total Sale Card - Total Refund Card + Total tip by card + Total tax Card (Sale/Refund/Tip/Tax by Card)
  - Cash = Total Sale Cash - Total Refund Cash + Total tip by Cash + Total tax Cash
  - Others = Total Sale Others - Total Refund Others + Total tip Others + Total tax Others
  - **Amount Collected = Card + Cash + Others**
  - Gift Card Redemption (Payments covered by previously sold gift cards): Sale/Tip/Tax by gift card
  - **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

  **SALE DETAILS** _(Note: tính trên giá gốc, không bao gồm Service Fee)_
  - **Total Sale = Gift card Sale + Service Sale + Product Sale** (Gift card Sale = Add Fund cho giftcard khi create order)
  - **Total Refund = Service Refund + Product Refund**
  - **Subtotal = Total Sale - Total Refund**
  - Discount = Discount - Discount Reversed (_Discount: promotions, service discounts, loyalty rewards; Discount Reversed: số tiền discount trong payment refund, trừ trả lại_)
  - Service Fee; Cash Discount
  - **Net Total = Subtotal - Discount + Service Fee - Cash Discount**
  - Tip = total tip của tất cả hình thức thanh toán
  - Tax Collected = total tax của tất cả hình thức thanh toán
  - **TOTAL PAYMENT = Net Total + Tax + Tip**

  **SUPPLY FEE**
  - Total Supply Fee: theo từng Service (setting trong Service detail)
  - Staff Supply Share = Total Supply Fee × 0.6 (_% theo Staff Commission Setting - For Service_)
  - Salon Supply Share = Total Supply Fee - Staff Supply Share
  - Nếu chọn **Method 1 — Trừ Supply Share trước khi tính Commission**: show đúng như mô tả trên.
  - Nếu chọn **Method 2 — Trừ Supply Share sau khi tính Commission**: Salon Supply Share = 0.

  **STAFF PAYOUT**
  - Total Service = Service Sale - Service Refund _(giá gốc, không bao gồm Service Fee)_
  - Staff Supply Share (incl. Sale & Refund)
  - **Staff Commission (60%) = (Total Service × 60%) - Staff Supply Share** (_nếu staff chỉ setting Salary thì = 0_)
  - Tip = total tip
  - Clean up fee/Deduction = $ setting Deduction Per Day × số ngày đã làm việc của staff tới thời điểm xem report
  - Discount Charge: tổng số tiền promotion staff chia với chủ tiệm
  - Card Charge Commission: chiết khấu dựa trên phí thanh toán thẻ trên Commission (setting Staff Compensation - On Staff Commission)
  - Card Charge Tip: chiết khấu dựa trên phí thanh toán thẻ trên Tip (setting Staff Compensation - On Credit Card Tip)
  - **Staff Salary:** lương cứng, theo setting, cộng dồn theo rule:
    - Salary by Period: chia đều cho số ngày trong kỳ. VD: Pay Period 1 week, Salary by Period $7000, xem report 3 ngày, Rate = $1000 → Staff Salary = $1000 × 3 = $3000.
    - Wage Per Hour: Staff Salary = [Lương 1h × số giờ]
    - Wage Per Day: Staff Salary = [Lương 1 ngày × số ngày]
  - Lưu ý: nếu staff setting Commission + Salary nhưng thuộc kì lương chưa chốt → show số lớn hơn; nếu đã chốt → show số được chọn để tính lương.
  - **TOTAL STAFF PAYOUT = Staff Commission + Tips + Salary − Supply Fee − Cleanup Fee − Discount Charge − Card Charge Commission − Card Charge Tip**
    - Pay 1 = TOTAL STAFF PAYOUT × Pay 1 rate
    - Pay 2 = TOTAL STAFF PAYOUT − Pay 1 (_dựa trên setting Pay 1 - Pay 2 Split của từng staff_)
  - **Special Case: Credit Card Tips Added to Check** — OFF: không đổi. ON: Tip by Card tách khỏi phần thu nhập chia tỷ lệ, 100% cộng trực tiếp vào Pay 2; phần còn lại chia theo Pay 1/Pay 2 Percentage.

## **Staff Income** _(Note: tính trên giá gốc, không bao gồm Service Fee)_

- Staff listing: Search (Staff Nickname); Filter theo Payroll Period (kỳ hiện tại chưa chốt hiển thị đầu danh sách: Current Period); Data table: Staff (nickname); Orders; Subtotal (Sale - Refund); Supply Fee; Tip; Total Income.
- Staff Income detail theo từng staff và setting Compensation:

1. **STAFF INCOME - Commission**
   - **Staff Info:** Staff Name (Nickname); Date (1 ngày hoặc range + No. of WD).
   - **Order listing:** Order#; Sale/Refund; Supply; Tip.
   - **Staff Income Detail:**
     - Sale = total amount SALE; Refund = total amount REFUND
     - **Subtotal = Sale - Refund**
     - Supply Fee (incl. Sale & Refund)
     - **Staff Commission = (Subtotal - Supply fee) × 60%**
     - Discount Charge; Card Charge - Commission; Card Charge - Tip
     - Clean Up Fee/Deduction = $ setting × số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Staff Commission − Clean up fee + Tip − Card Charge Commission − Card Charge Tip − Discount Charge**
       - Pay 1 = TOTAL INCOME × Pay 1 rate; Pay 2 = TOTAL INCOME − Pay 1
       - **Special Case: Credit Card Tips Added to Check** (như mô tả ở trên)

2. **STAFF INCOME (1 day) - Salary / Commission + Salary** (Pay by Hour/Day/Period)
   - **Staff Info:** Staff Name; Date; Clock In; Clock Out; Working Hours.
   - **Order listing:** Order#; Sale/Refund; Tip.
   - **Staff Income Detail:**
     - Sale = total amount SALE; Refund = total amount REFUND
     - **Subtotal = Sale - Refund**
     - Rate (setting Compensation - Salary): Salary by Period (chia đều theo ngày trong kỳ, VD Pay Period 1 week, Salary $7000, xem 3 ngày, Rate $1000, Gross Income = $1000×3=$3000); Wage Per Hour; Wage Per Day.
     - Gross Income = [số ngày/giờ làm việc] × [rate]
     - Clean Up Fee/Deduction = $ setting × số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Gross Income + Clean Up Fee + Tip**
       - Pay 1 = TOTAL INCOME × Pay 1 rate; Pay 2 = TOTAL INCOME − Pay 1

**Một số lưu ý:**

- Salary by Period: trả lương theo kì payroll.
- Wage Per Hour: cần Checkin - Checkout để count số giờ làm việc.
- Wage Per Day: cần Checkin để count số ngày có đến tiệm làm việc.
- Clean Up Fee/Deduction: nếu tính Salary by Period, tính fee trên số ngày nhận lương của kì đó.
- Staff Income chỉ là report dự trù, con số chính xác vẫn là trong Payroll khi chốt kì lương.
- Clock In/Clock Out: xem theo 1 ngày với 1 ca checkin → show cụ thể. Xem theo range → để trống Clock In/Out; Wage Per Hour show tổng Working Hours; Wage Per Day show tổng Working Days; Salary by Period luôn để trống Clock In/Out và show tổng Working Days.
- Nếu Staff setting **Salary** hoặc **Commission + Salary**: Staff Income luôn show cả Commission và Salary, nhưng Total Income show phần Salary (phụ thuộc **Staff Days Off Setting** để chốt Commission hay Salary).
- **Special Case: Credit Card Tips Added to Check** (như mô tả ở trên).

## **Staff Payroll**

Staff Income detail theo từng staff: theo 2 setting Commission và Salary.

1. **STAFF PAYROLL - Commission**
   - **Staff Info:** Staff Name; Pay Period (Date range); Working Days.
   - **Order listing (theo ngày):** Date; Sale; Refund (số âm); Supply; Tip.
   - **Staff Income Detail:**
     - Sale; Refund; **Subtotal = Sale - Refund**
     - Supply Fee (incl. Sale & Refund)
     - **Staff Commission = (Subtotal - Supply fee) × 60%**
     - Discount Charge; Card Charge - Commission; Card Charge - Tip
     - Clean Up Fee = deduction fee × số ngày tính lương
     - Tip = Total Tip
     - **TOTAL INCOME = Staff Commission − Clean up fee + Tip − Card Charge Commission − Card Charge Tip − Discount Charge**
       - Pay 1 = TOTAL INCOME × Pay 1 rate; Pay 2 = TOTAL INCOME − Pay 1

2. **STAFF PAYROLL - Salary**
   - **Staff Info:** Staff Name; Pay Period (Date range).
   - **Staff Payroll Detail:**
     - Working Days; Working Hours
     - **Salary Amount:** Salary by Period (theo setting Employee Compensation); Wage Per Day = rate × Working Days; Wage Per Hour = rate × Working Hours
     - Deduction/Clean up fee = deduction fee × số ngày tính lương
     - Tip = Total Tip
     - **TOTAL INCOME = Salary Amount − Clean up fee + Tip**
       - Pay 1 = TOTAL INCOME × Pay 1 rate; Pay 2 = TOTAL INCOME − Pay 1

**Một số lưu ý:**

- Nếu staff setting Commission + Salary: tùy **Staff Days Off Setting** mới chốt staff nhận Commission hay Salary.
- Tip cộng vào hoặc trừ ra tùy setting **Exclude Tips From Cash/Check Income** của mỗi staff.

### Promotion Cost Sharing

- Merchant luôn có thể cấu hình tỷ lệ phân chia Promotion giữa **Owner** và **Staff**.
- Phần Promotion thuộc về Staff được phân bổ cho tất cả staff tham gia order theo tỷ lệ giá trị service của từng người, không phụ thuộc Compensation hiện tại.
- Chỉ những staff có Compensation chứa Commission mới thực sự chịu phần Promotion khi tính Income/Payroll. Phần Promotion phân bổ cho staff Salary-only sẽ do Owner chịu.

**Khi tính Income/Payroll:**

- Staff có Compensation chứa Commission (Commission / Salary + Commission): Promotion được phân bổ dùng để giảm Income/Commission theo quy tắc.
- Staff chỉ có Salary: Promotion chỉ ghi nhận để phân bổ trên order, không ảnh hưởng Income/Payroll của staff — chuyển sang chi phí Owner chịu.

**Khi xem report cho nhiều kì lương**, các field sau show rõ thông số setting của mỗi kì (theo range ngày):

- Staff setting Commission: Staff Commission (Commission Rate theo từng kì); Total Income → Pay 1/Pay 2 (Rate theo từng kì).
- Staff setting Commission + Salary / Salary: Rate (theo từng kì); Total Income → Pay 1/Pay 2 (Rate theo từng kì).

## Special Case: Credit Card Tips Added to Check

- **Setting OFF:** không có gì thay đổi.
- **Setting ON:** Tip by Card tách khỏi phần thu nhập dùng để chia tỷ lệ; 100% Tip by Card cộng trực tiếp vào Pay 2; các khoản thu nhập còn lại tiếp tục chia theo Pay 1/Pay 2 Percentage.

**Công thức:**

```
Total Tip = Tip by Card + Tip Non Card - Card Charge Tip
Total Income = Commission + Total Tip - Total Deductions
Pay 1 = (Total Income - Tip by Card) × Pay 1 Percentage
Pay 2 = Total Income - Pay 1
```

Tương đương: `Pay 2 = [(Total Income - Tip by Card) × Pay 2 Percentage] + Tip by Card`

## Calculation Supply Fee Methods

- **Method 1 — Deduct Before Commission:** `Commission = (Subtotal - Supply Share) × Commission Rate`
- **Method 2 — Deduct After Commission:** `Commission = (Subtotal × Commission Rate) - Supply Share`

---

_Source: Google Docs — "Income Version 2" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._
