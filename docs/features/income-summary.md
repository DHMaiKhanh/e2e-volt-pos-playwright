---
title: Tổng hợp thu nhập (/incomes/income-summary) — Tài liệu hợp nhất (tính năng + test case + quét Tiếng Việt)
route: /incomes/income-summary
scanned-at: 2026-07-06
consolidates: feature-spec + test cases + i18n (coverage + meaning)
excludes: docs/codegen-flow/income-summary-flow.md · docs/codegen-detail/income-summary-detail.md (giữ riêng)
---

# Tổng hợp thu nhập (`/incomes/income-summary`) — Tài liệu hợp nhất

> MỘT file duy nhất: gộp đặc tả tính năng + test case + kết quả quét Tiếng Việt (còn tiếng Anh + dịch đúng chuẩn). Kết quả trực quan: [reports/income-summary/income-summary.html](../../reports/income-summary/income-summary-scan.html). Luồng code-gen giữ riêng: [codegen-flow/income-summary-flow.md](../codegen-flow/income-summary-flow.md) · [codegen-detail/income-summary-detail.md](../codegen-detail/income-summary-detail.md).

# PHẦN A — Đặc tả tính năng

## A1. Mục tiêu & phạm vi

Màn `/incomes/income-summary` tổng hợp thu nhập theo **khoảng thời gian** (không chỉ 1 ngày):

- Chọn **date range** + nhóm dữ liệu theo **Day / Week / Month**.
- **Total Income** của khoảng đã chọn, luôn **so sánh với khoảng liền trước** (vs. Same day/period last week...).
- Biểu đồ 3 thông số **Gross Income / Net Income / Total Tip**.
- Bảng tổng theo mốc thời gian; click 1 dòng → mở **panel chi tiết** (Payment / Sale / Supply Fee / Staff Payout / Salon Earnings).
- **In** báo cáo (nút Print trong panel chi tiết).

Đây là báo cáo đối soát sâu nhất trong nhóm Income — dùng để chốt payout nhân viên và earnings của salon.

## A2. Các luồng chính (từ Linear)

- **Income Summary chart** — filter date range + xem theo **Day/Week**; **Total Income** compare với kỳ trước:
  - **Gross Income:** tổng sale trước refund; **không** gồm tip, không gồm gift card load/activation.
  - **Net Income:** tổng sale sau refund/partial refund; **không** tính Tip, order Cancel, sale giftcard.
  - **Total Tip.**
- **Total Income table:** `Date`; `Sale`; `Tip`; `Net Income`; `Total Payment`. _(UI thực tế: Date / Sale / Tip / Tax / Total Payment — xem §A4.)_
- **Income Summary detail** — 5 khối:
  - **PAYMENT DETAILS:** Card/Cash/Others mỗi loại = Sale − Refund + Tip + Tax; **Amount Collected = Card+Cash+Others**; Gift Card Redemption (Sale/Tip/Tax); **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**.
  - **SALE DETAILS:** **Total Sale = Gift card + Service + Product Sale**; **Total Refund = Service + Product Refund**; **Subtotal = Sale − Refund**; Discount = Discount − Discount Reversed; **Net Total = Subtotal − Discount**; Tip; Tax Collected; **TOTAL PAYMENT = Net Total + Tax + Tip**.
  - **SUPPLY FEE:** Total Supply Fee; **Staff Supply Share = Total × 0.6**; Salon Supply Share = phần còn lại.
  - **STAFF PAYOUT:** Total Service = Service Sale − Service Refund; Staff Supply Share; **Staff Commission (60%) = Total Service×60% − Staff Supply Share**; Tip; Clean up fee; Staff Salary; **TOTAL STAFF PAYOUT = Commission + Tip − Clean up + Salary** → chia **Pay 1 / Pay 2**.
  - **SALON EARNINGS:** Salon Commission (40%); Product Sale/Refund; Total Discount; **Net Earnings**; Staff Supply Share; Clean up fee; Staff Salary; **TOTAL EARNING**; Tax Collected.

## A3. Thành phần UI thực tế — khu filter + tổng + bảng (quét Playwright MCP, 2026-07-06)

Ảnh: [income-summary-assets/income-summary-detail.png](income-summary-assets/income-summary-detail.png) (đã click 1 dòng để bung panel chi tiết)

