---
title: Thu nhập nhân viên (/incomes/income-staff) — Tài liệu hợp nhất (tính năng + test case + quét Tiếng Việt)
route: /incomes/income-staff
scanned-at: 2026-07-06
consolidates: feature-spec + test cases + i18n (coverage + meaning)
excludes: docs/codegen-flow/income-staff-flow.md · docs/codegen-detail/income-staff-detail.md (giữ riêng)
---

# Thu nhập nhân viên (`/incomes/income-staff`) — Tài liệu hợp nhất

> MỘT file duy nhất: gộp đặc tả tính năng + test case + kết quả quét Tiếng Việt (còn tiếng Anh + dịch đúng chuẩn). Kết quả trực quan: [reports/income-staff/compare.html](../../reports/income-staff/compare.html). Luồng code-gen giữ riêng: [codegen-flow/income-staff-flow.md](../codegen-flow/income-staff-flow.md) · [codegen-detail/income-staff-detail.md](../codegen-detail/income-staff-detail.md).

# PHẦN A — Đặc tả tính năng

## A1. Mục tiêu & phạm vi

Màn `/incomes/income-staff` (tiêu đề UI: **Staff Income**) là **report dự trù thu nhập của từng nhân viên** theo ngày/khoảng ngày:

- Danh sách staff kèm chỉ số thu nhập; search theo **nickname**; filter theo ngày/khoảng.
- Bảng tổng đầu trang: Total staff, Total orders, Total subtotal, Total supply fee, Total tip, Total staff income.
- Click 1 staff → panel chi tiết thu nhập theo **setting Compensation** của staff đó (Commission / Salary / Commission+Salary) + **Print**.

> Lưu ý nghiệp vụ: Staff Income chỉ là **report dự trù**; con số chính xác chốt ở **Payroll** khi đóng kỳ lương.

## A2. Các luồng chính (từ Linear)

- **Staff listing:** Search (Staff Nickname); Filter (ngày xem report); cột: **Staff (nickname); Orders; Subtotal (= Sale − Refund); Supply Fee; Tip; Total Income**.
- **Staff Income detail** — 2 biến thể theo Compensation:
  1. **STAFF INCOME – Commission**
     - Staff Info: Name (Nickname); Date (1 ngày hoặc range + No. of WD).
     - Order listing: Order#; Sale/Refund; Supply; Tip.
     - Detail: Sale; Refund; **Subtotal = Sale − Refund**; Supply Fee; **Staff Commission = (Subtotal − Supply fee) × 60%**; Clean Up Fee/Deduction; Tip; **TOTAL INCOME = Commission − Clean up + Tip**.
  2. **STAFF INCOME – Salary / Commission + Salary** (Pay by Hour/Day/Period)
     - Staff Info: Name; Date; Clock In; Clock Out; Working Hours.
     - Order listing: Order#; Sale/Refund; Tip.
     - Detail: Sale; Refund; **Subtotal**; **Rate** (theo setting: Salary by Period / Wage Per Hour / Wage Per Day); **Gross Income = [ngày/giờ] × rate**; Clean Up Fee; Tip; **TOTAL INCOME = Gross Income − Clean Up + Tip**.
- **Lưu ý:** nếu staff set **Salary** hoặc **Commission + Salary** → luôn show cả Commission lẫn Salary, nhưng Total Income lấy phần Salary (phụ thuộc **Staff Days Off Setting**). Wage Per Hour cần Checkin–Checkout; Wage Per Day cần Checkin.

## A3. Thành phần UI thực tế (quét bằng Playwright MCP, 2026-07-06)

Ảnh: [income-staff-assets/income-staff-empty.png](income-staff-assets/income-staff-empty.png) (ngày 07/06/2026 chưa có staff data)

