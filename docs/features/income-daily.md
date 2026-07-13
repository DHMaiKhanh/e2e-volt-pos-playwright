---
title: Thu nhập theo ngày (/incomes/income-daily) — Tài liệu hợp nhất (tính năng + test case + quét Tiếng Việt)
route: /incomes/income-daily
scanned-at: 2026-07-06
consolidates: feature-spec + test cases + i18n (coverage + meaning)
excludes: docs/codegen-flow/income-daily-flow.md · docs/codegen-detail/income-daily-detail.md (giữ riêng)
---

# Thu nhập theo ngày (`/incomes/income-daily`) — Tài liệu hợp nhất

> MỘT file duy nhất: gộp đặc tả tính năng + test case + kết quả quét Tiếng Việt (còn tiếng Anh + dịch đúng chuẩn). Kết quả trực quan: reports/income-daily/income-daily.html. Luồng code-gen giữ riêng: codegen-flow/income-daily-flow.md · codegen-detail/income-daily-detail.md.

# PHẦN A — Đặc tả tính năng

## A1. Mục tiêu & phạm vi

Màn `/incomes/income-daily` là **Daily Sale Report** — báo cáo doanh thu **của MỘT ngày** cho owner/tenant:

- Xem nhanh 4 chỉ số tổng của ngày (**Total Order, Sale, Total Tip, Total Payment**) kèm so sánh với **hôm qua**.
- Biểu đồ theo giờ/khung của ngày, có thể chuyển chỉ số hiển thị (Sale / Order / Tip / Payment).
- Danh sách order chi tiết trong ngày + panel **Income Details** và **Payment Details** để đối soát.
- **In** báo cáo ngày (nút Print).

Màn được bảo vệ bằng **passcode dialog** (owner passcode) khi truy cập lần đầu — cùng cơ chế với các màn Income khác.

## A2. Các luồng chính (từ Linear)

Trích mục **Daily Sale Report** trong spec:

- **Daily Sale Report Chart** — 4 chỉ số:
  - **Orders** — _Total number of order, refunds, and manual refunds_ (UI hiển thị "Total Order" với mô tả "excluding cancel/refunds/manual refunds").
  - **Sale** = tổng sale/refund/partial refund, **không** tính Tip, Tax, **không** tính order Cancel (Card/Cash/Other/GiftCard).
  - **Total Tips** = tổng Tip (không tính order Cancel).
  - **Total Payment** — final revenue, **bao gồm** Gift Card Redemption.
- **Daily Sale Report detail — List Order Detail** (mỗi order): `Order #` (orderCode); `Sale` (service sale/refund sau Discount); `Tax`; `Tip`; `Total = Sale + Tip + Tax`.
  - Order Refund/Partial Refund: Sale/Refund là **số âm**; `Total = Sale − Discount + Tip` (âm).
- **INCOME DETAIL:** `Sale` (tổng Sale/Refund sau Discount); `Tip`; `Tax Collected` (tổng Tax); **`Total Payment = Sale + Tip + Tax Collected`**.
- **PAYMENT DETAIL:** `Card = Sale Card − Refund Card`; `Cash = Sale Cash − Refund Cash`; `Others = Sale Others − Refund Others`;
  **`Amount Collected = Card + Cash + Others`**; `Gift Card Redemption`; **`TOTAL PAYMENT = Amount Collected + Gift Card Redemption`**.

## A3. Thành phần UI thực tế (quét bằng Playwright MCP, 2026-07-06)

Ảnh: [income-daily-assets/income-daily-empty.png](income-daily-assets/income-daily-empty.png) (trạng thái ngày chưa có data — 07/06/2026)