| Thành phần                                       | Vai trò                                 | Trạng thái | Ghi chú                                                   |
| ------------------------------------------------ | --------------------------------------- | ---------- | --------------------------------------------------------- |
| Tiêu đề **Income Summary**                       | Nhãn màn hình                           | Hoạt động  |                                                           |
| Combobox preset (**Today**)                      | Chọn khoảng ngày nhanh                  | Hoạt động  | Đi kèm calendar                                           |
| Nút **calendar `07/06/2026`**                    | Date-picker                             | Hoạt động  | Accessible name `MM/DD/YYYY`                              |
| Tabs **Day / Week / Month**                      | Nhóm dữ liệu                            | Hoạt động  | URL `groupBy=day`; **Day** selected mặc định              |
| **Total Income** (heading + `$0.00`)             | Tổng thu nhập khoảng đã chọn            | Hoạt động  | Kèm `100.00%` + "vs. Same day last week"                  |
| 3 nhãn **Gross Income / Net Income / Total tip** | Legend chart                            | Hoạt động  |                                                           |
| **Chart** (application, trục $0–$100)            | Biểu đồ theo khoảng                     | Hoạt động  |                                                           |
| **Bảng tổng**                                    | Date / Sale / Tip / Tax / Total Payment | Hoạt động  | Click 1 dòng → mở detail; URL thêm `detailId=<from>-<to>` |

## A4. Panel chi tiết (sau khi click 1 dòng)

| Khối                 | Các dòng quét được                                                                                                                                                                                                                                                                              | Ghi chú                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Header               | Heading ngày + nút **Print**                                                                                                                                                                                                                                                                    |                                                        |
| **Payment Details**  | **Cash / Card / Others** (mỗi loại: Sale, Refund, Tip, Tax) → **Amount Collected** → **Gift Card Redemption** (Sale, Tip, Tax) → **Total Payment**                                                                                                                                              | Khớp spec                                              |
| **Sale Details**     | **Total Sale** (Service Sale, Product Sale, Gift Card Sale) → **Total Refund** (Service Refund, Product Refund) → **Subtotal** → **Total Discount** (Discount, Discount Reversed) → **Net Total** → Tip → Tax Collected → **Total Payment**                                                     | Khớp spec                                              |
| **Supply Fee**       | Total supply fee, Staff Supply Share, Salon Supply Share                                                                                                                                                                                                                                        | Khớp spec                                              |
| **Staff Payout**     | Total Service, Staff Supply Share, Staff Commission, Tip, Clean Up Fee, **Discount Charge**, **Card Charge - Commission**, **Card Charge - Tip**, Staff Salary → **Total Staff Payout** (Pay 1, Pay 2)                                                                                          | ⚠️ 3 dòng in đậm là **mới**, chưa có trong spec Linear |
| Toggle **Show less** | Thu gọn khối Staff Payout                                                                                                                                                                                                                                                                       | UI element mới                                         |
| **Salon Earnings**   | Total Service, Salon Supply Share, Salon Commission, Product Sale, Product Refund, Total Discount (Discount, Discount Reversed), **Net Earnings**, Staff Supply Share, Clean Up Fee, **Discount Charge**, **Card Charge - Commission**, **Card Charge - Tip**, Staff Salary, **Total Earnings** | ⚠️ 3 dòng "Charge" là mới so với spec                  |

## A5. Nghiệp vụ & ràng buộc

- **Total Income** luôn kèm phần trăm so với **kỳ liền trước** (nhãn phụ thuộc groupBy: "same day last week"...).
- Panel chi tiết **chỉ hiện khi chọn 1 dòng** trong bảng; `detailId` được ghi lên URL → deep-link được.
- Công thức chốt payout: `Staff Commission (60%)`, `Salon Commission (40%)` dựa trên Staff Compensation split; `Staff Supply Share = Total Supply Fee × 0.6`.
- **Total Staff Payout** tách thành **Pay 1 / Pay 2** theo setting Pay 1 – Pay 2 Split của từng staff.
- Ba dòng **Card Charge - Commission / Card Charge - Tip / Discount Charge** phản ánh phí thẻ & discount phân bổ — cần PO bổ sung công thức chính thức (chưa có trong Linear).