| Thành phần                      | Vai trò                                                        | Trạng thái                                                                             | Ghi chú                          |
| ------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------- |
| Tiêu đề **Staff Income**        | Nhãn màn hình                                                  | Hoạt động                                                                              |                                  |
| **Search staff** (textbox)      | Lọc theo nickname                                              | Hoạt động                                                                              | placeholder "Search staff"       |
| Combobox preset (**Today**)     | Chọn khoảng ngày nhanh                                         | Hoạt động                                                                              | Đi kèm calendar                  |
| Nút **calendar `07/06/2026`**   | Date-picker                                                    | Hoạt động                                                                              | Accessible name `MM/DD/YYYY`     |
| Thẻ tổng **Total staff**        | Đếm số staff                                                   | Hoạt động                                                                              | `0` khi trống                    |
| Thẻ tổng **Total orders**       | Tổng order                                                     | Hoạt động                                                                              | `0`                              |
| Thẻ tổng **Total subtotal**     | Tổng subtotal                                                  | Hoạt động                                                                              | `$0.00`                          |
| Thẻ tổng **Total supply fee**   | Tổng supply fee                                                | Hoạt động                                                                              | `$0.00`                          |
| Thẻ tổng **Total tip**          | Tổng tip                                                       | Hoạt động                                                                              | `$0.00`                          |
| Thẻ tổng **Total staff income** | Tổng thu nhập staff                                            | Hoạt động                                                                              | `$0.00`                          |
| **Danh sách staff**             | Bảng staff (Staff/Orders/Subtotal/Supply Fee/Tip/Total Income) | Trống → **"No results found."**                                                        | Cột hiện khi có data (theo spec) |
| **Panel chi tiết**              | Chi tiết thu nhập 1 staff + Print                              | Trống → "No detail to show — Select staff to preview income details or print reports." | Cần chọn staff                   |

## A4. Nghiệp vụ & ràng buộc

- **Subtotal = Sale − Refund**; **Staff Commission = (Subtotal − Supply fee) × 60%** (60% theo Staff Compensation split; nếu chỉ set Salary → Commission = 0).
- **Clean Up Fee/Deduction = $ setting Deduction Per Day × số ngày xem report.**
- **TOTAL INCOME (Commission) = Commission − Clean up + Tip**; **TOTAL INCOME (Salary) = Gross Income − Clean up + Tip**.
- **Rate** phụ thuộc kiểu lương: Salary by Period (lương kỳ ÷ số ngày trong kỳ), Wage Per Hour, Wage Per Day.
- Report là **dự trù**; số chốt nằm ở **Payroll**.

## A5. Trạng thái / quyền / edge case

- **Quyền:** owner passcode (đã bypass 30 phút trong phiên quét).
- **Empty state:** không có staff phát sinh trong ngày → "No results found." + panel "No detail to show".
- **Salary/Commission+Salary:** hiển thị cả Commission và Salary; Total Income phụ thuộc **Staff Days Off Setting**.
- **Wage Per Hour/Day:** cần dữ liệu Checkin/Checkout để tính giờ/ngày làm việc.

## A6. Đối chiếu Linear ↔ UI thực tế (khớp / lệch)

| Mục                  | Linear                                            | UI thực tế                                                           | Kết luận                                                         |
| -------------------- | ------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Tên màn              | "Staff Income"                                    | Tiêu đề UI "Staff Income"                                            | ✅ Khớp                                                          |
| Search               | Search theo Nickname                              | textbox "Search staff"                                               | ✅ Khớp                                                          |
| Cột listing          | Staff/Orders/Subtotal/Supply Fee/Tip/Total Income | Chưa quan sát được (empty) — thanh tổng phản ánh đúng các chỉ số này | ⚠️ **Chưa xác nhận cột trên data thật** (cần chạy ngày có staff) |
| Thanh tổng đầu trang | (spec không liệt kê rõ)                           | Total staff/orders/subtotal/supply fee/tip/staff income              | ✅ UI bổ sung, khớp ý các chỉ số spec                            |
| Detail 2 biến thể    | Commission / Salary                               | Chưa quan sát được (empty)                                           | ⚠️ **Chưa xác nhận trên data thật**                              |

> **TODO xác nhận trên data thật:** cần chọn 1 ngày có staff phát sinh để xác nhận cột bảng + 2 biến thể panel chi tiết (Commission vs Salary) trước khi khoá assertion.

# PHẦN B — Quét Tiếng Việt (i18n)

## B0. Tổng quan (số liệu từ i18n-result.md / compare.json)

> **Chuỗi UI đối chiếu 23** · ❌ chưa dịch **1** · ⚠️ sai chuẩn **0** · 📐 UI vỡ **0** · ✅ thuật ngữ đúng **22** · (data bỏ qua: 67 · tổng pair 110)
> ⚠️ **Phát hiện mới:** quét **sau khi cuộn hết trang** + bảng có data staff → lộ cột **`Tip`** chưa dịch (trước đây quét trên empty-state nên báo 0). ✅ 18 ⇒ 22 do phủ thêm bảng staff.
> Report trực quan: [reports/income-staff/compare.html](../../reports/income-staff/compare.html)

## B1. ❌ Còn tiếng Anh (nhãn UI thật)

