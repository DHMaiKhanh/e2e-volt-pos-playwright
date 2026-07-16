---
title: Book Appointment from POS
linearId: 64dcf1dd-7329-4e31-b499-9fa81582057f
url: https://linear.app/fastboy/document/book-appointment-from-pos-77e8461bc641
team: VOLT
updatedAt: 2026-07-09T10:48:15.318Z
---

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Book Appointment from POS**

# **A. Setting Go Booking (Web Booking - POS Booking)**

1. **Booking Hours**

- Thiết lập thời gian được phép đặt hẹn tại trang website book hẹn. Có thể thiết lập riêng hoặc giống thời gian làm việc của tiệm thông qua việc chọn nút Sync with Business work hour.

2. **SMS Content**

- Các nội dung tin nhắn chỉ được thiết lập trong phạm vi 160 ký tự bao gồm cả tên tiệm theo quy định SMS quốc tế. Trường hợp lố ký tự sẽ dẫn đến không gửi tin nhắn ra được. Số lượng ký tự có thể xem ở cuối mỗi dòng.

| SMS Content                                                | Ý nghĩa / Điều kiện                                                                                                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SMS sent when you can't fulfill an appointment request** | Chủ tiệm hủy lịch hẹn Appointment Status = Cancelled. Content: "Sorry we're busy at the time you request the appointment, please make another appointment, thanks! {link}. Reply STOP to opt out"                              |
| **SMS sent when customer's booking is confirmed**          | Appointment đã được phía tiệm xác nhận Appointment Status = Confirmed. Content: "Your appointment with {business_name} has been confirmed. {link}. Reply STOP to opt out"                                                      |
| **SMS sent when your customer completes a booking online** | Book appoinment online thành công (trước khi confirmed). Appointment Status = Scheduled. Content: "Your appointment with {business_name} has been sent to the owner, please wait for his/her confirmation. {link}"             |
| **SMS sent reminder customer**                             | Nhắc nhở khách hàng về cuộc hẹn sắp tới, mặc định 3 tiếng trước giờ hẹn (có thể tùy chỉnh). Content: "Hi {customer_name}, don't forget your appointment at {business_name} on {date} at {time}. {link}. Reply STOP to opt out" |
| **SMS sent for waiting customer**                          | Báo khách trong danh sách chờ rằng tiệm đã sẵn sàng phục vụ. Content: "{business_name}: We're ready for you, please come back as soon as you can."                                                                             |

3. **Block Time**

- Tính năng chặn (block) một khoảng thời gian trên lịch đặt hẹn để khách hàng không thể đặt lịch trong khoảng thời gian đó.
- **Business Block Time:** Tạm thời chặn hẹn toàn bộ tiệm vào ngày cụ thể. Tiệm thêm ngày cụ thể muốn chặn qua nút +. Các thiết lập:
  - **Day Off:** ngày muốn chặn đặt hẹn.
  - **Duration:** khung thời gian muốn chặn của ngày hôm đó (hoặc tích All day để chặn cả ngày).
  - **Recurring?:** cho phép thiết lập sự lặp lại.
  - **Repeat:** lặp lại hàng tuần hoặc hàng tháng.
  - **End Date:** ngày kết thúc lặp lại.
  - **Description:** mô tả/nguyên nhân ngày chặn (chỉ tiệm thấy).
- **Staff Block Time:** Tạm thời chặn đặt hẹn đối với thợ chỉ định, thêm qua Add Time Off, với các thiết lập tương tự Business Block Time.

4. **Popup Message (Web Booking)**

- Thiết lập thông báo hiển thị ngay khi khách hàng truy cập vào trang đặt hẹn.

5. **Appointment Deposit (Web Booking)**

- Tính năng đặt cọc trước mỗi khi khách hàng đặt hẹn.
- **Setting deposit type:** mức đặt cọc — theo % giá dịch vụ (**Percentage deposit**) hoặc số tiền cụ thể (**Fixed deposit amount**).
- **Setting cancel policy:** nếu bật Allow, khách được hủy hẹn và hoàn tiền trong thời hạn nhất định sau khi đặt hẹn (mặc định 24h/48h hoặc Custom Hours).

6. **Web Booking Settings**

- **Display Settings:** cài đặt giao diện hiển thị trên trang Web Booking.

| Action                                         | Ý nghĩa                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| Show skip button on your online booking page   | Hiển thị nút Skip trên trang đặt hẹn online (chỉ áp dụng cho web booking 2.0). |
| Show service price on your online booking page | Hiển thị giá của services trên trang đặt hẹn.                                  |
| Show Standard Service Duration                 | Hiển thị Duration (thời gian làm một service) trên trang đặt hẹn.              |
| Show the staff name of the confirmation page   | Hiển thị tên thợ trên trang confirm sau khi đặt hẹn xong.                      |
| Show Staff Selection Page                      | Hiển thị trang chọn staffs cho người đặt có thể tùy ý chọn thợ mình muốn.      |