## A6. Trạng thái / quyền / edge case

- **Quyền:** owner passcode (đã bypass 30 phút trong phiên quét này nên không hiện lại dialog).
- **Empty state bảng:** vẫn có 1 dòng cho mốc đang xem với toàn `$0.00`; panel chi tiết mặc định "No detail to show — Select a period from the table to view income details."
- **Group By:** Day/Week/Month đổi cách gom dòng bảng và mốc chart.
- **Refund/Discount:** ảnh hưởng Subtotal (âm), Discount Reversed cộng ngược khi refund.

## A7. Đối chiếu Linear ↔ UI thực tế (khớp / lệch)

| Mục              | Linear                                                  | UI thực tế                                                            | Kết luận                                                                      |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Group By         | Day / **Week**                                          | Day / Week / **Month**                                                | ⚠️ UI có thêm **Month** — spec chỉ nêu Day/Week                               |
| Cột bảng tổng    | Date / Sale / Tip / **Net Income** / Total Payment      | Date / Sale / Tip / **Tax** / Total Payment                           | ⚠️ **Lệch cột**: UI hiển thị **Tax** thay vì **Net Income**. Cần PO xác nhận. |
| 3 thông số chart | Gross / Net / Total Tip                                 | Gross Income / Net Income / Total tip                                 | ✅ Khớp                                                                       |
| Payment Details  | Card/Cash/Others + Amount Collected + Gift Card + Total | Đủ, thêm Sale/Refund/Tip/Tax breakdown mỗi loại                       | ✅ Khớp (UI chi tiết hơn)                                                     |
| Sale Details     | đầy đủ các dòng                                         | Khớp từng dòng                                                        | ✅ Khớp                                                                       |
| Staff Payout     | Commission / Tip / Clean up / Salary / Pay1 / Pay2      | Thêm **Discount Charge, Card Charge - Commission, Card Charge - Tip** | ⚠️ **UI thừa 3 dòng** so với spec                                             |
| Salon Earnings   | Net Earnings / Total Earning ...                        | Thêm **Discount Charge, Card Charge - Commission/Tip**                | ⚠️ **UI thừa 3 dòng** so với spec                                             |

# PHẦN B — Quét Tiếng Việt (i18n)