| Chuỗi (EN)        | Đang hiển thị (VI)     | Nên dịch     | Ghi chú                                                                                                                                             |
| ----------------- | ---------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tip`             | `Tip` (chưa qua `t()`) | **Tiền tip** | Cột **Tip** trong bảng staff (chỉ hiện khi có data). Cùng một label cứng dùng chung với income-daily & income-summary — fix một chỗ xử lý cả 3 màn. |
| `Pay 1` / `Pay 2` | `Pay 1` / `Pay 2`      | (cần dịch)   | [VP-2253](https://linear.app/fastboy/issue/VP-2253) — panel chi tiết (Staff Payout). Deep-scan (`expandPanelSections`) mới bắt được.                |

## B2. ⚠️ Dịch chưa đúng chuẩn

> View mặc định: 22/22 thuật ngữ khớp glossary.

> **Còn sót trong panel chi tiết (Salary) — cần fix riêng, ghi nhận từ Linear:**
>
> - [VP-2267](https://linear.app/fastboy/issue/VP-2267) / [VP-2263](https://linear.app/fastboy/issue/VP-2263): `Rate` → "Tỉ lệ" **SAI** (Rate là số tiền/mức lương, không phải %) ⇒ nên **"Mức lương"** (hoặc "Đơn giá"). Nằm trong panel chi tiết biến thể Salary nên compare tự động chưa bắt; glossary đã thêm `Rate` để lần mở rộng deep-scan panel sẽ tự gắn cờ.

## B3. ✅ Đã dịch đúng (mẫu)

| EN                            | VI                           |
| ----------------------------- | ---------------------------- |
| Staff Income                  | Thu nhập nhân viên           |
| Total staff                   | Tổng nhân viên               |
| Total orders                  | Tổng đơn hàng                |
| Total subtotal                | Tổng tạm tính                |
| Today                         | Hôm nay                      |
| Order History                 | Lịch sử đơn hàng             |
| Scanner                       | Quét mã                      |
| Internet connection restored. | Đã kết nối internet trở lại. |

## B4. 📐 UI vỡ (chỉ báo cáo)

> Không phát hiện: `xOverflow = 0px`, `clipped = []`. Thanh 6 thẻ tổng + ô search vẫn khít với bản dịch VI.

### Ghi chú / đề xuất bổ sung glossary

- Chuỗi lẻ **"Tip"** là lỗi CHUNG của cả 3 màn income (daily + summary + staff) — cùng một component label cứng chưa bọc `t()`. Fix một chỗ xử lý cả ba.
- Đã phủ thêm bảng staff có data nhờ cuộn hết trang. **Vẫn chưa phủ**: panel chi tiết 2 biến thể (Commission/Salary) chỉ mount sau khi click 1 dòng — cần deep-scan (`scanIncomesDetail`, đã có cuộn panel) hoặc mở rộng compare để click dòng, kiểm thêm Staff Commission/Clean Up Fee/Rate/Gross Income.

# PHẦN C — Test cases

> Nguồn: [docs/testcases/income-staff-testcases.md](income-staff.md) — GIỮ NGUYÊN ID & nội dung.
> Màn **Staff Income** khi sinh test là màn **MỚI** → skill 2 sinh mới page object + spec. Các TC cần data staff (rows/detail) được đánh dấu **[data]** và tự **skip** khi ngày quét không có staff phát sinh (đúng pattern Cluster của Daily).

## Cách chạy

```bash
npx playwright test tests/regression/incomes/income-staff
```

## Bảng test case

| ID                   | Tiêu đề                                                                          | Tiền điều kiện        | Các bước                 | Kết quả mong đợi                                                                                        | Loại            | Ưu tiên |
| -------------------- | -------------------------------------------------------------------------------- | --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| TC-IST-01            | Route bị chặn bởi passcode dialog                                                | Chưa mở passcode      | Mở /incomes/income-staff | Dialog "Enter your passcode" hiện trước khi render data                                                 | regression/auth | P1      |
| TC-IST-02            | Passcode đúng mở màn, hiển thị tiêu đề "Staff Income"                            |                       | Nhập 8888                | Heading "Staff Income" + thanh tổng hiển thị                                                            | regression/auth | P1      |
| TC-IST-03            | Default filter = Today, URL có from/to                                           | Passcode mở           | Mở màn                   | URL chứa `from=<today midnight>`&`to=`                                                                  | regression      | P1      |
| TC-IST-04            | Thanh tổng có đủ 6 chỉ số                                                        |                       | Đọc header stats         | Total staff, Total orders, Total subtotal, Total supply fee, Total tip, Total staff income đều hiển thị | regression      | P1      |
| TC-IST-05            | Ô Search staff hiển thị & nhập được                                              |                       | Focus + gõ               | Textbox "Search staff" nhận input                                                                       | regression      | P2      |
| TC-IST-06            | Combobox preset ngày mặc định "Today"                                            |                       | Đọc combobox             | Text = "Today"                                                                                          | regression      | P2      |
| TC-IST-07            | Nút calendar hiển thị đúng ngày `MM/DD/YYYY`                                     |                       | Đọc nút                  | Accessible name khớp regex ngày                                                                         | regression      | P2      |
| TC-IST-08            | Panel chi tiết rỗng khi chưa chọn staff                                          |                       | Không chọn staff         | Hiện "No detail to show — Select staff to preview income details or print reports."                     | regression      | P2      |
| TC-IST-09            | Ngày không có staff → "No results found." + tổng $0.00/0                         | Ngày trống            | gotoDate(ngày trống)     | List "No results found."; các tổng tiền = $0.00, đếm = 0                                                | regression      | P1      |
| TC-IST-10            | Chọn ngày quá khứ đổi from/to trên URL                                           |                       | gotoDate(past)           | URL phản ánh ngày đã chọn                                                                               | regression      | P2      |
| TC-IST-11            | Reload giữ from/to trong URL                                                     |                       | Reload sau gotoDate      | UI + URL nhất quán                                                                                      | regression      | P2      |
| TC-IST-12            | Mọi money ở thanh tổng đúng dạng `$#,##0.00`                                     |                       | Quét tổng                | Đúng định dạng USD                                                                                      | regression      | P2      |
| TC-IST-13 **[data]** | Bảng staff có đủ cột Staff/Orders/Subtotal/Supply Fee/Tip/Total Income           | Ngày có staff         | Đọc header bảng          | Đủ 6 cột theo spec                                                                                      | regression      | P1      |
| TC-IST-14 **[data]** | Search lọc đúng theo nickname                                                    | Ngày có staff         | Gõ nickname              | Chỉ còn dòng khớp                                                                                       | regression      | P2      |
| TC-IST-15 **[data]** | Click 1 staff mở panel chi tiết + Print enabled                                  | Ngày có staff         | Click dòng staff         | Panel detail hiện, nút Print enabled                                                                    | regression      | P1      |
| TC-IST-16 **[data]** | Detail Commission: Subtotal = Sale − Refund; Total = Commission − Clean up + Tip | Staff kiểu Commission | Đọc panel                | Đẳng thức đúng                                                                                          | regression      | P1      |
| TC-IST-17 **[data]** | Detail Salary: Gross Income = ngày/giờ × Rate; Total = Gross − Clean up + Tip    | Staff kiểu Salary     | Đọc panel                | Đẳng thức đúng                                                                                          | regression      | P1      |
| TC-IST-18 **[data]** | Total staff income = Σ Total Income từng staff                                   | Ngày có staff         | So tổng vs từng dòng     | Khớp                                                                                                    | regression      | P2      |

