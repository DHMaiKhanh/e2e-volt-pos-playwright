# Tối ưu thời gian chạy test suite

**Ngày ghi nhận:** 2026-08-10
**Hiện trạng:** 300 test case chạy hết ~1h18p (78 phút) → trung bình ~15.6s/case. Nếu giữ nguyên cách chạy, scale lên 1000 test case ước tính ~4.3 giờ.

Kết quả lần chạy gần nhất: 172 pass / 75 fail / 53 skip.

## Nguyên nhân chính (đã xác minh trong repo)

1. **`workers: 1` cố định trong `playwright.config.ts`** — comment trong config nói rõ lý do: Volt POS share backend state giữa các session, 2 workers gây race condition trên đơn hàng active của cùng 1 staff. Đây là nguyên nhân lớn nhất khiến suite chạy tuần tự hoàn toàn.
2. **109 chỗ dùng `waitForTimeout()` (sleep cứng)** trong `src/` và `tests/` — mỗi sleep thường 1-3s, cộng dồn qua hàng trăm chỗ là phần lớn thời gian "chết" không cần thiết.
3. **`retries: isCI ? 1 : 0`** — trên CI mỗi test fail sẽ chạy lại thêm 1 lần, tăng gấp đôi thời gian cho 75 case đang fail.
4. **Setup lại từ đầu mỗi test** (đăng nhập/passcode gate, mở lại trang) — không thấy dùng `storageState` để tái sử dụng session đã login.
5. Nhóm `pos` (30 skip) và `incomes` (20 skip) là 2 nhóm skip nhiều nhất — nên kiểm tra có phải đang bị timeout/chờ điều kiện trước khi skip, gây tốn thời gian trước khi bị đánh dấu skip.

## Việc cần fix (ngày mai)

- [ ] **Không thể tăng workers bừa** vì race condition state chung backend. Cần 1 trong 2 hướng:
  - Cách ly dữ liệu test theo staff/shop riêng cho mỗi worker (mỗi worker dùng 1 tài khoản/shop khác nhau) rồi mới bật `workers > 1`.
  - Hoặc parallel hoá theo **shard** ở cấp CI (mỗi shard chạy trên máy/container riêng, vẫn workers=1 trong mỗi shard) — không đổi logic test, chỉ chia việc.
- [ ] Rà soát và thay `waitForTimeout()` bằng `locator.waitFor()` / `expect(...).toPass()` / `expect(locator).toBeVisible()` — làm dần theo từng page object, ưu tiên các page dùng nhiều nhất (`pos`, `incomes`).
- [ ] Thêm `storageState` (lưu session sau khi qua passcode gate) để tránh phải đăng nhập lại ở mỗi test — xem thêm gotcha passcode gate đã ghi trong memory `income-screens-gotchas`.
- [ ] Điều tra nguyên nhân 75 fail trước — sửa fail thật thay vì để `retries: 1` che đi (đang tốn double thời gian cho các case fail).
- [ ] Điều tra 53 skip, đặc biệt nhóm `pos` (30) và `incomes` (20) — xem có bị treo/timeout trước khi skip không.
- [ ] Tách test theo tag (`@smoke` chạy mỗi PR, full suite chạy theo lịch/đêm) để không phải chờ full suite mỗi lần đổi code.

## Không nên làm (rủi ro)

- Không bật `fullyParallel: true` hoặc tăng `workers` trực tiếp trong config hiện tại — sẽ gây race condition trên đơn hàng active giữa các session, làm fail tăng thêm chứ không giảm.