| Thành phần                      | Vai trò                                                                        | Trạng thái                  | Ghi chú                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------ |
| Tiêu đề **Daily Sale Report**   | Nhãn màn hình                                                                  | Hoạt động                   | Góc trên bảng chart                                                                        |
| Nút **Today**                   | Reset filter về hôm nay                                                        | Hoạt động                   | URL nhận `from`/`to` = midnight → end-of-day                                               |
| Nút **calendar `07/06/2026`**   | Date-picker chọn 1 ngày                                                        | Hoạt động                   | Accessible name = `MM/DD/YYYY`                                                             |
| Card **Total Order**            | Chỉ số + %vs Yesterday                                                         | Hoạt động                   | Mô tả: _Total number of order, excluding cancel/refunds/ manual refunds_                   |
| Card **Sale**                   | Chỉ số tiền + %vs Yesterday                                                    | Hoạt động (click đổi chart) | `$0.00` khi trống; mô tả khớp spec                                                         |
| Card **Total tip**              | Chỉ số tip + %vs Yesterday                                                     | Hoạt động                   | Mô tả: _…not included in sales revenue but counted in collected amounts_                   |
| Card **Total Payment**          | Chỉ số payment + %vs Yesterday                                                 | Hoạt động                   | Mô tả: _The final revenue includes Gift Card Redemption_                                   |
| **Chart "Sale"**                | Biểu đồ theo chỉ số đang chọn                                                  | Hoạt động                   | URL `activeChart=sale`; trống → "No chart data available / Try selecting a different date" |
| Heading ngày **"Jul 06, 2026"** | Tiêu đề panel chi tiết                                                         | Hoạt động                   | Bên phải                                                                                   |
| Nút **Print**                   | In báo cáo ngày                                                                | Hoạt động (enabled)         | Kể cả khi không có data                                                                    |
| Bảng **order detail**           | Danh sách order trong ngày                                                     | Hoạt động                   | Trống → "No data available"; Order # dạng `OD\d{6}-\d+`                                    |
| Panel **Income Details**        | Sale / Tip / Tax Collected / Total Payment                                     | Hoạt động                   | Tax Collected có mô tả _(Sales tax collected, adjusted for refunds)_                       |
| Panel **Payment Details**       | Card / Cash / Others / Amount Collected / Gift Card Redemption / Total Payment | Hoạt động                   | 6 dòng, khớp spec PAYMENT DETAIL                                                           |
| Banner **connection**           | "Internet connection restored."                                                | Hoạt động                   | Liên quan Offline Mode                                                                     |

**Chi tiết chỉ số card** (khớp spec Linear):

| Card          | Giá trị trống | %-so-sánh | Nhãn so sánh |
| ------------- | ------------- | --------- | ------------ |
| Total Order   | `0`           | 100%      | vs Yesterday |
| Sale          | `$0.00`       | 0%        | vs Yesterday |
| Total tip     | `$0.00`       | 0%        | vs Yesterday |
| Total Payment | `$0.00`       | 0%        | vs Yesterday |

## A4. Nghiệp vụ & ràng buộc

- **Sale** loại trừ Tip, Tax và order **Cancel**; refund/partial refund tính giá trị âm sau Discount.
- **Total Payment** = doanh thu cuối, **có** cộng Gift Card Redemption (khác với Amount Collected chỉ gồm Card+Cash+Others).
- Công thức panel: `Income Details.Total Payment = Sale + Tip + Tax Collected` và `Payment Details.Total Payment = Amount Collected + Gift Card Redemption` — hai con số này phải khớp nhau.
- `from`/`to` (epoch) lưu trên URL → filter ngày **bền qua reload / share link** (URL persistence).
- Mọi phép so sánh %vs Yesterday dựa trên cùng chỉ số của ngày liền trước.

## A5. Trạng thái / quyền / edge case

- **Quyền:** cần **owner passcode** (mặc định `8888`) qua passcode dialog; có tùy chọn _"Do not require passcode for the next 30 minutes"_.
- **Empty state:** ngày không có order → chart "No chart data available", bảng "No data available", tất cả chỉ số `$0.00`/`0`, Print vẫn enabled.
- **Refund/Cancel:** Sale/Total của order refund là số âm; order Cancel **không** vào Sale/Tip.
- **Live delta:** chỉ số cập nhật khi có order mới trong ngày đang xem (xem TC live-delta hiện có).
- **Lưu ý UI:** helper text của mỗi card là `<p>` **luôn hiển thị** dưới heading — **không** phải tooltip hover, **không** có nút ⓘ.

## A6. Đối chiếu Linear ↔ UI thực tế (khớp / lệch)

