---
name: testcase-to-code
description: >-
  Đọc một file test case .md đã có sẵn (thường sinh bởi skill screen-test-generator
  hoặc linear-spec-testcase, dạng docs/screens/<man-hinh>/<man-hinh>-test-cases.md)
  và sinh code Playwright thật — page object (nếu thiếu) + spec test — theo đúng
  convention hiện có của repo (import alias @fixtures/@pages/@utils, Tag từ
  @/types/testTags, class kế thừa BasePage, naming TC-*). Dùng khi user nói
  "sinh code từ file test case <đường dẫn>", "gen code cho <man-hinh> từ file .md
  đã có", "code hoá test case màn <X>". KHÔNG tự quét UI hay tự nghĩ ra test case
  mới — chỉ dịch những gì đã có trong file .md thành code.
---

# Skill — Sinh code Playwright từ file Test Cases (.md)

Mục tiêu: nhận một file `.md` liệt kê test case đã có sẵn, và **dịch nguyên** từng
case trong đó thành code Playwright chạy được, khớp convention của repo. Skill này
không khám phá UI mới và không thêm test case ngoài những gì file `.md` đã liệt kê —
nếu thấy thiếu case quan trọng, báo cho user thay vì tự bịa thêm.

## Đầu vào

- Đường dẫn tới file `.md` test case, ví dụ `docs/screens/order-pending/order-pending-test-cases.md`.
  Nếu user chỉ nói tên màn hình, tìm bằng `docs/screens/<kebab>/<kebab>-test-cases.md`.
  Nếu không thấy file → nói rõ cho user và gợi ý chạy `screen-test-generator` trước.

## Đầu ra

- Page object mới/cập nhật: `src/pages/<nhom>/<Man>Page.ts` (chỉ khi thiếu selector/action
  cần dùng — không viết lại page object đã đủ).
- Spec: `tests/regression/<nhom>/<man-hinh>/TC-*.spec.ts` (hoặc thư mục con phù hợp nếu
  file `.md` phân nhóm case theo chủ đề, xem cách `tests/regression/incomes/*` tách file
  theo nhóm case thay vì dồn hết vào 1 file).

## Các bước

1. **Đọc file `.md`** — lấy toàn bộ bảng Test Cases (ID, tiền điều kiện, các bước, kết quả
   mong đợi) và mọi selector/role/label đã ghi trong mục "Thành phần UI thực tế" nếu có.
   Đây là nguồn sự thật duy nhất — không đoán thêm hành vi ngoài những gì file mô tả.

2. **Khảo sát convention hiện có trước khi viết** (bắt buộc, vì mỗi vùng màn hình có thể
   khác nhau đôi chút):
   - Tìm page object gần giống trong `src/pages/pos/` hoặc `src/pages/settings/` — xem
     cách import (`BasePage`), cấu trúc locator (`getByRole`, `data-testid`), cách đặt
     tên method (`goto()`, `isXxxEnabled()`, `setXxx()`).
   - Tìm spec gần giống trong `tests/regression/**/*.spec.ts` (đặc biệt nhóm cùng chủ đề,
     ví dụ `tests/regression/settings/*` cho màn settings, `tests/regression/incomes/*`
     cho báo cáo thu nhập) — xem cách import `@fixtures/index`, `Tag` từ `@/types/testTags`,
     cấu trúc `test.describe` + `test.beforeEach`/`afterEach`, cách đặt tên test
     (`TC-<MAN>-01: mô tả ngắn`).
   - Kiểm tra `tsconfig.json` → `compilerOptions.paths` nếu cần dùng alias chưa quen.

3. **Viết/cập nhật page object** (nếu route/thành phần chưa có class tương ứng):
   - Kế thừa `BasePage`, chỉ chứa locator + action (không assert trong page object).
   - Dùng đúng selector đã ghi trong file `.md` (ưu tiên `getByRole`/`getByText`); nếu file
     `.md` không ghi rõ selector cho một bước, đọc phần Playwright MCP snapshot nếu còn
     hoặc hỏi user thay vì đoán.

4. **Viết spec** `tests/regression/<nhom>/<man-hinh>/TC-*.spec.ts`:
   - Mỗi dòng trong bảng Test Cases → đúng một `test(...)`, tên test bắt đầu bằng ID
     (`TC-XXX-01: ...`) để dễ đối chiếu ngược lại file `.md`.
   - Dùng fixtures từ `@fixtures/index`, gắn `Tag.REGRESSION` (hoặc tag phù hợp nếu file
     `.md` có cột "Loại"/"Ưu tiên" chỉ định khác).
   - Comment đầu file trỏ về file test case nguồn (`Test cases: docs/screens/.../...-test-cases.md`),
     theo mẫu các spec sẵn có (ví dụ `tests/regression/settings/TC-passcode-setting.spec.ts`).

5. **Kiểm tra nhanh:**
   - Chạy `npx playwright test <file>.spec.ts --list` để đảm bảo file parse được, không lỗi
     import/alias.
   - Nếu có thể chạy thật (app đang bật), chạy thử vài case tiêu biểu để phát hiện selector
     sai sớm; nếu không chạy được, nói rõ cho user là mới kiểm tra tĩnh (list/typecheck).
   - Chạy `tsc --noEmit` hoặc lint nếu nhanh, sửa lỗi phát sinh.

6. **Báo cáo.** Liệt kê: file `.md` nguồn, page object đã tạo/sửa, spec đã tạo, số test
   case đã map, case nào (nếu có) chưa đủ thông tin để sinh code chính xác và cần user
   bổ sung, cách chạy (`npx playwright test <path>`).

## Ràng buộc

- KHÔNG tự quét UI hoặc tự thêm test case mới ngoài file `.md` — nếu thấy case còn thiếu
  hoặc mơ hồ, dừng lại hỏi hoặc ghi chú trong báo cáo, đừng tự sáng tác hành vi.
  Nếu cần quét lại UI để bổ sung, gợi ý user chạy skill `screen-test-generator` trước.
- Bám sát convention có sẵn: import alias (`@fixtures`, `@pages`, `@utils`, `@/`), naming
  `TC-*`, page object kế thừa `BasePage`. Không bịa selector — mọi locator phải bắt nguồn
  từ file `.md` hoặc từ việc đọc code UI thật (component liên quan trong `src/`).
  Xem mẫu ở `tests/regression/settings/TC-passcode-setting.spec.ts` và
  `src/pages/settings/AccessibilitySettingsPage.ts`.
- Sau khi thêm spec mới, nhắc user chạy skill `test-commands-sync` để đồng bộ lại
  `docs/test-commands.md`.