> Nguồn số liệu: `reports/income-summary/compare.json` (TC-i18n-screen-compare, quét sau khi cuộn hết trang + glossary bổ sung theo [VP-2252](https://linear.app/fastboy/issue/VP-2252)). Deep-scan panel chi tiết bắt thêm **Pay 1 / Pay 2** còn tiếng Anh (xem B1).

## B0. Tổng quan (số liệu từ compare.json)

> **Chuỗi UI đối chiếu 23** · ❌ chưa dịch **1** · ⚠️ sai chuẩn **3** · 📐 UI vỡ **0** · ✅ thuật ngữ đúng **19** · (data bỏ qua: 8 · tổng pair 45)

| Chỉ số                    | Giá trị   |
| ------------------------- | --------- |
| `total` (tổng pair)       | 45        |
| `missing` (còn tiếng Anh) | 1         |
| `suspect` (sai chuẩn)     | 3         |
| `ok` (đúng chuẩn)         | 19        |
| `data` (bỏ qua — số/tiền) | 8         |
| `uiBroken.xOverflow`      | 0px       |
| `uiBroken.clipped`        | [] (rỗng) |

## B1. ❌ Còn tiếng Anh (nhãn UI thật)

| Chuỗi (EN)        | Đang hiển thị (VI)     | Nên dịch     | Ghi chú                                                                                                                                                                                                                    |
| ----------------- | ---------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tip`             | `Tip` (chưa qua `t()`) | **Tiền tip** | Nhãn "Tip" trong khu Total Income / bảng tổng (header cột). Cùng lỗi với income-daily (label cứng dùng chung). Nguồn: `data-table-column-header.tsx:33`.                                                                   |
| `Pay 1` / `Pay 2` | `Pay 1` / `Pay 2`      | (cần dịch)   | [VP-2253](https://linear.app/fastboy/issue/VP-2253) — trong panel chi tiết mục **Tổng chi trả nhân viên** (Staff Payout). Chỉ hiện sau khi mở khối → deep-scan (`scanIncomesDetail` + `expandPanelSections`) mới bắt được. |

## B2. ⚠️ Dịch chưa đúng chuẩn

| Hiện tại (VI)   | Gốc (EN)       | Nên dùng (chuẩn)       | Nguồn / Issue                                                                                                     |
| --------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Thu nhập gộp`  | `Gross Income` | **Tổng thu nhập**      | [VP-2256](https://linear.app/fastboy/issue/VP-2256) — legend biểu đồ (`income-summary-chart-legend.tsx:27`).      |
| `Thu nhập ròng` | `Net Income`   | **Thu nhập thực nhận** | [VP-2256](https://linear.app/fastboy/issue/VP-2256) — legend biểu đồ (`income-summary-chart-legend.tsx:27`).      |
| `Bán hàng`      | `Sale`         | **Doanh thu**          | [VP-2259](https://linear.app/fastboy/issue/VP-2259) — "Sale" không nhất quán (`data-table-column-header.tsx:33`). |

> **Lưu ý phạm vi (còn sót — cần fix riêng):** compare chỉ phủ **view mặc định**. Hai lỗi sau nằm trong **panel chi tiết** (chỉ mount sau click 1 dòng) nên compare tự động **chưa** bắt — ghi nhận từ Linear:
>
> - [VP-2258](https://linear.app/fastboy/issue/VP-2258): `Net Total` → "Thực thu" gây nhầm ⇒ nên **"Doanh thu thuần"**.
> - (Glossary đã thêm các từ này nên khi mở rộng compare vào panel chi tiết sẽ tự bắt.)

## B3. ✅ Đã dịch đúng (mẫu)

| EN                            | VI                            |
| ----------------------------- | ----------------------------- |
| Income Summary                | Tổng hợp thu nhập             |
| Total Income                  | Tổng thu nhập                 |
| Day                           | Ngày                          |
| Week                          | Tuần                          |
| Month                         | Tháng                         |
| Today                         | Hôm nay                       |
| Total tip                     | Tổng tip                      |
| Tax                           | Thuế                          |
| Total Payment                 | Tổng thanh toán               |
| vs. Same day last week        | so với Cùng ngày tuần trước   |
| No detail to show             | Không có chi tiết để hiển thị |
| Order History                 | Lịch sử đơn hàng              |
| Scanner                       | Quét mã                       |
| Internet connection restored. | Đã kết nối internet trở lại.  |

## B4. 📐 UI vỡ (chỉ báo cáo)

> Không phát hiện: `xOverflow = 0px`, `clipped = []`. Tabs Day/Week/Month + bảng vẫn khít với bản dịch VI.

# PHẦN C — Test cases

> Màn này **đã có bộ test rất lớn** (~70 TC + reconciliation pipeline). Bảng dưới tài liệu-hoá coverage theo nhóm (section) để đối chiếu spec Linear — GIỮ NGUYÊN ID và nội dung từ `docs/testcases/income-summary-testcases.md`. Không sinh/đè code.

## Cách chạy

```bash
npx playwright test tests/regression/incomes/income-summary tests/regression/incomes/income-summary-past \
  tests/regression/incomes/income-summary-reconciliation tests/regression/incomes/income-summary-ui
```

## Bảng test case theo nhóm (đã hiện thực)

| Nhóm                        | TC IDs                                      | Trọng tâm kiểm thử                                                                            | Kết quả mong đợi                             | File                           |
| --------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------ |
| Overview                    | TC01,03,04,06,09,15,16,17,18,19,25,34,48,56 | Layout 2 panel, filter mặc định Today, tabs Day/Week/Month, chart 3 series, bảng tổng         | Đúng cấu trúc + giá trị mặc định             | overview                       |
| Filter                      | TC02,05,07                                  | Preset dropdown + date-picker + groupBy                                                       | URL `groupBy=`, range đổi đúng               | filter                         |
| Total Income                | TC08,09,11,12,13,14                         | Total Income + %so kỳ trước (Gross/Net/Tip)                                                   | Compare label + % đúng, không NaN            | total-income                   |
| Payment Details             | TC20–27                                     | Card/Cash/Others (Sale/Refund/Tip/Tax), Amount Collected, Gift Card Redemption, Total Payment | Khớp GraphQL + đẳng thức                     | payment-details                |
| Sale Details                | TC28–34                                     | Total Sale/Refund, Subtotal, Discount, Net Total, Tip, Tax, Total Payment                     | Đẳng thức Net Total = Subtotal − Discount... | sale-details                   |
| Supply Fee                  | TC35,36,37                                  | Total / Staff Share (×0.6) / Salon Share                                                      | Chia đúng tỉ lệ                              | supply-fee                     |
| Staff Payout                | TC38–51                                     | Commission 60%, Tip, Clean up, Salary, Pay 1/Pay 2, Show more/less                            | Khớp công thức payout                        | staff-payout                   |
| Staff Payout ↔ Staff Income | TC38,40,41,44                               | Đối chiếu payout với màn Staff Income                                                         | Nhất quán chéo báo cáo                       | staff-payout-from-staff-income |
| Salon Earnings              | TC52,53,54,55,55b                           | Salon Commission 40%, Net Earnings, Total Earnings, Tax                                       | Khớp công thức                               | salon-earnings                 |
| Charge fields & Salon tax   | TC66–72                                     | Discount Charge, Card Charge - Commission/Tip (fields UI mới)                                 | Giá trị hợp lệ, reconcile                    | charge-fields                  |
| Reconciliation              | TC56,57,58                                  | Panel ↔ tổng bảng ↔ GraphQL                                                                   | Ba nguồn khớp                                | reconciliation                 |
| Cross-report                | TC59,60,61                                  | Income Summary ↔ Daily ↔ Staff                                                                | Nhất quán chéo                               | cross-report                   |
| Edge cases                  | TC62,63,64,65                               | Ngày trống, refund âm, discount reversed                                                      | Xử lý đúng                                   | edge                           |
| Re-derive (Cách 2)          | TC-RD                                       | Staff/Salon re-derive từ DB                                                                   | Khớp giá trị tính lại                        | RD-staff-salon-rederive        |
| Past pipeline               | TC-PAST                                     | Ngày quá khứ full pipeline                                                                    | Khớp snapshot                                | income-summary-past            |
| Recon pipeline              | TC-RECON-\*                                 | orders→income summary, sections-from-compensation, staff-compensation                         | Pipeline đối soát đầu-cuối                   | income-summary-reconciliation  |
| App-faithful HTML / UI      | TC-IS-UI                                    | Render HTML trung thực với app                                                                | Khớp cấu trúc DOM                            | income-summary-ui              |

**Tổng: ~70+ test** trải 15 file spec + helpers (`incomeSummary.helpers.ts`).

### Ghi chú test case

- Công thức nguồn: [src/reports/incomeCalcCore.ts](../../src/reports/incomeCalcCore.ts); bảng công thức: [docs/report-field-formulas.md](../report-field-formulas.md).
- 3 field UI mới (Discount Charge, Card Charge - Commission/Tip) đã được kiểm thử ở nhóm **charge-fields** dù spec Linear chưa mô tả — xem cảnh báo §A7.
- Page object: [src/pages/pos/IncomeSummaryPage.ts](../../src/pages/pos/IncomeSummaryPage.ts).

## Nguồn tham chiếu

- Spec/glossary: `docs/i18n/income-summary-translation-map.md` (nếu có, giữ riêng).
- Luồng code-gen (tách riêng): [codegen-flow/income-summary-flow.md](../codegen-flow/income-summary-flow.md) · [codegen-detail/income-summary-detail.md](../codegen-detail/income-summary-detail.md).
- Test/helper + dữ liệu thô JSON: [reports/income-summary/compare.json](../../reports/income-summary/compare.json).
- Report i18n trực quan: [reports/income-summary/compare.html](../../reports/income-summary/compare.html).
- Glossary/registry: [src/utils/i18nCompare.ts](../../src/utils/i18nCompare.ts) (`SCREENS['income-summary']`, `gated:true`).
- Spec Linear (offline): [docs/linear/income-report.md](../linear/income-report.md) — mục **Income Summary**; Linear document gốc: https://linear.app/fastboy/document/income-report-cd80210c48f3.
- Ảnh quét: [income-summary-assets/income-summary-detail.png](income-summary-assets/income-summary-detail.png).