| Mục                | Linear                                                                         | UI thực tế                                     | Kết luận                                                                                                |
| ------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 4 chỉ số card      | Orders / Sale / Total Tips / Total Payment                                     | Total Order / Sale / Total tip / Total Payment | ✅ Khớp (khác biệt nhỏ về cách viết hoa/nhãn)                                                           |
| Mô tả "Orders"     | _Total number of order, refunds, and manual refunds_                           | _excluding cancel/refunds/ manual refunds_     | ⚠️ **Lệch câu chữ** — UI ghi "excluding", spec ghi "refunds and manual refunds". Cần PO xác nhận nghĩa. |
| Income Details     | Sale / Tip / Tax Collected / Total Payment                                     | Đủ 4 dòng                                      | ✅ Khớp                                                                                                 |
| Payment Details    | Card / Cash / Others / Amount Collected / Gift Card Redemption / Total Payment | Đủ 6 dòng                                      | ✅ Khớp                                                                                                 |
| Print              | (không nêu rõ)                                                                 | Có nút Print                                   | ✅ UI bổ sung, hợp lý                                                                                   |
| Tax Collected note | _total Tax_                                                                    | _(Sales tax collected, adjusted for refunds)_  | ✅ Khớp về ý (UI diễn giải rõ hơn)                                                                      |

# PHẦN B — Quét Tiếng Việt (i18n)

## B0. Tổng quan (số liệu từ i18n-result.md / compare.json)

