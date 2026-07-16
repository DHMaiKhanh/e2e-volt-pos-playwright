---
title: Split Order
linearId: 66075d01-9f88-4fcf-bd40-ce5ef87ce3b3
url: https://linear.app/fastboy/document/split-order-a317435c0a01
team: VOLT
updatedAt: 2026-06-30T09:22:55.768Z
---

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

Flow chart: [POS Split Order](https://drive.google.com/file/d/1-mMNkzAoY-R_Mgq_B2aTRe62XFscPJLb/view)
Reference: https://youtu.be/60mPL-RQafg?si=uQ8iGJMsMUY_RRf7

1. **Overview**

Split Order cho phép chia một Order thành nhiều Check độc lập để khách hàng có thể thanh toán riêng biệt bằng các phương thức thanh toán khác nhau. Mục tiêu:

- Hỗ trợ nhiều khách hàng cùng sử dụng chung một Order nhưng thanh toán riêng.
- Hỗ trợ chia tiền thanh toán linh hoạt.
- Không làm thay đổi cấu trúc Order gốc, Service gốc, Staff mapping, Commission, Revenue hoặc Reporting hiện tại.
- Đảm bảo tương thích với Refund, Void, Re-open Order và Staff Commission.

2. **Business Rules**

Core Principle: Split Order chỉ là cách chia thanh toán. Chỉ cho chọn Split order khi Total Order > $5. Split Order không được làm thay đổi: Order gốc, Service/Product gốc, Staff assignment, Commission calculation, Promotion calculation, Discount calculation, Tax rule, Revenue reporting. Toàn bộ dữ liệu nghiệp vụ vẫn dựa trên Order gốc.

3. **Split Methods**

Hệ thống hỗ trợ 3 phương thức chia Check.

**1. Split Equally**

User nhập số lượng Check cần tạo (VD 2/3/4 Checks). Tổng Order chia đều cho tất cả Check. Nếu phát sinh số lẻ: làm tròn đến 2 chữ số thập phân, Check cuối cùng chịu phần chênh lệch. VD: Order Total $100 split 3 Checks → Check 1 = $33.33, Check 2 = $33.33, Check 3 = $33.34.

**2. Split by Amount**

User chọn số lượng Check, nhập số tiền cho từng Check. Check cuối cùng tự động tính: `Check N = Order Total - Sum(Check 1 → Check N-1)`. Validation: không cho phép Amount ≤ 0, tổng các Check vượt Order Total, Check cuối cùng có giá trị âm. VD: Order $100, Check 1 = $30, Check 2 = $50 → Check 3 = $20 (auto).

**3. Split by Items**

User gán Service/Product vào từng Check. Mỗi Item chỉ thuộc 1 Check. Check Total tính dựa trên Item được gán. Validation: nếu Order chỉ có 1 Item, không cho phép Split by Items. VD: Order Pedicure $40, Manicure $30, Product $20 → Check 1: Pedicure; Check 2: Manicure, Product.

4. **Item Distribution Rules**

- **Discount:** Order Discount phân bổ theo tỷ lệ Amount của Item. Item Discount đi theo Item tương ứng.
- **Tax:** Tax chỉ áp dụng cho Product. Split by Items: Tax hiển thị trên Check chứa Product. Split Equally/Split by Amount: không hiển thị Tax riêng từng Check, chỉ hiển thị ở tổng Order.
- **Service Fee / Cash Discount:** phân bổ theo tỷ lệ Amount của Item.
- **Tip:** không phân bổ khi Split. Tip nhập tại thời điểm thanh toán từng Check, ghi nhận riêng cho từng Check. Sau khi Order hoàn tất, Tip phân bổ cho Staff theo Tip Rule hiện tại của Merchant.

5. **Check Management**

- **Clear Check:** cho phép xóa Check chưa thanh toán; sau khi xóa hệ thống tự động tính lại các Check còn lại. Validation: phải còn tối thiểu 2 Check để xem là Split Order.
- **Paid Check:** không cho phép xóa Check đã thanh toán; muốn thay đổi phải Void Check trước.
- **Change Split Method:** Before Payment cho phép đổi Split Method / Chỉnh sửa Check. After Payment Exists: không cho đổi Split Method / tạo lại Split Structure — phải Void toàn bộ Check đã thanh toán trước.

6. **Payment Flow**

Mỗi Check được thanh toán độc lập.

- **Payment Information:** mỗi Check hiển thị Check Number, Item List (nếu có), Amount, Tip, Payment Status.
- **Payment Method:** một Check chỉ được thanh toán bằng duy nhất một Payment Method — Card/Cash/Gift Card/Other. Không hỗ trợ Card+Cash, Card+Gift Card, Cash+Gift Card, hay nhiều Payment trong cùng Check. Muốn dùng nhiều phương thức: tạo thêm Check khác.

7. **Order Status**

Khi có ít nhất một Check đã thanh toán: Order Status = Processing. Khi toàn bộ Check đã thanh toán: Order Status = Successful.

8. **Gift Card Handling**

Khi chọn Gift Card, hệ thống kiểm tra Balance realtime. Balance đủ: tiếp tục thanh toán. Balance không đủ: hiển thị popup "Gift card balance is insufficient to pay this check. Would you like to create a new check for the remaining amount to be paid with another method?"

- User Selects Yes: charge toàn bộ Gift Card Balance, tạo Check mới cho phần còn lại, chuyển sang màn hình thanh toán Check mới.
- User Selects No: quay lại màn hình chọn Payment Method.

Lưu ý: auto-create-new-check khi Gift Card không đủ balance chỉ hỗ trợ Split by Amount. Split Equally và Split by Items không hỗ trợ auto-create check — show message "Gift Card balance is insufficient for this check. Please select another payment method or modify the split configuration." User phải quay lại Split Screen, chia item lại, hoặc dùng payment method khác.

9. **Refund Rules**

- **Full Refund:** cho phép Refund toàn bộ Order. System: refund tất cả Check đã thanh toán, reverse Revenue/Commission/Tip/Tax.
- **Partial Refund:** luôn thực hiện trên từng Check.
  - Split by Items: user chọn Item trong Check cần Refund, system refund Item được chọn.
  - Split Equally/Split by Amount: user chọn Check cần Refund, system hiển thị danh sách Item của Order gốc, user phải chọn Item cần Refund. Không hỗ trợ Refund Amount tự do không gắn Item (đảm bảo Commission/Revenue/Tax/Audit chính xác).
  - Lưu ý: khi partial refund mà 1 item có amount lớn hơn các check hiện có, chỉ cho full refund.
- **Commission Reversal:** khi Refund Item, system reverse Revenue, Tax, Discount, Commission theo đúng Item được Refund.
- **Tip Refund:**
  - Card Payment — Partial Refund: Refund Amount supported, Refund Tip not supported. Full Refund Check: cả hai supported.
  - Cash/Other Payment — Partial và Full Refund: cả Refund Amount và Refund Tip đều supported.
  - Gift Card Payment: không hỗ trợ Refund, chỉ hỗ trợ Void.

10. **Void Rules**

- **Void Check:** cho phép Void từng Check; sau Void, Check quay về trạng thái chưa thanh toán, user có thể Split lại.
- **Void Order:** cho phép Void toàn bộ Order; system Void toàn bộ Check liên quan.

11. **Re-open Order**

- **Preserve Split Structure:** khi Re-open, hệ thống giữ nguyên Split Method, Check Structure, Check Amount, Payment History, Tip History, Refund History, Void History.
- **Allowed Updates:** chỉ cho chỉnh sửa thông tin không ảnh hưởng Amount — Customer Information, Internal Note, Staff Note, Metadata khác.
- **Restricted Updates:** không cho Add/Remove Item, Update Price/Quantity/Discount/Promotion/Tax/Fee/Surcharge/Check Amount, Change Split Method.

12. **Receipt**

Check Receipt: không in receipt cho từng check sau khi thanh toán xong. Final Receipt hiển thị: danh sách Check, Amount/Tip/Payment Method từng Check, Refund History, Void History (nếu có).

13. **Audit Log**

Ghi nhận: Cancel, Refund, Partial Refund, Complete Order.

14. **Reporting & Commission**

Split Order không làm thay đổi Revenue Report, Sales Report, Staff Commission, Payroll Calculation, Income Report. Tất cả Reporting vẫn dựa trên Order gốc — Split Order chỉ là cơ chế chia thanh toán để phục vụ khách hàng.

15. **Receipt (chữ ký theo check)**

Khi sử dụng Split Order, chữ ký thanh toán được lưu theo từng check thay vì Order tổng. Do đó:

- Receipt của Order tổng có thể không hiển thị chữ ký.
- Order History cần hỗ trợ xem receipt của từng check.
- Receipt của mỗi check phải hiển thị đầy đủ thông tin thanh toán (items/services, subtotal, tax, tip, total, payment method, status...) cùng chữ ký tương ứng — đảm bảo khả năng đối soát và tra cứu chính xác.
- Mỗi check có action xem receipt riêng, hiển thị: Check number, Subtotal/Discount/Tax/Tip/Total đã thanh toán, Payment method, Payment status, Paid date/time, Customer signature của check đó (nếu có).

---

_Source: Google Docs — "Split Order" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._
_Note: 47 image(s) stripped from this export; see original Google Docs tab for visuals._
