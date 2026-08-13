# Dashboard test — mô tả chi tiết & cách chạy

Tài liệu này mô tả hệ thống dashboard hiển thị kết quả test Playwright của dự án, gồm 3 phần code liên quan và các lệnh npm để chạy chúng.

## 1. Tổng quan luồng

```
npm run dashboard
   │
   ├─ 1. Chạy toàn bộ test suite Playwright (ENV=local)
   │      → sinh reports/json/results.json (JSON reporter) + screenshot lỗi trong test-results/
   │
   ├─ 2. Build dashboard từ results.json
   │      → scripts/build-dashboard.mjs đọc results.json, tổng hợp số liệu,
   │        copy screenshot vào reports/dashboard/assets/,
   │        ghi ra reports/dashboard/index.html (React, tự chứa) + data.json
   │
   └─ 3. Tự mở reports/dashboard/index.html bằng trình duyệt mặc định
```

Với PR gate (`npm run test:pr`) luồng có thêm một bước gộp, vì PR gate là **hai
lần gọi Playwright** chứ không phải một:

```
npm run test:pr   (= node scripts/run-pr-dashboard.mjs)
   │
   ├─ 1. Kiểm tra app đang chạy (scripts/check-server.mjs)
   │
   ├─ 2. Lane "fast"  : npm run test:fast   với REPORT_SLICE=fast
   │      → results-fast.json  + timing-fast.json  + reports/html-fast  + test-results-fast/
   │
   ├─ 3. Lane "serial": npm run test:serial với REPORT_SLICE=serial
   │      → results-serial.json + timing-serial.json + reports/html-serial + test-results-serial/
   │      (chạy cả khi lane fast đỏ — dùng --bail nếu muốn dừng sớm)
   │
   ├─ 4. build-dashboard.mjs GỘP 2 lane + 2 file timing thành 1 dashboard
   │
   └─ 5. Mở dashboard; exit code = lane tệ nhất (vẫn là cổng gate)
```

`REPORT_SLICE` (xem `playwright.config.ts`) là mấu chốt: mọi đường dẫn reporter
trong config là **một file cố định**, và Playwright còn xoá sạch `outputDir` khi
khởi động — nên trước đây lane serial ghi đè `results.json` và xoá luôn screenshot
của 259 test lane fast. Đặt `REPORT_SLICE=<lane>` sẽ đẩy artifact của lane đó sang
đường dẫn riêng để cả hai cùng tồn tại và gộp được.

Có 2 loại dashboard trong repo:

| File                                                                      | Dùng cho                                                                                                  | Input                                                     | Output                                |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------- |
| `scripts/build-dashboard.mjs` + `scripts/run-dashboard.mjs`               | Toàn bộ suite Playwright (chạy `npm run dashboard`)                                                       | `reports/json/results.json`                               | `reports/dashboard/index.html`        |
| `scripts/build-dashboard.mjs` + `scripts/run-pr-dashboard.mjs`            | PR gate 2 lane (chạy `npm run test:pr`)                                                                   | `results-fast.json` + `results-serial.json` + timing JSON | `reports/dashboard/index.html`        |
| `src/domains/reporting/dashboard.ts` (`renderDashboard`/`writeDashboard`) | Report riêng theo từng màn hình (dùng trong skill `screen-suite-report`, spec "1 test lớn" kiểu màn Home) | mảng `CheckResult[]` từ `@domains/reporting/checkReport`  | `reports/<slug>/dashboard/index.html` |

## 2. `scripts/run-dashboard.mjs` — lệnh điều phối "chạy test + mở dashboard"

- Là entry point cho `npm run dashboard`.
- Dùng `spawnSync` để:
  1. Chạy `npx cross-env ENV=local playwright test <extraArgs>` — chạy toàn bộ suite. Nếu test fail (exit code ≠ 0) **vẫn tiếp tục** build dashboard thay vì dừng lại (mục đích: luôn xem được báo cáo dù pass hay fail).
  2. Gọi `node scripts/build-dashboard.mjs` để build lại HTML từ kết quả JSON vừa chạy.
  3. Mở file `reports/dashboard/index.html` bằng lệnh hệ điều hành tương ứng (`start` trên Windows, `open` trên macOS, `xdg-open` trên Linux).
- Nhận thêm tham số Playwright truyền qua, ví dụ chỉ chạy nhóm `@smoke`:
  ```
  npm run dashboard -- --grep @smoke
  ```