> **Chuỗi UI đối chiếu 40** · ❌ chưa dịch **1** · ⚠️ sai chuẩn **3** · 📐 UI vỡ **0** · ✅ thuật ngữ đúng **36** · (data bỏ qua: 144 · tổng pair 241)
> Quét **sau khi cuộn hết trang** (`scrollThroughPage`) + đối chiếu glossary bổ sung theo [VP-2252](https://linear.app/fastboy/issue/VP-2252).
> Nguồn số liệu: [reports/income-daily/compare.json](../../reports/income-daily/compare.json) (generatedAt 2026-07-06T09:25:43Z → `total 241 · missing 1 · suspect 3 · ok 36 · data 144`).
> Report trực quan: `reports/income-daily/compare.html`

## B1. ❌ Còn tiếng Anh (nhãn UI thật)

| Chuỗi (EN) | Đang hiển thị (VI)     | Nên dịch     | Ghi chú                                                                                                                       |
| ---------- | ---------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `Tip`      | `Tip` (chưa qua `t()`) | **Tiền tip** | Nhãn dòng trong panel **Income Details** (khác với card "Total tip" đã dịch = "Tổng tip"). Dev cần bọc `t()` cho label "Tip". |

## B2. ⚠️ Dịch chưa đúng chuẩn

| Hiện tại (VI)       | Gốc (EN) | Nên dùng (chuẩn) | Issue                                                                                                                                                                                                                    |
| ------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Bán hàng` (×3 chỗ) | `Sale`   | **Doanh thu**    | [VP-2268](https://linear.app/fastboy/issue/VP-2268) / [VP-2259](https://linear.app/fastboy/issue/VP-2259) — "Sale" dịch không nhất quán: card + Chi tiết thu nhập dùng "Bán hàng" nhưng tiêu đề màn là "Doanh thu ngày". |

**3 vị trí "Sale" → "Bán hàng"** (theo compare.json):

- `src/routes/_app/incomes/income-daily/-income-daily-statistics/income-daily-statistics-card.tsx:69` (card)
- `src/routes/_app/incomes/income-daily/-income-daily/income-daily.tsx:81` (heading)
- `src/routes/_app/incomes/income-daily/-income-daily-detail/income-daily-detail-row.tsx:44` (dòng bảng)

## B3. ✅ Đã dịch đúng (mẫu)

| EN                                                              | VI                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| Daily Sale Report                                               | Doanh thu ngày                                         |
| Total Order                                                     | Tổng đơn                                               |
| Total number of order, excluding cancel/refunds/ manual refunds | Tổng số đơn, không gồm đơn huỷ/hoàn tiền/hoàn thủ công |
| vs Yesterday                                                    | so với hôm qua                                         |
| Today                                                           | Hôm nay                                                |
| Order History                                                   | Lịch sử đơn hàng                                       |
| Scanner                                                         | Quét mã                                                |
| Internet connection restored.                                   | Đã kết nối internet trở lại.                           |

## B4. 📐 UI vỡ (chỉ báo cáo)

> Không phát hiện: `xOverflow = 0px`, không có chuỗi bị cắt (`clipped = []`). Bản dịch VI dài hơn EN nhưng layout 2 cột vẫn chịu được.

**Ghi chú / đề xuất bổ sung glossary:**

- Chuỗi lẻ **"Tip"** (đứng một mình) xuất hiện ở cả income-daily và income-summary — nhiều khả năng cùng một component panel dùng label cứng. Fix một chỗ có thể xử lý cả hai màn.
- Glossary hiện đã đủ cho màn này; không cần bổ sung.

# PHẦN C — Test cases

> Màn này **đã có code test đầy đủ** (page object + 44 TC). Bảng dưới **tài liệu-hoá** bộ TC đang chạy (mỗi TC map 1-1 với một `test()` trong [tests/regression/incomes/daily-sale-report/](../../tests/regression/incomes/daily-sale-report/)).

## Cách chạy

```bash
npx playwright test tests/regression/incomes/daily-sale-report
```

## Bảng test case (đã hiện thực trong code)

| ID          | Tiêu đề                                                 | Tiền điều kiện        | Các bước                  | Kết quả mong đợi                                                            | Loại            | Ưu tiên | File                |
| ----------- | ------------------------------------------------------- | --------------------- | ------------------------- | --------------------------------------------------------------------------- | --------------- | ------- | ------------------- |
| TC-1        | Default filter = Today, full layout renders             | Passcode đã mở        | Mở /incomes/income-daily  | URL có `from=<today midnight>`; 4 card + panel hiển thị                     | regression      | P1      | defaults            |
| TC-3        | Card description — Total Order                          | như trên              | Đọc `<p>` dưới heading    | Đúng text "Total number of order, excluding cancel/refunds/ manual refunds" | regression      | P2      | defaults            |
| TC-5        | Card description — Sale                                 |                       | Đọc `<p>`                 | Đúng text mô tả Sale                                                        | regression      | P2      | defaults            |
| TC-7        | Card description — Total Tip                            |                       | Đọc `<p>`                 | Đúng text mô tả Tip                                                         | regression      | P2      | defaults            |
| TC-9        | Card description — Total Payment                        |                       | Đọc `<p>`                 | Đúng text mô tả Total Payment                                               | regression      | P2      | defaults            |
| TC-10       | Mỗi card có nhãn `<n>% vs Yesterday`                    |                       | Đọc từng card             | Cả 4 card có badge % + "vs Yesterday"                                       | regression      | P2      | defaults            |
| TC-14       | Order # đầu tiên đúng format `OD\d{6}-\d+`              | Ngày có order         | Đọc cell Order # đầu bảng | Khớp regex                                                                  | regression      | P1      | defaults            |
| TC-25       | Nút Print enabled & click được                          |                       | Click Print               | Không lỗi, dialog in mở                                                     | regression      | P2      | defaults            |
| TC-2/4/6/8  | Refund/Cancel: Sale/Total âm, Cancel không vào Sale     | Ngày có refund/cancel | Đọc bảng + panel          | Refund là số âm; order Cancel loại khỏi Sale/Tip                            | regression      | P1      | refund-cancel       |
| TC-8        | Total Payment nhất quán qua lifecycle (create → cancel) |                       | Theo dõi 1 order          | Total Payment cập nhật đúng                                                 | regression      | P1      | refund-cancel       |
| TC-22/23/37 | Refund/cancel edge trên panel                           |                       |                           | Panel phản ánh đúng                                                         | regression      | P2      | refund-cancel       |
| TC-11       | Mặc định chart = Sale khi load lần đầu                  |                       | Mở màn                    | `activeChart=sale`                                                          | regression      | P2      | chart-switching     |
| TC-27/28/29 | Click card đổi chart (Order/Tip/Payment)                |                       | Click từng card           | URL `activeChart=` đổi tương ứng                                            | regression      | P2      | chart-switching     |
| TC-30       | Chỉ card được click mang trạng thái selected            |                       | Click 1 card              | Chỉ card đó có class selected                                               | regression      | P2      | chart-switching     |
| TC-12       | Chọn hôm qua → load ngày hôm qua                        |                       | gotoDate(yesterday)       | Data + URL = hôm qua                                                        | regression      | P1      | date-filter         |
| TC-13       | Ngày không order → $0.00 mọi nơi                        |                       | Chọn ngày trống           | Tất cả `$0.00`/`0`                                                          | regression      | P1      | date-filter         |
| TC-39       | Ngày quá khứ khớp snapshot GraphQL settled              |                       | gotoDate(past)            | Bảng khớp snapshot                                                          | regression      | P1      | date-filter         |
| TC-15/17    | Cell Sale & Tip parse ra money hợp lệ                   | Ngày có data          | Đọc cell                  | Parse cents thành công                                                      | regression      | P2      | orders-table        |
| TC-18       | Total = Sale + Tip + Tax trên mỗi dòng                  |                       | Đọc từng dòng             | Đẳng thức đúng                                                              | regression      | P1      | orders-table        |
| TC-16       | Ngày settled tách tax vào Income Detail Tax Collected   |                       | Đọc panel                 | Tax Collected = tổng tax                                                    | regression      | P1      | payment-types       |
| TC-24       | Payment buckets Card/Cash/Others                        |                       | Đọc Payment Details       | Khớp GraphQL                                                                | regression      | P1      | payment-types       |
| TC-19/20/21 | Income/Payment Details khớp GraphQL + reconcile         |                       | Đọc panel + so API        | Trùng khớp; live: tip vào Total Tip & Amount Collected chứ không vào Sale   | regression      | P1      | math + live-delta   |
| TC-26       | Mọi money render dạng `$#,##0.00`                       |                       | Quét toàn màn             | Đúng định dạng                                                              | regression      | P2      | math                |
| TC-31       | Reload giữ `activeChart` + `from/to` trong URL          |                       | Reload                    | UI phản ánh đúng URL                                                        | regression      | P2      | url-persistence     |
| TC-32       | Mở route hiện passcode dialog trước khi render data     | Chưa mở passcode      | Mở route                  | Dialog passcode chặn data                                                   | regression/auth | P1      | permission          |
| TC-33       | Passcode sai → dialog vẫn mở, không unlock              |                       | Nhập sai                  | Dialog còn, data ẩn                                                         | regression/auth | P1      | permission          |
| TC-34       | Tick "Do not require passcode 30m" bỏ qua lần sau       |                       | Tick + nhập               | Lần sau không hỏi                                                           | regression/auth | P2      | permission          |
| TC-35       | Click 1 dòng mở Order Details dialog + set `?orderId`   | Ngày có order         | Click dòng                | Dialog mở, URL có orderId                                                   | regression      | P1      | order-detail-dialog |
| TC-36       | Đóng dialog qua ESC / × / mở dòng khác                  |                       | ESC / click × / dòng khác | Dialog đóng, orderId clear/replace                                          | regression      | P2      | order-detail-dialog |
| TC-40       | Skeleton hiện khi đang load                             |                       | Mở màn                    | `[data-slot=skeleton]` xuất hiện                                            | regression      | P3      | edge-cases          |
| TC-41       | Error fallback khi GraphQL 500                          | Mock 500              | Mở màn                    | Hiện "Failed to load…"                                                      | regression      | P2      | edge-cases          |
| TC-42       | %vs Yesterday không Infinity/NaN khi hôm qua = 0        |                       | Chọn ngày sau ngày trống  | Badge hiển thị hợp lệ                                                       | regression      | P2      | edge-cases          |
| TC-43       | Split-tender order hiện qua Card/Cash/Gift Card         | Mock split            | Đọc Payment Details       | Chia đúng bucket                                                            | regression      | P2      | mocked-scenarios    |
| TC-44       | Timezone boundary — UI theo merchant-local day          |                       | gotoDate quanh biên TZ    | Cửa sổ ngày đúng theo shop TZ                                               | regression      | P1      | mocked-scenarios    |

**Tổng: 44 test (TC-1 … TC-44)**, chia 13 file spec theo cluster.

### Ghi chú i18n / quyền (test)

- Toàn bộ route bọc bởi `PermissionProtectedRoute` (passcode owner). Xem `PasscodeDialog`.
- i18n coverage cho màn này được xử lý ở skill `i18n-vietnamese-scan` — kết quả đã hợp nhất vào PHẦN B.

## Nguồn tham chiếu

- Spec/glossary: docs/i18n/income-daily-translation-map.md (nếu có, giữ riêng)
- Luồng code-gen (tách riêng): [codegen-flow/income-daily-flow.md](../codegen-flow/income-daily-flow.md) · [codegen-detail/income-daily-detail.md](../codegen-detail/income-daily-detail.md)
- Test/helper + dữ liệu thô JSON: [reports/income-daily/compare.json](../../reports/income-daily/compare.json)
- Page object hiện có: [src/pages/pos/DailySaleReportPage.ts](../../src/pages/pos/DailySaleReportPage.ts)
- Test suite hiện có: [tests/regression/incomes/daily-sale-report/](../../tests/regression/incomes/daily-sale-report/) (TC01–TC44)
- Spec Linear (offline): [docs/linear/income-report.md](../linear/income-report.md) — mục **Daily Sale Report**.