- **Staff Selection & Assignment:** thiết lập cách client chọn thợ và cách hệ thống tự động assign staff cho Web Booking.
  - **"Any Staff" option:** cho phép người đặt chọn thợ ngẫu nhiên bằng "Any available staff".
  - **Auto assign:** chỉ active khi dùng Any Staff — hệ thống tự động assign staff phù hợp trong khung giờ đó (kèm màu sắc: Any staff color, Booking done color, Booking cancel color).
  - **Allow selecting staff per service when booking:** hiển thị thợ "Staff per service" để khách tạm chọn trước khi chọn thợ cụ thể.
- **Web Booking Rules & Behavior:**
  - **Allow customers to submit booking requests for time slots that are unavailable:** booking sẽ ở dạng request, owner/staff xử lý thủ công.
  - **Allow adding multiple guests in a single booking:** service của Guest 2 bắt đầu cùng thời gian Guest 1, không cho 2 Guest đặt cùng 1 thợ.
  - **Maximum Number of Days Customers Can Book in Advance:** giới hạn số ngày tối đa đặt trước.
  - **Minimum Advance Days Required Before Booking:** số ngày tối thiểu phải đặt trước.
  - **Allow Customers to Cancel Bookings.**
  - **Require Note Input:** bắt buộc khách nhập ghi chú khi đặt lịch.
- **Go Booking Rules & Behavior:** cấu hình hiển thị/xử lý booking trên màn hình Go Booking tại tiệm.
  - **Hide unassigned column when having no appointment.**
  - **You don't need to confirm your online bookings:** tất cả booking online tự động confirm ngay sau khi đặt.
  - **Block create warning appointment:** chặn tạo warning appointment (staff/service không available trong khung giờ đó) — khi cố tạo, popup Confirmation: "There are warnings about these appointments, please check again." / Accept.
- **Security & Validation (Web booking):**
  - **Require login before booking.**
  - **Enable CAPTCHA Verification for Booking.**
  - **Require Customers to Enter Email When Booking.**
  - **Display a notification message when the selected service is invalid** (VD: "No staff available for this service on this time. Please select other date & time!" — nội dung có thể tùy chỉnh).
- **Pricing & Payment Settings:** quản lý giá dịch vụ và dual pricing cho web booking.
  - **The service price will include the service fee:** ON — giá hiển thị đã gồm service fee; OFF — service fee tính riêng ở bước thanh toán.
- **System Configuration:**
  - **Set Up Store Timezone.**
  - **Activate:** cần kích hoạt sau khi hoàn tất Setting/Services/Staff để trang Web Booking đi vào hoạt động.
  - **Enable Booking V3 Redirect:** cho phép chuyển đổi qua lại giữa Version 2.0 và 3.0.
  - **Sync data to web booking:** đồng bộ Settings/Services/Staff và các thay đổi cấu hình booking lên Web Booking. Nên sync sau khi có thay đổi và trước khi Activate.

# **B. Setting apply cho POS Booking**

1. **Booking Hours**

- Thời gian booking trên POS phụ thuộc vào Booking Hours, Business Hours, và Staff Booking Hours.
- Rule:
  - Calendar hiển thị theo Booking Hours ± 1 tiếng.
  - Staff chỉ được nhận booking trong: Calendar visible time VÀ Staff Booking Hours.
  - Business Hours là giờ hoạt động của tiệm, không quyết định trực tiếp khung giờ hiển thị Calendar.
- Ví dụ: Booking Hours 7AM-9PM → Calendar 6AM-10PM; Staff Booking Hours 10AM-5PM → Staff chỉ booking được 10AM-5PM.
- Ví dụ 2: Business Hours 8AM-8PM, Booking Hours 7AM-9PM, Staff Booking Hours 12AM-11:59PM → Calendar 6AM-10PM, Staff được phép nhận booking 6AM-10PM.

2. **SMS Content** — giống mục A.2
3. **Block Time** — giống mục A.3
4. **Web Booking Settings - Go Booking Rules & Behavior** — giống mục A.6
5. **Một số setting chỉ apply cho Calendar Booking UI**

