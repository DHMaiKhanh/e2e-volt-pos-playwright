---
title: Payroll
linearId: dec81408-5313-4db4-8867-ac81c24b11ac
url: https://linear.app/fastboy/document/payroll-23dadb3e0003
team: VOLT
updatedAt: 2026-07-09T04:50:20.600Z
---

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

## **Staff Payroll**

Staff Income detail theo từng staff: theo 2 setting Commission và Salary

1. **STAFF PAYROLL - Commission**

- **Staff Info:** Staff Name (Nickname), Pay Period (VD 04/15/2025 - 04/30/2025), Working Days (8 days).
- **Order listing:** Date, Sale (total amount order sale trong ngày), Refund (total amount order refund trong ngày, số âm), Supply (total supply trên tất cả service trong order), Tip (total tip của tất cả order trong ngày).
- **Staff Income Detail:**
  - Sale = total Sale
  - Refund = total refund
  - **Subtotal = Total (Sale - Refund)**
  - Supply Fee (incl. Sale & Refund) = Total Supply
  - **Staff Commission = (Subtotal - Supply fee) x 60%**
  - Clean Up Fee: số $ setting trong staff nhân theo số ngày xem report (VD: Clean Up Fee = deduction fee \* số ngày tính lương)
  - Tip = Total Tip
  - Discount Charge
  - Card Charge - Commission
  - Card Charge - Tip
  - **TOTAL INCOME = (Staff Commission - Clean up fee + Tip - Card Charge Commission - Card Charge Tip – Discount Charge)**
    - Pay 1 (Staff Commission x 30% - Clean up fee - Card Charge Commission - Card Charge Tip – Discount Charge)
    - Pay 2 (Staff Commission x 70% + Tip)
      - Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff

2. **STAFF PAYROLL - Salary**

- **Staff Info:** Staff Name (Nickname), Pay Period (VD 04/15/2025 - 04/30/2025).
- **Staff Payroll Detail:**
  - Working Days: tổng số ngày làm việc
  - Working Hours: tổng số giờ làm việc
  - **Salary Amount:** tổng số lương phải trả
    - Salary by Period: ghi nhận con số setting trong Employee Compensation/Salary by Period
    - **Wage Per Day:** Salary Amount = [số setting Wage Per Day] \* [Working Days]
    - **Wage Per Hour:** Salary Amount = [số setting Wage Per Hour] \* [Working Hour]
  - Deduction/Clean up fee: số $ setting trong staff nhân theo số ngày tính lương
  - **Tip** = Total Tip
  - Card Charge - Tip
  - **TOTAL INCOME = Salary Amount - Clean up fee + Tip - Card Charge Tip**
    - Pay 1 (Salary x 30% - Clean up fee - Card Charge Tip)
    - Pay 2 (Salary x 70% + Tip)
      - Salary x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff

**Một số lưu ý:**

- Nếu staff setting Commission + Salary: tùy thuộc **Staff Days Off Setting**, so sánh Total Income của 2 type để chốt staff nhận Commission hay Salary.
- Tip được cộng vào hoặc trừ ra tùy setting **Exclude Tips From Cash/Check Income** của mỗi staff.

---

# Print Check

- "Print Check" là việc in phiếu lương (commission check) từ hệ thống POS, thể hiện thu nhập của từng nhân viên trong một kỳ làm việc (thường 1-2 tuần).
- Phát phiếu check giấy (paycheck) để nhân viên mang ra ngân hàng hoặc mobile app deposit vào tài khoản.
- Quy trình thực tế: tổng hợp doanh thu & tip (từ Order/Report/Time Keepings) → tính lương (Commission hoặc Salary, chia Cash/Check) → In Check → Nhân viên đem ra ngân hàng.

## Bank Account

Danh sách thông tin account ngân hàng của chủ tiệm:

- Bank Name, Account Name, Account Number, Routing Number, Bank Link
- Search: Bank Name / Account Name. Action: Update. Button: Create New.
- Create New bank account form gồm 3 fields:
  - **(1) Bank Account Information:** Account Name (required), Account Number (required), Bank Name (required), Routing Number (required, ABA 9 digits), Confirm Account Number (required, khớp Account Number), Bank Website Link (required).
  - **(2) Address Information:** Nick Name (required), Address Line 1/2 (Optional), City/State/Zip (required).
  - **(3) Contact Information:** Phone (required), Email (required).
  - Button: Default (set account default để print check); Create.

---

## Checks List

### Check List listing

- ID (số thứ tự, count từ 1), Employee Name, Created At (hh:mm mm/dd/yyyy), Check (amount thanh toán bằng check), Memo (payroll được in check), Actions (View/Print/Delete/Archive/Void), Filter date (Created At), Filter status (Created default/Printed/Voided/Deleted), Signature, Add Staff button.

### Create Signature

- Chữ ký của Owner/Authorized Signer. Mục đích: check được phê duyệt hợp lệ, số tiền được ngân hàng cấp phép, chi phiếu hợp pháp để nhân viên mang ra ngân hàng. Hiển thị trên check.

### Add Staff

Tạo check cho staff:

- Điều kiện hiển thị list staff: chỉ staff Active mới hiện; default filter "Has staff income" (staff phải có Timekeeping/Hour Worked/Commission); staff phải cùng Merchant; nếu staff đã được chọn tạo check nhưng chưa process, vẫn hiện nhưng bị disable.
- Filter: Has Staff Income/All; Bank Account list; Payroll (select date range theo payroll cố định, không cho chọn ngày lẻ).
- Search: Staff name. List Staff: Name, Income (total Staff Income chưa in check), Staff Role, Latest Check, sort alphabet Name.
- Option Select All: chọn hết staff thỏa điều kiện để create check hàng loạt.
- **Lưu ý:** nếu payroll đã print check nhưng chỉ xuất pay 1, xem như đã complete print check, không hiển thị số tiền pay 2 chưa print trong Income hiện tại (thường trả check 1 pay, cash 1 pay để giảm thuế).

### Check detail

- **(1) Thông tin merchant:** Avatar, Merchant name, Address, Bank name, Bank link.
- **(2) Thông tin khởi tạo Check:**
  - Date (Issue Date): tự động gán = current date khi create; ví dụ check tạo 11/17 nhưng mở lại 11/18 → Issue Date = 11/18, nhưng Created At ngoài Check List vẫn 11/17.
  - Check number: tăng dần tự động, padding 6 digits (000001, 000002...). Dùng để nhận diện, theo dõi lịch sử, đối chiếu ngân hàng, tránh trùng/gian lận payroll.
- **(3) Thông tin số tiền:** PAY TO THE ORDER OF (staff name), Amount in Number (theo Check 1/2/1&2 Payout đã chọn), Amount in Words (số → chữ theo format check ngân hàng Mỹ).

#### Công thức/Quy tắc chuyển amount → text trên check

VD $1,902.34 → "ONE THOUSAND NINE HUNDRED TWO AND 34/100"

1. Phần nguyên (Dollar Amount): chuyển theo cluster 1-19 (bảng đặc biệt), tens (twenty, thirty...), hundred, thousand, million, billion. VD 1902 → "one thousand nine hundred two".
2. Phần thập phân (Cents): cố định XX/100, dựa trên 2 số cuối. VD 0.34 → 34/100.
3. Format chuẩn US banking: [DOLLAR WORDS] AND [CENTS]/100 (không cần thêm "dollars" vì đã in sẵn bên phải).
4. Luôn viết in hoa (uppercase) — dễ đọc với máy, tránh chỉnh sửa tay, chuẩn ngân hàng.

VD $1276.37 → phần nguyên 1276 = "One Thousand Two Hundred Seventy-Six", phần thập phân 37 = "37/100" → "One Thousand Two Hundred Seventy-Six and 37/100 Dollars".

