---
name: screen-test-generator
description: >-
  Dùng MCP Playwright quét (scan) trực tiếp MỘT màn hình VOLT POS đang chạy trên
  trình duyệt — không cần đọc Linear/spec nào cả — rồi viết DUY NHẤT một file
  docs/screens/<man-hinh>/<man-hinh>-test-cases.md liệt kê đầy đủ Test Cases
  (ID, tiền điều kiện, các bước, kết quả mong đợi). KHÔNG sinh code, chỉ sinh
  file .md. Dùng khi user nói "quét màn <X> ra test case", "gen test case cho
  màn <X> bằng playwright mcp", "tạo file test case cho tính năng <X>" mà không
  nhắc tới Linear/document nào. Nếu user có nhắc tới Linear/spec gốc, dùng skill
  linear-spec-testcase thay vì skill này.
---

# Skill — Quét màn hình bằng Playwright MCP → file Test Cases (.md)

Mục tiêu: từ tên/route một màn hình VOLT POS, tự khám phá tính năng bằng cách
**quét UI thật** qua MCP `playwright` (không có tài liệu gốc nào để đối chiếu),
rồi viết ra **một file `.md` duy nhất** liệt kê đủ test case. Đây là bước sinh
test case thuần — việc sinh code Playwright thuộc về skill riêng `testcase-to-code`.

## Đầu vào

- Tên màn hình / tính năng / route (ví dụ: "Order Pending", "/incomes/daily-sale-report").
  Lấy từ `args` hoặc câu hỏi của user. Nếu chưa rõ màn nào → hỏi lại đúng 1 câu.

## Đầu ra (BẮT BUỘC)

- **Đúng một** file: `docs/screens/<kebab-ten-man-hinh>/<kebab-ten-man-hinh>-test-cases.md`
- KHÔNG tạo page object, KHÔNG tạo spec, KHÔNG sinh code trong skill này.

## Các bước

1. **Mở màn hình bằng Playwright MCP.**
   - Dùng `mcp__playwright__browser_navigate` tới base URL (xem `playwright.config.ts` /
     `configs/`) rồi tới route của màn hình. Đăng nhập nếu cần (xem `tests/**/*.setup.ts`
     để biết luồng đăng nhập/passcode hiện có).
   - Dùng `mcp__playwright__browser_snapshot` để lấy accessibility tree — đây là nguồn
     sự thật cho tên nút/label/role, không đoán mò.

2. **Quét ĐẦY ĐỦ trước khi ghi nhận bất kỳ thành phần nào.** UI chỉ mount phần đang
   thấy trên viewport, nên bỏ sót là lỗi thường gặp nhất khi quét bằng MCP:
   - Cuộn hết trang (window + mọi khung có `overflow: auto/scroll`) từ trên xuống dưới
     rồi về đầu — nội dung lazy-load hoặc nằm dưới màn hình mới render ra DOM.
   - Mở mọi khối thu gọn (`aria-expanded="false"`, nút "Show more" / "Xem thêm").
   - Mở các panel/dialog chi tiết bằng cách click thử vào 1 dòng dữ liệu, 1 hàng bảng,
     1 item — rất nhiều field/nút chỉ xuất hiện sau bước này (ví dụ dialog chi tiết đơn,
     bảng con trong drawer).
   - Thử các trạng thái khác nhau khi hợp lý: rỗng (chưa có dữ liệu), có filter, có lỗi
     validation, phân trang trang 2+, quyền khác nhau nếu màn có gate theo role/passcode.

3. **Khám phá luồng & hành vi** bằng cách tương tác thật (click, fill, select) qua
   `mcp__playwright__browser_click` / `browser_type` / `browser_select_option` /
   `browser_fill_form`, quan sát kết quả qua `browser_snapshot` sau mỗi bước:
   - Luồng chính (happy path): tạo/sửa/xoá, filter, chuyển tab, submit form.
   - Validation: field bắt buộc, sai định dạng, giá trị biên (0, âm, quá dài).
   - Thông báo lỗi/thành công (toast, inline message).
   - Trạng thái: loading, rỗng, disabled, đã chọn/chưa chọn.
   - Quyền/gate nếu có (passcode dialog, role-based visibility).

4. **Viết file `docs/screens/<kebab>/<kebab>-test-cases.md`** theo cấu trúc:

   ```markdown
   ---
   title: <Tên màn hình>
   source: playwright-mcp-scan
   scanned-at: <YYYY-MM-DD>
   ---

   # <Tên màn hình> — Test Cases

   ## Feature Overview

   ### 1. Mục tiêu & phạm vi

   ### 2. Thành phần UI thực tế (quét bằng Playwright MCP)

   > bảng: Thành phần | Vai trò (role/label) | Trạng thái | Ghi chú

   ### 3. Luồng chính đã quan sát

   ### 4. Nghiệp vụ & ràng buộc suy ra từ UI

   ### 5. Trạng thái / quyền / edge case

   ## Test Cases

   | ID          | Tiêu đề | Tiền điều kiện | Các bước  | Kết quả mong đợi | Ưu tiên |
   | ----------- | ------- | -------------- | --------- | ---------------- | ------- |
   | TC-<MAN>-01 | ...     | ...            | 1... 2... | ...              | P1      |
   ```

   Liệt kê **đủ** case: happy path, validation, edge case, trạng thái rỗng/lỗi/loading,
   quyền nếu có. Mỗi case phải đủ chi tiết để sau này map 1-1 sang một `test()` khi
   dùng skill `testcase-to-code` — ghi rõ selector/role/label thực tế đã thấy khi quét
   (ưu tiên cách gọi kiểu `getByRole('button', { name: '...' })`, `getByText('...')`)
   để bước sinh code không phải đoán lại.

5. **Báo cáo.** Nêu đường dẫn file `.md` đã tạo, số lượng test case, và bất kỳ hành vi
   bất ngờ/không rõ ràng nào gặp khi quét (ví dụ: nút không phản hồi, trạng thái lỗi
   không có thông báo) để user biết trước khi sinh code.

## Ràng buộc

- Ghi vào **đúng một** file `docs/screens/<slug>/<slug>-test-cases.md`. Nếu file đã tồn
  tại (ví dụ do skill `linear-spec-testcase` tạo trước đó), hỏi user có muốn ghi đè hay
  đổi tên trước khi tiếp tục.
- KHÔNG sinh code trong skill này (không tạo page object, không tạo spec) — đó là việc
  của skill `testcase-to-code`.
- Không bịa selector hay hành vi — mọi thứ ghi vào file phải bắt nguồn từ kết quả quét
  MCP thật (snapshot/click quan sát được), không suy đoán từ tên màn hình.
- Match giọng văn tài liệu hiện có trong `docs/` (tiếng Việt, có frontmatter).