## 3. `scripts/build-dashboard.mjs` — sinh HTML dashboard từ JSON report

Không tự chạy test — chỉ đọc file JSON reporter đã có sẵn. Nếu không có file nào sẽ báo lỗi tiếng Việt và thoát (gợi ý chạy `npm run test:pr` / `npm run dashboard` trước).

**Input**: nhận danh sách file JSON qua tham số (`node scripts/build-dashboard.mjs a.json b.json`) — đây là cách `run-dashboard.mjs` và `run-pr-dashboard.mjs` gọi. Không có tham số thì tự dò `reports/json/results*.json`, chỉ giữ các file nằm trong cùng "cửa sổ" thời gian với file mới nhất (mặc định 3h, đổi bằng `DASHBOARD_STALE_HOURS`) và **in ra** file nào bị bỏ vì cũ — để một lane bị loại không bao giờ trông giống như "chưa từng chạy".

Tên lane suy ra từ tên file: `results-fast.json` → lane `fast`, `results.json` → lane `all`. Mỗi lane tự tìm file timing tương ứng (`reports/timing/timing-<lane>.json`) và HTML report tương ứng (`reports/html-<lane>/`).

Các bước xử lý chính:

1. **Đọc & duyệt cây kết quả (`walk`)**: đệ quy qua `suite.specs[].tests[].results[]` của Playwright JSON reporter để lấy trạng thái cuối cùng của mỗi test (`passed` / `failed` / `skipped`, tính cả `timedOut`/`interrupted` là `failed`).
2. **Xác định "feature"** (`featureOf`): suy ra tên tính năng từ đường dẫn file test, ví dụ `tests/e2e/orders/foo.spec.ts` → `orders`; nếu không khớp category (`e2e/regression/smoke/api`) thì lấy phần đầu path.
3. **Trích lỗi & vị trí lỗi**: lấy `error.message` (đã strip mã màu ANSI) và `error.location` (file:line) của lần chạy cuối để hiện trong card "test fail".
4. **Copy screenshot**: nếu attachment có tên `screenshot`, copy file ảnh (định danh bằng hash MD5 từ file+title+project) vào `reports/dashboard/assets/`, tránh trùng tên.
5. **Tổng hợp thống kê**: đếm tổng/pass/fail/skip toàn cục và theo từng feature (`byFeature`), sort feature nhiều fail nhất lên đầu.
6. **Gộp lane & khử trùng lặp**: một test logic = `file|suite|title|project`. Project `pos-setup` chạy ở **cả hai** lane nên xuất hiện 2 lần — chỉ giữ 1 dòng, ghi nhớ mọi lane đã chạy nó, và **fail thắng pass** (setup hỏng ở lane serial không được bị bản xanh của lane fast che đi).
7. **Gộp timing** (`perf`): đọc `timing-<lane>.json` do `src/reporters/TimingReporter.ts` sinh ra, rồi **cộng** wall clock của các lane — vì 2 lane chạy nối tiếp nên thời gian dev thực sự phải chờ là tổng, không phải max. Hiệu suất song song tính lại từ tổng (`aggregate ÷ wall`), không lấy trung bình 2 lane (bình quân một lane 8 worker với một lane 1 worker là vô nghĩa). Long pole = test đơn chậm nhất trên mọi lane.
8. **Ghi `data.json`**: dump toàn bộ dữ liệu (stats, lanes, perf, features, tests) ra `reports/dashboard/data.json` để tham khảo/dùng lại nếu cần.
9. **Sinh `index.html`**: một trang HTML **tự chứa** (không cần server) chứa:
   - Dữ liệu nhúng trực tiếp `window.__DATA__ = {...}` (không cần fetch).
   - React 18 UMD tải qua CDN unpkg (`react.production.min.js`, `react-dom.production.min.js`).
   - Toàn bộ UI viết bằng `React.createElement` (không JSX, không cần build step) ngay trong thẻ `<script>`:
     - 4 stat card: Tổng số / Pass / Fail / Skip.
     - Khối **"Hiệu năng & thời lượng"** (`PerfPanel`) — chính là block console của `TimingReporter` đưa lên giao diện: Wall clock vs ngân sách (badge TRONG/VƯỢT NGÂN SÁCH ngay trên header), hiệu suất song song, long pole, % setup/teardown, % thời gian bị đốt bởi test không pass, cảnh báo khi skip > 25% (tín hiệu **độ phủ**, không phải thời lượng), bảng theo lane (kèm link HTML report từng lane), bảng test chậm nhất (thanh xanh = tổng, thanh tím = phần hook) và bảng file tốn thời gian nhất.
     - Bảng "Theo tính năng" với thanh progress bar pass/fail/skip theo màu.
     - Danh sách card chi tiết cho từng test fail (tiêu đề, feature, file:line, message lỗi, screenshot, lane, `timedOut` phân biệt với `failed`).
     - Bảng toàn bộ test case, có tab lọc All/Passed/Failed/Skipped + tab lọc theo lane (chỉ hiện khi có ≥2 lane) + ô tìm kiếm theo tên/file/feature, thumbnail ảnh click để phóng to (component `Lightbox`).