**Tổng: 18 TC** (TC-IST-01…18). 12 TC chạy không cần data; 6 TC **[data]** tự skip khi ngày trống.

### Ghi chú test

- Route gated passcode owner (`PasscodeDialog`, `OWNER_PASSCODE`).
- Công thức đối chiếu: `docs/linear/income-report.md` mục Staff Income + [src/reports/incomeCalcCore.ts](../../src/reports/incomeCalcCore.ts).

## Nguồn tham chiếu

- Spec/glossary: `docs/i18n/income-staff-translation-map.md` (chưa có — giữ riêng khi được sinh).
- Spec Linear (offline): [docs/linear/income-report.md](../linear/income-report.md) — mục **Staff Income**; Linear gốc: https://linear.app/fastboy/document/income-report-cd80210c48f3 (team VOLT, updated 2026-06-11).
- Luồng code-gen (tách riêng): [codegen-flow/income-staff-flow.md](../codegen-flow/income-staff-flow.md) · [codegen-detail/income-staff-detail.md](../codegen-detail/income-staff-detail.md).
- Công thức: [src/reports/incomeCalcCore.ts](../../src/reports/incomeCalcCore.ts), [docs/report-field-formulas.md](../report-field-formulas.md).
- Ảnh quét: [income-staff-assets/income-staff-empty.png](income-staff-assets/income-staff-empty.png).
- Test/helper + dữ liệu thô JSON: [reports/income-staff/compare.json](../../reports/income-staff/compare.json) · HTML: [reports/income-staff/compare.html](../../reports/income-staff/compare.html).
- Glossary/registry: [src/utils/i18nCompare.ts](../../src/utils/i18nCompare.ts) (`SCREENS['income-staff']`, `gated:true`).