| Setting                                            | Ý nghĩa                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Show unavailable staff                             | Cho phép hiển thị staff không available trên Calendar và dropdown staff.                                                              |
| Show with most booking                             | Sắp xếp staff theo số lượng booking nhiều nhất.                                                                                       |
| Show customer phone                                | Hiển thị phone number trên appointment card.                                                                                          |
| Change edit start time mode                        | Enable: sửa thời gian trực tiếp ngay tại appointment detail. Disable: show dialog Edit date & Time để chọn khung thời gian trực quan. |
| Set appointment color                              | Cho phép dùng màu cho appointment (màu theo staff).                                                                                   |
| Show only business work hours                      | Calendar chỉ hiển thị trong khoảng business hours.                                                                                    |
| Require passcode to cancel appointment             | Yêu cầu nhập passcode để cancel appointment.                                                                                          |
| Unlock customer phone for 30 minute                | Cho phép show full phone customer trong 30 phút sau khi unlock (chỉ apply cho appointment).                                           |
| Require Passcode to Edit Appointment               | Edit appointment cần passcode.                                                                                                        |
| Require Staff Code to Edit Appointment             | Staff phải nhập staff code để edit.                                                                                                   |
| Require Staff Code to Create new appointment       | Khi create appointment yêu cầu staff code.                                                                                            |
| Show Repeat Appointment feature                    | Hiển thị tính năng repeat appointment trong appointment detail để tạo appointment tương tự cho ngày được chọn.                        |
| Show quick info when cursor is over an appointment | Hiển thị tooltip/quick info khi hover appointment.                                                                                    |

# **C. Flow Create Appointment từ POS**

## **1. Mở form Create Appointment**

- User click New Appointment trên Calendar POS, hoặc click thẳng từ calendar.
- Chọn thời gian trong quá khứ: không effect.
- Chọn vào Block Time: show message Information — "Can not schedule appointment outside your normal business hours!" / OK.

## **2. Chọn hoặc tạo Customer**

- **Search customer:** theo Customer name hoặc Phone number.
- **Existing customer:** show customer list bên trái (Customer name, Masked phone number, VD: Test (**_) _**-2619), click để select.
- **Create new customer:** nếu không tìm thấy, click + Create new client.

## **3. Chọn ngày Appointment**

- Date picker phía trên form, default theo ngày đang chọn trên Calendar.
- Cho phép booking hiện tại/tương lai. Không tạo appointment trực tiếp cho ngày quá khứ, nhưng kéo-thả appointment trên calendar vẫn được cho phép.

## **4. Nhập thông tin Appointment Line**

- Mỗi appointment gồm ít nhất 1 line: Start time, Duration, Staff, Service.

## **5. Start Time**

- Click từ calendar slot: lấy đúng selected slot time.
- Click từ header: lấy current time, round lên nearest 15 phút.

## **6. Duration**

- Default theo service duration nếu đã chọn service. User có thể edit duration.

## **7. Staff**

- Chọn staff cụ thể, Any Staffs, hoặc Unassigned (tự động lưu thành Any Staffs khi save).
- Filter: All / Available / Busy. Search: staff nickname.
- **Available:** Staff Status - Active, Staff Booking status - Active, chưa có appointment nào assign trong khoảng thời gian đó, thỏa Staff Booking Hours/không overlap/available.
- **Busy:** start time không available (đang có appointment khác, ngoài working time, đang apply Block Time) — chọn vẫn được nhưng show message "This Staff is not available for this time."

## **8. Service**

- Optional: có thể tạo appointment trước, chọn service khi checkout order.
- Click field chọn service: show tất cả service Active theo Category (Service Name, Duration, Price, trạng thái Available/Busy cho staff đang chọn — VD: "Service unavailable for [Staff]").
- Filter: All/Available/Busy. Search: staff nickname.
- Any Staffs: tất cả service đều available. Chưa chọn Staff mà chọn Service trước: luôn show note "Service unavailable for".

## **9. Add More**

- Click + Add More để thêm appointment line. Line tiếp theo mặc định start time = previous line end time. Cho phép khác staff/service/duration.

## **10. Appointment Tags**

- **Requested:** đánh dấu appointment request.
- **Highlight:** đánh dấu appointment nổi bật.
- **No-show:** đánh dấu customer không đến.
- **Repeat:** tạo recurring appointment (chỉ khi setting Show Repeat Appointment feature = ON). Chọn Repeat Setting + End date sẽ tạo appointment tương tự cho các ngày được chọn. Action Cancel Repeat Appointments hủy cả gốc và repeat. Update appointment cũ sẽ ẩn option Repeat.

## **11. Appointment Note**

- Max length 255 chars. Hiển thị trong Appointment detail, Calendar card, Hover quick info.

## **12. Validation khi Book**

- Chỉ required: Customer. System validation: Customer tồn tại/tạo mới thành công, Staff availability, Staff Booking Hours, Booking Hours, Business Hours, Duration validity, Appointment overlap.

## **13. Booking Hours Rule**

- Calendar hiển thị theo Booking Hours ± 1 tiếng. Staff chỉ được nhận booking trong Calendar visible time và Staff Booking Hours. Business Hours không quyết định trực tiếp khung giờ hiển thị Calendar.

## **14. Save Appointment**