Có thể build lại (không chạy test) bằng:

```
node scripts/build-dashboard.mjs
```

## 4. `src/domains/reporting/dashboard.ts` — dashboard dạng "gallery" cho report theo từng màn hình

Dùng trong flow của skill `screen-suite-report` (gộp toàn bộ test case của 1 màn hình thành 1 spec test lớn, mỗi case là 1 `test.step`).

- `renderDashboard(results: CheckResult[], meta: CheckReportMeta): string`
  - Nhận danh sách `CheckResult` (từ `@utils/checkReport`, mỗi phần tử có `id`, `title`, `status: pass|fail|skip`, `detail?`, `shot?` là đường dẫn ảnh) và `meta` (tên màn hình, route, thời điểm sinh).
  - Escape HTML thủ công (`escapeHtml`) để chống XSS khi nhúng title/detail của test vào HTML.
  - Sinh một trang HTML tĩnh (không dùng React, chỉ CSS + 1 đoạn `<script>` thuần JS nhỏ để lọc tab All/Pass/Fail/Skip bằng cách toggle class `hide`).
  - Giao diện dạng lưới card (grid), mỗi card gồm ảnh chụp màn hình + badge trạng thái + tiêu đề + chi tiết, theo theme tối (dark) khác với dashboard suite tổng ở trên (theme sáng).
- `writeDashboard(slug, results, meta)`
  - Tạo thư mục `reports/<slug>/dashboard/`, ghi file `index.html` bằng `renderDashboard`, trả về `{ html, htmlPath }`.
  - Được các spec kiểu "one big test" (ví dụ màn Home) gọi sau khi chạy xong tất cả `test.step` để xuất report riêng cho màn đó.

## 5. Các lệnh chạy dashboard

| Lệnh                                                             | Ý nghĩa                                                                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:pr`                                                | **PR gate + dashboard**: chạy lane fast rồi lane serial (mỗi lane có artifact riêng), gộp thành 1 dashboard rồi tự mở. Exit code = lane tệ nhất.        |
| `npm run test:pr -- --no-open`                                   | Như trên nhưng không mở trình duyệt (tự động bật khi có biến `CI`).                                                                                     |
| `npm run test:pr -- --bail`                                      | Dừng sau lane đầu tiên fail (hành vi `&&` cũ). Vẫn dựng dashboard cho lane đã chạy.                                                                     |
| `npm run test:pr:lanes`                                          | Chuỗi `test:fast && test:serial` thuần, không slice, không dashboard — giữ lại cho CI/script cũ.                                                        |
| `npm run report:fast` / `npm run report:serial`                  | Mở HTML report gốc của từng lane (`reports/html-fast`, `reports/html-serial`) khi cần trace/step detail.                                                |
| `npm run dashboard`                                              | Chạy toàn bộ suite Playwright (`ENV=local`) rồi build + tự mở dashboard tổng (`reports/dashboard/index.html`), dù test pass hay fail.                   |
| `npm run dashboard -- --grep @smoke`                             | Chỉ chạy các test gắn tag `@smoke` rồi build dashboard (mọi tham số Playwright khác cũng truyền qua tương tự, ví dụ `-- tests/e2e/orders`).             |
| `npm run dashboard:build` (= `node scripts/build-dashboard.mjs`) | Chỉ build lại dashboard từ `reports/json/results.json` đã có sẵn, **không** chạy lại test — dùng khi muốn refresh dashboard sau khi đã có kết quả JSON. |

Yêu cầu: project Playwright phải có JSON reporter ghi ra `reports/json/results.json` (đã cấu hình sẵn trong `playwright.config`), và test cần chụp screenshot khi fail để dashboard hiện được ảnh minh hoạ.