- **(4) Thông tin pay period, chữ ký và MICR line:**
  - MEMO: auto fill pay period [mm/dd/yyyy TO mm/dd/yyyy] - Staff Nickname.
  - Chữ ký: setup ở Check List listing page.
  - MICR line (VD "000786" |:111000611|: 585883120"): 000786 = Check number, 111000611 = Routing Number, 585883120 = Account Number. Mục đích: tự động hóa xử lý check qua máy đọc MICR (scan routing/account/check number không cần nhập tay).
- **(5) Thông tin chi tiết staff income trong pay period:** theo từng ngày — DATE, SALE/REFUND, SUPPLY, COMMISSION, TIP, TOTAL. Summary: Total Sale, Supplies, Net Sale, Commission (60%), Clean Up Fee, Total tip, Pay 1, Pay 2, Total Pay.
- **(6) Một số action:**
  - Edit Info Check (chỉ status Created): Created At (Issue Date), Check Number (không trùng check number khác, trừ status Delete), Nickname, Name, Pay 1, Pay 2, Memo (điền sẵn pay period, có thể update sang ngày khác không ảnh hưởng vì check in dựa trên Pay Period cố định). Lưu ý: update chỉ apply cho Check đó, không ảnh hưởng setting hiện tại của staff.
  - Select option: Check 1 Payout / Check 2 Payout / Check 1 & 2 Payout.
  - Print Memo: print check.

### Workflow

**Status:**

| Status  | Định nghĩa                    |
| ------- | ----------------------------- |
| Created | Check vừa mới được tạo        |
| Printed | Check đã được in              |
| Voided  | Cancel check vừa in (Printed) |
| Deleted | Xóa check vừa tạo (Created)   |

**Action:**

| Action      | Định nghĩa                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **View**    | Mở và xem toàn bộ thông tin check đã phát hành, không chỉnh sửa.                                                       |
| **Print**   | In phiếu lương cho staff (bản chính mang ra ngân hàng). Chỉ in đúng 1 lần, cần xác nhận nếu in lại (Reprint).          |
| **Delete**  | Xóa hoàn toàn check khỏi hệ thống (chỉ khi status Created), không thể khôi phục.                                       |
| **Archive** | Ẩn check khỏi danh sách hiển thị chính nhưng vẫn giữ trong hệ thống.                                                   |
| **Void**    | Hủy hiệu lực check đã phát hành (đặc biệt đã in) — chuyển Voided, không in/sử dụng lại, không thể Delete sau khi Void. |

Action theo status:

| Status / Action | View | Print         | Delete        | Archive        | Void         | Re-print      |
| --------------- | ---- | ------------- | ------------- | -------------- | ------------ | ------------- |
| **Created**     | Yes  | Yes → Printed | Yes → Deleted | Yes → Archived | No           | No            |
| **Printed**     | Yes  | No            | No            | No             | Yes → Voided | Yes → Printed |
| **Voided**      | Yes  | No            | No            | No             | No           | No            |
| **Deleted**     | Yes  | No            | No            | No             | No           | No            |

Lưu ý sau khi create Check:

- **Created:** staff bị disable, phải Delete để enable lại.
- **Printed:** nếu staff còn Income chưa thanh toán, phải enable lại để xuất check tiếp. Nếu Void ngay check đó, enable lại staff với số tiền Income đã Void.

---

## **Quick Book**

Tạo nhanh 1 check cho staff trong merchant, không ảnh hưởng Income/Payroll của staff — đơn giản là khoản bonus chủ tiệm muốn trả.

**Create Check section:** Bank Account, Ending Balance (tổng thanh toán qua Quick-Book, gồm mọi status Check), PAY TO THE ORDER OF (full list staff, gồm Inactive), Amount ($), Amount in Words, MEMO.

**Check listing section:** ID, Employee Name [Nickname - Full name], Created At, Check, Memo, Action (View/Print/Delete/Archive/Void/Reprint).

Lưu ý: không cho phép Edit Check.

---

## History

- List status: Active (Created), Archive (printed & archive), Delete, Void.
- History listing: ID, Employee [Nickname - Name], Created At [hh:mm mm/dd/yyyy], Amount, Memo (pay period), sort desc theo ID.
- History Detail: ID, Employee, Status hiện tại, Activities (log update: User, Change Fields [field: old value > new value], Action [Edit/Delete/Reprint/Void check], Reason, Updated At).

---

_Source: Google Docs — "Payroll" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._
