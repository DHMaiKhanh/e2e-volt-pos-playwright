---
title: Cashback
linearId: 8bd5bb3e-2a05-4c48-8952-7a58b3d0a74b
url: https://linear.app/fastboy/document/cashback-07289dfa5ed2
team: VOLT
updatedAt: 2026-07-08T04:57:12.913Z
---

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Cashback** là tính năng cho phép tiệm **hoàn lại giá trị giao dịch cho khách hàng dưới dạng point**, được tính **theo % của giá trị dịch vụ hoặc trên amount cụ thể**, thay vì cách tính point cố định truyền thống (ví dụ: $1 = 1 point).

1. **Cách hoạt động**

- Thực hiện create order, đến bước apply Promo/Reward > Chọn Cashback
- Hệ thống xác định **eligible amount** (số tiền đủ điều kiện tích điểm)
- Áp dụng **cashback** tương ứng
- Quy đổi % cashback thành Cash tích lũy và cộng vào current Cash của customer sau khi complete order
- Số tiền tích lũy được sử dụng cho các giao dịch tiếp theo theo rule đã cấu hình

2. **Cashback Rule Configuration**

- Toggle: Do you want to use Cashback?
  - **Enable:** merchant cấu hình Cashback Percentage / Minimum Redeemable Amount / Maximum Redeem per Transaction. Khi Complete Order, hệ thống tính Earn Cashback theo rule; customer có thể dùng Available Store Credit để Redeem Cashback trên order tiếp theo nếu đủ điều kiện.
  - **Disable:** không cho Earn/Redeem Cashback trên bất kỳ order nào; tất cả Cashback Rules không được áp dụng.
- Available Store Credit = số dư cashback của customer, tích lũy sau mỗi order success:
  - Setting Rule: hệ thống tự động quy đổi Cashback dựa trên tổng giá trị đơn hàng (Order Total) và Cashback Percentage.
    - `cashback_amount = order_total × cashback_percentage / 100`
    - Lưu ý: Order_total = giá trị order sau Discount/Cashback Redeem và chưa tính Tax/Tip.
- Setting:
  - **Minimum redeemable amount:** số tiền balance tối thiểu được sử dụng để trừ ngược vào order đang thanh toán.
  - **Maximum redeem per transaction:** ngưỡng max được apply số dư cashback vào order (VD setting $20, số dư Cash $50 → chỉ dùng được $20 cho order). _Cap per use regardless of balance._
  - **Cashback percentage (%):** phần trăm apply cashback trên order total. _Nếu total bill $100, cashback 10% → customer redeem up to $10._

3. **Workflow - Apply Cash back: tích lũy Cash**

- Create Order: chọn staff - Service
- Chọn Reward > tab Cashback > Toggle: Do you want to use Cashback? - Enable
- Chọn Setting Cashback, nhập Cashback Percentage (%)
- Complete Order: tính theo `cashback_amount = order_total × cashback_percentage / 100`
- Số tiền tích lũy được dùng cho order sau nếu đủ điều kiện

4. **Workflow - Apply Reward - Cash back: sử dụng số dư Cash Back vào order**

- Create Order: chọn staff - Service
- Chọn Reward > tab Cashback > Toggle Enable
- Nhập Amount muốn trừ trực tiếp cho order (phải thỏa điều kiện). VD: Minimum $10, Maximum $200, Available Store Credit $573.11 → Amount cho phép $10-$200
- Cash back trừ trực tiếp vào order, tương tự apply Reward
- Cashback không áp dụng cho tax, tip

5. **Giao diện những vị trí ảnh hưởng**

- **Create Order:** thêm field **Cashback Redeemed** tại order summary (con của Total Discount), thể hiện số tiền cashback được redeem cho order hiện tại.
- **Order History:** cộng chung vào Total Discount.
- **Report:** Cashback Redeemed tính chung vào Discount của order (gồm cả Promotion/Reward).

6. **Workflow khi có Re-open / Cancel / Refund / Partial Refund**

- **Re-open Order:** Cashback chưa finalize → recalculate lại Earn Cashback theo total mới khi order close lại. Cashback đã redeem tạm thời giữ nguyên, tính lại nếu order thay đổi giá trị.
- **Cancel Order / Full Refund:** Return toàn bộ cashback đã redeem vào wallet customer; Reverse toàn bộ cashback earn từ order đó.
- **Partial Refund:** Cashback earn bị reverse theo tỷ lệ giá trị refund; Cashback redeem hoàn lại theo tỷ lệ refund tương ứng.

**Tóm lại:** Earn cashback → reverse theo phần order bị hủy/refund. Redeem cashback → hoàn lại cho customer theo phần order bị hủy/refund.

**Lưu ý:**

- Không xóa transaction cashback cũ, tạo transaction đảo chiều (adjustment/reverse) để đảm bảo audit rõ ràng.
- Cashback nên quản lý theo ledger transaction (earn/redeem/reverse/restore) để tránh sai lệch số dư wallet.
- Nếu cashback earn của order đã được dùng cho order khác trước khi refund, vẫn phải reverse cashback của order gốc, có thể cần xử lý balance adjustment trong wallet.

7. **Cashback Wallet (Cashback history)** — xem [Customer Management](./customer-management.md)

8. **Một số lưu ý**

- Luồng apply Cash Back cho order và sử dụng số dư Cash Back vào order là khác nhau
- Khi chọn Reward: chỉ được apply 1 trong 2 option - Reward hoặc Cash Back, không apply cùng lúc cả 2
- Sau khi Complete order:
  - Available Store Credit bị trừ khoản Amount đã sử dụng trong order trước đó
  - Available Store Credit cộng thêm theo % cashback nếu có setting
  - Point vẫn cộng theo Total Order đã complete (theo setting, VD $1 = 1 point)

---

_Source: Google Docs — "Cashback" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._