- Click Book để tạo appointment. Nếu có warning (Staff not available / Service unavailable), click Book show popup Confirmation "There are warnings about these appointments, please check again." / Accept — và không tạo được appointment.

## **15. Sau khi create thành công**

- Đóng modal. Tạo appointment với source = POS, Status = Confirmed.
- Show trên Calendar: Customer Name, Service Name, Tag (nếu có), Appointment note (nếu có), Booking time start-end. Show đúng staff column, nếu không có staff show tại Unassigned column.
- Update Appointment Today nếu appointment date = today. Recalculate count. Toast: "Appointment created successfully".

# **D. Update Appointment**

Status/Action trên appointment:

| Appointment Status / Action | Update | Confirm | Cancel | Checkout |
| --------------------------- | ------ | ------- | ------ | -------- |
| **Scheduled**               | Yes    | Yes     | Yes    | No       |
| **Confirmed**               | Yes    | No      | Yes    | Yes      |
| **Canceled**                | No     | No      | No     | No       |
| **Done**                    | No     | No      | No     | No       |

1. **Edit appointment** (status Confirmed/Scheduled)

- Được update: Customer, Date, Start Time, Duration, Staff, Service, Add more, Tag, Appointment Note.
- Button: Cancel (cancel appointment); Confirm (nếu status Scheduled); Save appointment — popup Confirmation "Do you want to send a message to [Customer name] notifying about this change?" / Don't Send / Send.

2. **Confirm appointment** (status Scheduled)

- Đối với appointment từ Web Booking khi setting auto-confirm disable.
- Button: Cancel; Save appointment; Confirm — popup Confirmation "Are you sure to confirm this appointment?" / Cancel / Accept (thành công gửi thông tin đến customer, notification trên POS).

3. **Cancel appointment** (status Confirmed/Scheduled)

- Button: Confirm (nếu Scheduled); Save appointment; Cancel — popup Confirmation "Are you sure to cancel this appointment?" / Cancel / Accept (thành công gửi thông tin đến customer, notification trên POS).

4. **Checkout Order từ appointment** (status Confirmed)

- Button: Cancel; Save appointment; Checkout — redirect qua màn hình create order, fill sẵn thông tin appointment (hiển thị Booking Time: 8:00AM = start time appointment). Tạo order và thanh toán như bình thường.
- Sau khi order complete: tự động update status appointment → Done, không thể update thông tin appointment nữa (end flow). Giao diện Appointment show thêm Order ID.

## **Một số case đặc biệt**

1. Appointment đã checkout nhưng order chưa Complete → click lại Checkout sẽ redirect đến đúng order đã checkout trước đó.
2. Appointment đã checkout, order chưa Complete → Cancel appointment: thành công, status Canceled, order không ảnh hưởng; sau đó Complete order → appointment update status Done.
3. Appointment đã checkout, order chưa Complete → Delete Order: appointment không ảnh hưởng, có thể Checkout tiếp tục và tạo order mới.
4. Quá thời gian appointment nhưng khách không đến và không checkout: status appointment giữ nguyên, vẫn cho phép action như bình thường.
5. Appointment book trước khi bị set Block Time vẫn được action như appointment bình thường.

# **E. Go Check-In integrate**

1. **Đã có Appointment_Customer thực hiện link Checkin Today vào Appointment**

- Customer đã book Appointment, sau đó đến tiệm checkin. Nếu số phone trùng với phone đã book trước đó, hiển thị step để link Checkin vào Appointment.
- Nếu customer chọn Yes: gửi noti đến POS để confirm khách đã đến và checkin trên appointment; tạo order cho Appointment sau khi confirm checkin thành công; gắn thêm tag **Checked in** trên Appointment.

2. **Đã có Appointment_Customer không link Checkin Today vào Appointment**

- Checkin thành công → tạo order Pending không liên quan đến appointment trước đó. Thông tin appointment trước đó không bị ảnh hưởng. Checkout Order từ Appointment sẽ tạo 1 order mới hoàn toàn.

3. **Chưa có Appointment**

- Checkin thành công → tạo order Pending. Trên Calendar có thêm Walk-in Sidebar hiển thị danh sách khách đã checkin hôm nay (Customer Name, Customer Phone, thời gian checkin thành công).
- Action: tạo appointment từ thông tin Checkin bằng kéo-thả vào khung thời gian/staff muốn tạo trên calendar. Appointment sẽ gồm Order ID, thông tin service trên Checkin, status Confirmed, tag Checked-in (chỉ show cho appointment tạo từ Checkin).
- Vì checkin thành công đã tạo order, Checkout sẽ redirect đến order đã tạo trước đó. Action trên appointment như bình thường.
- Lưu ý: chỉ case này mới show thông tin Checkin trên Walk-in Sidebar.

---

_Source: Google Docs — "Book Appointment from POS" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._
