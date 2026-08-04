# VOLT POS — Knowledge Base (AI)

> Tổng hợp toàn bộ tài liệu của team **VOLT (VP)** trên Linear (https://linear.app/fastboy/team/VP/documents).
> Quét tự động từ Linear MCP — Source of truth vẫn là Linear. Cập nhật: 2026-07-21.
> Gồm **48 tài liệu**. Dùng file này làm ngữ cảnh để hỏi-đáp về sản phẩm VOLT POS.

---

## Mục lục

- 1.  [📚 VOLT Docs Index](#volt-docs-index)
- 2.  [📋 VOLT POS — Release Notes](#volt-pos--release-notes)
- 3.  [Login flow](#login-flow)
- 4.  [Order Flow](#order-flow)
- 5.  [Order Pending](#order-pending)
- 6.  [Split Order](#split-order)
- 7.  [Settings](#settings)
- 8.  [Shortcuts](#shortcuts)
- 9.  [Language Setting](#language-setting)
- 10. [Service Fee](#service-fee)
- 11. [Book Appointment from POS](#book-appointment-from-pos)
- 12. [Cashback](#cashback)
- 13. [Sell Gift Card](#sell-gift-card)
- 14. [Batches](#batches)
- 15. [Batch History](#batch-history)
- 16. [Income Report](#income-report)
- 17. [Income Version 1 (legacy)](#income-version-1-legacy)
- 18. [Income Version 2](#income-version-2)
- 19. [Business Snapshot](#business-snapshot)
- 20. [Staff Management](#staff-management)
- 21. [Payroll](#payroll)
- 22. [Recalculate Report](#recalculate-report)
- 23. [Time Keeping](#time-keeping)
- 24. [Count Days Off](#count-days-off)
- 25. [Staff Rating](#staff-rating)
- 26. [[POS] Promotion Split Between Owner & Staff](#pos-promotion-split-between-owner--staff)
- 27. [Admin Site](#admin-site)
- 28. [Merchant Overview](#merchant-overview)
- 29. [Merchants Management](#merchants-management)
- 30. [Order Management](#order-management)
- 31. [Portal Order History](#portal-order-history)
- 32. [Portal Support – Edit Completed Order](#portal-support--edit-completed-order)
- 33. [Portal Access Control & Authorization](#portal-access-control--authorization)
- 34. [Customer Management](#customer-management)
- 35. [Promotion Management](#promotion-management)
- 36. [Gift Card Management](#gift-card-management)
- 37. [Services Management](#services-management)
- 38. [Package Management](#package-management)
- 39. [System Management](#system-management)
- 40. [Device Management](#device-management)
- 41. [Device Pending](#device-pending)
- 42. [Version Management](#version-management)
- 43. [Force Update](#force-update)
- 44. [Main Flow Onboard](#main-flow-onboard)
- 45. [[DEMO] QR Payment - Spec & Requirements](#demo-qr-payment---spec--requirements)
- 46. [POS for Android Device - P8 Dual](#pos-for-android-device---p8-dual)
- 47. [Training videos and useful links](#training-videos-and-useful-links)
- 48. [[DRAFT] Income Version 2 — New Format](#draft-income-version-2--new-format)

---

# 📚 VOLT Docs Index

_Linear doc: https://linear.app/fastboy/document/volt-docs-index-cb9e6b837376_

> Cập nhật **2026-06-11**. Source of truth: **Linear** — PO viết doc mới trực tiếp tại đây. Google Docs "Volt Pos Documents" đã freeze.

## Quy ước

- **Spec library** (spec sản phẩm theo màn hình / tính năng) → document **team-level**, tên trần: `<Tên màn hình/tính năng>`.
- **Working docs** (R&D, guide, test cases, impl log của feature đang làm) → gắn vào project **V-Features** (hoặc issue VP-x), tên theo pattern `<Feature> — <Type>`.
- Spec bị thay thế → đổi tên bản cũ thành `… (legacy)` + note đầu doc trỏ sang bản mới.
- Doc mới tạo → thêm dòng vào index này.
- **Release notes / changelog** → living doc _📋 VOLT POS — Release Notes_ (team-level); prepend 1 section cho mỗi version mới (newest on top).

## Release notes & changelog

- <document id="989ed4ee-c4b9-4a58-a7a1-788715f3c1b8" href="https://linear.app/fastboy/document/volt-pos-release-notes-10de31de66dd">📋 VOLT POS — Release Notes</document> — living changelog, newest version on top (current: **v1.0.31**, 2026-06-18).

## Spec library — team-level (42)

- <document id="3040e00f-e02c-4879-9973-04a731aa18d0" href="https://linear.app/fastboy/document/demo-qr-payment-spec-and-requirements-c421e841d51e">\[DEMO\] QR Payment - Spec &amp; Requirements</document>
- <document id="fd3221c1-239a-485b-907e-96261f7ec9e0" href="https://linear.app/fastboy/document/pos-promotion-split-between-owner-and-staff-42155f32c420">\[POS\] Promotion Split Between Owner &amp; Staff</document>
- <document id="985ff054-b833-4f55-adfc-4efdfd3878c1" href="https://linear.app/fastboy/document/admin-site-26e00d300fd6">Admin Site</document>
- <document id="08031d45-046b-4ef0-adf5-4d638d943cd3" href="https://linear.app/fastboy/document/batch-history-6fff79aa14da">Batch History</document>
- <document id="ff35ac6d-8fb1-4126-8b75-ade4532eac99" href="https://linear.app/fastboy/document/batches-1ad99f112d7a">Batches</document>
- <document id="64dcf1dd-7329-4e31-b499-9fa81582057f" href="https://linear.app/fastboy/document/book-appointment-from-pos-77e8461bc641">Book Appointment from POS</document>
- <document id="e9f55c9f-6a4e-4931-aea7-e018a1b168cf" href="https://linear.app/fastboy/document/business-snapshot-ac4f3735e3c2">Business Snapshot</document>
- <document id="8bd5bb3e-2a05-4c48-8952-7a58b3d0a74b" href="https://linear.app/fastboy/document/cashback-07289dfa5ed2">Cashback</document>
- <document id="9d25b6e0-c84b-45f6-b112-e81260ace54a" href="https://linear.app/fastboy/document/count-days-off-8a55b2dcc45e">Count Days Off</document>
- <document id="b8656c71-958a-4c4a-b8ff-7ef70443a0eb" href="https://linear.app/fastboy/document/customer-management-5a2f35d3c8fc">Customer Management</document>
- <document id="9c98d8a6-9baf-4b3d-9d2c-03751397d5c8" href="https://linear.app/fastboy/document/device-management-75de848ac60a">Device Management</document>
- <document id="032147b6-9d0a-4ee3-bd1d-3cdb10ed2224" href="https://linear.app/fastboy/document/device-pending-a98d6c65061a">Device Pending</document>
- <document id="9b5a34e6-53c7-4ad3-a884-e3a9bf994720" href="https://linear.app/fastboy/document/gift-card-management-aac032d6e34a">Gift Card Management</document>
- <document id="3ff5a309-2cf3-447b-a87e-cfb927c4ce93" href="https://linear.app/fastboy/document/income-report-cd80210c48f3">Income Report</document>
- <document id="2e78ec9b-d8cd-4c68-bdbf-3f4bb9b94820" href="https://linear.app/fastboy/document/income-version-1-legacy-22a0cc2660e0">Income Version 1 (legacy)</document>
- <document id="c868dd0f-ef6e-4822-96c1-c826cad6663f" href="https://linear.app/fastboy/document/income-version-2-94d2aa985225">Income Version 2</document>
- <document id="6632232c-75e9-4412-98b9-8e70d095eccc" href="https://linear.app/fastboy/document/language-setting-5f8e21caa7ee">Language Setting</document>
- <document id="3bc954e6-0c70-460f-930a-ccb0c2e8b6f3" href="https://linear.app/fastboy/document/login-flow-0a3c431463e0">Login flow</document>
- <document id="dd69481a-fac8-43f4-8481-f23912d9cefc" href="https://linear.app/fastboy/document/main-flow-onboard-7df28580516e">Main Flow Onboard</document>
- <document id="8e891c1c-83f4-4c5d-9088-d6f4afa9b68c" href="https://linear.app/fastboy/document/merchant-overview-48df980f19e3">Merchant Overview</document>
- <document id="1f382a86-58f9-4b3c-90f7-8f26c43650b3" href="https://linear.app/fastboy/document/merchants-management-2f21dec89944">Merchants Management</document>
- <document id="633fec43-fcc4-426b-9b95-f3e4263ed237" href="https://linear.app/fastboy/document/order-flow-1bd212f296da">Order Flow</document>
- <document id="0ce3807f-e79b-4e1f-bb86-82a76f6c914f" href="https://linear.app/fastboy/document/order-management-afeb73979dd4">Order Management</document>
- <document id="03845bad-0a98-47fa-8b3d-8d95407eb0e0" href="https://linear.app/fastboy/document/order-pending-caa07c054f23">Order Pending</document>
- <document id="abf445e3-7910-40e1-9e63-52fa70202e35" href="https://linear.app/fastboy/document/package-management-a13018e280ab">Package Management</document>
- <document id="dec81408-5313-4db4-8867-ac81c24b11ac" href="https://linear.app/fastboy/document/payroll-23dadb3e0003">Payroll</document>
- <document id="63bc67d2-1207-4e3b-9ef1-17743a24f4a1" href="https://linear.app/fastboy/document/portal-access-control-and-authorization-5b0a253f7223">Portal Access Control &amp; Authorization</document>
- <document id="09314f50-bf15-4369-ac55-3f8a37c2e830" href="https://linear.app/fastboy/document/portal-order-history-ba2903a15df5">Portal Order History</document>
- <document id="2ad922c5-bec5-4165-9283-538ff32acfb1" href="https://linear.app/fastboy/document/promotion-management-08b531d2158d">Promotion Management</document>
- <document id="e83825f4-bff4-4792-970e-02623d2352af" href="https://linear.app/fastboy/document/recalculate-report-84a21a4ac2ce">Recalculate Report</document>
- <document id="8fcaa335-4677-4890-8fa4-03c89364b83f" href="https://linear.app/fastboy/document/sell-gift-card-812b56914491">Sell Gift Card</document>
- <document id="80891ed0-168f-4df9-a2e5-96888393e985" href="https://linear.app/fastboy/document/service-fee-dedcb36a56e3">Service Fee</document>
- <document id="c882ec10-a767-41bf-b03e-958c37a4000e" href="https://linear.app/fastboy/document/services-management-bb5c06fb3976">Services Management</document>
- <document id="efc46a16-ceb1-482b-933f-e598888037b1" href="https://linear.app/fastboy/document/settings-6fe2b4cc81a4">Settings</document>
- <document id="1ac3e4f2-12ac-4668-87eb-b7ef968b0705" href="https://linear.app/fastboy/document/shortcuts-79020cf891f9">Shortcuts</document>
- <document id="66075d01-9f88-4fcf-bd40-ce5ef87ce3b3" href="https://linear.app/fastboy/document/split-order-a317435c0a01">Split Order</document>
- <document id="5b8b466a-c274-4948-814b-aa4e03c4fa86" href="https://linear.app/fastboy/document/staff-management-e01aa8aef908">Staff Management</document>
- <document id="ec3b70d2-d396-46a4-bbe8-00801a1e6d47" href="https://linear.app/fastboy/document/staff-rating-2ed9110c2c67">Staff Rating</document>
- <document id="0c7b6c8b-c233-410d-b514-1e8727149174" href="https://linear.app/fastboy/document/system-management-ed7003c21496">System Management</document>
- <document id="65af5d69-4a4e-4e33-bc0d-c4fe7d4ef102" href="https://linear.app/fastboy/document/time-keeping-e0f3efd072d0">Time Keeping</document>
- [Turn Suggestion](https://linear.app/fastboy/document/turn-suggestion-92372b816566)
- <document id="4e51fce1-a889-48a1-bb35-6fbc7d984527" href="https://linear.app/fastboy/document/version-management-df865e39d169">Version Management</document>

## Working docs — V-Features (7)

- <document id="ec3a7ee0-d0f8-4081-8ab2-6c82aca99003" href="https://linear.app/fastboy/document/merge-order-guide-su-dung-and-dev-7fba25972140">Merge Order — Guide (sử dụng &amp; dev)</document>
- <document id="31dd0609-2477-4870-809e-b11dffd3bce2" href="https://linear.app/fastboy/document/merge-order-randd-gopos-parity-6c73fd58ec87">Merge Order — R&amp;D (GoPOS parity)</document>
- <document id="a335256b-66e0-41d6-a1bc-c5f55df889cf" href="https://linear.app/fastboy/document/staff-rating-randd-gopos-parity-e6138a845751">Staff Rating — R&amp;D (GoPOS parity)</document>
- <document id="227c3a24-7fec-48a5-96a2-464f47fc2200" href="https://linear.app/fastboy/document/turn-guide-nguoi-moi-2302a9daa4bb">Turn — Guide (người mới)</document>
- [Turn — Impl log (FE volt-pos)](https://linear.app/fastboy/document/turn-impl-log-fe-volt-pos-d01b55831466)
- <document id="20892073-eac9-4359-be52-8500be8a51cc" href="https://linear.app/fastboy/document/turn-spec-verified-tu-gopos-664f8037a1c0">Turn — Spec (verified từ GoPOS)</document>
- <document id="0dd7143c-8c99-489d-8d93-d373399f676d" href="https://linear.app/fastboy/document/turn-test-cases-02d800121ca7">Turn — Test cases</document>

---

# 📋 VOLT POS — Release Notes

_Linear doc: https://linear.app/fastboy/document/volt-pos-release-notes-10de31de66dd_

📌 Source of truth: Linear

Living changelog for VOLT POS — newest release on top. End-user-facing notes; internal back-end/refactor items are listed separately for traceability only.

---

# v1.0.31

**Release date:** June 18, 2026

This release adds check management and payroll-check printing, expands customer tools, and delivers a large accuracy fix across the Income/Reports suite. _(Issue references in parentheses for internal traceability.)_

## 🚀 New Features

**Split Order & Check Management** (<issue id="0fb81349-ef8c-4642-abd2-a54cbe5844f0" href="https://linear.app/fastboy/issue/VP-206/split-order-and-check-management">VP-206</issue>)

- Split a single order into multiple checks, either **By Amount** or **Equally**.
- **Merge Checks** and merge in-progress orders at checkout (<issue id="cc09389f-3a3a-46d3-b3cf-37444cdab6bc" href="https://linear.app/fastboy/issue/VP-1708/pos-merge-checks">VP-1708</issue>, <issue id="3ba87d01-9f9c-425a-bc2a-c573bd1154df" href="https://linear.app/fastboy/issue/VP-1784/pos-merge-order-merge-processing-orders-at-checkout">VP-1784</issue>).

**Print Check — Portal** (<issue id="43886ee3-1888-4a48-93ef-28c422e36539" href="https://linear.app/fastboy/issue/VP-1435/portal-print-check">VP-1435</issue>, <issue id="945e81a0-fd70-482b-905e-195d4a908ac8" href="https://linear.app/fastboy/issue/VP-1625/fe-print-check">VP-1625</issue>)

- **Bank Account Management** for paycheck printing (<issue id="5b3bf99d-6080-4439-a562-6b1360eff47d" href="https://linear.app/fastboy/issue/VP-1751/bank-account-management">VP-1751</issue>).
- **Check List** with Add Staff and Signature support (<issue id="053273a7-eb70-4d94-9415-cb2b07158d72" href="https://linear.app/fastboy/issue/VP-1752/check-list-add-staff-signature">VP-1752</issue>).
- **Check Detail** view (<issue id="247b4013-9aa0-4f36-b4b0-8922ee6950b9" href="https://linear.app/fastboy/issue/VP-1753/check-detail">VP-1753</issue>).

**Edit Customer — Portal** (<issue id="30496af9-fd65-46e8-a840-fb45fd44e8eb" href="https://linear.app/fastboy/issue/VP-1785/portal-edit-customer">VP-1785</issue>, <issue id="6841e8ed-1c93-467f-9558-4539d83db73a" href="https://linear.app/fastboy/issue/VP-1624/fe-edit-customer">VP-1624</issue>) — edit customer details directly from the Portal.

**Customer Search by Name or Email** (<issue id="3d06eaca-7a0e-4e74-b3c5-23621b155eff" href="https://linear.app/fastboy/issue/VP-1235/support-customer-search-by-name-on-create-order-screen">VP-1235</issue>, <issue id="dd30403e-4be0-47d2-9aca-136e1f1a4103" href="https://linear.app/fastboy/issue/VP-1755/pos-support-customer-search-by-name-on-create-order-screen">VP-1755</issue>) — find existing customers by name or email on the Create Order screen.

**Staff Payroll — Salary Type** (<issue id="c7d71f52-6002-4b1c-a1b8-cf5736c691d2" href="https://linear.app/fastboy/issue/VP-1341/staff-payroll-calculation-salary-type">VP-1341</issue>) — payroll now supports salary-type staff in addition to commission.

**Appointment Tags on Check-in** (<issue id="bfe32df6-7fb7-4de6-ad03-57dcb94f542c" href="https://linear.app/fastboy/issue/VP-1775/pos-display-appointment-tag-on-check-in-today-records-linked-to">VP-1775</issue>, <issue id="1e9ed7e0-77f9-42ed-9e07-777163a29570" href="https://linear.app/fastboy/issue/VP-1783/pos-display-appointment-tag-on-check-in-today-records-linked-to">VP-1783</issue>) — check-in records linked to an appointment now display the appointment tag; improved tag display on order cards (<issue id="8cd2c005-a536-4b35-a802-4b7c2171a989" href="https://linear.app/fastboy/issue/VP-1823/pos-improve-display-tag-on-order-card-tag-tren-order-card">VP-1823</issue>).

**Sync with Business Hours** (<issue id="b9451799-8d82-4d39-a7b1-c23ef4b21795" href="https://linear.app/fastboy/issue/VP-1170/add-sync-with-business-hours-button-in-employee-settings-work-hours">VP-1170</issue>, <issue id="b34c1593-7c82-43c8-addc-a6a9311542b0" href="https://linear.app/fastboy/issue/VP-1756/pos-add-sync-with-business-hours-button-in-employee-settings-work">VP-1756</issue>) — new button in Employee Settings → Work Hours to sync an employee's hours to the business hours.

## ✨ Improvements

- **Appointment page UI** — wider, clearer appointment cards (<issue id="c69f294a-15d9-4f19-b13c-e6d9ce9ccdb8" href="https://linear.app/fastboy/issue/VP-1895/pos-improve-appointment-overview-layout">VP-1895</issue>); cleaner overall layout (<issue id="9bc8accd-2f21-420d-a021-69fdd820c3e2" href="https://linear.app/fastboy/issue/VP-1284/improve-appointment-page-ui">VP-1284</issue>, <issue id="70ca7b99-7a29-4bc7-aac9-e98655cad9aa" href="https://linear.app/fastboy/issue/VP-1616/pos-improvement-appointment">VP-1616</issue>).
- **Order History** — display card brand + last 4 digits and a quick date filter (<issue id="0fd0cc4e-4264-40eb-a4ee-77bc69022a4c" href="https://linear.app/fastboy/issue/VP-1856/portal-order-history-show-card-brand-last4-quick-date-filter">VP-1856</issue>); show order _create_ time (<issue id="7ed280c7-0823-4918-919a-ce6fd6ec68df" href="https://linear.app/fastboy/issue/VP-1826/order-history-display-create-order-time-instead-of-complete-order-time">VP-1826</issue>); hide the Refund button on $0 orders (<issue id="a79ecabd-f6d1-4f35-b790-df342e76aa3a" href="https://linear.app/fastboy/issue/VP-1811/improvement-production-order-history-disablehide-refund-button-for">VP-1811</issue>).
- **Merchant Overview** — added metric descriptions to summary cards (<issue id="3dd39fb4-9ed1-4674-b53b-b0344ea9db37" href="https://linear.app/fastboy/issue/VP-1799/add-metric-descriptions-to-merchant-overview-summary-cards">VP-1799</issue>).
- **Order Detail / Payment Detail** — improved layout and added payment info (<issue id="91032e0d-6ab1-479d-bafb-db115beb2f51" href="https://linear.app/fastboy/issue/VP-1371/improve-ui-order-detail-payment-detail">VP-1371</issue>, <issue id="29921e94-baa6-4c0f-a1af-c87aaa060ca3" href="https://linear.app/fastboy/issue/VP-1372/be-support-get-information">VP-1372</issue>).
- **Staff income commission rate** enhancement (<issue id="1c08dde7-7fde-4fd3-aaec-a1c95d1fdd01" href="https://linear.app/fastboy/issue/VP-1889/staff-income-commission-rate-enhancement">VP-1889</issue>).
- **Inactive staff** — defined behavior when tapping inactive-staff notifications; checkout from an appointment with a pending order now opens that order (<issue id="829bf029-ea5d-4c16-980e-08108e7de9e3" href="https://linear.app/fastboy/issue/VP-1244/define-system-behavior-when-clicking-notifications-of-inactive-staff">VP-1244</issue>, <issue id="9d9023a0-16ec-417d-9dc9-b8e91ade5f25" href="https://linear.app/fastboy/issue/VP-1325/pos-checkout-from-appointment-with-pending-order-should-redirect-to">VP-1325</issue>).

## 🐛 Bug Fixes

**Income & Reports accuracy** (<issue id="4f96b052-669f-4dd0-b275-1f1d669362ca" href="https://linear.app/fastboy/issue/VP-1711/list-bug-production-income-summary-daily-sale-report-staff-income">VP-1711</issue>)

- Gross Income now correctly subtracts discounts (<issue id="7cd2e896-a4e8-483d-be3b-3d5ad0768d9f" href="https://linear.app/fastboy/issue/VP-1805/production-income-summary-gross-income-tinh-sai-khong-tru-discount">VP-1805</issue>).
- Total Staff Payout now includes Staff Salary and uses the correct Clean Up Fee (<issue id="5b550d7f-17dd-4d32-ab0d-df3e3d607156" href="https://linear.app/fastboy/issue/VP-1713/income-summary-total-staff-payout-tinh-sai-bo-sot-staff-salary-and">VP-1713</issue>).
- Staff/Salon Supply Share now splits correctly by commission % and no longer rounds inconsistently (<issue id="f1c4bc56-a465-46b3-a8dd-def1794a1db6" href="https://linear.app/fastboy/issue/VP-1712/production-income-summary-staffsalon-supply-share-tinh-sai-khong-chia">VP-1712</issue>, <issue id="42509ce2-b5cc-4f8e-8188-b2e0b52e5a05" href="https://linear.app/fastboy/issue/VP-1714/income-summary-salon-earnings-tinh-sai-do-salon-supply-share-sai">VP-1714</issue>, <issue id="def49d57-fdba-42fe-8ebe-8156c2ab8f43" href="https://linear.app/fastboy/issue/VP-1798/production-income-summary-staffsalon-supply-share-lam-tron-lech">VP-1798</issue>, <issue id="f78368d2-0f16-4e40-be7e-7bf306b0fbaa" href="https://linear.app/fastboy/issue/VP-1861/staff-supply-share-hien-thi-2-gia-tri-khac-nhau-trong-income-summary">VP-1861</issue>, <issue id="b294f8ba-20a7-4a5c-babb-00cf4809b404" href="https://linear.app/fastboy/issue/VP-1868/staff-salon-supply-share-khong-cong-khop-total-supply-fee-giua-cac">VP-1868</issue>).
- Tip totals now match between Income Summary blocks (<issue id="7b9b0af7-381a-419a-88a4-ef6edc13ebc4" href="https://linear.app/fastboy/issue/VP-1874/tip-lech-dollar004-giua-cac-block-trong-income-summary-total-tip">VP-1874</issue>).
- Staff Income detail panel now shows the selected staff (<issue id="a06e2fdc-a2e0-4862-be31-5818583de4b6" href="https://linear.app/fastboy/issue/VP-1884/staff-income-click-vao-1-staff-nhung-panel-chi-tiet-hien-thi-thong-tin">VP-1884</issue>).
- Date-range filter no longer drops current-day (End Date) orders (<issue id="fe054c0d-1102-47ef-bfe9-7e1628042f3b" href="https://linear.app/fastboy/issue/VP-1810/production-staff-income-loi-bo-loc-khoang-ngay-bo-sot-toan-bo-djon">VP-1810</issue>); $0 refund orders now appear in the detail list (<issue id="699b64f7-b6a1-4e6e-ac6e-5d600dc58cc0" href="https://linear.app/fastboy/issue/VP-1808/production-staff-income-djon-hang-refund-0dj-cua-nhan-vien-khong-hien">VP-1808</issue>).
- Orders created today now appear in Daily Sale Report, Income Summary & Staff Income (<issue id="fec8143b-22b1-436f-af7a-cc892bd16cc2" href="https://linear.app/fastboy/issue/VP-1725/order-tao-trong-ngay-khong-hien-thi-o-daily-sale-report-income-summary">VP-1725</issue>).
- **Receipt printing** — correct "Sale Details" heading (<issue id="cb95b92d-cb5a-4ce7-b739-e702e39e33bf" href="https://linear.app/fastboy/issue/VP-1832/receipt-printing-sai-tua-dje-khoi-du-lieu-hien-thi-income-details-thay">VP-1832</issue>); refund minus sign restored in Sale/Refund & Supply columns (<issue id="ae6a72bc-8884-406c-8a16-e0bb3d3c1009" href="https://linear.app/fastboy/issue/VP-1813/receipt-printing-djon-hang-refund-hien-thi-sai-djinh-dang-thieu-dau">VP-1813</issue>); tax note line no longer wraps/misaligns (<issue id="614419e1-fc80-459c-bdfd-b38fde014d78" href="https://linear.app/fastboy/issue/VP-1812/receipt-printing-dong-ghi-chu-tax-bi-vo-thanh-2-dong-va-lech-hang-tren">VP-1812</issue>).
- Daily Sale Report date picker redesigned (<issue id="e786d70f-d207-404d-b617-1b960625b752" href="https://linear.app/fastboy/issue/VP-1687/ui-redesign-calendar-date-picker-tren-daily-sale-report">VP-1687</issue>, <issue id="b74bca88-e32a-464f-be43-53ac0005791d" href="https://linear.app/fastboy/issue/VP-1631/hien-thi-mo-ta-cua-card-dang-text-co-djinh-thay-vi-tooltip">VP-1631</issue>).

**Split Order**

- Cash Drawer button now works and only appears for Cash payments (<issue id="24a5255b-ff76-4fb2-8111-ab11a0c5d498" href="https://linear.app/fastboy/issue/VP-1932/split-order-button-cash-drawer-chua-hoat-djong-va-hien-thi-sai-theo">VP-1932</issue>).
- "By Amount" split totals now match the order total — no missing money (<issue id="bba97d51-1136-42b6-916b-ba07dc3623ba" href="https://linear.app/fastboy/issue/VP-1919/split-order-by-amount-tong-cac-check-khong-khop-tong-order-bi-thieu">VP-1919</issue>); "Equally" totals corrected (<issue id="6583573b-80ef-4caa-bee8-f58567987eff" href="https://linear.app/fastboy/issue/VP-1891/sai-lech-tong-tien-khi-split-order-equally">VP-1891</issue>).
- Fixed $0.01 orders being splittable and $0.00 checks being unpayable (<issue id="2d5cc5ae-1356-4671-8bad-360ce81de4b4" href="https://linear.app/fastboy/issue/VP-1867/order-dollar001-van-split-djuoc-check-dollar000-khong-the-pay">VP-1867</issue>); added scrollbar to the check list (<issue id="f9a63e66-f641-4bc8-8a5c-dcd2283b5210" href="https://linear.app/fastboy/issue/VP-1864/split-order-check-list-thieu-scrollbar">VP-1864</issue>).

**Appointments**

- Staff work hours now show on Fridays when enabled (<issue id="6c5bacc9-1d91-4756-b89b-aec1a2187248" href="https://linear.app/fastboy/issue/VP-1839/appointment-khong-hien-thi-gio-lam-viec-cua-staff-vao-thu-6-du-work">VP-1839</issue>).
- Calendar shows day numbers and allows selecting future dates (<issue id="dbc4a016-5ac8-4724-b317-18358d0d4add" href="https://linear.app/fastboy/issue/VP-1837/calendar-khong-cho-chon-ngay-trong-tuong-lai">VP-1837</issue>, <issue id="9d1c436a-7446-4850-afb4-377deb35389c" href="https://linear.app/fastboy/issue/VP-1838/calendar-mat-hien-thi-so-ngay-o-cac-ngay-tuong-lai">VP-1838</issue>).
- Correct layout for bookings that cross midnight (<issue id="ab6de659-170e-4238-82da-288c3e5c6301" href="https://linear.app/fastboy/issue/VP-1758/appointment-hien-thi-sai-layout-khi-booking-keo-dai-qua-1200-am-qua">VP-1758</issue>).

**Payroll & Pay Periods**

- Weekly pay period now uses the correct date range (<issue id="b70e7920-4fa5-4df9-9f79-8b8ffdfddc65" href="https://linear.app/fastboy/issue/VP-1842/bug-prod-weekly-pay-period-calculated-with-incorrect-date-range">VP-1842</issue>) and periods display in the correct order (<issue id="97b16a7f-95da-4033-9f0a-02c52927334b" href="https://linear.app/fastboy/issue/VP-1841/bug-prod-portal-payroll-periods-displayed-in-incorrect-order">VP-1841</issue>).
- Total Payment by Hour calculation corrected (<issue id="86da8793-ed6b-4de1-9b09-ad215e209f7e" href="https://linear.app/fastboy/issue/VP-1827/bug-portal-total-payment-by-hour-calculation-incorrect">VP-1827</issue>).
- Tips are no longer added to pay when "Exclude Tips From Cash/Check Income" is enabled (<issue id="aca0ec01-b43d-41e3-a8af-b885e24e5ac5" href="https://linear.app/fastboy/issue/VP-1791/tip-van-cong-vao-luong-khi-bat-exclude-tips-from-cashcheck-income">VP-1791</issue>).

**Customer**

- Customer page now refreshes when switching merchants on the Portal (<issue id="6120568e-8a86-42be-8cf4-b1ce320210ba" href="https://linear.app/fastboy/issue/VP-1899/bugportal-customer-page-khong-refresh-khi-switch-merchant">VP-1899</issue>).
- Search by email now works on Create Order (<issue id="e3817b85-03aa-4b3e-aeba-af039dd380f7" href="https://linear.app/fastboy/issue/VP-1894/create-order-khong-tim-djuoc-khach-hang-bang-email-search-by-email">VP-1894</issue>); fixed result rows overlapping with long names (<issue id="9a50aa91-022c-4d70-b589-d24e1061c870" href="https://linear.app/fastboy/issue/VP-1893/customer-search-loi-vo-giao-dien-cac-dong-ket-qua-bi-chong-chap-dje">VP-1893</issue>).

**Other**

- Inactive staff: canceling the change-staff prompt no longer creates an order for an inactive staff (<issue id="81a44c02-46b4-479e-8576-cc1fe7b76978" href="https://linear.app/fastboy/issue/VP-1769/inactive-staff-nhan-cancel-o-prompt-djoi-staff-van-tao-djuoc-order-cho">VP-1769</issue>); removed quotes around staff names in notifications (<issue id="67508569-deb7-4378-8323-3026fe165777" href="https://linear.app/fastboy/issue/VP-1768/notification-bo-dau-ngoac-kep-quanh-ten-staff-trong-thong-bao-inactive">VP-1768</issue>).
- Corrected time-tracking modal titles (<issue id="c29620f6-f131-4363-81a0-59e2e35be05e" href="https://linear.app/fastboy/issue/VP-1779/time-keeping-thieu-khoang-trang-timekeeping-phai-la-time-keeping">VP-1779</issue>, <issue id="dc9c49c4-0ee9-4007-8037-a2ae9485858d" href="https://linear.app/fastboy/issue/VP-1562/topic-13-incorrect-titles-in-time-tracking-modals">VP-1562</issue>).
- Gift card history now shows top-ups in the correct order after offline sync (<issue id="b953f389-8ca8-42d1-ba1d-660906a2fe80" href="https://linear.app/fastboy/issue/VP-1549/gift-card-history-hien-thi-sai-thu-tu-top-up-sau-khi-sync-tu-offline">VP-1549</issue>).
- Tip Settings no longer allows a $0.00 / 0% option (<issue id="a4869927-5cd4-47c7-9cfb-fc003f24594a" href="https://linear.app/fastboy/issue/VP-1745/validation-tip-settings-cho-phep-them-option-voi-gia-tri-0-dollar000">VP-1745</issue>).
- "Do not require passcode" checkbox can now be checked (<issue id="5f678492-cfe4-4f6b-b2dd-0f40ce3ddbae" href="https://linear.app/fastboy/issue/VP-1722/cannot-check-do-not-require-passcode-checkbox-on-passcode-popup">VP-1722</issue>).
- Card Charge Fee fix (<issue id="ea171daf-9a8d-4918-835f-8b7703d2cc36" href="https://linear.app/fastboy/issue/VP-1871/bug-card-charge-fee">VP-1871</issue>).
- Pending Orders now show the date (not just the time) when filtering across multiple days (<issue id="266f341d-0d79-4684-8575-26e20b64c7d9" href="https://linear.app/fastboy/issue/VP-1728/pending-orders-chi-hien-thi-gio-tao-djon-thieu-ngay-khi-filter-theo">VP-1728</issue>).

---

_Internal-only (not user-visible) — for traceability:_ <issue id="4f54964e-76ff-49bb-9307-a8baf957aaee" href="https://linear.app/fastboy/issue/VP-1726/be-implement-vp-1693-optimize-staff-queries-fix-inactive-staff-unify">VP-1726</issue>_,_ <issue id="e1ae6309-8d9d-4358-baea-81b61a871c83" href="https://linear.app/fastboy/issue/VP-1618/be-fix-staff-summary-response-format-remove-ldjson-wrapper">VP-1618</issue>_,_ <issue id="bb9388c5-3d07-4811-a4a2-aa7f2ebf2060" href="https://linear.app/fastboy/issue/VP-1764/upgrade-payment-api-add-x-gci-service-header-for-payment-routing">VP-1764</issue>_,_ <issue id="3160e843-55b2-4ff7-bbb4-a66138033337" href="https://linear.app/fastboy/issue/VP-1693/optimize-payroll-staff-query-to-avoid-iterating-all-historical-staff">VP-1693</issue>_,_ <issue id="2c21aac7-363d-44a1-a010-8a7d1722cd7d" href="https://linear.app/fastboy/issue/VP-1836/rust-report-staff-today">VP-1836</issue>_,_ <issue id="a9a72626-bd6c-474e-b47d-97a746e924cd" href="https://linear.app/fastboy/issue/VP-1792/rust-exclude-tips-from-cashcheck-income">VP-1792</issue>_,_ <issue id="c835cdeb-8588-4154-a256-70f834cf6f68" href="https://linear.app/fastboy/issue/VP-1851/be-tip-for-staff-0-when-function-exclude-tip-from-cashcheck-enable">VP-1851</issue>_,_ <issue id="03965bf9-f299-4b2e-a1c2-d7d6a8632483" href="https://linear.app/fastboy/issue/VP-1814/fix-vp-1808">VP-1814</issue>_,_ <issue id="36441588-2b1b-46fb-90b7-0dd9cc0de702" href="https://linear.app/fastboy/issue/VP-1875/fix-vp-1874">VP-1875</issue>_,_ <issue id="a52d7127-6b36-4854-a033-b514a03b4442" href="https://linear.app/fastboy/issue/VP-1209/pos-update-all-claude-configurations">VP-1209</issue>_,_ <issue id="736dc0df-e8dc-439e-8e21-f7a020a1cd75" href="https://linear.app/fastboy/issue/VP-1820/fe-integrate-updated-api-for-bank-account-management">VP-1820</issue>_,_ <issue id="e1db3754-f492-4afb-9521-8a6df94203e1" href="https://linear.app/fastboy/issue/VP-1821/fe-integrate-updated-api">VP-1821</issue>_,_ <issue id="8d0adeaf-73ac-4dad-9ac8-c2d1ca0a2110" href="https://linear.app/fastboy/issue/VP-1822/fe-integrate-updated-api-for-history-and-audit-log">VP-1822</issue>_,_ <issue id="7995e6e4-78b0-4b2d-883c-f6768d894f8f" href="https://linear.app/fastboy/issue/VP-1877/fe-update-payload-for-edit-customer">VP-1877</issue>_,_ <issue id="73891d9d-4e76-40b4-90d9-fce6dd87b429" href="https://linear.app/fastboy/issue/VP-778/order-history">VP-778</issue>_,_ <issue id="7fc7285d-192e-46d1-9b8f-f411d45d620e" href="https://linear.app/fastboy/issue/VP-1869/pos-improvement-ui">VP-1869</issue>_,_ <issue id="5dbb4e0b-128d-418f-bd9d-5d45f0b297ca" href="https://linear.app/fastboy/issue/VP-1705/pos-split-order-and-check-management">VP-1705</issue>_,_ <issue id="cf29ce39-83c1-472a-896c-a80dc9746b53" href="https://linear.app/fastboy/issue/VP-963/portal-daily-sale-report-income-summary-staff-income">VP-963</issue>_,_ <issue id="eb20c545-c7aa-439c-8fca-56c5fc6b4a9f" href="https://linear.app/fastboy/issue/VP-734/integration-time-tracking-management">VP-734</issue>_,_ <issue id="25cf5857-b078-405d-b99b-9707c05f7df5" href="https://linear.app/fastboy/issue/VP-1548/list-bug-offline-gift-card-sale">VP-1548</issue>_,_ <issue id="ac3a337d-974d-4bfa-ab68-1d9f96f5cb9a" href="https://linear.app/fastboy/issue/VP-1740/list-bug-time-tracking-management">VP-1740</issue>_,_ <issue id="081769eb-47b9-460c-bcde-6d9d4f4bc66b" href="https://linear.app/fastboy/issue/VP-1767/list-bug-inactive-staff-notification">VP-1767</issue>_,_ <issue id="f4e0817b-2e22-4866-bdb7-39643d3567e5" href="https://linear.app/fastboy/issue/VP-1627/list-bug-daily-sale-report">VP-1627</issue>_,_ <issue id="267f0da9-dda1-42fd-a71d-7d6a7cb947b4" href="https://linear.app/fastboy/issue/VP-1744/list-bug-charge-and-fee">VP-1744</issue>_,_ <issue id="0a27cdbd-10f2-4b1a-9a85-bfd1bb2d1db9" href="https://linear.app/fastboy/issue/VP-1634/pos-improve-pending-order">VP-1634</issue>_,_ <issue id="297fdf9f-c9a0-4e48-8d40-6fa4bab88afa" href="https://linear.app/fastboy/issue/VP-1892/list-bug-support-customer-search-by-name-on-create-order-screen">VP-1892</issue>_._

---

# Login flow

_Linear doc: https://linear.app/fastboy/document/login-flow-0a3c431463e0_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Login flow, chỉ support login 1 cách suy nhất thông qua Business App**

1. **Create order từ CRM và có WhmcsID**
2. **Dùng thông tin WhmcsID + Package để create account POS**
3. **Sử dụng Business app và login bằng cách Scan QCcode**

- App Business: [https://dev.business.gocheckin.net/](https://dev.business.gocheckin.net/)
- Tiệm: Volt POS 14 - WhmcsID 14
- Owner phone: 205 205 2052 / 123456
- **Lưu ý**:
  - Phải login bằng thông tin Owner tiệm
  - Account Test: chọn đúng tiệm 14 rồi sau đó mới thực hiện Scan QR code

---

_Source: Google Docs — "Login flow" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Order Flow

_Linear doc: https://linear.app/fastboy/document/order-flow-1bd212f296da_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# \[Volt POS\] POS Home screen (Order Flow)

# Header Bar

## Quick Redirect - Appointment

Link booking online: [https://booking.gocheckin.net/v2/3](https://booking.gocheckin.net/v2/3), thực hiện book appointment từ site này, và hiển thị lên Calendar Appointment của POS.

Thời điểm hiện tại, chỉ read-only những appointment đến từ booking online, không create appointment từ POS.

Click Check-out từ appointment, sẽ tạo ra order trên POS và không quan tâm đến status của Appointment, muốn tạo order thì click Checkout và sẽ fill những service/staff từ appointment qua Order.

Trong một thời điểm chỉ được create 1 order từ 1 appointment.

**Mô tả chi tiết như sau:**

- **Appointment Calendar:** gồm những thông tin sau
  - Date: default today
  - Time: 12:00AM - 11:45PM
  - List Staff available:
    - Staff status Active
    - Column đầu tiên là Unassigned (có hoặc ẩn tùy theo setting)
    - List staff: theo thứ tự alphabet nickname
    - Show available time theo Work Hour của staff đó
  - Line current time
  - Filter:
    - Staff:
      - Unassigned
      - Staff Nickname
      - All
    - Status: Scheduled / Canceled / Confirmed / Done
    - Date: default Today
  - Button: New Appointment
- **Appointment List:** gồm những thông tin sau
  - Customer info: 1 trong 2 thông tin sau
    - Customer Name
    - Customer phone: 4 số cuối nếu không có customer name
  - Service Name
  - Duration
  - Appointment Note
- **Appointment detail modal**: gồm những thông tin sau
  - Appointment status
  - Customer Name
  - Customer phone
  - Service name
  - Duration time
  - Staff nick name
  - Appointment Note
  - Action button: Checkout / Edit / Cancel / Confirm
- **Add new Appointment:** form create new appointment gồm những thông tin sau
  - Title: Add New Appointment
  - Customer Phone (required)
  - Customer Name (optional)
  - Date: chọn chọn tạo appointment, có thể chọn ngày trong quá khứ
  - Service/Staff:
    - Start time: thời gian đặt hẹn
    - Staff:
      - Any Staff
      - Show list staff nickname - status Active
    - Duration: thời gian thực hiện service, default sẽ hiển thị Duration của service theo setting
    - Service: list service available
    - Một số lưu ý:
      - Sau khi chọn Service, có thể update Duration tùy ý
      - Nếu chọn Any Staff, thì appointment đó sẽ được gán cho Unassigned column
      - Có thể chọn nhiều Service, nhiều Staff trong 1 appointment
      - Một Start Time sẽ tạo thành 1 label appointment trong Calendar
      - Có thể chọn nhiều service cho cùng 1 staff với cùng Start Time
  - Tag: được update tự do, không có ràng buộc, chỉ là dấu hiệu nhận biết trong appointment, không ảnh hưởng đến logic.
    - Requested (Khách gửi yêu cầu đặt lịch nhưng chưa được tiệm xác nhận.)
    - Highlight (Appointment được đánh dấu nổi bật để dễ nhận biết.)
    - No Show (Khách không đến và không thông báo.)
    - Lưu ý: sau khi Save Appointment và mở lại appointment đó thì mới xuất hiện option No Show
- **Edit Appointment/Appointment Detail**: được update những thông tin sau
  - Date
  - Customer phone
  - Customer name
  - Service/Staff/Start Time/Duration
  - Add more Service/Staff
  - Delete Service/Staff: nhưng tối thiểu phải có 1 service/staff trong appoinment
  - Appointment Notes
  - Tag: được update tự do, không có ràng buộc, chỉ là dấu hiệu nhận biết trong appointment, không ảnh hưởng đến logic.
    - Requested
    - Highlight
    - No Show
  - Ngoài ra, sẽ hiển thị thêm thông tin về Checkin/Order/Appointment của Customer đó, gồm:
    - Appointment: total appointment (status: Scheduled / Canceled / Confirmed / Done)
    - Spent: tổng số tiền đã dùng
    - Point: số điểm hiện tại
    - Visit: tổng số lần đến tiệm
    - Checkin tab: show list checkin đến thời điểm hiện tại của customer, gồm:
      - Checkin/checkout date: thời gian tạo order
      - Status
      - Point
    - Order tab: show list order đến thời điểm hiện tại của customer, gồm:
      - Order created at
      - Staff
      - Service
      - Total Amount
    - Appointment tab: show list appointment đến thời điểm hiện tại của customer, gồm:
      - Appointment Date
      - Staff
      - Service
      - Duration
      - Status
- **Lưu ý đặc biệt:**
  - Khi 1 order đang create, và user back ra overview checkout 1 order mới từ Appointment, thì:
    - 1 - phải complete order này trước, xong sau đó back ra check out order khac từ appointment
    - 2 - sẽ thoát order hiện tại (order này chỉ đang tạo và chưa thanh toán gì cả), checkout order từ appointment thì replace order đang thực hiện bằng thông tin của appointment đang checkout.Đồng thời sẽ hiển thị popup warning replace thông tin của order bằng thông tin từ appointment vào order hiện tại:

      **Title:** Update Order from Appointment

      **Message:** We will update this order using information from the selected appointment.  
      Current order changes will be replaced.

      Would you like to continue?

      **Actions:**

- Keep Current Order
- Update Order
- **Appointment workflow :**

| Status / Action                                                                            | Edit                                                                  | Cancel           | Confirm                                    | Check Out                                  |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ---------------- | ------------------------------------------ | ------------------------------------------ |
| **Scheduled** \[Appointment vừa mới được tạo, phải Confirm mới có thể convert sang Order\] | Yes Date / Time Staff / Service Customer: Phone/Name Appointment note | Yes              | Yes Create an order with appointment info. | No                                         |
| **Canceled** \[Appointment bị cancel\]                                                     | No                                                                    | No               | No                                         | No                                         |
| **Confirmed** \[Appointment đã được confirm, có thể convert sang Order\]                   | Yes Date / Time Staff / Service Customer: Phone/Name Appointment note | Yes Order Delete | No                                         | Yes Redirect to the checkout order screen. |
| **Done** \[Appointment đã convert sang Order và Order đã Complete\]                        | No                                                                    | No               | No                                         | No                                         |

- **Một số lưu ý:**
  - Chỉ được tạo appointment cho staff vào Work Hour của staff đó
  - Chỉ có Booking online từ [https://booking.gocheckin.net/v2/3](https://booking.gocheckin.net/v2/3) mới bị depend lên Business Work Hour của tiệm. Đối với POS thì sẽ mở full khung giờ trong ngày
  - Vẫn được tạo appointment cho ngày quá khứ, nhưng khi Checkout appointment đó thì created at của order là sẽ thời điểm click Checkout appointment
  - Nếu click Checkout và update list service/staff trong order sẽ không ảnh hưởng đến detail hiện tại của appointment
- **Một số setting liên quan đến Appointment cóc thể thực hiện trên giao diện:**
  - "Any Staff" option will be used when your customer doesn't know who to book online.
  - Hide unassigned column when having no appointment
  - You don't need to confirm your online bookings, which means all online bookings from your customers will be automatically confirmed right after they book.
- **Một số key setting trên Insight:**

| Setting Key                                            | Description                                                                                                                   |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| config.appointment.active                              |                                                                                                                               |
| module.appointment.active                              |                                                                                                                               |
| module.appointment.book_time_limit                     |                                                                                                                               |
| module.appointment.book_day_limit                      |                                                                                                                               |
| module.appointment.split_time                          | (Booking online) Chia khung thời gian để book, hiện tại là 15 phút                                                            |
| module.appointment.page_staff.active                   | (Booking online)                                                                                                              |
| module.appointment.page_service.active                 | (Booking online)                                                                                                              |
| module.appointment.any_staff                           |                                                                                                                               |
| module.appointment.any_staff.auto_assign               | (0) Auto assign to available staff if choose any staff (1) Customer will assign staff manually                                |
| module.appointment.skip_owner_confirm                  | (0) Appointment sau khi được create sẽ có status **Scheduled** (1) Appointment sau khi được create sẽ có status **Confirmed** |
| module.appointment.show_duration                       |                                                                                                                               |
| module.appointment.web_booking.block_time_by_confirmed | (Booking online)                                                                                                              |
| module.appointment.email_required                      |                                                                                                                               |

## Quick Redirect - Cash Drawer

Click sẽ mở Cash Drawer

## Scan

Scan 2 thông tin sau:

- Scan Barcode/QR code Giftcard: Check nhanh thông tin của Giftcard
- Scan Order QR code, click sẽ redirect đến Order History

## Search

- Customer: customer name, customer phone
- Order: order ID
  - Khi search sẽ show những data liên quan đến thông tin đang search, gồm 4 tab thông tin:
    - **All:** show tất cả thông tin của 3 tabs còn lại
    - **Appointment:** list appointment của customer phone, show all, gồm những field thông tin sau:
      - Date & time
      - Customer info: Name / 4 số cuối phone number
      - Service name / Staff nickname
      - Status
      - Click sẽ show appointment detail:
        - Date
        - Customer phone
        - Customer name
        - Service/Staff/Start Time/Duration
        - Add more Service/Staff
        - Appointment Notes
        - Ngoài ra, sẽ hiển thị thêm thông tin về Checkin/Order/Appointment của Customer đó, gồm:
          - Appointment: total appointment (status: Scheduled / Canceled / Confirmed / Done)
          - Spent: tổng số tiền đã dùng
          - Point: số điểm hiện tại
          - Visit: tổng số lần đến tiệm
          - Checkin tab: show list checkin đến thời điểm hiện tại của customer, gồm:
            - Checkin/checkout date: thời gian tạo order
            - Status: Pending/Completed
            - Point
          - Order tab: show list order đến thời điểm hiện tại của customer, gồm:
            - Order created at
            - Staff
            - Service
            - Total Amount
          - Appointment tab: show list appointment đến thời điểm hiện tại của customer, gồm:
            - Appointment Date
            - Staff
            - Service
            - Duration
            - Status
            - Tag (nếu có)
    - **Order:** show list order trùng với thông tin customer hoặc orderID trùng, gồm những thông tin sau:
      - Order ID
      - Date
      - Customer info: name/phone
      - Order staff nickname / Order service name
      - Order status
      - Click sẽ redirect đến Order History của order đó
    - **Customer:** gồm những thông tin sau:
      - Customer name
      - Customer phone
      - Points
      - Total visit
      - Customer group
      - Click Customer thì show customer info detail modal
    - Một số lưu ý:
    - Nếu không có data liên quan: show icon No data

## Software Update Notification

## Devices Status Summary

## Notifications

Gồm những notification type sau:

- **Appointment:**
  - **New appointment:** **status Scheduled**
    - Content được highlight xanh: \[Customer Name\] scheduled a new appointment with you on \[appointment date - time mm/dd/yyyy hh:mm AM/PM\].
    - Status: Scheduled
    - Tag: Requested / Highlight (nếu có)
    - Created At: thời gian book appointment success
  - **Appointment confirm: Status: Confirmed**
    - Content chữ đen: \[Customer Name\] appointment on \[appointment date - time mm/dd/yyyy hh:mm AM/PM\] has been confirmed.
    - Status: Confirmed
    - Tag: Requested / Highlight / No Show (nếu có)
    - Created At: thời gian confirmed appointment success
  - **Appointment Cancel:** Status: Canceled
    - Content được highlight đỏ: \[Customer Name\] appointment on \[appointment date - time mm/dd/yyyy hh:mm AM/PM\] is canceled.
    - Status: Canceled
    - Tag: Requested / Highlight / No Show (nếu có)
    - Created At: thời gian canceled appointment success
  - **Change appointment Info:** Date / Start Time / Staff / Service / Customer / Add Note / Add Tag của appointment - **đều gửi notify mới theo status hiện tại của appointment đó**
    - VD:  
      Appointment được book nhưng chưa Confirm (1) > sau đó Confimed (2) > sau đó change staff của appointment Confirmed (3)  
      Content của noti (3) sẽ là: **<tên Customer> appointment on 04/01/2026 04:59 PM has been Confirmed.**
  - Sort: Desc theo Created At
  - Click vào nottify sẽ mở modal:
    - Edit Appointment: với appointment Scheduled / Confirmed
    - Appointment Information: với appointment đã Canceled / Done
  - Button: View all Scheduled / View all Appointment (support xem những appointment chưa được confirm để ưu tiên process)
  - Một số lưu ý:
    - Appointment Done sẽ không có notify
    - Khi mở notify đã cũ thì vẫn phải show status hiện tại của appointment đó
- **System: (PENDING)**
  - Announcement từ Fastboy Portal

# Login

## Login information

Có 2 hướng login POS:

- Login via GAP
- Login with username/password

```
Flow cho máy không có serial number, login thẳng:
```

- Install app POS
- Máy tự động gen UUIDv7
- Team Support setup merchant dựa trên WhmcsID
- Đem UUIDv7 này lên page Management để gán vào account của 1 merchant cố định (action đem UUIDv7 này lên cloud onboard cho tiệm)
- Dùng user name/ password login vào app là done

```
Flow cho máy không có serial number, login qua GAP:
```

- Login GAP bằng account của merchant
  - Nếu máy đã setup UUID gắn với merchant đúng với GAP > vào thẳng, không yêu cầu login
  - Nếu máy đã setup UUID gắn với merchant khác GAP > chặn, không vào được app POS
  - Nếu máy chưa setup UUID gắn với merchant (UUID đang free trên cloud) > link UUID free đó với account GAP của merchant
- Click vào icon app Volt POS > vào thẳng, không yêu cầu login lại

Note:

- UUID thuộc merchant nào, thì chỉ có merchant đó login vào mới dùng được
  - EX: UUID1 - WhmcsID 3 > Login bằng WhmcsID 4 > Block
- Một tiệm có 10 máy thì chỉ login bằng 1 account chạy theo merchant ID (WhmcsID)
- Cần đăng nhập được 1 lần đầu khi có mạng, để cloud có thể verify được, sau đó mới sử dụng được sau khi tắt mạng.

```
Page management để quản lý merchant
```

[https://insight2020.gci.fast-boy.net/](https://insight2020.gci.fast-boy.net/)

- Sử dụng page Insight của DTS, để setup tiệm (tạo merchant / setup device / …), để dùng tạm trước khi có site portal.
- Define thông tin page (WAITING)

Tham khảo UI như bên dưới:

- GAP_Login with ID/Username/Password

# Home screen

## Staff list

- Staff list detail:
  - Show list staff theo thứ tự alphabet (của mỗi group) và staff có status Active
  - Mỗi field staff show:
    - Staff nickname - Staff avatar
    - Next appt - thời gian của appointment gần nhất trong ngày **(PENDING)**
    - Total số lượng booking hiện tại trong ngày của staff chưa được checkout **(PENDING)**
  - Click avatar: show Staff Information
  - Click số: show appointment list của staff **(PENDING)**
- Search staff: search staff Nickname

## Group Staff

- Show list Group Staff status Active và theo thứ tự alphabet từ trái qua phải
- Tab đầu tiên là All, show tất cả staff của tiệm rồi mới đến Group Staff

## Service List

Gồm 2 fiels: Category và Service

- **Category**:
  - Show list Category Active
  - Quick Pay là option đầu tiên, sau đó là list Category theo thứ tự alphabet
    - Quick pay: option nhập nhanh service + amount để add vào order khi không có sẵn service đó trong hệ thống. Service khi được add từ Quick Pay chỉ được dùng cho order hiện tại, sẽ không được lưu vào hệ thống. Click Quick Pay sẽ show dialog, gồm:
      - Title: Quick Pay
      - Custom Amount: Maximum $9,999,999.99 (validation required).
      - Service Name (validation required).
      - Add note (optional)
      - Button:
        - Add: chỉ được enable sau khi input đủ thông tin required
        - (X)
      - Note: Quick Pay không apply item discount, chỉ được apply order discount
      - Bàn phím ảo để nhập data
  - Card Category gồm:
    - Category Name
    - Category color
    - Tổng số lượng service (Active) thuộc category
  - Click vào Category nào thì sẽ show list Service - Active thuộc Category đó
- **Service**:
  - Click vào Category nào sẽ show list service của category đó, theo thứ tự alphabet
  - Default là list service thuộc category đầu tiên
  - Card service gồm những thông tin:
    - Service Name
    - Service Description: chỉ show 25 character đầu tiên, còn lại show …
    - Service Color (giống màu Category)
    - Service Price
- Search Service: search service name, trả về kết quả Category tương ứng với service được search

## Enter Customer Phone

- Gồm 3 fields:
  - Field nhập số phone customer
  - Checkin Today
  - Appointment Today
- Enter Customer Phone: show bàn phím số và Phone format: (xxx) xxx xxxx
  - **New Customer:**
    - Sau khi nhập xong số phone valid, sẽ enable button Done
    - Click Done, show dialog để add new customer:
      - Phone (show lại số phone đã nhập trước đó)
      - Customer Name (Optional) - Nếu không nhập tên thì Unknownxxxx (4 last digits phone) > Không được để trống
      - Group: ex - New
        - Default lấy option đầu tiên, nếu đã được tạo trước đó
        - Những group khác sẽ được Add new ngay tại vị trí chọn Group (tương tự như (Group Staff)
        - Được chọn nhiều Group cho 1 customer
      - Button:
        - Save / (X)
        - View More
          - Click View More sẽ show dialog Customer Information, gồm những thông tin như bên dưới và có thể update được:
            - Customer Phone (Locked)
            - Customer Name
            - Customer Group
            - Customer Email
            - Customer Birthday
            - Note
            - **Total Spent:** total amount của tất cả những order đã complete
              - _Total amount của order \[(Successful - Unsettle) + (Successful - Settle)\]_
              - _Không tính order Refund / Partial Refund / Cancel_
            - **Average Spent:** Trung bình 1 order bao nhiêu
              - _\[Total Spent\] : \[Total Visit\]_
            - **Total Visit:** Tổng số order complete bao gồm những status:
              - Successful – Unsettle, Successful – Settle, Refund và Partial Refund
            - **Highest Single Transaction:** Order status _Successful_ - Unsettle hoặc _Successful_ - Settle có total amount cao nhất là bao nhiêu
            - **Total Discount:** Tổng số tiền discount trên tất cả những order _Successful_
              - Không tính order Refund / Partial Refund / Cancel
            - **Point Balance:** Tổng điểm đang có
            - **Total Tip:** Tổng số tiền Tip trên tất cả những order complete (_Successfull_ - Unsettle/_Successfull_ - Settle/Partial Refund)
              - Không tính order Refund / Cancel
            - **Promotion & Reward:** số lượng promo và reward đang available của customer này
            - Appointment **(PENDING)**
            - Oder: show list order của cuattomer, gồm những thông tin sau:
              - Order Date & Time: Thời gian complete order
              - Total
              - Tip
              - Status
            - Button: Save / (X)
  - **Exist Customer**: show list customer đã lưu để search theo số phone đang input **(PENDING)**
    - List exist customer:
      - Customer Phone Number
      - Customer Name
    - Chọn exits customer sau đó click Done sẽ show Customer này trong form create order

Note:

- Sau khi chọn customer từ danh sách, nếu customer đó có tồn tại Customer Note được save trong Customer Information thì sẽ show ra popup:
- Nếu không có customer note thì không show popup
- Sau khi chọn Done để confirm Customer Note thì click Done để show thông tin Customer cho order:
- Nếu không có Customer, chọn option Skip tại field Enter Phone Number, show Customer - Unknown
- Khi nhập số phone bị trùng lặp trong hệ thống, màn hình hiển thị danh sách Customer. Nếu không chọn Customer và nhấn button Done, hệ thống tự động chọn số phone đầu tiên trong danh sách Customer -> Tiếp tục luồng tạo Order bình thường

## Checkin Today

**Check-in Today** dùng để: Quản lý toàn bộ khách hàng đã check-in (walk-in) trong ngày hiện tại. Sau khi thực hiện Checkin xong, sẽ dựa trên thông tin đó để create order với status Processing.

**>> Khi khách đã có mặt tại tiệm và sẵn sàng chờ hoặc làm dịch vụ.**

Cụ thể là:

- Khách **đã bước vào tiệm**
- Đã **xác nhận đúng tên / số điện thoại trên app GoCheckin**

**(UI chỉ tham khảo, hiển thị đúng theo requirement)**

### **1. Những đối tượng xuất hiện trong Check-in Today**

- Khách **walk-in** (không appointment), thực hiện checkin trực tiếp khi đến tiệm

### **2. Thông tin hiển thị trên mỗi khách check-in**

- Customer Name
- Phone number (rút gọn)
- Check-in time: thời gian thực hiện checkin
- Countdown time: so sánh vơi thời gian hiện tại và thời gian Checkin:
  - 5 mins ago / 45 mins ago
  - Sau 1 tiếng thì show: Checked in 2:00PM
- Tag: Walk-in
- Staff: staff nickname, nếu nhiều staff thì show \[Staff: Staff 01, Staff 02, …\]
- Status:
  - Pending (Checked In, đã check in thành công và order chưa được thanh toán)
  - Completed (Checked Out, order đã được thanh toán thành công, order status Successful)
- Sort: asc theo thời gian checkin
  - Filter status: Default All
  - All
  - Pending
  - Completed
- Show/Hide option: default Hide, muốn xem thì chọn action Show để expend list checkin
- Count: đếm tổng số lượng Checkin của ngày hôm nay, của tất cả status. Nếu filter theo status thì count lại theo đúng status.

**Lưu ý:**

- Click vào Checkin record thì redirect đến:
  - Order processing nếu order chưa complete
  - Order History detail nếu order đã complete

### 3\. Một số lưu ý:

- Status của checkin record trong tab Checkin của Customer Information:
  - Pending (Checked In, đã check in thành công và order chưa được thanh toán)
  - Completed (Checked Out, order đã được thanh toán thành công, order status Successful)
- Ngoài ra, nếu customer đã book appointment, sau đó complete luôn order từ appointment đó > sinh ra record Check In - Completed trong tab Check In

## Appointment Today

**Appointment Today** dùng để: Quản lý toàn bộ các cuộc hẹn (appointments) diễn ra trong ngày hôm nay, bất kể khách đã đến hay chưa.

**(UI chỉ tham khảo, hiển thị đúng theo requirement)**

### **1. Đối tượng xuất hiện trong Appointment Today**

Bao gồm:

- Appointment có **date = hôm nay**
- Appointment tạo từ:
  - Online booking
  - POS
- Appointment status:
  - Scheduled
  - Confirmed
  - Cancelled
  - Done

Không bao gồm:

- Appointment của ngày khác
- Walk-in chưa tạo appointment

### **2. Thông tin hiển thị trên mỗi Appointment**

- Appointment Time (Start time)
- Thông tin khách hàng:
  - Customer Name
  - Phone number
- Staff: staff nickname, nếu nhiều staff thì show: \[Staff: Staff 01, Staff 02, …\]
- Status:
  - Scheduled
  - Confirmed
  - Cancelled
  - Done
- Tag: nếu có thì show, k có thì k show, chỉ là dấu hiệu nhận biết trong appointment, không ảnh hưởng đến logic.
  - Requested (Khách gửi yêu cầu đặt lịch nhưng chưa được tiệm xác nhận)
  - Highlight (Appointment được đánh dấu nổi bật để dễ nhận biết)
  - No Show (Khách không đến và không thông báo)
- Sort: asc theo thời start time của appointment
- Filter status: default All
  - All
  - Scheduled
  - Confirmed
  - Cancelled
  - Done
- Show/Hide option: default Hide, muốn xem thì chọn action Show để expend list checkin
- Count: đếm tổng số lượng Appointment của ngày hôm nay, của tất cả status. Nếu filter theo status thì count lại theo đúng status.
- Click vào Appointment record, thì show:
  - Nếu appointment chưa checkout, thì show appointment detail
  - Nếu appointment đã checkout thì show order detail

# Create Order

## Create order

Sau khi có Customer:

- **Order ID**: Order #1, generate order theo số thứ tự từ 1
- Action: Delete order
  - Click sẽ delete order hiện tại và show lại field Enter Phone Number
- **Field Customer info:**
  - Customer Name
  - Customer Group: show max 3 group label, còn lại vào Customer Information để xem
  - Phone Number
  - Point/Visit **(PENDING)**
  - Action:
    - Update: click sẽ mở dialog Customer Information, cho phép update:
      - Customer Name
      - Customer Group
      - Customer Email
      - Customer Birthday
      - Note
    - Delete: delete Customer khỏi order, show option Enter Phone Number để chọn lại Customer mới, hoặc Skip nếu không muốn để lại thông tin Customer
- **Field show staff/service:**
  - Khi chưa chọn staff/service show place holder: _Add Staffs and Services_
  - Nếu user click chọn Service trước khi chọn Staff thì hiển thị popup Select Staff First:
- Chọn Staff trước, show place holder: _Choose Services_
- Sau khi chọn đầy đủ Staff và service của staff, thông tin sẽ show trong cart như sau:
  - Staff: Staff Nickname
    - Action: Update / Delete
  - Service list:
    - Service name / Service note (nếu có)
    - Price:
      - Nếu có edit price thì show chính xác số tiền sau khi được edit
      - Nếu có apply Item Discount, thì show như hình sau: giá gốc - apply discount % or $ và ghi số tiền discount chính xác

Đối với những case trên, thì sẽ show trong receipt như sau:

- Edit price: show trực tiếp giá cuối cùng, sau khi edit
- Apply Item Discount: show giá gốc, phần số tiền discount hiển thị ở mục Item Discount
- Action: Update / Delete
- Option: chọn thêm service cho staff với place holder _Choose more Services_
- Staff action detail:
  - Update: Chọn staff khác trong list staff bên trái
  - Delete: Xoá tất cả staff và service thuộc staff đó trong order
  - Service action detail:
    - Click vào service sẽ show update 3 thông tin:
      - Price: cho update lại giá mới của tất cả service
        - Giá mới chỉ apply cho order hiện tại
        - Cho update về $0, chặn số tiền âm
        - Show thẳng new price cho service
      - Note: (optional) cho add thêm note cho service
        - Max 50 character
        - Show dưới name service
      - Apply Discount: toggle Yes/No
        - No: không show thêm gì
        - Yes: show 2 option % và $
          - %: min 1%, max 100%
          - $: nhỏ hơn hoặc bằng Price của service
        - Show số tiền trước và sau apply Discount
      - Button: Save / (X)
      - Virtual keyboard
    - **Note**:
      - Khi điều chỉnh giá của service, sẽ cho tăng/giảm price của service
      - Nếu bấm chọn lại service đó thì phải theo giá đã set up trước đó, nếu có apply discount thì sẽ apply cho giá đã setup trước đó
      - Còn apply Discount thì chỉ có giảm giá service

**Flow create Order**:

## Cart Order

- Promo: click sẽ show dialog Add Promo, gồm:
  - List Promo được tạo từ hệ thống **(PENDING)**
  - Custom: tạo promotion cho order hiện tại, gồm 2 option:
    - %: min 0,1%, max 100%
    - $: nhỏ hơn hoặc bằng Price chưa apply Reward và Tax
- Reward **(PENDING)**
- Note: thêm note cho order, max 50 characters
- Summary order:
  - Subtotal: tổng price service chưa bao gồm discount
  - Item Discount: tổng số tiền được discount trên từng item (service)
  - Promotion: tổng số tiền được apply promotion dựa trên Price đã apply Item Discount
  - Reward Redemption **(PENDING)**
  - Tax **(PENDING)**
  - Total: số tiền khách thực trả sau khi đã apply Item Discount/Promotion/Reward/Tax
- Button:
  - Print: click để in trước receipt order order, không bao gồm Payment Method
  - Pay: click pay để checkout order

```
Update 25/08/2025
```

- **Summary order:**
  - Subtotal: tổng price service chưa bao gồm discount
  - Item Discount: tổng số tiền được discount trên từng item (service)
  - Promotion: tổng số tiền được apply promotion dựa trên Price đã apply Item Discount
  - Reward Redemption (PENDING)
  - Tax (PENDING)
  - Tip
  - Total: số tiền khách thực trả sau khi đã apply Item Discount/Promotion/Reward/Tax
- **Button actions:**
  - Promo & Rewards (PENDING)
  - Tip
  - Print (click để in trước receipt order order, không bao gồm Payment Method)
  - Order Note
  - Split
- **Choose payment method**
  - Card
  - Cash
  - Gift Card
  - Other

**Payment Flow (Per Check)**

- Show check amount + item list
- Select payment method
- Input tip (before or after payment request)
- Process payment
- Print check receipt (optional)

## Check-out Order

### Check-out flow

[https://app.diagrams.net/#G1nBFyGfho_VrHfH530bVgdBxH4aQ1dy0f#%7B%22pageId%22%3A%22wBCLhKNKL97IqZbfEJKO%22%7D](https://app.diagrams.net/#G1nBFyGfho_VrHfH530bVgdBxH4aQ1dy0f#%7B%22pageId%22%3A%22wBCLhKNKL97IqZbfEJKO%22%7D)

[https://app.diagrams.net/#G1nBFyGfho_VrHfH530bVgdBxH4aQ1dy0f#%7B%22pageId%22%3A%22wBCLhKNKL97IqZbfEJKO%22%7D](https://app.diagrams.net/#G1nBFyGfho_VrHfH530bVgdBxH4aQ1dy0f#%7B%22pageId%22%3A%22wBCLhKNKL97IqZbfEJKO%22%7D)

- Gồm 3 fields:
  - List payment method:
    - Card / Cash / Gift Card / Other
    - Show rõ số tiền cần thanh toán của mỗi method trên UI
    - Thanh toán bằng tất cả các method đều apply Service Fee
    - Riêng khi thanh toán bằng 2 method Cash và Gift Card thì được apply Cash Discount
  - Enter Amount: bàn phím số để nhập số tiền
    - Summary:
      - Total Paid
  - Order Receipt: template (như hình)
  - Action:
    - Cash Drawer **(PENDING)**
    - Print: in receipt ở thời điểm hiện tại, để customer review, nên chỉ bao gồm staff - service - order summary
    - Tip: click vào sẽ mở dialog phía Customer nhập Tip (Chỉ cho phép add Tip khi có Staff trong order)
- Complete Payment: click để done process và show screen Payment Successful! với 4 options
  - No Receipt: không in receipt
  - Print: in receipt
  - SMS (Text Message): gửi receipt đến số phone customer **(PENDING)**
  - Email: gửi receipt đến email customer **(PENDING)**

### **Pay By Cash**

Gồm những field thông tin sau:

- Enter Amount: bàn phím số để nhập số tiền, amount này là số tiền mặt khách đưa cho thu ngân
  - Quick amount: $100 / $50 / $20 / $10
- Summary:
  - Total Paid: số tiền đã thanh toán trước đó (nếu có)
  - Change: Tiền thối lại, khi nhập Amount > Total Order
  - Remaining: Số tiền còn lại cần phải thanh toán
- Order Receipt: template (như hình)
- Action:
  - Cash Drawer
  - Print: In trước hóa đơn chưa thanh toán để customer xem trước, in tương tự hình ảnh trên giai diện và không bao gồm payment method
  - Tip: click vào sẽ mở dialog nhập Tip **(Waiting Design)**
  - Pay hoặc Complete Payment
    - Pay: Khi chưa nhập Amount hoặc đã nhập Amount nhưng Remaining > 0
    - Complete Payment: Khi đã nhập Amount lớn hơn hoặc bằng Total Order (Remaining = 0)

Sau khi nhập amount, click Pay/Complete Payment:

Sau khi thanh toán thành công sẽ show chi tiết nội dung gồm:

- Cash (Received $0.00 - Change $0.00) --— $0.00 (Total Order)

**Note**:

- Nếu nhập Amount > Total Order, thì mới hiển thị field **Change**
- Chỉ có thanh toán bằng Cash mới show **Quick amount** để chọn nhanh
- Có thể thanh toán nhiều lần đến khi nào **Complete Order**
- Một lần partial pay sẽ tạo ra 1 payment
- Thường thì những payment Cash sẽ không add Tip, vì khách đã đưa trực tiếp cho Staff. Nhưng vẫn có tiệm muốn note lại cuối ngày mới trả cho Staff thì vẫn ghi nhận payment Cash có Tip như bình thường

**Special case:** khi reopen order, void 1 payment card và charge lại 1 payemnt cash khác, thì apply Cash Discount ntn

- Ví dụ total order là $100
  - Card: $50 => charge $50 + $3 (3% cash discount )
  - Cash: $50
  - Total charge = $103
- Sau đó edit order, Void payment cash:
  - Card $50 => charge $50 + $3 (3% cash discount )
  - Card (thay cash trước đó) $50 => charge $50 + $3 (3% cash discount )
  - Total charge là $106

### Dual Screen - Pay By Cash

| Action                            | Reception                                                                                                                                                                                                                                                                                                                                                | Customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POS home screen**               |                                                                                                                                                                                                                                                                                                                                                          | Show Welcome Screen gồm: Description: WELCOME TO \[MERCHANT NAME\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Customer phone_Exist customer** | Reception: sau khi nhập/select xong sẽ show Customer Note (nếu có), note này chỉ xem, không update tại vị trí này, nếu muốn update thì vào Customer Info để update Update số phone customer vừa nhập và số đó đã tồn tại Show popup: Check-in Successfull                                                                                                | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Số phone vừa được reception nhập, verify có đã đúng số của mình hay chưa? + Nếu đúng, click: YES > show màn hình check-in thành công + Nếu chưa, click: No, enter again > show màn hình enter phone number để customer nhập lại và được cập nhật lại vào phần Customer trên order phía reception > Done sẽ show màn hình Check-in thành công Screen check-in thành công: show một số thông tin - Visit: số order success với số phone customer đó - Points (PENDING) - Reward (PENDING) - Promotion (PENDING) |
| **Customer phone_New customer**   | Reception: nhập số phone Sau khi có số phone chính xác, phía reception: - Input Name / Group và click Save - Click View More để đi đến Customer Info nhập thêm thông tin của Customer và Save                                                                                                                                                            | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Số phone vừa được reception nhập, verify có đã đúng số của mình hay chưa? + Nếu đúng, click: YES + Nếu chưa, click: No, enter again > show màn hình enter phone number để customer nhập lại và được cập nhật lại vào phần Customer trên order phía reception > Done Screen check-in thành công: show một số thông tin: - Title: Check-in Successfull - Phone number - Visit: số order success với số phone customer đó - Your curent points (PENDING) - Redeem your posints for (PENDING)                     |
| **Customer phone_No customer**    | Luôn luôn show màn hình nhập số phone và để trống                                                                                                                                                                                                                                                                                                        | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Enter customer phone: luôn luôn show màn hình nhập số phone                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Add Staff/Service**             | Chọn staff/service                                                                                                                                                                                                                                                                                                                                       | Show staff/service và price tương ứng ở Order Detail Lưu ý: chỉ show Service name, không show Service Note (service note chỉ show trong order receipt) Update real-time cho order summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Pay order**                     | Click Pay order Chọn hình thức thanh toán Cash Enter Amount Click TIP > Show màn hình waiting Show màn hình waiting Cập nhật Amount + TIP, sẵn sáng để thanh toán Click PAY or Complete Payment Done - show payment successful screen, gồm: - Tip total: nếu có nhiều hơn 1 staff - Payment method - 4 action: No Receipt / Print / Text Message / Email | Show same above Show same above Show same above Customer: show 2 section - Add a tip: 4 options quick tip / No Tip / Custom Tip (Tip bases on charge amount) - Add signature Input tip (Tip bases on charge amount) Click Continue Show màn hình thanh toán với số tiền bao gồm Amount + Tip Payment success screen Done - show order complete screen với 4 action: No Receipt / Print / Text Message / Email                                                                                                                                                                                                                                                                                                                       |

### Pay By Card

Gồm những field thông tin sau:

- Enter Amount: bàn phím số để nhập số tiền sẽ thanh toán
- Summary:
  - Total Paid: số tiền đã thanh toán trước đó (nếu có)
  - Remaining: Số tiền còn lại cần phải thanh toán
- Order Receipt: template (như hình)
- Action:
  - Cash Drawer
  - Print: In trước hóa đơn chưa thanh toán để customer xem trước, in tương tự hình ảnh trên giai diện và không bao gồm payment method
  - Tip: click vào sẽ mở dialog nhập Tip **(Waiting Design)**
  - Pay hoặc Complete Payment
    - Pay: Khi chưa nhập Amount hoặc đã nhập Amount nhưng Remaining > 0
      - Thực hiện thanh toán nhiều lần
      - Sau khi nhập Amount đang nhỏ hơn Total Order, show button Pay, lúc này receiption sẽ click action Tip để customer add tip từ dual screen.
      - Customer nhập Tip xong, sẽ cập nhật lại số tiền khách sẽ thanh toán
      - Sau khi đã thanh toán tahnfh công sẽ hiển thị dialog confirm payment như hình:
      - Click **Continue Payment** để tiến hành thanh toán tiếp Remaining. UI sẽ hiển thị thêm 1 field thông tin Payment method đã được thực hiện trước đó
      - Tiếp tục thực hiện thanh toán cho đến khi Complete Payment
    - Complete Payment: Khi đã nhập Amount bằng Total Order (Remaining = 0)
  - **Note**:
    - Có thể thanh toán nhiều lần đến khi nào **Complete Order**
    - Một lần partial pay sẽ tạo ra 1 payment

### Dual Screen - Pay By Gift Card

Gồm 2 mode: được setting trong Setting page

- Entered by Reception (Add Signature before Payment)
- Entered by Customer (Add Signature after Payment)

1. **Entered by Reception (Add Signature before Payment)**

| Action                            | Reception                                                                                                                                                                                                                                                                                                                                                                          | Customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POS home screen**               |                                                                                                                                                                                                                                                                                                                                                                                    | Show Welcome Screen gồm: Description: WELCOME TO \[MERCHANT NAME\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Customer phone_Exist customer** | Reception: sau khi nhập/select xong sẽ show Customer Note (nếu có), note này chỉ xem, không update tại vị trí này, nếu muốn update thì vào Customer Info để update Show popup: Check-in Successfull phía reception                                                                                                                                                                 | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Số phone vừa được reception nhập, verify có đã đúng số của mình hay chưa? + Nếu đúng, click: YES > show màn hình check-in thành công + Nếu chưa, click: No, enter again > show màn hình enter phone number để customer nhập lại và được cập nhật lại vào phần Customer trên order phía reception > Done sẽ show màn hình Check-in thành công Screen check-in thành công: show một số thông tin - Visit: số order success với số phone customer đó - Points (PENDING) - Reward (PENDING) - Promotion (PENDING) |
| **Customer phone_New customer**   | Reception: nhập số phone Sau khi có số phone chính xác, phía reception: - Input Name / Group và click Save - Click View More để đi đến Customer Info nhập thêm thông tin của Customer và Save                                                                                                                                                                                      | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Số phone vừa được reception nhập, verify có đã đúng số của mình hay chưa? + Nếu đúng, click: YES + Nếu chưa, click: No, enter again > show màn hình enter phone number để customer nhập lại và được cập nhật lại vào phần Customer trên order phía reception > Done Screen check-in thành công: show một số thông tin: - Title: Check-in Successfull - Phone number - Visit: số order success với số phone customer đó - Your curent points (PENDING) - Redeem your posints for (PENDING)                     |
| **Customer phone_No customer**    | Luôn luôn show màn hình nhập số phone và để trống                                                                                                                                                                                                                                                                                                                                  | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Enter customer phone: luôn luôn show màn hình nhập số phone                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Add Staff/Service**             | Chọn staff/service                                                                                                                                                                                                                                                                                                                                                                 | Show staff/service và price tương ứng ở Order Detail Lưu ý: chỉ show Service name, không show Service Note (service note chỉ show trong order receipt) Update real-time cho order summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Pay order**                     | Click Pay order Chọn hình thức thanh toán Card Enter Amount Click TIP > Show màn hình waiting Show màn hình waiting Cập nhật Amount + TIP, sẵn sáng để thanh toán Show screen waiting payment Show screen waiting payment Done - show payment successful screen, gồm: - Tip total: nếu có nhiều hơn 1 staff - Payment method - 4 action: No Receipt / Print / Text Message / Email | Show same above Show same above Show same above Customer: show 2 section - Add a tip: 4 options quick tip / No Tip / Custom Tip (Tip bases on charge amount) - Add signature Input tip (Tip bases on charge amount) Add signature Click Continue Show màn hình present card với số tiền bao gồm Amount + Tip Tap/Insert/Swipe card > payment processing Payment success screen Done - show order complete screen với 4 action: No Receipt / Print / Text Message / Email                                                                                                                                                                                                                                                            |

2. **Entered by Customer (Add Signature after Payment)**

| Action                            | Reception                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POS home screen**               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Show Welcome Screen gồm: Description: WELCOME TO \[MERCHANT NAME\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Customer phone_Exist customer** | Không nhập customer phone mà chọn 1 staff để start flow Update số phone customer vừa nhập và số đó đã tồn tại Show popup: Check-in Successfull                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Enter Phone Number: nhập số phone và click Done Screen check-in thành công: show một số thông tin - Visit: số order success với số phone customer đó - Points (PENDING) - Reward (PENDING) - Promotion (PENDING)                                                                                                                                                                                                                                                                                                         |
| **Customer phone_New customer**   | Không nhập customer phone mà chọn 1 staff để start flow Sau khi có số phone chính xác, phía reception: - Input Name / Group và click Save - Click View More để đi đến Customer Info nhập thêm thông tin của Customer và Save                                                                                                                                                                                                                                                                                                                                                                                                 | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Enter Phone Number: nhập số phone và click Done Screen check-in thành công: show một số thông tin: - Title: Check-in Successfull - Phone number - Visit: số order success với số phone customer đó - Your curent points (PENDING) - Redeem your posints for (PENDING)                                                                                                                                                                                                                                                    |
| **Customer phone_No customer**    | Luôn luôn show màn hình nhập số phone và để trống                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Customer: show 2 sections - Order detail: + Những field thông tin luôn mặc định show của order summary + Khi reception chọn Staff/Service thì sẽ update real-time vào phần order detail và update cho order summary - Enter customer phone: luôn luôn show màn hình nhập số phone                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Add Staff/Service**             | Chọn staff/service                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Show staff/service và price tương ứng ở Order Detail Lưu ý: chỉ show Service name, không show Service Note (service note chỉ show trong order receipt) Update real-time cho order summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Pay order**                     | Click Pay order Chọn hình thức thanh toán Card Enter Amount Click TIP > Show màn hình waiting Show màn hình waiting Cập nhật Amount + TIP, sẵn sáng để thanh toán Show screen waiting payment Payment failed: show popup Payment Failed và button Try Again 1. Click Try Again 2. Click X hoặc hay click ngoài màn hình thì quay về screen input amount bên ngoài Payment success: Vẫn show screen waiting payment Payment success: Vẫn show screen waiting payment Done - show payment successful screen, gồm: - Tip total: nếu có nhiều hơn 1 staff - Payment method - 4 action: No Receipt / Print / Text Message / Email | Show same above Show same above Show same above Show Add a tip screen với 3 options: - Quick tip: 4 options - No Tip - Custom Tip (Tip bases on charge amount) Input tip (Tip bases on charge amount) Click Continue Show màn hình present card với số tiền bao gồm Amount + Tip Tap/Insert/Swipe card > payment processing Show Payment Failed screen 1. Show màn hình present card với số tiền bao gồm Amount + Tip 2. Show màn hình gần nhất trước đó gồm: - Order detail - Enter Customer Phone / Check-in success Sau khi present card thành công thì sẽ show 2 sections: - Payment successfull - Add Signature Add signature và click Continue Done - show order complete screen với 4 action: No Receipt / Print / Text Message / Email |

### Pay by Gift Card

1/ Không support Refund cho GiftCard method trong phase này, để chủ tiệm check bằng tay và restore balance trên GiftCard Management (CRM)

2/ Cancel (Void) order dùng GiftCard method: tự động hoàn lại balance đã thanh toán trước đó vào GiftCard

### Dual Screen - Pay By Gift Card

### Pay by Other

- “Other” là một payment type linh hoạt, cho phép tiệm tự định nghĩa hoặc xử lý các hình thức thanh toán đặc biệt khác Cash/Card/Gift card.
- “Other” không liên kết trực tiếp với cổng thanh toán (gateway), mà chỉ được ghi nhận nội bộ trong POS.
- Cho phép ghi nhận TIP bằng hình thức Other.
- **Refund / Cancel** của “Other” cũng phải thực hiện thủ công tương tự Cash.
- Khi chọn hình thức thanh toán Other: cần nhập số tiền cần thanh toán + Input payment method name (Optional)
- Tham khảo UI:

### Dual Screen - Pay By Other

### Split Tip

- Được click action Split Tip ở 2 vị trí:
  - Order success: reception screen
  - Order detail tại Order History với status: Successful - Unsettled
- Nếu order chỉ có 1 staff thì ẩn action Split Tip
- Sau khi Complete Payment, nếu order có Tip và có hơn 1 staff, sẽ hiển thị action Split Tip
- Gồm 3 option:
  - **Split Evenly:** Default ban đầu
    - Chia đều cho tất cả staff trong order
    - Special case: order 3 staff, khách tip $10. Thì chia 3 thì 2ng trên là là 3.4 còn người cuối cùng sẽ chịu thiệt một xíu là 3.2.
  - **Proportion:**
    - Chia theo phần trăm tổng số tiền thợ làm/total order
    - Vd: Total service của Anna là $60, Hannah là $40. Total order là $100, Total tip là $20. => Anna tip = (60/100) \* 20 = $12 => Hannah tip = (40/100) \* 20 = $8
  - **Manual:**
    - Nhập tip riêng cho từng staff, phải dựa trên total Tip

### Split Order

Flow chart: [POS Split Order](https://drive.google.com/file/d/1-mMNkzAoY-R_Mgq_B2aTRe62XFscPJLb/view)

Split Methods

1. **Split Equally**

- User choose number of checks (e.g., 2, 3...), default is 2
- The system divides the total amount evenly.
- If the total doesn't divide evenly, rounding is applied. Final check adjusts the difference.
- Logic:
  - **User Action:** Enter the number of checks (N ≥ 2).
  - **System Behavior:**
    - Divide order total evenly among checks.
    - Apply rounding to 2 decimal places.
    - Last check adjusts to cover any rounding difference.
  - **Example:** Order total $100, N=3 → $33.33, $33.33, $33.34.

2. **Split by Amount**

- The user manually inputs how much each check will pay.
- System validates that the total of all checks = 100% of order total.
- Login:
  - **User Action:** Select number of checks (N ≥ 2).
  - **System Behavior:**
    - Checks **1 to (N-1)**: User manually enters amount.
    - Check **N**: System auto calculates as:
  - **Validation Rules:**
    - No check amount ≤ 0.
    - Sum of (N-1) entered amounts < Order Total.
    - Final total must match Order Total.
    - Auto-adjust ± $0.01 as “Adjustment” line if needed for rounding.
  - **Example:** Order $100, N=3
    - Check 1 = $30, Check 2 = $50, Check 3 = auto → $20 -> OK
    - If Check 1 = $50, Check 2 = $60 → Auto = -$10  -> WRONG

3. **Split by Items**

- The user manually assigns items to checks.
- The system calculates each check’s total based on assigned items.
- Logic:
  - **User Action:** Assign specific items to each check.
  - **System Behavior:**
    - Calculate check total based on assigned items.
    - Each item can only belong to one check.

### **Order History**

### Order workflow

- Status: (Định nghĩa)

| Status                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Note                                                                                                                                                                                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pending**                         | Order not yet checked out or reopened for editing. Not shown in Order History.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Not close order yet                                                                                                                                                                                                                                             |
| **Successful - Unsettled**          | Order is closed but payment(s) not yet settled. Still editable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Order has been closed but unsettled                                                                                                                                                                                                                             |
| **Successful - Settled (Captured)** | The order was checked out and closed. No changes allowed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Order has been closed and settled \* Đối với những hình thức thanh toán khác Card, qua ngày mới theo merchant timezone sẽ chuyển sang Settled \* Nếu trong 1 order có 2 method Card và Cash thì sẽ chuyển cả order sang Settled theo thời gian của payment Card |
| **Canceled**                        | Order was canceled or all payments were voided.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | All payments have been settled.                                                                                                                                                                                                                                 |
| **Refunded**                        | All payments in the order have been refunded.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | All payments have been settled.                                                                                                                                                                                                                                 |
| **Partial Refunded**                | One or more payments refunded, but not all.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | All payments have been settled.                                                                                                                                                                                                                                 |
| **(Action) Re-Open Order**          | Khi order có nhiều payment method và customer muốn Void 1 phần của order hoặc vì lý do: - Charge nhầm tiền, re-open để charge lại - Charge dư của khách, nên sẽ phải Void ngược lại cho khách                                                                                                                                                                                                                                                                                                                                                                           | Sau khi bị Void đi 1 phần amount rồi, thì sẽ tồn tại remaining > 0, nên phải update lại Service/Price or Delete service đi để remaining = 0 và Complete Order - Status order quay về Successful- Unsettled                                                      |
| **Refund Issue**                    | Khi refund order với 2 transactions, trong đó có 1 cái thành công và 1 cái thất bại thì status của order lúc này sẽ là **Refund Issue** - Đối với những method khác Card chắc chắn k có case fail. - Nhưng transaction fail đó là của Card thì khác, vì bên Magensa gateway không có cơ chế refund lại được payment đã refund fail trước đó. Nếu refund fail là payment đó có status cuối cùng là FAILED luôn. - Cũng k để order status là Partial Refund được, vì partial refund thì vẫn sẽ refund tiếp được - Note: Order History phải có hỗ trợ status Refund Issue. | \* Chỉ xảy ra đối với payment method Card \* Khi nào bên phía Fastboy Portal retry lại payment Refund Failed đó thành Refunded > thì order sẽ update status lại từ **Refund Issue > Refunded**                                                                  |
| **Cancel Issue**                    | Tương tự với case Refund ở trên, khi thực hiện Cancel Order có nhiều payment, có 1 payment bị Cancel Fail (payment status -FAILED), thì lúc này cả Order được mark là **Cancel Issue** - Case Cancel (Void) fail hiếm xảy ra, nhưng nếu có, thì bên anh Fastboy Portal k retry case này, mà bắt buộc phía con người phải click Cancel lại lần nữa cho payment bị cancel fail đó                                                                                                                                                                                         |                                                                                                                                                                                                                                                                 |
| **Re-open**                         | \* Khi bấm vào Re-open order thì update lại status "re-open". \* Chỉnh sửa, thanh toán xong thì nhấn Re-open done để chuyển về status trước đó. \* Tại Page Order History: thì order đang ở trạng thái re-open thì nút Re-open chuyển thành Continue Re-open                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                 |

- Action theo status:

| Status / Action            | Receipt                                  | Cancel Order                                                              | Re-Open Order                                                                                                             | Continue Re-open                                                                                                                                | Refund                                                                           | Partial Refund                                                                                                        | Split Tip | Adjust Tip                                                                                                                                                                                                    |
| -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Successful - Unsettled** | Yes - Allow viewing and printing receipt | Yes - Voids all payments - Changes status to Canceled - Marked Gray in UI | Yes - Allows voiding one or more payments - Allows changing or re-applying payment - Allows editing items (Service/Staff) | No - Hide action                                                                                                                                | No                                                                               | No                                                                                                                    | Yes       | Yes \* Payment trong order được thanh toán bằng method: **Card / Cash / Other** \* Riêng đối với method Card, status của payment trong order: **Auth** \* Đối với method Gift Card: KHÔNG cho phép Adjust Tip |
| **Successful - Settled**   | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | No - Hide action                                                                                                                                | Yes - Refunds 100% of payment(s) - Changes status to Refunded - Marked Red in UI | Yes - Refund one or more payments (or part of a payment) - Changes status to Partially Refunded - Marked Orange in UI | No        | No                                                                                                                                                                                                            |
| **Canceled (Same VOID)**   | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | No - Hide action                                                                                                                                | No                                                                               | No                                                                                                                    | No        | No                                                                                                                                                                                                            |
| **Refunded**               | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | No - Hide action                                                                                                                                | No                                                                               | No                                                                                                                    | No        | No                                                                                                                                                                                                            |
| **Partial Refunded**       | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | No - Hide action                                                                                                                                | No                                                                               | Yes - Refund one or more payments (or part of a payment) - Changes status to Partial Refunded - Marked Orange in UI   | No        | No                                                                                                                                                                                                            |
| **Refund Issue**           | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | No - Hide action                                                                                                                                | No                                                                               | No                                                                                                                    | No        | No                                                                                                                                                                                                            |
| **Cancel Issue**           | Yes - Allow viewing and printing receipt | Yes                                                                       | No                                                                                                                        | No - Hide action                                                                                                                                | No                                                                               | No                                                                                                                    | No        |                                                                                                                                                                                                               |
| **Re-open**                | Yes - Allow viewing and printing receipt | No                                                                        | No                                                                                                                        | Yes - Chỉ xuất hiện khi order đang trong process re-open mà bị thoát ra ngoài, thì bắt buộc phải tiếp tục process re-open đến khi Re-open Done. | No                                                                               | No                                                                                                                    | No        | No                                                                                                                                                                                                            |

List Reason for Cancel / Refund / Partial Refund

| Reason for Cancel / Refund / Partial Refund |
| ------------------------------------------- |
| Customer request                            |
| Service issue                               |
| Incorrect order                             |
| Duplicate payment                           |
| Promotion / Discount error                  |
| Staff mistake                               |
| Other                                       |

**Receipt & History behavior:**

| Action         | Display on Receipt?           | Show in Order History? |
| -------------- | ----------------------------- | ---------------------- |
| Void Payment   | Yes, marked as void           | Yes                    |
| (Full) Refund  | Yes, show refund              | Yes                    |
| Partial Refund | Yes, highlight refund line(s) | Yes                    |
| Cancel Order   | Yes, show “Canceled”          | Yes                    |
| Reopen Order   | Show updated payment or items | Yes                    |

### Order History listing

- Title: Order History
- Filter Date: Created At/Updated At của order (Updated At đối với những order change status)
  - Nếu filter date range, thì list order trả về được group by theo từng ngày
- Search: Order ID
- Filter:
  - Staff - check box:
    - Select staff (nickname)
    - Search staff nickname
  - Payment Method - check box: Card/Cash/Gift Card/Other
  - Status - check box:
    - Successful - Unsettled
    - Successful - Settled
    - Canceled
    - Refunded
    - Partial Refunded
  - Button: Clear / Confirm
- Order listing:
  - OD ID
  - Payment Method: Card/Cash/Gift Card/Other
  - Staff nickname: nếu nhiều hơn 2 staff thì show \[Staff1, Staff 2, …\]
  - Status:
    - Successful - Unsettled
    - Successful - Settled
    - Canceled
    - Refunded
    - Partial Refunded
  - Amount
  - Created At/Updated At: Mmm dd, yyyy hh:mm AM/PM
  - Sort: default Desc

### Order detail

- Title:
  - Order #ODxxxx
  - Button action: tùy theo status của order sẽ hiển thị những action khác nhau
- Order Information:
  - Status
  - Order ID
  - QR code
  - Order Date: Created At (thời gian order đc thanh toán thành công)
  - Customer: Customer name
- Order Summary:
  - Subtotal
  - Service Fee
  - Total Discount (show item discount, chưa có Order Discount)
  - Tip
  - Total
- Service Details:
  - Last updated: Mmm dd, yyyy hh:mm AM/PM (trùng với Created At/Updated At của order)
  - Staff:
    - Staff nickname
    - Service name - service note
    - Price: Giá cuối cùng và phần (-số tiền đã giảm/ % đã giảm)
- Tip:
  - Show list staff và tip hiện tại của mỗi staff
  - Date: default show created at của order, nếu có update thì show thời gian updated Tip
  - Action Split Tip: (Nếu có nhiều hơn 1 staff) modal Split Tip sẽ gồm những thông tin sau:
    - Title: Split Tip
    - Total Tip: total tip của order
    - 3 options: **Split Evenly / Proportion / Manual**
      - **Split Evenly:** Chia đều total tip cho tất cả staff trong order
      - **Proportion:**
        - Chia theo phần trăm tổng số tiền thợ làm/total order
        - Vd: Total service của Anna là $60, Hannah là $40. Total order là $100, Total tip là $20. => Anna tip = (60/100) \* 20 = $12 => Hannah tip = (40/100) \* 20 = $8
      - **Manual:** Nhập tip riêng cho từng staff, dựa trên total Tip
    - List Staff - nickname đang có trong order
    - Button: Confirm
  - Note: Chỉ cho phép Split Tip trong order trước thời gian chốt trả lương cho staff, tạm thời cho update thoải mái, sẽ required lại khi có setting Period Payroll.
- Payment Details: thông tin payment method đã thanh toán order trên từng check, có thể gồm:
  - Check 1: OrderID -1 -— Card: Visa (Debit) \*\*\*\*1234 - Amount (bao gồm cả tip - nếu có)
  - Check 2: OrderID -2 -— Cash:
    - Amount: số tiền khách đưa (bao gồm cả tip - nếu có)
    - Change: tiền thừa thối lại
  - Check 3: OrderID -3 -— Gift Card: gift card number (PENDING)
  - Check 4: OrderID -4 -— Other (PENDING)
- Order Note: hiển thị order note đã nhập trước đó lúc create order

```
Order Detail: Successful - Unsettled
```

Gồm những thông tin đặc biệt sau:

- Status: Successful - Unsettled
- Button action:
  - Receipt
  - Re-Open Order
  - Cancel Order
- Split Tip action is allow

```
Order Detail: Successful - Settled
```

Gồm những thông tin đặc biệt sau:

- Status: Successful - Settled
- Button action:
  - Receipt
  - Refund
  - Partial Refund

```
Order Detail: Canceled
```

Gồm những thông tin đặc biệt sau:

- Status: Canceled
- Button action:
  - Receipt
- Cancel Information:
  - Amount (Total amount order bị cancel)
  - Date & Time (Updated At, thời gian thực hiện cancel order)
  - By Staff (user thực hiện action Cancel, vì muốn Cancel order phải nhập staff code)
  - Reason

```
Order Detail: Refunded
```

Gồm những thông tin đặc biệt sau:

- Status: Refunded
- Button action:
  - Receipt
- Refund Information:
  - Title: Refund #OD - ID - Check ID
  - Amount (amount order-check bị cancel)
  - Date & Time (Updated At, thời gian thực hiện refund order-check)
  - Method
  - By Staff (user thực hiện action refund, vì muốn refund order phải nhập staff code)
  - Reason

```
Order Detail: Partial Refunded
```

Gồm những thông tin đặc biệt sau:

- Status: Partial Refunded
- Button action:
  - Receipt
  - Refund (Nếu order gồm nhiều check, chỉ vừa mới partial refund 1 check, thì khi chọn Refund sẽ refund hết cho những check còn lại)
  - Partial Refund
- Refund Information:
  - Title: Refund #OD - ID - Check ID
  - Amount (amount order-check bị cancel)
  - Date & Time (Updated At, thời gian thực hiện refund order-check)
  - Method
  - By Staff (user thực hiện action refund, vì muốn refund order phải nhập staff code)
  - Reason

### **Adjust Tip**

Adjust Tip: chỉnh sửa lại số tiền Tip sau khi order đã được thanh toán thành công. Thêm action Adjust Tip trong Order Detail đối với những order thỏa điều kiện sau:

- Status của order: **Successful - Unsettled**
- Payment trong order được thanh toán bằng method: **Card / Cash / Other**
- Riêng đối với method Card, status của payment trong order: **Auth**
- Đối với order có nhiều payment method: hiển thị list payment method và phải select 1 payment method cụ thể để thực hiện Adjust Tip

Lưu ý:

- Đối với method Gift Card: KHÔNG cho phép Adjust Tip
- Sau khi Adjust TIP, nếu order có nhiều Staff, thì auto update lại Split Tip với tip mới.
- Chỉ cho phép add Tip khi có Staff trong order

—------------------------------------------------------------------------------------------------------------------

### **Refund/Partial Refund**

1. **Định nghĩa:**

- Refund = hoàn toàn bộ phần tiền của order đã thanh toán.
- Partial Refund = hoàn lại một phần tiền của order đã thanh toán, thay vì hoàn toàn bộ
  - Áp dụng khi:
- Khách không hài lòng một dịch vụ
- Một service không được thực hiện
- Nhân viên làm lỗi một phần
- Giá cần điều chỉnh sau thanh toán

2. **Điều kiện:**

- Order status được thực hiện Refund/Partial Refund: **Successful - Settled**
- Nếu trong 1 Order có credit transaction chưa Batch/Close → disable nút Refund:
  - Refund button: Disabled
  - Nếu user cố click → hiển thị alert:  
    **Title:** Refund Not Available

    **Message:** This transaction has not been batch closed yet. Refund can only be processed after it has been batch closed.

    **Enable lại khi:** Tất cả card transactions trong order đã được Batch Close.

3. **Workflow**:

- Gom lại thành 1 form, tên chung là **Refund** và dựa vào service được chọn để biết là thực hiện Full Refund hay Partial Refund:
  - Nếu order chỉ có 1 service, thì sau khi chọn service đó sẽ tiến hành Full Refund, và Amount được autofill sẽ là total amount của order đó (nếu bao gồm cả Tip)
  - Nếu order có nhiều service và không được chọn all service thì sẽ thực hiện Partial Refund, và Amount được autofill là giá tiền trên những service được chọn
  - Nếu sau khi thực hiện Partial Refund và trong order vẫn còn service để thực hiện partial refund được tiếp tục nữa, thì lúc này button action vẫn là **Refund**, status order là **Partial Refund**
- **Specical Case: Khi select service để partial refund mà trong order có discount/TAX:**
  - Thì mình cũng sẽ refund trên giá service sau discount, phần discount apply cho order thì mình chia phần trăm tỉ lệ trên từng service, rồi sau refund trên giá đó
  - VD:  
    service 1 giá $100  
    service 2 giá $50  
    service 3 giá $50

    Total $200 Discount $20 > khách thanh toán $180

    Thì chia theo phần trăm:  
    service 1 chiếm 50% > discount $10  
    service 2 chiếm 25% > discount $5  
    service 3 chiếm 25% > discount $5

    Partial Refund service 1 > thì sẽ trả lại cho khách $90

- **Specical Case: nếu 1 cái promotion rule apply là đối với order từ $100 trở lên, nên partial refund sẽ giảm order về dưới $100, thì cái promotion cũ mình nên giữ không?**
  - Promotion vẫn nên giữ, tại vì đúng là đã chốt tại lúc checkout order (settled) rồi > k thay đổi gì cả
  - Khi partial refund thì theo vd như hình, thì nó giống vd ở trên luôn, partial refund 1 service $30, thì order còn lại $70 >> total vẫn là $100 là giá sau discount
  - ![](https://uploads.linear.app/48af1d4d-bdb8-403a-a96b-66898fda1a34/d6d94913-d520-4301-93c6-1151f9e26547/2a6186e7-2650-42f4-95a1-fe75297809ed?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiLzQ4YWYxZDRkLWJkYjgtNDAzYS1hOTZiLTY2ODk4ZmRhMWEzNC9kNmQ5NDkxMy1kNTIwLTQzMDEtOTNjNi0xMTUxZjllMjY1NDcvMmE2MTg2ZTctMjY1MC00MmY0LTk1YTEtZmU3NTI5NzgwOWVkIiwiaWF0IjoxNzgyMTE0NDAxLCJleHAiOjE3ODIxMTQ3MDF9.nFPpsJYTnYf8Tt8cw8UXxklB8f96lw9hcKLVBECJY1s)
  - Theo business logic, nếu thu của khách bao nhiêu thì phải trả lại bấy nhiêu, chứ lúc thu đã apply promo mà lúc refund lại refund giá gốc thì k hợp lý, vậy thì khách lời - chủ tiệm sẽ lỗ

4. **Hiển thị trong order gồm những field thông tin sau:**

- Click button Refund sẽ show dialog gồm những thông tin sau:
  - **Title**: Refund
  - **Description**: _Enter amount or select check payment you want to refund._
  - **Select services/products**
    - Option All: để chọn tất cả service đang có để thực hiện refund full
    - List service/produc, gồm:
      - Service Name
      - Service price: giá cuối cùng để thực hiện refund
  - **Refund method:**
    - Show list payemnt method đã được thực hiện trong order, chọn 1 để thực hiện partial refund
    - Cash / Card / Other (Không refund GiftCard)
  - **Refund amount:** sau khi chọn list Service/Product, thì điền sẵn số tiền của những service/product trên
  - **Select a reason for refund (Optional):** \[List Reason for Cancel / Refund / Partial Refund\]
  - Button: Cancel / Refund

5. **Order History update sau khi được partial refund**

- Ghi nhận trong Payment Detail session (order logs)
- Xuất hiện thêm session: Refund Information, gồm những thông tin sau:
  - Title: Refund Information
  - RF OD334589-1: order refund code
  - Amount: số tiền bị refund/partial refund
  - Date & Time: thời gian thực hiện refund/partial refund
  - Method: hình thức refund
  - By Staff: staff thực hiện refund
  - Reason
- Receipt: hiển thị thêm session Refund Information khi view/print receipt

6. **Một số lưu ý:**

- Sau khi thực hiện partial refund success, status của order chuyển sang Partial Refunded
- Sau khi thực hiện partial refund nhiều lần đề khi hết amount của order, status của order chuyển sang Refunded
- Nếu partial refund failed, status của order chuyển sang Refund Issue
- Có thể thực hiện partial refund nhiều lần cho đến khi hết amount của order, nhưng:
  - Đối với payment Auth có Tip, chỉ được partial refund hết base amount, không partial refund được Tip
  - Đối với payment Sale, được partial refund đến khi hết Amount + Tip

—-----------------------------------------------------------------------------------------------------------------

### **Reopen Order**

1. **Support thêm status "re-open" cho Order**

- Khi bấm vào Re-open order thì update lại status "re-open".
- Chỉnh sửa, thanh toán xong thì nhấn Re-open done để chuyển về status truoc đó.
- Tại Page OrderHistory: thì order đang ở trạng thái re-open thì nút Re-open chuyển thành Continue Re-open.
- Một order chỉ được phép Reopen một lần.

2. **Layout:**

- List transaction paid: bỏ X ở từng transaction - sẽ không còn void từng transaction.
- Thay bằng 1 nút chung để Void tất cả các transaction đang có.
- Xuất hiện confirm

3. **Điều kiện:**

- Sau khi thêm/xóa/sửa các service trong order làm số tiền cần thành toán khó tính toán ra đúng thì sẽ xuất hiện nút Void all(\*)

4. **Mong muốn:**

- Không thay đổi status của Order.
- Tính toán lại số liệu của service mới và theo setting mới như 1 order mới
- Phải thanh toán thành công lại, mới dc complete payment và thoát flow re-open

(\*) Nếu:

- Số tiền đã thành toán (totalPaid) < new Total Order.
- Update item có thay đổi về tax or order có paid tax trước đó nhưng reopen thanh toán lại bằng method khác

Special Case:

**1. Cho phép reopen order 1 lần duy nhất và status order - Success Unsettle.**  
**2. Những field bị ảnh hưởng khi thực hiện Reopen:**

- Discount / Promotion / Reward: block lại ở version order trước khi reopen
- Service fee: Recalculate lại theo subtotal mới
- Tax: block tax theo version order trước khi reopen
- Cashback redeem: Restore cashback đã dùng trước đó. Apply lại theo order mới
- Cashback earn: Cashback chưa finalize, hệ thống sẽ recalculate lại Earn Cashback theo total mới của order khi order được close lại.

**3. Một số special case khi thực hiện Reopen và cách xử lý:**

1. Thay đổi hình thức thanh toán > Void > charge lại
2. Thay đổi total thấp hơn giá trị hiện tại > Void > charge lại
3. Thay đổi total cao hơn giá trị hiện tại > charge thêm
4. Thay đổi tiền thuế (thêm/bớt món, đổi giá, discount, promotion, reward, ...) làm thay đổi số tiền thuế so với lúc khách thanh toán > Void > charge lại
5. Nếu order đang có service và product và đã tip > mà repoen xoá hết staff chỉ con store > Void > charge lại
6. User xoá hết service của order cũ và thay bằng list service mới, thì vẫn nên cho phép nhưng sẽ show thêm cảnh báo:  
   "You are replacing all services in this order.  
   This will:  
   Recalculate pricing  
   Update staff commission  
   May change total payment  
   …

- Thì lúc này sẽ clear hết tất cả và tính toán lại như 1 order mới, và quay về case trước đó:
  - Nếu total thấp hơn > force Void > tạo lại order mới
  - Nếu total cao hơn > charge thêm
  - Tất cả phải lưu được log các version order trước và sau khi reopen.

—------------------------------------------------------------------------------------------------------------------

## **Handling Network Disconnects: Card đang thanh toán bị mất mạng giữa chừng**

1. **Tiếp tục thanh toán offline với Cash.**

- Thanh toán Cash: done
- Check Order History(\*)

2. **Try again lại khi online.**

Action : (1) Nhấn try again/Pay to Cash => background refresh/pull transaction mới để biết thành công hay thất bại

TH 1: Nhấn (1) -> xuất hiện transaction card mới thành toán.

- Tính lại số tiền cần thanh toán = 0
- Cho Complete payment (không tạo transaction bằng 0)
- Khóa nút <- back , không cho back ra home, bắt buộc phải complete payment
- Done

TH 2: Nhấn (1) -> không xuất hiện transaction card mới thành toán.

- Số tiền cần thanh toán không thay đổi
- Thanh toán tiếp với method bất kỳ: Done
- Check Order History(\*)

**(\*) Check Order History Sau thanh toán cần check để biết cần void transaction không**

TH 1: Không xuất hiện transaction card mới lúc mất kết nối: Done không làm gì.

TH 2: Xuất hiện transaction card mới lúc mất kết nối:

- Void transaction Card dc tạo lúc mất kết nối => Xong
- Void transaction method thành công mới nhất => Nếu ko thể complete payment (do nhiều nguyên nhân: lệnh phí service fee, cash discount, tax, discount,…) => Cần void hết hết transaction để đảm bảo consistent về tiền

# Feature Requirement: Customer & Order Search Module

## 1\. Overview

The Search feature allows users to look up Customer Name, Customer Phone, or Order ID.

Search results are displayed across 5 sections: All, Appointment, Checkin, Order, Customer.

---

## 2\. Search Result Structure

### 2.1 Tabs

- All: Shows combined data from Appointment, Checkin, and Order.
- Appointment: Shows appointment list related to the customer phone.
- Checkin: Shows all checkins of the customer.
- Order: Shows orders matching customer info or the searched Order ID.
- Customer: Displays customer profile information.

---

## 3\. Appointment Tab

### 3.1 Appointment List Display

Each appointment shows:

- Date and time
- Customer name + last 4 digits of phone number
- Service name / Staff nickname
- Status (Scheduled, Confirmed, Canceled, Done)

### 3.2 Appointment Detail View

When clicking an appointment:

- Date
- Customer phone
- Customer name
- Service / Staff / Start Time / Duration
- Add more Service or Staff
- Appointment notes

### 3.3 Customer Insight Section

- Total appointments by status (Scheduled, Confirmed, Canceled, Done)
- Total amount spent
- Current loyalty points
- Total visit count

---

## 4\. Checkin Tab

### 4.1 Checkin List Fields

- Checkin / Checkout date (order creation timestamp)
- Status
- Point earned or used

---

## 5\. Order Tab

### 5.1 Order List Display

Each order shows:

- Order created at
- Staff
- Service
- Total amount

### 5.2 Order Action

Clicking an order redirects to the Order History Detail screen.

---

## 6\. Customer Tab

### 6.1 Customer Information Display

- Customer name
- Customer phone
- Points
- Total visits
- Customer group

### 6.2 Customer Info Action

Clicking the customer opens the Customer Info Detail Modal.

---

## 7\. Order Search Result (Search by Customer Info or Order ID)

### 7.1 Order Result Fields

- Order ID
- Date
- Customer name / phone
- Order staff nickname
- Order service name
- Order status

### 7.2 Order Result Action

Clicking an order redirects to Order History Detail.

---

## 8\. Empty State

### 8.1 No Data Handling

When no data is found:

- Display "No data" icon
- Display a message indicating no records available

---

## 9\. Functional Requirements Summary

### 9.1 Input

- Customer name
- Customer phone
- Order ID

### 9.2 Output

- Appointment list
- Checkin list
- Order list
- Customer profile
- Customer insights

### 9.3 Non-functional Requirements

- Realtime search
- Data loaded per tab
- UI consistent with Volt POS design

---

## 10\. Acceptance Criteria

### 10.1 Search Behavior

- Searching by phone returns Customer, Appointment, Checkin, and Order.
- Searching by name returns the correct customer and related data.
- Searching by Order ID returns the correct order and supports redirection.
- If no results match, show "No data".

### 10.2 User Interaction

- Clicking an appointment opens appointment detail + insight section.
- Clicking customer opens the customer detail modal.
- Clicking an order redirects to Order History Detail.

---

_Source: Google Docs — "Order Flow" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Order Pending

_Linear doc: https://linear.app/fastboy/document/order-pending-caa07c054f23_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**POS Pending Orders**

1. **Mục tiêu**

Xây dựng workflow Pending Order trong POS nhằm hỗ trợ mô hình vận hành thực tế:

- Tạo order trước khi thanh toán
- Hỗ trợ luồng GoCheckin
- Theo dõi khách đang làm dịch vụ
- Tách biệt quá trình phục vụ và thanh toán

Hiện tại flow POS đang gắn chặt:

```
Create Order → Checkout → Payment Success
```

Điều này gây hạn chế:

- Không thể tạo trước order cho khách walk-in
- Không phù hợp với flow check-in và queue management
- Staff phải complete payment trước khi xử lý order tiếp theo
- Khó theo dõi khách đang làm dịch vụ
- Reopen order chưa có lifecycle rõ ràng

Đề xuất:

```
Tạo Pending Order trước
→ xử lý dịch vụ
→ thanh toán sau
```

2. **Định nghĩa Pending Order**

- Status: Pending
- Ý nghĩa:

```
Order chưa được checkout hoàn tất (chưa thanh toán)
Pending Orders sẽ không hiển thị trong Order History.
```

- Pending Order đại diện cho:

```
Khách đang trong quá trình phục vụ hoặc chờ thanh toán.
```

---

3. **Các nguồn tạo Pending Order**

Pending Order có thể được tạo từ 3 nguồn:

1. Create Order thủ công

Flow:

```
POS Home
→ Create Order
→ Tạo Pending Orderpar
```

Use case:

- Walk-in customer
- Staff tạo order trước
- Khách làm dịch vụ trước khi thanh toán

2. Checkout từ Appointment

Flow:

```
Appointment
→ Checkout
→ Tạo Pending Order
→ Thanh toán sau
```

Use case:

- Khách đến theo appointment
- Service có thể thay đổi trong lúc làm
- Thanh toán sau khi hoàn tất dịch vụ

3. GoCheckin

Flow:

```
Customer check-in success
→ Auto-create Pending Order
→ Order tag: Checked in
```

Use case:

- Queue management
- Theo dõi khách đang ở tiệm
- Staff chủ động xử lý order

---

## **4. Kiến trúc UX đề xuất**

Đề xuất tách thành 2 màn hình riêng biệt để:

- Giảm cognitive overload
- Tối ưu workflow vận hành
- Dễ scale khi số lượng order lớn

1. **Home Screen — Pending Orders Queue**

Mục tiêu: Đây là màn hình vận hành chính của POS.

Dùng để:

- Theo dõi khách đang ở tiệm
- Theo dõi trạng thái xử lý dịch vụ
- Mở nhanh order cần thao tác
- Quản lý queue

Màn hình này KHÔNG dùng để edit sâu order.

**Layout đề xuất**

Header actions

```
Search
Date picker
Filters
Create Order
```

---

Pending Order Card

Mỗi card hiển thị:

```
Order ID
Customer name
Cusotmer Phone
Tag
Created at
Status: Pending
```

2. **Create/Update Order — Order Workspace**

- Mục tiêu:
- Màn hình xử lý chi tiết order.
- Đây là nơi staff thao tác chính với order

**Layout đề xuất**

- **Left Sidebar**: Mini Pending Orders list.

Mục đích:

```
Switch nhanh giữa các order
Hỗ trợ multi-order workflow
Giữ continuity khi thao tác
```

Thông tin hiển thị:

```
Order ID
Customer Name
Customer Phone
Created At
```

- **Center Workspace**

Khu vực thao tác chính: như giao diện hiện tại, gồm:

- Customer Information
- Staff Management: Bảng staff
- Service Management: Bảng service
- Order Actions / Order Summary

---

## **5. Offline Mode**

POS vẫn có thể tạo Pending Order khi offline.

State:

```
order_status = Pending
```

Offline Indicators

UI cần hiển thị rõ, order này đang ở state nào, vd

```
Waiting for sync
Sync failed
Conflict detected
```

---

Chống duplicate

Để tránh tạo trùng Pending Order:

Quy tắc hiển thị Order  
Pending Orders

Hiển thị tại:

```
Pending Orders Queue
Order Workspace
```

---

Final UX Flow  
Create Order Flow (bao gồm cả Checkout Order từ Appointment)

```
Create Order
→ Pending
→ Service Processing
→ Checkout
→ Payment Success
→ Completed
```

---

GoCheckin Flow

```
GoCheckin
→ Auto-create Pending Order
→ Staff xử lý dịch vụ
→ Checkout
→ Payment Success
```

---

**Một số lưu ý:**

- Nếu đã thực hiện Checkout từ Appointment rồi, nhưng vẫn chưa thanh toán cho order, click Checkout tiếp thì vẫn redirect đến Order Pending đã checkout trước đó.
- Offline mode, chỉ cho Complete order bằng Cash và sync lại khi online.
- Order Pending không tự động complete hay cancel đi sau khi qua ngày mới, và vẫn cho phép thanh toán cho những order Pending của ngày trong quá khứ, thì complete order thời gian nào thì đó chính là Order Date
- Mọi thay được thực hiện trên Pending Order đều được ghi nhận, cho đến khi payment success → Completed

---

_Source: Google Docs — "Order Pending" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Split Order

_Linear doc: https://linear.app/fastboy/document/split-order-a317435c0a01_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

Flow chart: [POS Split Order](https://drive.google.com/file/d/1-mMNkzAoY-R_Mgq_B2aTRe62XFscPJLb/view)  
Reference: [https://youtu.be/60mPL-RQafg?si=uQ8iGJMsMUY_RRf7](https://youtu.be/60mPL-RQafg?si=uQ8iGJMsMUY_RRf7)

1. **Overview**

   Split Order cho phép chia một Order thành nhiều Check độc lập để khách hàng có thể thanh toán riêng biệt bằng các phương thức thanh toán khác nhau.  
   Mục tiêu của tính năng:

- Hỗ trợ nhiều khách hàng cùng sử dụng chung một Order nhưng thanh toán riêng.
- Hỗ trợ chia tiền thanh toán linh hoạt.
- Không làm thay đổi cấu trúc Order gốc, Service gốc, Staff mapping, Commission, Revenue hoặc Reporting hiện tại.
- Đảm bảo tương thích với các nghiệp vụ Refund, Void, Re-open Order và Staff Commission.

---

2. **Business Rules**

   Core Principle  
   Split Order chỉ là cách chia thanh toán.  
   Chỉ cho chọn Split order khi Total Order > $5
   Split Order không được làm thay đổi:

- Order gốc
- Service/Product gốc
- Staff assignment
- Commission calculation
- Promotion calculation
- Discount calculation
- Tax rule
- Revenue reporting  
  Toàn bộ dữ liệu nghiệp vụ vẫn được tính dựa trên Order gốc.

---

3. **Split Methods**

Hệ thống hỗ trợ 3 phương thức chia Check.

1. **Split Equally**

   User Action  
   Nhập số lượng Check cần tạo.  
   Ví dụ:

- 2 Checks
- 3 Checks
- 4 Checks  
  System Behavior  
  Tổng Order được chia đều cho tất cả Check.  
  Nếu phát sinh số lẻ:
- Làm tròn đến 2 chữ số thập phân.
- Check cuối cùng chịu phần chênh lệch.  
  Example  
  Order Total = $100  
  Split thành 3 Checks
- Check 1 = $33.33
- Check 2 = $33.33
- Check 3 = $33.34

---

2. **Split by Amount**

   User Action  
   Chọn số lượng Check.  
   Nhập số tiền cho từng Check.  
   System Behavior  
   Check cuối cùng được tự động tính.  
   Formula:  
   Check N = Order Total - Sum(Check 1 → Check N-1)  
   Validation  
   Không cho phép:

- Amount ≤ 0
- Tổng các Check vượt quá Order Total
- Check cuối cùng có giá trị âm  
  Example  
  Order = $100
- Check 1 = $30
- Check 2 = $50  
  System auto:
- Check 3 = $20

---

3. **Split by Items**

   User Action  
   Gán Service/Product vào từng Check.  
   System Behavior  
   Mỗi Item chỉ được thuộc về một Check duy nhất.  
   Check Total được tính dựa trên Item được gán.  
   Validation  
   Nếu Order chỉ có 1 Item:

- Không cho phép Split by Items.  
  Example  
  Order:
- Pedicure = $40
- Manicure = $30
- Product = $20  
  Check 1
- Pedicure  
  Check 2
- Manicure
- Product

---

4. **Item Distribution Rules**
5. **Discount**

   Order Discount  
   Được phân bổ theo tỷ lệ Amount của Item.  
   Item Discount  
   Đi theo Item tương ứng.

---

2. **Tax**

   Tax chỉ áp dụng cho Product.  
   Split by Items  
   Tax được hiển thị trên Check chứa Product.  
   Split Equally / Split by Amount  
   Không cần hiển thị Tax riêng trên từng Check.  
   Tax chỉ hiển thị ở tổng Order.

---

3. **Service Fee / Cash Discount**

   Được phân bổ theo tỷ lệ Amount của Item.

---

4. **Tip**

   Tip không được phân bổ khi Split.  
   Tip được nhập tại thời điểm thanh toán từng Check.  
   Tip được ghi nhận riêng cho từng Check.  
   Sau khi Order hoàn tất:

- Tip được phân bổ cho Staff theo Tip Rule hiện tại của Merchant.

---

5. **Check Management**
6. **Clear Check**

   Cho phép xóa Check chưa thanh toán.  
   Sau khi xóa:

- Hệ thống tự động tính lại các Check còn lại.  
  Validation:
- Phải còn tối thiểu 2 Check để được xem là Split Order.

---

2. **Paid Check**

   Không cho phép xóa Check đã thanh toán.  
   Nếu muốn thay đổi:

- Phải Void Check trước.

---

3. **Change Split Method**

   Before Payment  
   Cho phép:

- Đổi Split Method
-

## Chỉnh sửa Check

After Payment Exists  
 Không cho phép:

- Đổi Split Method
- Tạo lại Split Structure  
  Nếu muốn thay đổi:
- Void toàn bộ Check đã thanh toán trước.

---

6. **Payment Flow**

Mỗi Check được thanh toán độc lập.

1. **Payment Information**

   Mỗi Check hiển thị:

- Check Number
- Item List (nếu có)
- Amount
- Tip
- Payment Status

---

2. **Payment Method**

   Một Check chỉ được thanh toán bằng duy nhất một Payment Method.  
   Hỗ trợ:

- Card
- Cash
- Gift Card
- Other  
  Không hỗ trợ:
- Card + Cash
- Card + Gift Card
- Cash + Gift Card
- Multiple Payments trong cùng Check  
  Nếu khách muốn dùng nhiều phương thức:
- Tạo thêm Check khác.

---

7. **Order Status**

   Khi có ít nhất một Check đã thanh toán:  
   Order Status = Processing  
   Khi toàn bộ Check đã thanh toán:  
   Order Status = Successful

---

8. **Gift Card Handling**

Gift Card Balance Validation

Khi chọn Gift Card:

Hệ thống kiểm tra Balance realtime.

Balance đủ

Tiếp tục thanh toán.

Balance không đủ

Hiển thị popup: _"Gift card balance is insufficient to pay this check. Would you like to create a new check for the remaining amount to be paid with another method?"_

---

User Selects Yes

System:

- Charge toàn bộ Gift Card Balance.
- Tạo Check mới cho phần còn lại.
-

## Chuyển sang màn hình thanh toán Check mới.

## User Selects No

Quay lại màn hình chọn Payment Method.

Lưu ý: Gift Card insufficient balance → Auto Create New Check chỉ hỗ trợ cho Split by Amount.  
 Split Equally và Split by Items không hỗ trợ auto-create check khi Gift Card không đủ balance. User phải chọn payment method khác hoặc chỉnh lại split.  
 Nếu Gift Card không đủ balance: Không tự động tạo Check mới.  
 Show message: _Gift Card balance is insufficient for this check. Please select another payment method or modify the split configuration._  
 User phải:

- Quay lại Split Screen
- Chia item lại
- Hoặc dùng payment method khác

---

9.  **Refund Rules**
10. **Full Refund**

    Cho phép Refund toàn bộ Order.  
    System:

- Refund tất cả Check đã thanh toán.
- Reverse Revenue.
- Reverse Commission.
- Reverse Tip.
- Reverse Tax.

---

2. **Partial Refund**

   ## Partial Refund luôn được thực hiện trên từng Check.

   Split by Items  
   User chọn Item trong Check cần Refund.  
   System Refund Item được chọn.

   Split Equally / Split by Amount  
   User chọn Check cần Refund.  
   System hiển thị danh sách Item của Order gốc.  
   User phải chọn Item cần Refund.  
   Không hỗ trợ Refund Amount tự do không gắn với Item.  
   Lý do:

- Đảm bảo Commission chính xác.
- Đảm bảo Revenue chính xác.
- Đảm bảo Tax chính xác.
- Đảm bảo Audit chính xác.

---

3. **Commission Reversal**

   Khi Refund Item:  
   System reverse:

- Revenue
- Tax
- Discount
- Commission  
  theo đúng Item được Refund.

---

4. **Tip Refund**

   Card Payment  
   Partial Refund:

- Refund Amount = Supported
- Refund Tip = Not Supported  
  Full Refund Check:
- Refund Amount = Supported
- Refund Tip = Supported

---

5. **Cash / Other Payment**

   Partial Refund:

- Refund Amount = Supported
- Refund Tip = Supported  
  Full Refund:
- Refund Amount = Supported
- Refund Tip = Supported

---

6. **Gift Card Payment**

   Không hỗ trợ Refund.  
   Chỉ hỗ trợ Void.

---

10. **Void Rules**
11. **Void Check**

    Cho phép Void từng Check.  
    Sau khi Void:

- Check quay về trạng thái chưa thanh toán.
- User có thể thực hiện Split lại.

---

2. **Void Order**

   Cho phép Void toàn bộ Order.  
   System Void toàn bộ Check liên quan.

---

11. **Re-open Order**
12. **Preserve Split Structure**

    Khi Re-open:  
    Hệ thống phải giữ nguyên:

- Split Method
- Check Structure
- Check Amount
- Payment History
- Tip History
- Refund History
- Void History

---

2. **Allowed Updates**

   Chỉ cho phép chỉnh sửa các thông tin không ảnh hưởng Amount:

- Customer Information
- Internal Note
- Staff Note
- Metadata khác

---

3. **Restricted Updates**

   Không cho phép:

- Add Item
- Remove Item
- Update Price
- Update Quantity
- Update Discount
- Update Promotion
- Update Tax
- Update Fee
- Update Surcharge
- Update Check Amount
- Change Split Method

---

12. **Receipt**

    Check Receipt: không in receipt cho từng check sau khi thanh toán xong.  
    Final Receipt  
    Hiển thị:

- Danh sách Check
- Amount từng Check
- Tip từng Check
- Payment Method từng Check
- Refund History
- Void History (nếu có)

---

13. **Audit Log**

    Ghi nhận:

- Cancel
- Refund
- Partial Refund
- Complete Order

---

14. **Reporting & Commission**

    Split Order không làm thay đổi:

- Revenue Report
- Sales Report
- Staff Commission
- Payroll Calculation
- Income Report  
  Tất cả Reporting vẫn dựa trên Order gốc.  
  Split Order chỉ là cơ chế chia thanh toán để phục vụ khách hàng.

---

15. **Receipt**

Khi sử dụng tính năng **Split Order**, chữ ký thanh toán được lưu theo từng check thay vì Order tổng. Do đó:

- Receipt của Order tổng có thể không hiển thị chữ ký.
- Trong **Order History**, cần hỗ trợ xem receipt của từng check.
- Receipt của mỗi check phải hiển thị đầy đủ thông tin thanh toán của check đó (items/services, subtotal, tax, tip, total, payment method, status, v.v.) cùng với chữ ký tương ứng.
- Điều này giúp đảm bảo khả năng đối soát và tra cứu chính xác đối với các order được thanh toán bằng nhiều check khác nhau.

---

- Mỗi check có action xem receipt riêng.
- Receipt của từng check cần hiển thị:
  - Check number
  - Subtotal, Discount, Tax, Tip, Total đã thanh toán trong check đó
  - Payment method
  - Payment status
  - Paid date/time
  - Customer signature của check đó (nếu có)

---

_Source: Google Docs — "Split Order" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._\* \*_Note: 47 image(s) stripped from this export; see original Google Docs tab for visuals._

---

# Settings

_Linear doc: https://linear.app/fastboy/document/settings-6fe2b4cc81a4_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# \[Volt POS\] POS Setting

# POS_Business Account

## Business Info

### Information

- Business Name: read-only
- Legal Name: read-only
- Phone Number: read-only
- Website: optional
- Address: max 50 characters
- Country: select
- State: select theo country
- City: max 50 characters
- Postal / Zip Code: không validate, lấy theo CRM

Note: trừ những field thông tin read-only được lấy từ page Admin, còn lại là required

### Work Hours

- Configuration of open/close hours for the merchant, set for each day of the week.
- Nếu ngày nào Inactive thì sẽ show là Closed và không show setting time
- Following fields:
  - YES/NO toggle: Active/Inactive
  - Day
  - Open Time (Time picker)
  - Close Time (Time picker)
- **Example:**

  | Active | Day | Open Time | Close Time | | YES/NO | Monday | 08:00 AM | 08:00 PM | | YES/NO | Tuesday | 08:00 AM | 08:00 PM | | YES/NO | Wednesday | 08:00 AM | 08:00 PM |

### Pay Period

## 1\. Start Date là gì?

Là **ngày bắt đầu tính kỳ lương đầu tiên** khi tiệm bắt đầu dùng POS.

- Weekly & Biweekly → cần Start Date.
- Monthly & Custom → không dùng Start Date.

---

# ✅ Các kiểu Pay Period

### **1️⃣ Weekly (7 ngày)**

~~Tính 7 ngày từ Start Date → rồi tiếp tục 7 ngày → 7 ngày. → Tạo thành các kỳ 1, 2, 3… liền nhau.~~  
Chọn Sunday là ngày chốt kì lương, k qtam Start Date

### **2️⃣ Biweekly (14 ngày)**

~~Giống Weekly nhưng dài 14 ngày.~~  
Chọn Sunday là ngày chốt kì lương, k qtam Start Date

### **3️⃣ Monthly (theo tháng)**

Lấy ngày 01 → đến ngày cuối tháng (28/30/31). Không dùng Start Date.

### **4️⃣ Custom (ngày cố định)**

Ví dụ chọn ngày 20 → mỗi tháng ngày 20 chốt lương. Nếu chọn ngày 31 nhưng tháng chỉ có 28 → chốt vào ngày cuối tháng (28/30).

---

# ✅ Cách hệ thống chạy Pay Period

### ✔ Khi kỳ hiện tại kết thúc → **block lại** (không chỉnh nữa).

### ✔ Hệ thống **tự tạo kỳ tiếp theo ngay lập tức**.

### ✔ Không bao giờ bị “hở ngày” giữa 2 kỳ lương.

---

# ✅ Khi bạn đổi setting trong lúc kỳ đang chạy

Nếu đang trong kỳ payroll hiện tại mà bạn:

- đổi setting staff, hoặc
- đổi loại Pay Period (ví dụ Custom → Weekly)

→ POS sẽ hiện popup:

👉 **“Changes will apply to Next Period”** → Và lưu lại log.

---

# ✅ Những phần bị block sau khi qua kỳ payroll

Khi kỳ payroll hiện tại đã kết thúc:

- Không cho chỉnh những setting liên quan, ví dụ: update order, update check…
- Các màn hình như Print Check / Payroll chỉ được chọn những kỳ đã block.

---

# ✅ Compensation liên quan Pay Period

Trong Compensation của staff:

- Luôn đánh dấu ngày cuối kỳ.
- Nếu chỉnh Compensation trong kỳ hiện tại → hỏi: **Apply for This Period hay Next Period?**

---

### Store Branding

- Store Logo: JPG or PNG file no larger than 5MB
- Cover Photo: JPG or PNG file no larger than 5MB

### Store Policies

- Description: You can add your liability policies here so customers will need to agree with it when they check-in or check-out.
- Liability Policies
- Cancellation Policies
- Other Policies

## Passcode (không còn menu này trên Setting)

Admin Passcode

- Admin password cho internal: \[Admin@Admin!\] -> dùng thể thoát ra khỏi app.

# POS_Employees Management

- Staff Role: Owner / Manager / Partner / Staff
- Permission: thêm option- Technician (toggle) - Nếu staff được enable option này thì sẽ là staff được hiển thị trong POS / Booking … để create order/booking.
- Sau khi create merchant sucess, sẽ auto gen Owner code (4 digits) lưu chung với thông tin account của merchant trên page Insight. Sau đó support create staff đầu tiên với:
  - Role: Owner
  - Code: Owner code (4 digits) Mục đích: sau khi có tiệm, thì gửi passcode này cho owner để họ có thể access và tất cả những menu trên app POS và báo họ trước, nếu muốn đổi passcode này thì lên Setting để chủ động đổi trên staff của mình.
- Menu Employees Management gồm những sub menu sau:

1. **Employees**: show list employee của tiệm

**Show theo 2 section:**

- **List staff:**
  - Staff Avatar + Nick Name
  - Staff status: Active / Inactive
  - Search staff: search nick name
  - Filter status staff: All / Active / Inactive - Default filter Active
  - Button: Add New Staff
  - Sort: Created At/Updated At
- **Detail information của staff**: gồm 5 sections
  - **Avatar / Nick Name / Status Staff**
  - **Information tab:**
    - Appointment Staff
    - Profile:
      - First Name
      - Last Name
      - Nick Name
      - Phone
      - Email
      - SSN (Optional)
      - Staff Code
      - Address
      - Countr
      - State
      - City
      - Postal / Zip Code
    - Staff Role:
      - Role: Manager / Partner / Staff
      - Extra Permission: show list extra permission của employee đó
- **Compensation:** gồm 3 types
  - **Commission**
    - Commission Setting
      - For Service: Staff 00% - Owner 00%
      - For Product: Staff 00% - Owner 00%
      - For Gift Card: Staff 00% - Owner 00%
    - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
    - Deduction Per Day: $0.00
    - Card Fee Charge
      - Description: _Do you want to take a small card fee from staff earnings? You can charge a fee on commission and/or tip paid by card._
      - On Staff Commission: 0%
      - On Credit Card Tip: 0%
      - Checkbox: Add credit card tips to staff paycheck
- **Commission + Salary:** gồm 2 setting cho Commission và Salary
  - Salary Setting: input amount
  - Radio:
    - Salary by Period
    - Wage Per Day
    - Wage Per Hour - $0.00
  - Commission Setting
    - For Service: Staff 00% - Owner 00%
    - For Product: Staff 00% - Owner 00%
    - For Gift Card: Staff 00% - Owner 00%
  - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
  - Deduction Per Day: $0.00
  - Card Fee Charge
    - Description: _Do you want to take a small card fee from staff earnings? You can charge a fee on commission and/or tip paid by card._
    - On Staff Commission: 0%
    - On Credit Card Tip: 0%
    - Checkbox: Add credit card tips to staff paycheck
  - Staff Days Off Setting
  - Checkbox: Limit days off for this staff
  - Max days off allowed: 0
  - Days not allowed to be off: Mon / Tue / Wed / Thu / Fri / Sat / Sun
- **Salary**
  - Salary Setting
    - Radio:
      - Salary By Period
      - Wage Per Day
      - Wage Per Hour - $0.00
    - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
    - Deduction Per Day: $0.00
    - Staff Days Off Setting
      - Checkbox: Limit days off for this staff
      - Max days off allowed: 0
      - Days not allowed to be off: Mon / Tue / Wed / Thu / Fri / Sat / Sun
- **Service Skills**
  - Display a list of services grouped by Category (fetched from Setting Service).
  - Each service within a category will have a selection option.
  - Option to select individual services and entire categories.
  - **Example:**
    - **Category 1:**
      - [ ] Service 1
        - [ ] Service 2
- **Work Hours**:
  - Show bookable hours for the staff member, set for each day of the week.
  - Following fields:
    - YES/NO toggle: Active/Inactive
    - Day
    - In Time (Time picker)
    - Out Time (Time picker)

—-------------------------------------------------

### **Add New Staff**

- **Title:** Add New Staff
- **Profile Information**
  - Avatar
  - First Name: required, max 25 character
  - Last Name: required, max 25 character
  - Nick Name: required, max 25 character
  - SSN: number, optional
  - Phone: required, format (xxx) xxx xxxx
  - Email: required, unique
  - Staff Code: required, 4 digits
  - Address: optional
  - Country: optional
  - State: optional
  - City: optional
  - Postal / Zip Code: optional
- Staff Role:
  - Role: dropdown gồm 3 option Manager / Partner / Staff
  - Extra Permission: show list permission không thuộc role đang chọn, để có thể add thêm permission cho employee đó.
    - UI sẽ hiện thị tương tự như bên tab permission, nhưng chỉ hiển thị những permission không thuộc role đang được chọn, nếu chọn lại Role khác thì fetch lại list extra permission tương ứng
- **Color:** show list color để tick chọn
- Button:
  - Create
  - (X)

Sau khi done form create new staff với đầy đủ Information, click Create sẽ show screen Staff Detail để tiến hành setting cho những thông tin ở 3 tab tiếp theo:

- **Compensation:** chỉ được chọn 1 trong 3 setting để apply cho staff
  - **Commission:** trả lương theo hoa hồng trên order staff đã làm được
    - Commission Setting
      - For Service:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
      - For Product:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
      - For Gift Card:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
    - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
      - Pay 1: chọn phần trăm từ list sẵn có từ 10% đến 100%
      - Pay 2: sau khi chọn xong cho Pay 1 thì phần trăm của Pay 2 = 100 - % Pay 1
    - Deduction Per Day: $0.00
    - Card Fee Charge
    - Description: _Do you want to take a small card fee from staff earnings? You can charge a fee on commission and/or tip paid by card._
    - On Staff Commission: input số, 0.00%
    - On Credit Card Tip: input số, 0.00%
    - Checkbox: Add credit card tips to staff paycheck
  - **Commission + Salary:** gồm 2 setting cho Commission và Salary. Lương của staff 1 phần trên hoa hồng order và 1 phần từ lương cứng
    - Salary Setting: nhập số tiền
      - Radio: bắt buộc chọn 1 trong 3 options
        - Salary by Period: trả lương theo kì (vd kì 2 tuần, kì 1 tháng …)
        - Wage Per Day - $0.00: trả lương theo ngày, bao nhiêu $/1d
        - Wage Per Hour - $0.00: trả lương theo giờ, bao nhiêu $/1h
    - Commission Setting: lương theo hoa hồng trên order staff đã làm được
      - For Service:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
      - For Product:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
      - For Gift Card:
        - Staff: chọn phần trăm từ list sẵn có từ 10% đến 100%
        - Owner: sau khi chọn xong cho staff thì phần trăm của Owner = 100 - % Staff
    - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
      - Pay 1: chọn phần trăm từ list sẵn có từ 10% đến 100%
      - Pay 2: sau khi chọn xong cho Pay 1 thì phần trăm của Pay 2 = 100 - % Pay 1
    - Deduction Per Day: $0.00
    - Card Fee Charge
      - Description: _Do you want to take a small card fee from staff earnings? You can charge a fee on commission and/or tip paid by card._
      - On Staff Commission: input số, 0.00%
      - On Credit Card Tip: input số, 0.00%
      - Checkbox: Add credit card tips to staff paycheck
    - Staff Days Off Setting: setting số lượng ngày được off và những ngày không được off cố định của 1 staff1
      - Checkbox - Limit days off for this staff: nếu check thì mới được edit 2 fields bên dưới
      - Max days off allowed: input số ngày
      - Days not allowed to be off: click vào những ngày mà staff không được nghỉ, nếu nghỉ phải trừ những ngày này ra
        - Mon / Tue / Wed / Thu / Fri / Sat / Sun
  - **Salary:** lương cứng theo giờ làm hoặc theo period
    - Salary Setting: nhập số tiền
      - Radio: bắt buộc chọn 1 trong 3 options
        - Salary by Period: trả lương theo kì (vd kì 2 tuần, kì 1 tháng …)
        - Wage Per Day - $0.00: trả lương theo ngày, bao nhiêu $/1d
        - Wage Per Hour - $0.00: trả lương theo giờ, bao nhiêu $/1h
    - Pay 1 - Pay 2 Split: Pay 1 00% - Pay 2 00%
      - Pay 1: chọn phần trăm từ list sẵn có từ 10% đến 100%
      - Pay 2: sau khi chọn xong cho Pay 1 thì phần trăm của Pay 2 = 100 - % Pay 1
    - Deduction Per Day: $0.00
    - Card Fee Charge
      - Description: _Do you want to take a small card fee from staff earnings? You can charge a fee on commission and/or tip paid by card._
      - On Staff Commission: input số, 0.00%
      - On Credit Card Tip: input số, 0.00%
      - Checkbox: Add credit card tips to staff paycheck
- Business flow for Compensation:
  - Không cho phép đóng tất cả option, sẽ luôn có 1 option được chọn mở
  - Mở option nào thì option đó sẽ được chọn
  - Trong quá trình chỉnh sửa, dữ liệu của các option có thể sẽ khác nhau, nếu option đó chưa có dữ liệu đã chỉnh sữa sẽ được reset về default. Note: Sẽ không có trường hợp staff không có compensation.
- **Service Skills**
  - Display a list of services grouped by Category (fetched from Setting Service).
  - Each service within a category will have a selection option.
  - Option to select individual services and entire categories.
  - **Example:**
    - **Category 1:**
      - [ ] Service 1
        - [ ] Service 2
      * ...
- **Work Hours**
  - Show bookable hours for the staff member, set for each day of the week.
  - Following fields:
    - YES/NO toggle: Active/Inactive
    - Day
    - In Time (Time picker)
    - Out Time (Time picker)
  - **Example:**

    | Active | Day | In Time | Out Time | | YES/NO | Monday | 08:00 AM | 08:00 PM | | YES/NO | Tuesday | 08:00 AM | 08:00 PM | | YES/NO | Wednesday | 08:00 AM | 08:00 PM |

—-------------------------------------------------

### **Update Staff**

- Allows updating all information of an existing staff member.
- (Follows the same field structure as "Add New Staff" with pre-filled data.)
- **Buttons:**
  - Cancel
  - Save

—-------------------------------------------------

- **Một số lưu ý khi thực hiện thêm Extra Permission cho employee:**
  - Chỉ Additive → chỉ thêm permisison so với role
  - Không được remove quyền có sẵn của role
  - Logic khi Change Role: Khi update role của Employee:
    - System reset toàn bộ Extra Permission hiện tại
    - Apply permission mặc định của role mới
    - Nếu muốn thêm quyền → user phải assign lại Extra Permission

2. **Role**

- **Xem các role mặc định trong hệ thống**
- **Xem list employee của từng role**
- **Update role cho employee trực tiếp tại page này**
- Một số lưu ý:
  - Permission không edit ở page này
  - Edit sẽ thực hiện ở Permission Page

3. **Permissions**

- **Nguyên tắc Role:**
- Hệ thống chỉ có 4 role mặc định: Owner / Manager / Partner / Staff
- Không được tạo thêm role
- Không được xóa role
- Mỗi Employee bắt buộc phải có đúng 1 Role

## Services & Products

### Service Listing Page

Show 2 sessions:

- **Category:** Displayed in two tabs:
  - **Active:** List of active categories.
    - Category Color
    - Category Name
    - **Action:**
      - Update
    - Button: Add New Category
  - **Inactive:** List of inactive categories.
    - Category Color
    - Category Name
    - **Action:**
      - Update
  - **Button:** Add New Category
- **Service Listing:** Dynamically displays services belonging to the selected Category.
  - Service Name & Description
  - Price
  - Duration
  - Supply Fee
  - Active Status
  - **Action:**
    - Update
  - **Button:** Add New Service
  - Filter status: All / Active / Inactive - Default filter Active

### Add New Category

- **Title:** Create Category
- Fields\*\*:\*\*
  - **Category Information**
    - **Category Name (required):** Unlimited
    - Status: Toggle Active / Inactive - default Active
  - **Category Color:** Default selection of the first color in the available list.
- **Buttons:**
  - Create
  - (X)

### Add New Service

**Add Service :**

- **Title:** Add New Item
- Fields\*\*:\*\*
  - **Item Type**: radio Service - Product
  - **Information:**
    - Name (required): Maximum 50 characters.
    - Category Name: chọn list category đã được tạo trước đó
    - Price: Maximum $9,999,999.99 (validation required).
    - Check box Flexible Pricing: field này để chủ động set price cho service trên order, thay vì set trên setting, nên nếu field này đc check thì Service Price là $0
      - Checked: disable field Service Price
      - Un-check: enable field Service Price
    - Service Duration:
      - Hour: Dropdown with options (1h, 2h, ...).
      - Minute: Dropdown with options (0 min, 5 mins, 10 mins, ...).
    - Supply Fee: Maximum $9,999,999.99 (validation required).
    - Service Description (optional): Maximum 255 characters.
  - **Visibility Setting:** **(PENDING)**
    - Active: Toggle switch, default to "Active" (assuming "Active" means shown).
    - Shown on Web Booking: Toggle switch, default to "Active" (assuming "Active" means shown).
    - Shown on Go Check In: Toggle switch, default to "Active" (assuming "Active" means shown).
    - Shown on Go POS: Toggle switch, default to "Active" (assuming "Active" means shown).
- **Buttons:**
  - Add
  - (X)

**Add Product:**

- **Title:** Add New Item
- Fields\*\*:\*\*
  - **Item Type**: radio Service - Product
  - **Information:**
    - Name (required): Maximum 50 characters.
    - Category Name: chọn list category đã được tạo trước đó
    - Price: Maximum $9,999,999.99 (validation required).
    - Check box Flexible Pricing: field này để chủ động set price cho service trên order, thay vì set trên setting, nên nếu field này đc check thì Service Price là $0
      - Checked: disable field Service Price
      - Un-check: enable field Service Price
    - Service Description (optional): Maximum 255 characters.
    - **Visibility Setting:** **(PENDING)**
      - Active: Toggle switch, default to "Active" (assuming "Active" means shown).
- **Buttons:**
  - Add
  - (X)

### Update Category

- Allows updating all information of an existing category.
- (Follows the same field structure as "Create Category" with pre-filled data.)
- **Buttons:**
  - Update
  - (X)

### Update Service

- Allows updating all information of an existing service.
- (Follows the same field structure as "Add New Service" with pre-filled data.)
- **Buttons:**
  - Update
  - (X)

# POS_Payment & Transactions

## Tipping Settings

Đây là nơi merchant setting tip khi thanh toán 1 payment, phần settings này sẽ được hiển thị ở màn hình customer screen. Chỉ được chọn active 4 items maximum, item nào được chọn thì mới hiển thì ngoài màn hình customer screen.

- **Tip Suggestions:**
  - Set Default % (e.g. 15%, 18%, 20%)
  - Allow Custom Amount
- **Tip Timing:**
  - Before Payment
  - After Payment
- **Tip Payment Methods:** Allow Tips by: Gift Card, Cash, Credit, Other
- **Tip Type**: Percentage and Dollar

Tham khảo UI:

## Cash Discount

- Cash Discount setting
  - Toggle: Enable/Disable
  - Discount Type: % or Fixed Amount ($)
  - Hard setting: Enable - 3%
- Service Fee:
  - Toggle: Enable/Disable
  - Discount Type: % or Fixed Amount ($)
  - Hard setting: Enable - 3%

## Signature Setting

- Requirement: Use radio buttons for each selection option.
- Options:
  - Require Signature:
    - Always require e-signature
    - Require e-signature for amounts over **\[a specified amount\]** _<- Textbox_
    - Always require physical receipt _(disables “When to ask for signature” options)_
  - When ask for signature:
    - Before process payment
    - After payment successfully

## Receipt & Split Check

- Gồm 2 phần: Receipt Setting - Receipt Preview

1. **Receipt Setting:** gồm những setting sau

- Printing Preferences:
  - Requirement: ON/OFF toggle for each selection and description
  - Selections:
    - **Auto-print customer receipt after each order** _Automatically prints the customer receipt immediately after completing an order, skipping the receipt option screen and starting a new order._
    - ~~**Auto-print owner receipt after each order**~~ \~\~ _Automatically prints the owner's receipt immediately after completing an order._\~\~
    - **Auto-print customer receipt after each split check** _Automatically prints the customer receipt after a split check payment is successful, skipping the receipt option screen and moving to the next split check payment._
    - ~~\*\*Auto-print owner receipt after each split check~~\*\* **\~\~_Automatically prints the owner's receipt immediately after a split check payment is completed._**\~\~
    - ~~\*\*Print staff receipt at check-out~~\*\* **\~\~_Prints a receipt for each staff member with completed orders, including their total sales and any tips earned._**\~\~
    - **Auto-print cancel/refund receipts** _Automatically prints a receipt whenever an order is canceled or refunded._
    - **Print separate gift card receipts at check-out** _Automatically prints a separate receipt for each gift card sold, including the last 4 digits of the card number, remaining balance, purchase date, and expiration date._
- Logo & Branding:
  - Business logo or custom image: Receipt image options
    - Use business logo
    - Upload custom image - Choose file
  - Business name
  - Business address
  - Business phone
- Receipt Message:
  - Header text: max 512 characters
  - Footer text: max 512 characters
  - Marketing opt-in prompt: max 512 characters
- Display Options:
  - Cashier name: Employee login POS
  - Order ID
  - Check-in time
  - Customer info
  - Current points
  - Visit Time
  - Group items by staff or guest
  - Items (Services & Products)
  - Subtotal / Total Discount / Tip / Total
  - Show payment method
  - Signature
  - Business note
  - Barcode (print receipts only)

2. **Receipt Preview**

## Cash Drawer

- Enable/Disable Cash Drawer
- Test Drawer Button
- Permission Control: Require Staff Code to Open Drawer or check-out order pay by cash

## Other Setting

- Setting max Price Service & Amount Order
  - Max Price Per Service: default maximum service $1K
  - Max Order Amount: default maximum order $10K
  - Note: nếu nhập vượt quá thì hiện popup “This amount seems unusually high. Please confirm or contact manager."
- Service Fee:
  - Toggle: Enable/Disable
  - Discount Type: % or Fixed Amount ($)
- Tax Setting:
  - Service Tax (%)
  - Product Tax (%)

# POS_Hardware Setting

## Terminal

- Add/Manage Payment Terminal Devices
- Show Device ID and name
- Test Terminal Connection
- Show Terminal Status

## Printer

- Add/Manage Multiple Printers
- Test Printer Button
- Printer Status: Connected / Disconnected

**Last Updated:** 09/09/2025 at 08:24:11 GMT+07:00 **Updater:** @thom_mac (cc @loan_dang @hung_vo @tienpd ) **Design Reference:** Implement the 'READY TO DEV' design.

**Driver Detection:**

- The system must check for a specific printer driver name to determine connectivity.
  - Ensure the target printer driver is named precisely POS-80-Series, as this is the default name provided during the official setup.

**Header Status Indicator:**

- The main application header must display the printer's real-time connection status\*\*. (duration 5000ms)\*\*
- The status logic is as follows:
  - **Show "Connected"**: When the POS-80-Series driver is successfully detected and the printer is responsive.
  - **Show "Disconnected"**: When the POS-80-Series driver is not installed or cannot be found.

**Before Update: Test Printer Button => After Update: Haven't test printer button**

_The current_ Printer Settings _section is incomplete. It needs to be expanded to provide users with more comprehensive information and control._

## Dual Screen Display

- Enable/Disable Dual Screen
- Able upload image for display screen
- Show:
  - Cart info when creating order
  - Enable/Disable num-pad to check-in

# POS_Network Connections

- Wi-Fi / Network Settings
- Show Current Connection Status

# POS_General Setting

## Language Setting

- Language Selector
- Default: English
- Other Options: Vietnamese, etc.

## Software Update

- **Show:**
  - **Current App Version**
  - **Last Update Date/Time**
- **Actions:**
  - Manual Update Button
- **Logs:**
  - Version History
  - Notes / Fixes / Changes

## Appearance Setting

- Show: Theme/Layout
- Action: Select Theme/Layout

# POS_Fastboy Support

- **Show:**
  - Fastboy Support Phone
  - Customer ID
  - Ultraviewer ID

# Conflict Data

| Data Type                             | Critical Level | Conflict Handling                                   |
| ------------------------------------- | -------------- | --------------------------------------------------- |
| Orders ID                             | Critical       | Must resolve immediately before continuing          |
| Payments (Only use Cash)              | Critical       | Must resolve immediately before continuing          |
| Reports                               |                |                                                     |
| (Store income, Staff income, Payroll) | Critical       | Must resolve immediately before continuing          |
| Rewards & Promotion                   | Semi-critical  | Allow continue, but flag conflict and resolve later |
| Customer Info                         |                |                                                     |
| (Phone, email, points.)               | Semi-critical  | Allow continue, but flag conflict and resolve later |
| Settings_Business Setting             |                |                                                     |
| (Store & Account)                     | Semi-critical  | Allow continue, but flag conflict and resolve later |
| Settings_Service & Staff Setting      | Semi-critical  | Allow continue, but flag conflict and resolve later |
| Settings_Device & Integration         | Non-critical   | Can auto-resolve or ignore, minimal impact          |
| Settings_Receipt & Payment            | Non-critical   | Can auto-resolve or ignore, minimal impact          |
| Dual Screen Content                   | Non-critical   | Can auto-resolve or ignore, minimal impact          |

---

_Source: Google Docs — "Settings" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Shortcuts

_Linear doc: https://linear.app/fastboy/document/shortcuts-79020cf891f9_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Tham khảo:**

| Feature                         | Phím             | Chức năng                       |
| ------------------------------- | ---------------- | ------------------------------- |
| Order & Service                 | F1               | New Order                       |
|                                 | F2               | Add Service                     |
|                                 | F3               | Add Product                     |
|                                 | F4               | Add Custom Item                 |
|                                 | Ctrl + D         | Remove selected item            |
|                                 | Ctrl + E         | Edit item (price / qty / staff) |
|                                 | Ctrl + N         | Clear Order (Draft only)        |
| Customer & Appointment          | F5               | Appointment Calendar            |
|                                 | Ctrl + C         | Select / Add Customer           |
|                                 | Ctrl + F         | Search Customer                 |
|                                 | Ctrl + H         | Customer Check-in               |
|                                 | Ctrl + B         | Book Appointment                |
| Turn & Staff                    | F6               | Open Turn Board                 |
|                                 | Ctrl + I         | Staff Check-in                  |
|                                 | Ctrl + O         | Staff Check-out                 |
|                                 | Ctrl + Enter     | Assign customer to staff        |
|                                 | Ctrl + ↑ / ↓     | Move staff up/down in turn      |
|                                 | Ctrl + T         | Transfer turn                   |
| Thanh Toán (Payment)            | F8               | Go to Checkout                  |
|                                 | F9               | Pay Cash                        |
|                                 | F10              | Pay Card                        |
|                                 | Ctrl + G         | Pay Gift Card                   |
|                                 | Ctrl + O         | Pay Other                       |
|                                 | Ctrl + S         | Split Payment                   |
|                                 | Enter            | Confirm Payment                 |
|                                 | Esc              | Cancel Payment                  |
| Tip & Commission                | Ctrl + T         | Add Tip                         |
|                                 | Ctrl + A         | Adjust Tip (Manager)            |
|                                 | Ctrl + R         | Reset Tip                       |
|                                 | Ctrl + M         | Manual Tip Split                |
| Receipt – Printer – Cash Drawer | Ctrl + P         | Print Receipt                   |
|                                 | Ctrl + Shift + P | Reprint Receipt                 |
|                                 | Ctrl + K         | Open Cash Drawer                |
|                                 | Ctrl + Shift + C | Cancel Print                    |
|                                 | Ctrl + R         | Reprint Last Receipt            |
| Refund – Void – Reopen          |                  |                                 |
| (Manager / Owner)               | Ctrl + V         | Void Order                      |
|                                 | Ctrl + Shift + R | Refund                          |
|                                 | Ctrl + U         | Reopen Order                    |
|                                 | Ctrl + Shift + D | Delete Draft                    |
| Reports & Daily Close           | Ctrl + Y         | Today Report                    |
|                                 | Ctrl + Shift + Z | Batch Close                     |
|                                 | Ctrl + L         | Staff Income                    |
|                                 | Ctrl + Shift + I | Store Income                    |
| System & Security               | Ctrl + ,         | Settings                        |
|                                 | Ctrl + Shift + L | Lock POS                        |
|                                 | Ctrl + Q         | Logout                          |
|                                 | F11              | Fullscreen                      |
|                                 | Esc              | Close Popup / Back              |

---

_Source: Google Docs — "Shortcuts" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Language Setting

_Linear doc: https://linear.app/fastboy/document/language-setting-5f8e21caa7ee_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Language Setting for POS**  
**1. Objective**

Cho phép merchant thay đổi ngôn ngữ hiển thị trên ứng dụng POS nhằm cải thiện trải nghiệm sử dụng theo ngôn ngữ địa phương.

---

**2. Scope**

2.1 Supported Languages

- English (default)
- Tiếng Việt
- Không hỗ trợ RTL

---

2.2 Phạm vi áp dụng

- Áp dụng cho **toàn bộ POS app**
- Áp dụng cho **tất cả device thuộc cùng một merchant**

---

2.3 Nội dung được dịch (In scope)

Chỉ bao gồm **static UI text**:

- Button (Pay, Save, Cancel…)
- Label (Customer, Service…)
- Menu / Navigation
- Popup / Modal
- Toast / Snackbar
- Validation message
- Error message
- Empty state
- System message

---

2.4 Không bao gồm (Out of scope)

- Dữ liệu từ database:
  - Service name
  - Category name
  - Item name
  - Gift card
  - Customer / Staff name
- Receipt / Printer / Kitchen ticket
- Report / Export
- Currency format
- Date / Time format
- Number format

---

**3. Default Behavior**

- Ngôn ngữ mặc định khi mở app lần đầu: **English**

---

**4. User Flow**

4.1 Vị trí setting

- POS App  
   General Settings > Language Setting

---

4.2 Thay đổi ngôn ngữ

**Step:**

1. User vào Language Setting
2. Chọn ngôn ngữ (English / Tiếng Việt)
3. Nhấn Apply

**Hiển thị confirm:**

Changing language will apply to all POS devices in this merchant.

---

**5. Behavior**

5.1 Apply scope

- Khi thay đổi ngôn ngữ:
  - Áp dụng cho **tất cả devices thuộc merchant**
  - Không chỉ device hiện tại

---

5.2 Sync

- Language được lưu ở **merchant-level setting (backend)**
- Khi thay đổi:
  - Gọi API update setting
  - Các device khác:
    - Sync theo cơ chế hiện tại (polling/websocket)
    - Tự động apply language mới

---

5.3 UI Update

- UI **update ngay lập tức**
- Không cần restart app
- System sẽ **force reload toàn bộ UI tree**

---

5.4 Offline behavior

- Device offline:
  - Không nhận thay đổi ngay
- Khi online lại:
  - Sync setting từ server
  - Tự động apply language mới

---

**6. Permission**

- Việc thay đổi language phụ thuộc vào **permission**
- (TBD: Owner / Admin / Manager)

---

**7. Fallback Strategy**

- Nếu thiếu translation:
  - Fallback về **English**
- Không hiển thị key raw (ví dụ: pos.checkout.pay)

---

8. Technical Notes (for Dev)

8.1 Storage

```
merchant.settings.language = "en" | "vi"
```

---

8.2 Translation source

- Giai đoạn đầu: Dev tự translate
- Có thể cải tiến sau (external translation / CMS)

---

_Source: Google Docs — "Language Setting" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Service Fee

_Linear doc: https://linear.app/fastboy/document/service-fee-dedcb36a56e3_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# Subtotal & Service Fee – Base-Price Ratio Allocation

### Mục đích

Tính tổng tiền (subtotal) cho 1 order có nhiều dịch vụ.

Mỗi dịch vụ có:

- Giá gốc (price)
- Phần trăm giảm giá (discount)
- Phí dịch vụ (service fee) tính theo phần trăm

Phí dịch vụ được tính dựa trên **tổng sau giảm giá**, nhưng **chia lại cho từng dịch vụ theo tỷ lệ giá gốc**.

**Tính phần tiền được tính phí**

→ Lấy giá gốc \* (1 - discount%) cho từng dịch vụ

→ Cộng tất cả lại

2️⃣ **Tính tổng service fee**

→ Lấy tổng vừa tính \* phần trăm service fee

3️⃣ **Chia fee cho từng dịch vụ**

→ Dựa theo tỷ lệ giá gốc của dịch vụ

(Ví dụ dịch vụ 1 = 5$, dịch vụ 2 = 15$ → tổng 20$

→ tỉ lệ = 25% và 75%)

4️⃣ **Tính tiền cuối của từng dịch vụ**

→ Giá gốc + fee được chia

5️⃣ **Subtotal (tổng cuối)**

→ Tổng tất cả giá gốc + tổng service fee

(Discount **không trừ** trong subtotal, chỉ dùng để tính fee)

Giả sử:

- Service 1: 5$ giảm 10%
- Service 2: 17$ giảm 50%
- Service fee = 10%

Bước tính:

- Sau giảm giá: 4.5 + 8.5 = 13
- Service fee = 13 × 10% = **1.3**
- Tỷ lệ giá gốc: 5/22 và 17/22
- Fee chia ra: 0.3 và 1.0
- Tổng từng service: 5.3 và 18.0
- **Subtotal = 23.3**

| Service      | Giá gốc | Giảm giá | Fee       | Tổng (đã gồm fee) |
| ------------ | ------- | -------- | --------- | ----------------- |
| Service 1    | $5      | 10%      | $0.30     | $5.30             |
| Service 2    | $17     | 50%      | $1.00     | $18.00            |
| **Subtotal** |         |          | **$1.30** | **$23.30** ✅     |

---

_Source: Google Docs — "Service Fee" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Book Appointment from POS

_Linear doc: https://linear.app/fastboy/document/book-appointment-from-pos-77e8461bc641_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Book Appointment from POS**

# **A. Setting Go Booking (Web Booking - POS Booking)**

1. **Booking Hours**

- Thiết lập thời gian được phép đặt hẹn tại trang website book hẹn. Có thể thiết lập riêng hoặc giống thời gian làm việc của tiệm thông qua việc chọn nút Sync with Business work hour.

!\[\]\[image28\]

2. **SMS Content**

- Các nội dung tin nhắn chỉ được thiết lập trong phạm vi 160 ký tự bao gồm cả tên tiệm theo quy định SMS quốc tế. Trường hợp lố ký tự sẽ dẫn đến không gửi tin nhắn ra được. Số lượng ký tự có thể xem ở cuối mỗi dòng.

| SMS Content                                                |                                                                                                                                  | Ý nghĩa / Điều kiện                                                                                                                                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SMS sent when you can't fulfill an appointment request** |                                                                                                                                  | Chủ tiệm hủy lịch hẹn Appointment Status = Cancelled                                                                                                                                                    |
|                                                            | Sorry we’re busy at the time you request the appointment, please make another appointment, thanks! {link}. Reply STOP to opt out |                                                                                                                                                                                                         |
| **SMS sent when customer’s booking is confirmed**          |                                                                                                                                  | Appointment đã được phía tiệm xác nhận Appointment Status = Confirmed                                                                                                                                   |
|                                                            | Your appointment with {business_name} has been confirmed. {link}. Reply STOP to opt out                                          |                                                                                                                                                                                                         |
| **SMS sent when your customer completes a booking online** |                                                                                                                                  | Book appoinment online thành công (đây là tin nhắn trước khi nhận được tin confirmed ở trên) Appointment Status = Scheduled                                                                             |
|                                                            | Your appointment with {business_name} has been sent to the owner, please wait for his/her confirmation. {link}                   |                                                                                                                                                                                                         |
| **SMS sent reminder customer**                             |                                                                                                                                  | Là nội dung tin nhắn gửi ra để nhắc nhở khách hàng về cuộc hẹn sắp tới. Thông thường mặc định sẽ được thiết lập 3 tiếng trước khi đến giờ hẹn (Khách có thể nhờ bên mình thiết lập mốc thời gian khác). |
|                                                            | Hi {customer_name}, don't forget your appointment at {business_name} on {date} at {time}. {link}. Reply STOP to opt out          |                                                                                                                                                                                                         |
| **SMS sent for waiting customer**                          |                                                                                                                                  | Là nội dung tin nhắn gửi ra nhằm báo với khách hàng đang trong danh sách chờ khi tiệm đông rằng tiệm đã sẵn sàng phục vụ.                                                                               |
|                                                            | {business_name}: We're ready for you, please come back as soon as you can.                                                       |                                                                                                                                                                                                         |

3. **Block Time**

- Là một tính năng dùng để chặn (block) một khoảng thời gian trên lịch đặt hẹn, để khách hàng không thể đặt lịch trong khoảng thời gian đó. Nói đơn giản: tưởng tượng lịch đặt hẹn giống một cuốn sổ lịch của tiệm. Bình thường khách có thể chọn bất kỳ ô giờ nào còn trống. Nhưng Block time giống như đặt một tấm biển “⛔ Không nhận khách khung giờ này”
- **Business Block Time:** Tạm thời chặn hẹn toàn bộ tiệm vào ngày cụ thể.  
  !\[\]\[image29\]  
  Tại đây tiệm có thể thêm ngày cụ thể muốn tạm thời chặn đặt hẹn thông qua việc chọn dấu + ở góc phải  
  !\[\]\[image30\]  
  Lúc này sẽ có các thiết lập như hình:
  - **Day Off:** ngày muốn chặn đặt hẹn.
  - **Duration:** khung thời gian muốn chặn đặt hẹn của ngày hôm đó.(hoặc có thể tích chọn ô All day để hệ thống hiểu rằng sẽ chặn cả ngày hôm đó)
  - **Recurring?:** Là tính năng cho phép thiết lập sự lặp lại. Sau khi kích hoạt sẽ có các tính năng phía dưới.
  - **Repeat:** Lặp lại hàng tuần hoặc hàng tháng.
  - **End Date:** Sự lặp lại sẽ kết thúc vào ngày nào tùy theo thiết lập tiệm.
  - **Description:** Dùng để thêm mô tả, nguyên nhân của ngày chặn đặt hẹn này (chỉ tiệm thấy, khách hàng khi đặt hẹn sẽ không thấy phần này)
- **Staff Block Time:** Tạm thời chặn đặt hẹn đối với thợ chỉ định  
  !\[\]\[image31\]  
  Tại đây tiệm có thể thêm ngày cụ thể muốn tạm thời chặn đặt hẹn thông qua việc chọn Add Time Off  
  !\[\]\[image32\]
- Lúc này sẽ có các thiết lập giống như Business Block Time:
  - **Day Off:** ngày muốn chặn đặt hẹn.
  - **Duration:** khung thời gian muốn chặn đặt hẹn của ngày hôm đó.(hoặc có thể tích chọn ô All day để hệ thống hiểu rằng sẽ chặn cả ngày hôm đó)
  - **Recurring?:** Là tính năng cho phép thiết lập sự lặp lại. Sau khi kích hoạt sẽ có các tính năng phía dưới.
  - **Repeat:** Lặp lại hàng tuần hoặc hàng tháng.
  - **End Date:** Sự lặp lại sẽ kết thúc vào ngày nào tùy theo thiết lập tiệm.
  - **Description:** Dùng để thêm mô tả, nguyên nhân của ngày chặn đặt hẹn này (chỉ tiệm thấy, khách hàng khi đặt hẹn sẽ không thấy phần này)

4. **Popup Message (Web Booking)**

- Đây sẽ là thiết lập thông báo ngay khi khách hàng truy cập vào trang đặt hẹn. Sau khi nhập nội dung bất kỳ và Save lại, sẽ được kết quả tại trang book hẹn ngay khi vừa truy cập như hình dưới.  
  **!\[\]\[image33\]**  
  **!\[\]\[image34\]**

5. **Appointment Deposit (Web Booking)**

- Đây là tính năng đặt cọc trước mỗi khi khách hàng đặt hẹn vào tiệm.
- **Setting deposit type:** Mức đặt cọc mà khách phải ứng trước khi đặt hẹn. Tại đây có thể chọn theo phần trăm giá tiền dịch vụ với **Percentage deposit**, hoặc theo số tiền cụ thể mà tiệm có thể thiết lập ở **Fixed deposit amount**.
- **Setting cancel policy:** Nếu kích hoạt nút Allow, thì lúc này tiệm cho phép khách hàng hủy hẹn và hoàn tiền. Tuy nhiên thời hạn để thực hiện thao tác trong phạm vi thời gian nhất định sau khi đặt hẹn. Có thể cài đặt 24 tiếng, 48 tiếng như mặc định hoặc thời gian khác bằng cách chọn Custom Hours.  
  **!\[\]\[image35\]**

6. **Web Booking Settings**

!\[\]\[image36\]

- **Display Settings**: Cài đặt giao diện hiển thị trên trang **Web Booking**

!\[\]\[image37\]

| Action                                         | Ý nghĩa                                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Show skip button on your online booking page   | Hiển thị nút Skip trên trang đặt hẹn online. Giúp người đặt hẹn có thể skip qua một số bước (tính năng này chỉ áp dụng cho link web booking 2.0). |
| Show service price on your online booking page | Hiển thị giá của services trên trang đặt hẹn.                                                                                                     |
| Show Standard Service Duration                 | Hiển thị Duration (thời gian làm một service) trên trang đặt hẹn.                                                                                 |
| Show the staff name of the confirmation page   | Hiển thị tên thợ trên trang confirm sau khi đặt hẹn xong.                                                                                         |
| Show Staff Selection Page                      | Hiển thị trang chọn staffs cho người đặt có thể tùy ý chọn thợ mình muốn.                                                                         |

- **Staff Selection & Assignment**: Mục này dùng để thiết lập cách client chọn thợ và cách hệ thống tự động assign staff cho các cuộc hẹn **Web Booking.**

!\[\]\[image38\]

- **“Any Staff” option will be used when your customer doesn’t know who to book online:** Hiển thị và cho phép người đặt chọn thợ ngẫu nhiên bằng cách chọn vào thợ tên “Any available staff”.
- **Appointment will be assigned automatically by the system to any staff available that time and can do the service:** Tính năng này chỉ active được khi sử dụng Any Staff phía trên. Lúc này sau khi người đặt chọn Any Staff available, system sẽ tự động assign sang ngẫu nhiên người thợ phù hợp trong khung giờ đó.
  - Any staff color: màu sắc hiển thị mặc định khi book “Any available staff”
  - Booking done color: màu sắc mặc định khi book hẹn đã chuyển sang Done
  - Booking cancel color: màu sắc mặc định khi book hẹn đã được cancel.
- **Allow selecting staff per service when booking:** Hiển thị thợ “Staff per service” để khách tạm thời lựa chọn. Thợ này chủ yếu dùng để khách chọn tạm thời để hoàn tất việc chọn service trước, sau đó sẽ chọn thợ cụ thể sau để hoàn tất đặt hẹn.
- **Web Booking Rules & Behavior**: Thiết lập các quy tắc, hành vi từ Web booking vào hệ thống

!\[\]\[image39\]

- **Allow customers to submit booking requests for time slots that are unavailable in the system:** Cho phép khách gửi yêu cầu booking vào khung giờ đang không available. Booking sẽ ở dạng request, owner/staff sẽ kiểm tra và xử lý thủ công.
- **Allow adding multiple guests in a single booking:** Cho phép khách thêm nhiều guest trong một booking. Phù hợp với booking đi theo nhóm / gia đình.

  Khi khách sử dụng tính năng này, service của Guest 2 sẽ bắt đầu cùng thời gian với Guest 1 và không cho phép 2 Guest đặt cùng 1 thợ.

- **Maximum Number of Days Customers Can Book in Advance:** Giới hạn số ngày tối đa khách có thể đặt hẹn trước. Ví dụ: Setup 30 ngày → khách chỉ đặt được trong vòng 30 ngày tới.
- **Minimum Advance Days Required Before Booking:** Thiết lập số ngày tối thiểu khách phải đặt trước. Ví dụ: Setup 0 ngày → khách có thể đặt trong ngày.
- **Allow Customers to Cancel Bookings:** Cho phép khách tự hủy booking sau khi đã đặt. Owner có thể kết hợp với các rule khác để kiểm soát lịch trống.
- **Require Note Input:** Bắt buộc khách nhập ghi chú khi đặt lịch.Giúp tiệm nắm trước yêu cầu hoặc lưu ý đặc biệt của khách.
- **Go Booking Rules & Behavior:** Cấu hình quy tắc, hành vi đặt hẹn từ hệ thống tới người sử dụng Dashboard. Dùng để thiết lập các quy tắc hiển thị và cách xử lý booking trên màn hình Go Booking tại tiệm.

!\[\]\[image40\]

- **Hide unassigned column when having no appointment:** Ẩn cột Unassigned khi không có appointment. Giúp màn hình Go Booking gọn gàng, dễ theo dõi
- **You don't need to confirm your online bookings, which means all online bookings from your customers will be automatically confirmed right after they book:** Tất cả booking online của khách sẽ được auto confirm ngay sau khi đặt hẹn. Phù hợp với các tiệm không có lễ tân hay thời gian để kiểm tra từng lịch hẹn.
- **Block create warning appointment:** Chặn việc tạo warning appointment. Giúp hạn chế các lịch hẹn không available hoặc không hợp lệ (staff không làm hoặc bận trong khung giờ đó/ Staff không thể làm service đó, bt thì vẫn cho tạo nhưng có message cảnh báo trước)
  - Cố tình tạo appoinment với thông tin Staff/Service/Date không available, thì khi click Book sẽ hiển thị popup confirm:
    - Title: Confirmation
    - Description: There are warnings about these appointments, please check again.
    - Button: Accept

  !\[\]\[image41\]

- **Security & Validation**: Cài đặt bảo mật và xác thực thông tin khi khách đặt lịch **(Web booking)**

!\[\]\[image42\]

- **Require login before booking:** Yêu cầu khách đăng nhập trước khi đặt lịch. Phù hợp với tiệm có khách quen / member.  
  !\[\]\[image43\]
- **Enable CAPTCHA Verification for Booking:** Bật CAPTCHA khi booking. Giúp hạn chế bot / booking spam.
- **Require Customers to Enter Email When Booking:** Bắt buộc khách nhập email khi đặt lịch. Dùng để gửi confirmation / notification sau booking
- **Display a notification message when the selected service is invalid:** Hiển thị thông báo khi service khách chọn không hợp lệ.  
  Ví dụ thông báo:  
  \t _“No staff available for this service on this time. Please select other date & time!”_  
  \tOwner có thể chỉnh nội dung thông báo để phù hợp với cách giao tiếp của tiệm.
- **Pricing & Payment Settings**: Quản lý giá dịch vụ và dual pricing cho web booking

!\[\]\[image44\]

- **The service price will include the service fee:**

  ON: Giá service hiển thị trên Web Booking đã bao gồm service fee  
   → Khách thấy giá cuối cùng khi đặt lịch

  OFF: Giá service hiển thị chưa bao gồm service fee  
   → Service fee sẽ được tính riêng ở bước thanh toán

- **System Configuration**: Các cấu hình hệ thống chung liên quan đến **Web Booking**

!\[\]\[image45\]

- **Set Up Store Timezone:** Cài đặt múi giờ của tiệm.
- **Please press "Activate" only when you have completed all information in Setting, Services and Staff tabs. After you hit "Activate", all information will officially appear on your online booking and customers can start booking with your business:** Cần phải kích hoạt để trang Web Booking đi vào hoạt động. Trường hợp tiệm cần tạm tắt trang đặt hẹn có thể tắt chức năng này.
- **Enable Booking V3 Redirect:** Chức này cho phép các tiệm đang sử dụng Version 2.0 có thể tự động chuyển sang Version 3.0 ngay lập tức và ngược lại.
- **Sync data to web booking:** Tính năng Sync data to Web Booking dùng để đồng bộ dữ liệu từ hệ thống lên trang Web Booking.

**!\[\]\[image46\]**

Khi thực hiện sync, hệ thống sẽ cập nhật các thông tin sau lên Web Booking:

- Settings
- Services
- Staff
- Các thay đổi liên quan đến cấu hình booking
- Lưu ý cho owner:
  - Nên sync dữ liệu sau khi có thay đổi về setting, service hoặc staff.
  - Đảm bảo Web Booking hiển thị đúng và mới nhất trước khi Activate hoặc trước khi khách bắt đầu booking

# **B. Setting apply cho POS Booking**

1. **Booking Hours**

- Thiết lập thời gian được phép đặt hẹn tại trang website book hẹn. Có thể thiết lập riêng hoặc giống thời gian làm việc của tiệm thông qua việc chọn nút Sync with Business work hour.
- Lưu ý: thời gian booking trên POS không chỉ phụ thuộc vào Booking Hours, mà còn phụ thuộc vào
  - Business Hours
  - Staff Booking Hours
- Rule:

```
- Calendar hiển thị theo Booking Hours ± 1 tiếng.
Ví dụ:
Booking Hours: 7AM - 9PM
=> Calendar hiển thị: 6AM - 10PM
- Staff chỉ được nhận booking trong:
Calendar visible time VÀ Staff Booking Hours
- Business Hours là giờ hoạt động của tiệm, không quyết định trực tiếp khung giờ hiển thị Calendar.
```

| Booking Hours: 7:00 AM - 9:00 PM Staff Booking Hours: 10:00 AM - 5:00 PM                                    | Calendar: 6:00 AM - 10:00 PM Staff chỉ được booking: 10:00 AM - 5:00 PM                |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Business Hours: 8:00 AM - 8:00 PM Booking Hours: 7:00 AM - 9:00 PM Staff Booking Hours: 12:00 AM - 11:59 PM | Calendar hiển thị: 6:00 AM - 10:00 PM Staff được phép nhận booking: 6:00 AM - 10:00 PM |

2. **SMS Content**
3. **Block Time**
4. **Web Booking Settings - Go Booking Rules & Behavior**
5. **Một số setting chỉ apply cho Calendar Booking UI**

!\[\]\[image47\]

| Setting                                            | Ý nghĩa                                                                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Show unavailable staff                             | Cho phép hiển thị staff không available trên Calendar và dropdown staff.                                                                                                                                                                    |
| Show with most booking                             | Sắp xếp staff theo số lượng booking nhiều nhất.                                                                                                                                                                                             |
| Show customer phone                                | Hiển thị phone number trên appointment card.                                                                                                                                                                                                |
| Change edit start time mode                        | Cho phép thay đổi UI (dialog) start time của appointment. Enable: sửa thời gian trực tiếp ngay tại appointment detail, và chọn thời gian nào cũng được Disable: show dialog Edit date & Time, show tất cả khung thời gian trực quan để chọn |
| Set appointment color                              | Cho phép dùng màu cho appointment (màu theo staff).                                                                                                                                                                                         |
| Show only business work hours                      | Calendar chỉ hiển thị trong khoảng business hours.                                                                                                                                                                                          |
| Require passcode to cancel appointment             | Yêu cầu nhập passcode để cancel appointment                                                                                                                                                                                                 |
| Unlock customer phone for 30 minute                | Cho phép show full phone customer trong 30 phút sau khi unlock. Chỉ apply cho appointment.                                                                                                                                                  |
| Require Passcode to Edit Appointment               | Edit appointment cần passcode.                                                                                                                                                                                                              |
| Require Staff Code to Edit Appointment             | Staff phải nhập staff code để edit.                                                                                                                                                                                                         |
| Require Staff Code to Create new appointment       | Khi create appointment: yêu cầu staff code.                                                                                                                                                                                                 |
| Show Repeat Appointment feature                    | Hiển thị tính năng repeat appointment trong appointment detail. Để tạo 1 appointment tương tự cho ngày được chọn.                                                                                                                           |
| Show quick info when cursor is over an appointment | Hiển thị tooltip/quick info khi hover appointment.                                                                                                                                                                                          |

# **C. Flow Create Appointment từ POS**

## **1. Mở form Create Appointment**

- User click button: New Appointment trên Calendar POS để mở modal
- Hoặc click thẳng từ calendar
- Lưu ý: nếu click thẳng từ Calendar:
- Chọn thời gian trong quá khứ, không effect
- Chọn vào Block Time, show message:
  - Title: Information
  - Description: _Can not schedule appointment outside your normal business hours!_
  - Button: OK

## **2. Chọn hoặc tạo Customer**

**Search customer:** User có thể search theo:

- Customer name
- Phone number

**Existing customer:** Nếu customer tồn tại

- Show customer list bên trái
- Click customer để select appointment customer

Thông tin hiển thị:

- Customer name
- Masked phone number

Ví dụ:

```
Test
(***) ***-2619
```

**Create new customer**

Nếu không tìm thấy customer. User click: + Create new client để tạo customer mới và tiếp tục booking appointment.

---

## **3. Chọn ngày Appointment**

Date picker hiển thị phía trên form.

**Default:** Default theo ngày đang chọn trên Calendar.

Behavior

- Cho phép booking:
  - Hiện tại
  - Tương lai

Lưu ý: không được tạo appointmnet trực tiếp cho ngày trong quá khứ, nhưng nếu user dùng action kéo - thả appointment trên calendar thì vẫn được cho phép

---

## **4. Nhập thông tin Appointment Line**

Mỗi appointment gồm ít nhất 1 line.

Mỗi line gồm:

```
- Start time
- Duration
- Staff
- Service
```

---

## **5. Start Time**

Default

- Nếu click từ calendar slot:
  - Lấy đúng selected slot time
- Nếu click từ header:
  - Lấy current time
  - Round lên nearest 15 phút

---

## **6. Duration**

**Default:** Default theo service duration nếu đã chọn service.

**Editable:** User có thể edit duration của service

---

## **7. Staff**

**Chọn staff:** User có thể

- Chọn staff cụ thể
- Chọn: Any Staffs
- Hoặc để Unassigned, thì sẽ tự động lưu thành Any Staffs sau khi save appointment
- Filter:
  - All
  - Staff is available (Avalable)
  - Staff is currently busy (Busy)
- Search: staff nickname
- Lưu ý: trong list staff show rõ status hiện tại của staff
  - Avalable:
    - Staff Status - Active
    - Staff Booking status - Active
    - Khoảng thời gian chưa có appointment nào được assgn cho staff
    - check Staff Booking Hours / overlap appointment / staff availability
  - Busy:
    - Chọn start time không available cho staff đó, staff đang có appointment khác
    - Not in woking time của staff đó (ngày nghỉ)
    - Staff đang apply Block Time
    - Nếu cố tính chọn thì show message: _This Staff is not available for this time._

---

## **8. Service**

**Optional:** Service không bắt buộc khi create appointment.

Cho phép: Tạo appointment trước, Checkout order thì mới chọn service

- Khi click vào field chọn service, sẽ show tất cả service - Active theo từng Category, gồm:
  - Service Name
  - Duration
  - Price
  - Trạng thái:
    - Available cho staff đang chọn
    - Busy cho staff đang chọn: _Service unavailable for \[Staff\]_
- Filter:
  - All
  - Service is available (Avalable)
  - Service is currently busy (Busy)
- Search: staff nickname
- Lưu ý:
  - Trong list service show rõ trạng thái hiện tại của service đối với staff đang được chọn
  - Riêng đối với Any Staffs, tất cả service đều available
  - Nếu chưa chọn Staff, mà chọn Service trước, thì luôn show thêm note _Service unavailable for_

---

## **9. Add More**

User click: + Add More để thêm appointment line trong cùng appointment.

**Rule:** Line tiếp theo

- default start time = previous line end time

Cho phép:

- Khác staff
- Khác service
- Khác duration

---

## **10. Appointment Tags**

User có thể chọn:

- **Requested:** Tag đánh dấu appointment request
- **Highlight:** Tag đánh dấu appointment nổi bật
- **No-show:** Tag đánh dấu customer không đến
- **Repeat:** Cho phép tạo recurring appointment khi thực hiện create một new appointment.
  - Nếu setting Show Repeat Appointment feature = ON
  - Nếu click repeat, sẽ show field Repeat Setting và chọn End date, sẽ tạo ra những appointment tương tự thông tin của appointment gốc cho ngày được chọn
  - Action: Cancel Repeat Appointments, click sẽ cancel cả appointment gốc và appointment repeat.
  - Lưu ý: nếu update appointment cũ thì ẩn option Repeat.

---

## **11. Appointment Note**

User có thể nhập: Appointment Note

Rule

- Max length = 255 chars
- Hiển thị trong:
  - Appointment detail
  - Calendar card
  - Hover quick info

---

## **12. Validation khi Book**

Chỉ required: Customer

System validation gồm:

- Customer tồn tại hoặc tạo mới thành công
- Staff availability
- Staff Booking Hours
- Booking Hours
- Business Hours
- Duration validity
- Appointment overlap

---

## **13. Booking Hours Rule**

```
Calendar hiển thị theo Booking Hours ± 1 tiếng.

Ví dụ:
Booking Hours: 7AM - 9PM
=> Calendar hiển thị: 6AM - 10PM

Staff chỉ được nhận booking trong:
- Calendar visible time
- Staff Booking Hours

Business Hours không quyết định trực tiếp khung giờ hiển thị Calendar.
```

---

## **14. Save Appointment**

User click: Book để tạo appointment.

Lưu ý:

- Đối với những appointment được book với thông tin như bên dưới:
  - Staff: _This Staff is not available for this time._
  - Service: _Service unavailable for \[...\]_

  thì được xem là warning booking, khi click Book, sẽ show message confirm và không tạo được appointment:

- Title: Confirmation
- Description: There are warnings about these appointments, please check again.
- Button: Accept

---

## **15. Sau khi create thành công**

System sẽ:

- Đóng modal
- Tạo appointment với: source = POS / Status= Confirmed
- Show appointment trên Calendar, gồm những thông tin sau:
  - Customer Name
  - Service Name
  - Tag (nếu có)
  - Appointment note (nếu có)
  - Booking time: start - end
- Show đúng staff column
- Nếu không có staff: show tại Unassigned column
- Update Appointment Today nếu appointment date = today
- Recalculate count
- Show toast: Appointment created successfully

# **D. Update Appointment**

Status / Action trên appointment

| Appointment Status / Action | Update | Confirm | Cancel | Checkout |
| --------------------------- | ------ | ------- | ------ | -------- |
| **Scheduled**               | Yes    | Yes     | Yes    | No       |
| **Confirmed**               | Yes    | No      | Yes    | Yes      |
| **Canceled**                | No     | No      | No     | No       |
| **Done**                    | No     | No      | No     | No       |

1. **Edit appointment**

- Status appointment: Confirmed / Scheduled
- Được update tất cả các thông tin của appointment, bao gồm:
  - Customer
  - Date
  - Start Time
  - Duration
  - Staff
  - Service
  - Add more
  - Tag
  - Appointment Note
- Button:
  - Cancel: cancel appointment
  - Confirm (nếu status là Scheduled): để confirm appointment
  - Save appointment:lưu lại những thay đổi trên appointment mà không thay đổi status của appointment. Click sẽ show popup Confirmation
    - Title: Confirmation
    - Description: _Do you want to send a message to \[Cusomter name\] notifying about this change?_
    - Button: Don’t Send / Send

2. **Confirm appointment**

- Status appointment: Scheduled
- Đối với những appointment được book từ Web Booking và setting \[You don't need to confirm your online bookings, which means all online bookings from your customers will be automatically confirmed right after they book\] - disable
- Click vào appointment, sẽ show appointment detail và button:
  - Cancel: cancel appointment
  - Save appointment:lưu lại những thay đổi trên appointment mà không thay đổi status của appointment.
  - Confirm: click sẽ show popup confirmation
    - Title: Confirmation
    - Description: _Are you sure to confirm this appointment?_
    - Button:
      - Cancel
      - Accept: click sẽ show message confirm thành công, gửi thông tin đến customer, và có notification trên POS.

3. **Cancel appointment**

- Status appointment: Confirmed / Scheduled
- Click vào appointment, sẽ show appointment detail và button:
  - Confirm (nếu status là Scheduled): để confirm appointment
  - Save appointment:lưu lại những thay đổi trên appointment mà không thay đổi status của appointment.
  - Cancel: click sẽ show popup confirmation
    - Title: Confirmation
    - Description: _Are you sure to cancel this appointment?_
    - Button:
      - Cancel
      - Accept: click sẽ show message cancel thành công, gửi thông tin đến customer, và có notification trên POS.

4. **Checkout Order từ appointment**

- Status appointment: Confirmed
- Click vào appointment, sẽ show appointment detail và button:
  - Cancel: cancel appointment
  - Save appointment:lưu lại những thay đổi trên appointment mà không thay đổi status của appointment.
  - Checkout: click sẽ rediect qua màn hình create order và fill sẵn những thông tin trên appoinment qua order
    - Lúc này trong màn hình create order sẽ show thêm 1 dòng hiển thị thời gian booking: Booking Time: 8:00AM (start time của appointment)
    - Tiến hành tạo order và thanh toán như bình thường
    - Sau khi order complete:
      - Tự động update status appointment - Done
      - Không thể update thông tin của appointment nữa > end flow
    - Trên giao diện của Appoitnment sẽ show thêm thông tin: Order ID

## **Một số case đặc biệt**

1. Một appointment đã được checkout, nhưng order chưa Complete, thì khi click lại vào Checkout từ appointment thì sẽ redirect đến đúng order đã được checkout trước đó
2. Một appointment đã được checkout, nhưng order chưa Complete → thực hiện Cancel appoitment:
   - Cancel appointment thành công, status - Canceled
   - Order vẫn không ảnh hưởng
   - Sau đó Complete order:
     - Appointment update status - Done
3. Một appointment đã được checkout, nhưng order chưa Complete → thực hiện Delete Order → Appointment không ảnh hưởng, có thể thực hiện Checkout tiếp tục và tạo ra order mới.
4. Nếu quá thời gian của appointment, nhưng khách k đến, cũng như không checkout order, thì status của appointmentvẫn giữ nguyên không thay đổi, và vẫn cho phép thực hiện các action trên appointment.
5. Những appoitnment được book trước khi bị set Block Time vẫn được action như trên một appointment bình thường.

# **E. Go Check-In integrate**

1. **Đã có Appointment_Customer thực hiện link Checkin Today vào Appointment**

- Khi customer đã book Appoitment, sau đó đến tiệm và thực hiện Checkin
- Nếu số phone trùng với phone đã book appointment trước đó thì sẽ hiển thị 1 step để customer link thông tin Checkin vào Appoinment
- Nếu customer chọn Yes:
  - Gửi noti đến POS, để confirm customer đã đến tiệm và checkin trên appointment
  - Tạo order cho Appointment trước đó sau khi confirm Checkin có link đến appointment thành công
  - Trên thông tin Appointment gắn thêm tag **Checked in**

2. **Đã có Appointment_Customer không link Checkin Today vào Appointment**

- Khách thực hiện Checkin thành công → tạo được order Pending không liên quan đến appointment trước đó
- Thông tin của order từ Checkin vẫn như cũ
- Thông tin của appointment trước đó k bị ảnh hưởng
- Thực hiện Checkout Order từ Appointment sẽ tạo ra 1 order mới hoàn toàn

3. **Chưa có Appointment**

- Khách thực hiện Checkin thành công → tạo được order Pending
- Trên giao diện Calendar, sẽ có thêm Walk-in Sidebar, show danh sách khách đã thực hiện checkin trong hôm nay, gồm:
  - Customer Name
  - Customer Phone
  - Thời gian checkin thành công
- Action: support tạo appointment trên thông tin Checkin, bằng cách kéo - thả thông tin checkin vào khung thời gian/staff muốn tạo appointment trên calendar.
- Thông tin trong appointment sẽ bao gồm:
  - Order ID
  - Những thông tin service trên Checkin
  - Appointment status - Confirmed
  - Tag: Checked-in, tag này chỉ show cho những appointment được tạo Checkin
- Vì khi thực hiện checkin thành công đã tạo ra một order, nên thực hiện Checkout thì rediect đến order đã được tạo trước đó.
- Được action trên appointment như bình thường
- Lưu ý: chỉ có case này mới show thông tin Checkin trên Walk-in Sidebar ,

---

_Source: Google Docs — "Book Appointment from POS" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Cashback

_Linear doc: https://linear.app/fastboy/document/cashback-07289dfa5ed2_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Cashback** là tính năng cho phép tiệm **hoàn lại giá trị giao dịch cho khách hàng dưới dạng point**, được tính **theo % của giá trị dịch vụ hoặc trên amount cụ thể**, thay vì cách tính point cố định truyền thống (ví dụ: $1 = 1 point).

1. **Cách hoạt động**

- Thực hiện create order, đến bước apply Promo/Reward > Chọn Cashback
- Hệ thống xác định **eligible amount** (số tiền đủ điều kiện tích điểm)
- Áp dụng **cashback** tương ứng
- Quy đổi % cashback thành Cash tích lũy và cộng vào current Cash của customer sau khi complete order
- Số tiền tích lũy được sử dụng cho các giao dịch tiếp theo theo rule đã cấu hình

2. **Cashback Rule Configuration**

- Available Store Credit = Số dư cashback của customer, được tích lũy sau mỗi order success, được tính bằng công thức sau:
  - Setting Rule: Hệ thống tự động quy đổi Cashback dựa trên tổng giá trị đơn hàng (Order Total) và Cashback Percentage do tiệm cấu hình.

    **\[cashback_amount = order_total × cashback_percentage / 100\]**

    Lưu ý: Order_total: giá trị order sau Discount/Cashback Redeem và chưa tính Tax/Tip

- Setting:
  - Minimum redeemable amount: số tiền balance tối thiểu được sử dụng để trừ ngược vào order đang thanh toán
  - Maximum redeem per transaction: Ngưỡng max được apply số dư cash back vào order (VD setting là $20, thì nếu số dư Cash đang là $50, thì chỉ được sử dụng $20 cho order)
    - _Description: Cap per use regardless of balance_
  - Cashback percentage (%): phần trăm được apply cashback trên order total
    - Description: _If total bill is $100 and cashback percentage will be 10%, customer can redeem up to $10._

3. **Workflow - Apply Cash back: tích lũy Cash**

- Create Order: chọn staff - Service
- Chọn Reward > chọn tab Cashback > chọn Setting Cashback
- Tại field: Cashback Percentage (%) > nhập số %
- Complete Order: thì dựa vào total order và nhân với % cashback, sẽ tính được số Cash tích lũy của order đó theo công thức:

  **\[cashback_amount = order_total × cashback_percentage / 100\]**

- Số tiền tích lũy sẽ được sử dụng vào những order sau, nếu đã đủ điều kiện sử dụng

!\[\]\[image17\]  
!\[\]\[image18\]  
!\[\]\[image19\]

4. **Workflow - Apply Reward - Cash back: sử dụng số dư Cash Back vào order**

- Create Order: chọn staff - Service
- Chọn Reward > chọn tab Cashback
- Nhập Amount muốn trừ trực tiếp cho order, số amount phải thỏa điều kiện được apply của Cashback. VD dưới hình:
  - Minimum: $10
  - Maximun: $200
  - Available Store Credit (Current Cash balance): $573.11
  - Amount được cho phép: $10 - $200
- Cash back sẽ được trừ trực tiếp vào order, tương tự như apply Reward
- Cashback không áp dụng cho tax, tip.

!\[\]\[image20\]  
!\[\]\[image21\]

5. **Giao diện những vị trí ảnh hưởng**

- **Create Order:**
- Thêm field: **Cashback Redeemed** tại order summary, là field con của Total Discount
- Thể hiện số tiền cashback được sử dụng redeem cho order hiện tại
- **Order History:** cộng chung vào Total Discount
- **Report**: Cashback Redeemed sẽ được tính chung vào Discount của order (bao gồm cả Promotion/Reward)

6. **Workflow khi có Re-open / Cancel / Refund / Partial Refund**
7. **Re-open Order**

- Cashback chưa finalize, hệ thống sẽ recalculate lại Earn Cashback theo total mới của order khi order được close lại.
- Cashback đã redeem tạm thời giữ nguyên, sẽ được tính lại nếu order thay đổi giá trị.

2. **Cancel Order / Full Refund**

- Return toàn bộ cashback đã redeem vào wallet của customer.
- Reverse toàn bộ cashback earn từ order đó.

3. **Partial Refund**

- Cashback earn: bị reverse theo tỷ lệ giá trị refund so với tổng order ban đầu.
- Cashback redeem: được hoàn lại theo tỷ lệ refund tương ứng.

**Tóm lại:**

- Earn cashback → reverse theo phần order bị huỷ/refund.
- Redeem cashback → hoàn lại cho customer theo phần order bị huỷ/refund.

**Lưu ý:**

- Không xoá transaction cashback cũ, hệ thống nên tạo transaction đảo chiều (adjustment/reverse) để đảm bảo audit rõ ràng.
- Cashback nên được quản lý theo ledger transaction (earn / redeem / reverse / restore) để tránh sai lệch số dư wallet.
- Trường hợp cashback earn của order đã được customer dùng cho order khác trước khi refund, hệ thống vẫn phải reverse cashback của order gốc, và có thể cần xử lý balance adjustment trong wallet.

7. **Cashback Wallet (Cashback history)**  
   <document id="b8656c71-958a-4c4a-b8ff-7ef70443a0eb" href="https://linear.app/fastboy/document/customer-management-5a2f35d3c8fc">Customer Management</document>
8. **Một số lưu ý**

- Luồng apply Cash Back cho order và sử dụng số dư Cash Back vào order là khác nhau
- Khi chọn Reward: chỉ được chọn apply 1 trong 2 option - Reward hoặc Cash Back, không apply cùng lúc cả 2 options
- Sau khi Complete order:
  - Available Store Credit bị trừ đi khoản Amount đã được sử dụng trong order trước đó
  - Available Store Credit sẽ được cộng thêm tiền theo % cashback nếu có setting
  - Point: vẫn sẽ được cộng theo Total Order đã complete (đổi điểm theo setting của tiệm, vd $1 = 1 point)

---

_Source: Google Docs — "Cashback" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Sell Gift Card

_Linear doc: https://linear.app/fastboy/document/sell-gift-card-812b56914491_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **1. Mục tiêu**

- Gift Card là sản phẩm prepaid của tiệm, cho phép:
- Khách mua để tặng người khác
- Hoặc mua để sử dụng sau
- Gift Card là tiền trả trước, chỉ khi khách dùng Gift Card để thanh toán thì hệ thống mới ghi nhận đó là doanh thu.
- Có nhiều cách để add balance cho gift card:
- Page Admin quản lý gift card của Fastboy (dành cho Fastboy support)
- POS: tạo order, chọn sản phẩm là Gift Card, sau đó nhập số tiền muốn add cho gift card, hay còn gọi là:
  - Buy New Gift Card: đối với gift card có status - Not sold yet (sau khi complete order bán giftcard thì status auto update qua Active)
  - Add Fund: đối với gift card có status - Active

# **2. Cách bán Gift Card**

- Gift Card được hiển thị là một Category riêng trong POS - **Gift Card**
- Sau khi Fastboy bán Gift Card cho chủ tiệm, kiểm tra tại CRM: [https://develop.gci-sell-gift-card-admin-web.pages.dev/fastboy-merchant/gift-cards](https://develop.gci-sell-gift-card-admin-web.pages.dev/fastboy-merchant/gift-cards)
- Tiệm sẽ có 1 list Gift Card Code / Physical card tương ứng, với những status của Gift card như sau:
  - Not sold yet: Gift card mới hoàn toàn, chưa đc bán cho customer, balance có thể >= 0
  - Active: Gift card đã bán cho customer và đang có balance > 0
  - Used up: Gift card đã bán cho customer và đang có balance = 0
  - Inactive: Gift card đã bán cho customer và đã bị inactive, không cho phép sử dụng hay check balance

1. **Flow sell gift card tại POS, Cashier:**
   - Create order
   - Chọn category Gift Card
   - Nhập gift card code hoặc scan Code / QR code trên physical card
   - Nhập giá trị của gift card: nhập tự do (custom amount)
   - Có thể áp dụng: Bonus / Discount
   - Sau đó hệ thống tính toán ra Gift Card Balance
2. **Thanh toán khi bán Gift Card**

- Gift Card được bán như một sản phẩn trong order bình thường
- Thanh toán bằng các payment method hiện có (Cash / Card / Gift Card / Other.)
- Doanh thu được ghi nhận tại thời điểm Gift Card được sử dụng - Redeeem (Gift Card được xem là sản phẩm, không phải payment lúc này)

3. **Một số lưu ý:**
   - Gift Card không gắn với customer, là Gift Card chung của tiệm (gắn với WhmcsID)
   - Khi bán GC, thì GC sẽ gắn với Store, không cần chọn Staff (tương tự Product)
   - Ai có code đều có thể sử dụng
   - Gift Card đang không giới hạn số lượng kí tự

# **3. Giao diện trên POS**

- Tại màn hình create order, chọn categoy - Gift Card, sẽ hiển thị Sell Gift Card dialog, với những thông tin như sau:
  - Title: Sell Gift Card
  - Content: Sell Physical Gift Card
  - CARD NUMBER: 2 options,
    - Input gift card code
    - Sử dụng option Scan
    - Sau khi nhập valid gift card, sẽ hiển thị thông tin current balance của gift card đó:
      - Balance: $10.00
      - Button: Balance Detai, click sẽ show thông tin Check Gift Card nếu là flow Add Fund, gồm:
        - Balance: current balance
        - Status
        - Gift Card History: Date / Order ID / Amount / Balance
  - GIFT CARD VALUE: field nhập số tiền để add fund vào gift card, là số tiền customer phải thanh toán cho giftcard
    - Quick option: $25 / $50 / $100
    - Custom: max $10.000,00
    - Discount/Bonus option:
      - Bonus: hình thức tặng thêm, tăng balance sử dụng khi mua giftcard
        - Theo %
        - Theo $
      - Discount: giảm số tiền thanh toán giftcard
        - Theo %
        - Theo $
    - GIFT CARD BALANCE: số tiền cuối cùng sẽ được add vào gift card, bằng \[GIFT CARD VALUE + Bonus\]
  - Button: Add, click để add vào order

!\[\]\[image22\]  
!\[\]\[image23\]

- Trong oder detail sẽ hiện thị như sau:
  - Service Name: Gift Card \[giftcard code\]
  - Price: GIFT CARD VALUE
  - Thông tin Bonus / Discount

!\[\]\[image24\]

**Một số lưu ý:**

- Một gift card chỉ được tồn tại trong 1 oder đang processing
- Có thể update GIFT CARD VALUE, Bonus/Discount
- Gift card sau khi bán thành công sẽ cộng tiền vào những report tương ứng tại field Gift Card Sale

Note: Tham khảo UI theo design mới: [https://www.figma.com/design/VrTGyRCkK1jBuWZ21Qcs8a/GO-POS-WEB---VER-2025---MAIN?node-id=15697-188640&t=xXWzj4gmDXjiUhVm-0](https://www.figma.com/design/VrTGyRCkK1jBuWZ21Qcs8a/GO-POS-WEB---VER-2025---MAIN?node-id=15697-188640&t=xXWzj4gmDXjiUhVm-0)

---

_Source: Google Docs — "Sell Gift Card" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Batches

_Linear doc: https://linear.app/fastboy/document/batches-1ad99f112d7a_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **POS – Batch History (Payment-based)**

## **1. Mục đích**

- Batch History trên POS được xây dựng để chủ tiệm:
  - Xem open / closed batch
  - Thực hiện đối soát cuối ngày
  - Tra soát khi có sai lệch payment
  - Kiểm tra dòng tiền sẽ được Deposit về tài khoản sau khi batch close
- Batch History KHÔNG dùng order làm đơn vị hiển thị, mà dựa hoàn toàn trên payment, show tương tự như Batch Close Report của Fastboy Portal

## **2. Định nghĩa Batch**

- Một Batch được xác định bởi:
  - Batch Date
  - Batch Number
  - Batch Status: Batch chỉ có 2 trạng thái:
    - Open: Batch chưa được đóng
    - Close: Batch đã được đóng, tiền sẽ được chuyển vào tài khoản của chủ tiệm trong vòng 1-3 ngày làm việc sau khi batch close.
- Batch được gom theo Batch Number, mỗi batch chứa nhiều payment
- Batch được hiển thị nếu: Có ít nhất 1 payment
- Batch không có payment → không hiển thị

## **3. Dữ liệu hiển thị trên Batch History (Summary level)**

- Danh sách Batch hiển thị theo Batch Date, mỗi batch date là 1 record.
- **Các field hiển thị:**
  - Filter: Batch Date
  - **Batch Date**
  - **Batch Number**
  - **Batch Status (Open / Close): open batch luôn được hiển thị trên cùng**
  - **Total Payment (số lượng payment trong batch)**
  - **Total Amount (tổng tiền của các payment)**
  - **Thứ tự hiển thị: Batch Date: DESC (mới nhất trước)**
- Lưu ý:
  - Open Batch thì không có Batch Date

!\[\]\[image15\]

## **4. Support xem list order của những payment đã được Batch Close (Status - Closed)**

- **Amount hyperlink: click sẽ show được list order có chứa những payment đã đã batch closse, gồm những thông tin:**
  - **Batch Close Review - Batch Date**
  - Order list gồm:
    - **OD code - hyperlink: click sẽ mở dialog order history detail (view only)**
    - **Subtotal**
    - **Tip**
    - **Total**

## !\[\]\[image16\]

---

_Source: Google Docs — "Batches" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Batch History

_Linear doc: https://linear.app/fastboy/document/batch-history-6fff79aa14da_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **POS – Batch History (Payment-based)**

## **1. Mục đích**

- Batch History trên POS được xây dựng để chủ tiệm:
  - Xem open/closed batch
  - Thực hiện đối soát cuối ngày
  - Tra soát khi có sai lệch payment
  - Kiểm tra dòng tiền sẽ được Deposit về tài khoản sau khi batch close
- Batch History KHÔNG dùng order làm đơn vị hiển thị, mà dựa hoàn toàn trên payment, show tương tự như Batch Close Report của Fastboy Portal

## **2. Định nghĩa Batch**

- Một Batch được xác định bởi:
  - Batch Date
  - Batch Number
  - Batch Status: Batch chỉ có 2 trạng thái:
    - Open: Batch chưa được đóng
    - Close: Batch đã được đóng, tiền sẽ được chuyển vào tài khoản của chủ tiệm trong vòng 1-3 ngày làm việc sau khi batch close.
- Batch được gom theo Batch Number, mỗi batch chứa nhiều payment
- Batch được hiển thị nếu: Có ít nhất 1 payment
- Batch không có payment → không hiển thị

## **3. Dữ liệu hiển thị trên Batch History (Summary level)**

- Danh sách Batch hiển thị theo Batch Date, mỗi batch date là 1 record.
- **Các field hiển thị:**
  - Filter: Batch Date
  - **Batch Date**
  - **Batch Number**
  - **Batch Status (Open / Close): open batch luôn được hiển thị trên cùng**
  - **Total Payment (số lượng payment trong batch)**
  - **Total Amount (tổng tiền của các payment)**
  - **Thứ tự hiển thị: Batch Date: DESC (mới nhất trước)**
- Lưu ý:
  - Open Batch thì không có Batch Date

!\[\]\[image3\]

## **4. Support xem list order của những payment đã được Batch Close (Status - Closed)**

- **Amount hyperlink: click sẽ show được list order có chứa những payment đã đã batch closse, gồm những thông tin:**
  - **Batch Close Review - Batch Date**
  - Order list gồm:
    - **OD code - hyperlink: click sẽ mở dialog order history detail (view only)**
    - **Subtotal**
    - **Tip**
    - **Total**

## !\[\]\[image4\]

---

_Source: Google Docs — "Batch History" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Income Report

_Linear doc: https://linear.app/fastboy/document/income-report-cd80210c48f3_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **\[PORTAL\] POS Income**

Define specs: [https://docs.google.com/spreadsheets/d/1JdMe04AtlnYSBC4XybIGmTBHCU6_C5MJAJruTq2jSNw/edit?gid=1697565846#gid=1697565846](https://docs.google.com/spreadsheets/d/1JdMe04AtlnYSBC4XybIGmTBHCU6_C5MJAJruTq2jSNw/edit?gid=1697565846#gid=1697565846)

## **Daily Sale Report**

- **Daily Sale Report Chart**
  - **Orders**
    - Tooltip: _Total number of order, refunds, and manual refunds._
  - **Sale** = total sale/refund/partial refund và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard)
    - Tooltip: _Total sale amount of the order, including refund/partial refund values after discount is applied, excluding Tax and Tip._
  - **Total Tips** = total Tip (không tính order Cancel)
    - Tooltip: _Total tips received, not included in sales revenue but counted in collected amounts._
  - **Total Payment**
    - Tooltip: _The final revenue includes Gift Card Redemption._
- **Daily Sale Report detail:**

  Note: với Order Refund/Partial Refund
  - Sale/Refund = total amount refund của order (số âm)
  - Tax = total tax của tất cả order refund
  - Tip = Tip (Total tip của order refund) (số âm)
  - Total = Sale - Discount + Tip (số âm)

```
 List Order Detail
```

- Order #: orderCode
- Sale: total amount service sale/refund trên order sau Discount
- Tax = Tax trên order
- Tip = Tip (Total tip trên order)
- Total = Total Sale + Tip + Tax  
  —  
  **INCOME DETAIL**
- Sale = Total Sale/Refund amount sau Discount
- Tip = Total tip
- Tax Collected = total Tax
- **Total Payment = Sale + Tip + Tax Collected**  
  **—**  
  **PAYMENT DETAIL**
- Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card )
- Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash)
- Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others)
- **Amount Collected = Card + Cash + Others**
- Gift Card Redemption: Total gift card redemption
- **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

**—------------------------------------------------------------------------------------------------**

## **Income Summary**

- **Income Summary chart**
  - **Filter**: date range và chọn xem data bên dưới theo Day or Week
  - **Total Income:** theo thời gian đã chọn và luôn luôn compare với khoảng thời gian đó trước đó
    - Total Income chart: theo 3 thông số
      - **Gross Income**: Total amount of sales before refunds. Does not include tips and gift card loads and activations
      - **Net Income**: Total sale amount sau khi refund/partial refund và không tính Tip, không tính order Cancel, không tính sale giftcard
      - **Total Tip**
  - Total Income table:
    - **Date**
    - **Sale:** total sale/refund/partial refund và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard) trên tất cả order của ngày xem report.
    - **Tip**
    - **Net Income**: total sale amount sau khi refund/partial refund và không tính Tip, không tính order Cancel, không tính sale giftcard
    - **Total Payment:** The final revenue includes Gift Card Redemption.
- **Income Summary detail**

  **PAYMENT DETAILS**
  - Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card + Total tip by card + Total tax Card)
    - Sale: Total Sale Card
    - Refund: Total Refund Card
    - Tip: Total tip by card
    - Tax: Total tax by card
  - Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash + Total tip by Cash + Total tax Cash)
    - Sale: Total Sale Cash
    - Refund: Total Refund Cash
    - Tip: Total tip by Cash
    - Tax: Total tax by cash
  - Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others + Total tip Others + Total tax Others)
    - Sale: Total Sale Others
    - Refund: Total Refund Others
    - Tip: Total tip by Others
    - Tax: Total tax by Others
  - **Amount Collected = Card + Cash + Others**
  - Gift Card Redemption: Total gift card redemption (Payments covered by previously sold gift cards)
    - Sale: Total Sale by gift card
    - Tip: Total tip by gift card
    - Tax: Total tax by gift card
  - **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

    **—**

  **SALE DETAILS**
  - **Total Sale = Gift card Sale + Service Sale + Product Sale**
    - Service Sale: total amount bán Service
    - Product Sale: total amount bán Product
    - Gift card Sale: total amount bán Giftcard (Add Fund cho giftcard khi create order)
  - **Total Refund = Service Refund + Product Refund**
    - Service Refund
    - Product Refund
  - **Subtotal = Total Sale - Total Refund**
  - Discount = Discount - Discount Reversed
    - _Discount: All discounts: promotions, service discounts, loyalty rewards_
    - _Discount Reversed (The discount was taken back due to a refund) (Số tiền discount trong payment refund, sẽ được trừ trả lại)_
  - **Net Total = Subtotal Discount**
  - Tip = total tip của tất cả các hình thức thanh toán
  - Tax Collected = total tax của tất cả các hình thức thanh toán
  - **TOTAL PAYMENT = Net Total + Tax +Tip**

    **—**

  **SUPPLY FEE**
  - Total Supply Fee: Total Supply fee theo từng Service, được setting trong Service detail
  - Staff Supply Share = Total Supply Fee \* 0.6
    - _Supply fee của service mà staff chia với chủ tiệm, phần trăm theo setting trong Staff Compensation, vd: setting Staff 60% - Owner 40%_
  - Salon Supply Share = Total Supply Fee - Staff Supply Share
    - _Supply fee của service mà chủ tiệm chịu chung với staff, phần trăm theo setting trong Staff Compensation,_ vd: setting Staff 60% - Owner 40%

    —

  **STAFF PAYOUT**
  - Total Service = (Service Sale - Service Refund)
  - Staff Supply Share (incl. Sale & Refund)
  - **Staff Commission (60%) = (Total Service x 60%) - Staff Supply Share**
    - _Staff Commission (60%): dựa trên setting Commission của từng staff, nếu staff chỉ setting Salary thì chỗ này bằng 0._ Vd: setting Staff 60% - Owner 40%
  - Tip = total tip
  - Clean up fee: _số $ setting Deduction Per Day trong staff và nhân lên theo số ngày đã làm việc của staff tới thời điểm xem report (phí dọn dẹp)_
  - **Staff Salary: lương cứng của staff, theo setting**
  - **TOTAL STAFF PAYOUT = Staff Commission (60%) + Tip - Clean up fee + Staff Salary**
    - Pay 1 (Staff Commission x 30% - Clean up fee)
    - Pay 2 (Staff Commission x 70% + Tip)
      - _Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

    —

  **SALON EARNINGS**
  - Total Service = (Service Sale - Service Refund)
  - Salon Supply Share (incl. Sale & Refund)
  - **Salon Commission (40%) = (Total Service x 40%) - Salon Supply Share**
  - Product Sale
  - Product Refund
  - Total Discount = Discount - Discount Reversed
    - _Discount_
    - _Discount Reversed_
  - **Net Earnings = Salon Commission (40%) + Product Sale - Product Refund - Total Discount**
  - Staff Supply Share
  - Clean up fee
  - **Staff Salary**
  - **TOTAL EARNING = Net Earnings + Staff Supply Share (60%) + Clean up fee - Staff Salary**
    - _Vì số tiền cho Supply fee của service chủ tiệm đã bỏ ra rồi, thì sau khi tổng kết lại tổng số tiền chủ tiệm thu được sẽ gồm Supply fee service mà staff chia 1 phần và trả cho chủ tiệm_
  - Tax Collected: total tax

—---------------------------------------------------------------------------------

## **Staff Income**

- Staff listing: gồm những thông tin sau:
  - Search: Staff Nickname
  - Filter: ngày xem report
  - Data table: gồm những column
    - Staff: show staff nickname
    - Orders: tổng số lượng order của staff
    - Subtotal = Sale - Refund
    - Supply Fee
    - Tip
    - Total Income
- Staff Income detail theo từng staff và theo từng setting Compensation của staff đó:

1. **STAFF INCOME - Commission**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date:
       - Xem theo 1 ngày:
         - Date: 04/15/2025
       - Xem theo range:
         - Date: 04/15/2025 - 04/30/2025
         - No. of WD: 8 days
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Supply: total supply trên tất cả sevice trên order
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Supply Fee (incl. Sale & Refund)
     - **Staff Commission = (Subtotal - Supply fee) x 60%**
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Staff Commission - Clean up fee + Tip**
2. **STAFF INCOME (1 day) - Salary / Commission + Salary**  
   **Pay by Hour/Day/Period**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date: 04/15/2025
     - Clock In: 9:00:00 AM
     - Clock Out: 5:00:00 PM
     - Working Hours: 8
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Rate: số được setting trong staff Compensation - Salary
       - Nếu là Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì Gross Income mới show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó. VD:
         - Pay Period: 1 week
         - Salary by Period = $7000
         - Xem report cho 3 ngày
         - Rate = $1000
         - Gross Income = $1000 \* 3 = $3000
       - Wage Per Hour: lương 1h
       - Wage Per Day: lương 1 ngày
     - Gross Income: \[số ngày/giờ làm việc\] x \[rate\]
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Gross Income + Clean Up Fee + Tip**  
       (Hourly Pay - Clean up fee + Tip)

**Một số lưu ý:**

- Salary by Period: trả lương theo kì payroll
- Wage Per Hour: trả lương theo giờ, cần Checkin - Checkout để count được số giờ làm việc.
- Wage Per Day: trả lương theo ngày, cần Checkin để count được số ngày có đến tiệm làm việc.
- Staff Income chỉ là report dự trù số tiền Staff sẽ được nhận, con số chính xác vẫn là trong Payroll khi chốt kì lương.
- Nếu Staff đang có setting **Salary** hoặc **Commission + Salary,** thì trên Staff Income luôn show cả 2 phần cho cả Commission và Salary, nhưng Total Income sẽ show phần Salary. Vì chỗ này còn phụ thuộc vào setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary

---

_Source: Google Docs — "Income Report" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Income Version 1 (legacy)

_Linear doc: https://linear.app/fastboy/document/income-version-1-legacy-22a0cc2660e0_

> ⚠️ **Legacy** — đã được thay thế bởi <document id="c868dd0f-ef6e-4822-96c1-c826cad6663f" href="https://linear.app/fastboy/document/income-version-2-94d2aa985225">Income Version 2</document>. Giữ để tham khảo lịch sử, không cập nhật tiếp.

# **\[Volt POS\] POS Income**

Define specs: [https://docs.google.com/spreadsheets/d/1JdMe04AtlnYSBC4XybIGmTBHCU6_C5MJAJruTq2jSNw/edit?gid=1697565846#gid=1697565846](https://docs.google.com/spreadsheets/d/1JdMe04AtlnYSBC4XybIGmTBHCU6_C5MJAJruTq2jSNw/edit?gid=1697565846#gid=1697565846)

## **Daily Sale Report**

Update giao diện, thêm một số thông tin show trong chart: <document id="e9f55c9f-6a4e-4931-aea7-e018a1b168cf" href="https://linear.app/fastboy/document/business-snapshot-ac4f3735e3c2">Business Snapshot</document>

- **Daily Sale Report Chart**
  - **Orders**
    - Tooltip: _Total number of order, excluding cancel/refunds/ manual refunds._
  - **Sale** = total sale/refund/partial refund và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard)
    - Tooltip: _Total sale amount of the order, including refund/partial refund values after discount is applied, excluding Tax and Tip._
  - **Total Tips** = total Tip (không tính order Cancel)
    - Tooltip: _Total tips received, not included in sales revenue but counted in collected amounts._
  - **Total Payment**
    - Tooltip: _The final revenue includes Gift Card Redemption._  
      _—_
  - **Filter:**
    - Default: Today
    - Cho phép xem theo từng ngày được chọn
- **Daily Sale Report detail:**

```
 List Order Detail
```

- Order #: orderCode
- Sale: total amount service sale/refund trên order sau Discount
- Tax = Tax trên order
- Tip = Tip (Total tip trên order)
- Total = Total Sale + Tip + Tax  
  —  
  **INCOME DETAIL**
- Sale = Total Sale/Refund amount sau Discount
- Tip = Total tip
- Tax Collected = total Tax
- **Total Payment = Sale + Tip + Tax Collected**  
  **—**  
  **PAYMENT DETAIL**
- Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card )
- Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash)
- Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others)
- **Amount Collected = Card + Cash + Others**
- Gift Card Redemption: Total gift card redemption
- **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

**—------------------------------------------------------------------------------------------------**

## **Income Summary**

- **Income Summary chart**
  - **Filter**: date range và chọn xem data bên dưới theo Day/Week/Month
    - Default: Day - Today
    - Chọn Day: show list report cho từng ngày theo date range được chọn, 1 day là 1 record
    - Chọn Week:
      - Show list report theo week của năm hiện tại, show đến week hiện tại. Một week là 1 record
      - Filter date show: 2026
      - Nếu chọn năm trong quá khứ (2025), thì show list report theo tất cả week của năm đó.
    - Chọn Month:
      - Show list report theo tháng của năm hiện tại, show đến tháng hiện tại. Một tháng là 1 record.
      - Nếu chọn năm trong quá khứ thì show đủ 12 tháng
  - **Total Income:** Total Net Income, theo thời gian đã chọn và luôn luôn compare với khoảng thời gian đó trước đó
    - Total Income chart: theo 3 thông số
      - **Gross Income**: Total amount of sales before refunds. Does not include tips, tax and gift card loads and activations
      - **Net Income**: Total sale amount sau khi refund/partial refund và không tính Tip, tax, không tính ord
      - er Cancel, không tính sale giftcard
      - **Total Tip**
  - **Total Income table:**
    - **Date**
    - **Sale**: total sale/refund/partial refund và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard) trên tất cả order của ngày xem report.
    - **Tip**
    - **Tax**
    - ~~Net Income: total sale amount sau khi refund/partial refund và không tính Tip, không tính order Cancel, không tính sale giftcard~~
    - **Total Payment**: (Sale + Tip + Tax) The final revenue includes Gift Card Redemption.
  -
- **Income Summary detail**

  **PAYMENT DETAILS**
  - Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card + Total tip by card + Total tax Card)
    - Sale: Total Sale Card
    - Refund: Total Refund Card
    - Tip: Total tip by card
    - Tax: Total tax by card
  - Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash + Total tip by Cash + Total tax Cash)
    - Sale: Total Sale Cash
    - Refund: Total Refund Cash
    - Tip: Total tip by Cash
    - Tax: Total tax by cash
  - Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others + Total tip Others + Total tax Others)
    - Sale: Total Sale Others
    - Refund: Total Refund Others
    - Tip: Total tip by Others
    - Tax: Total tax by Others
  - **Amount Collected = Card + Cash + Others**
  - Gift Card Redemption: Total gift card redemption (Payments covered by previously sold gift cards)
    - Sale: Total Sale by gift card
    - Tip: Total tip by gift card
    - Tax: Total tax by gift card
  - **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

    **—**

  **SALE DETAILS**
  - **Total Sale = Gift card Sale + Service Sale + Product Sale**
    - Service Sale: total amount bán Service
    - Product Sale: total amount bán Product
    - Gift card Sale: total amount bán Giftcard (Add Fund cho giftcard khi create order)
  - **Total Refund = Service Refund + Product Refund**
    - Service Refund
    - Product Refund
  - **Subtotal = Total Sale - Total Refund**
  - Discount = Discount - Discount Reversed
    - _Discount: All discounts: promotions, service discounts, loyalty rewards_
    - _Discount Reversed (The discount was taken back due to a refund) (Số tiền discount trong payment refund, sẽ được trừ trả lại)_
  - **Net Total = Subtotal - Discount**
  - Tip = total tip của tất cả các hình thức thanh toán
  - Tax Collected = total tax của tất cả các hình thức thanh toán
  - **TOTAL PAYMENT = Net Total + Tax +Tip**

    **—**

  **SUPPLY FEE**
  - Total Supply Fee: Total Supply fee theo từng Service, được setting trong Service detail
  - Staff Supply Share = Total Supply Fee \* 0.6
    - _Supply fee của service mà staff chia với chủ tiệm, phần trăm theo setting trong Staff Commission Setting - For Service, vd: setting Staff 60% - Owner 40%_
  - Salon Supply Share = Total Supply Fee - Staff Supply Share
    - _Supply fee của service mà chủ tiệm chịu chung với staff, phần trăm theo setting trong Staff Commission Setting - For Service,_ vd: setting Staff 60% - Owner 40%

    —

  **STAFF PAYOUT**
  - Total Service = (Service Sale - Service Refund)
  - Staff Supply Share (incl. Sale & Refund)
  - **Staff Commission (60%) = (Total Service x 60%) - Staff Supply Share**
    - _Staff Commission (60%): dựa trên setting Commission Setting - For Service của từng staff, nếu staff chỉ setting Salary thì chỗ này bằng 0._ Vd: setting Staff 60% - Owner 40%
  - Tip = total tip
  - Clean up fee: _số $ setting Deduction Per Day trong staff và nhân lên theo số ngày đã làm việc của staff tới thời điểm xem report (phí dọn dẹp)_
  - **Staff Salary:** lương cứng của staff, theo setting, được cộng dồn theo tổng số staff tính lương theo Salary trên tổng số ngày xem report, theo rule như sau:
  - Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì **Staff Salary** show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó.
    - VD:
      - Pay Period: 1 week
      - Salary by Period = $7000
      - Xem report cho 3 ngày
      - Rate = $1000
      - **Staff Salary = $1000 \* 3 = $3000**
  - Wage Per Hour: lương 1h
    - **Staff Salary = \[Lương 1h \* số giờ\]**
  - Wage Per Day: lương 1 ngày
    - **Staff Salary = \[Lương 1 ngày \* số ngày\]**

      **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.

  - **TOTAL STAFF PAYOUT = Staff Commission (60%) + Tip - Clean up fee + Staff Salary**
    - Pay 1 (Staff Commission x 30% - Clean up fee)
    - Pay 2 (Staff Commission x 70% + Tip)
      - _Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

    _Lưu ý: phần STAFF PAYOUT, show Commision hay Salary:_

- _Nếu như xem report cho thời gian chưa được chốt kì lương, thì sẽ lấy số lớn hơn để tính Income Summary (lúc này có thể hiểu là nó đang estimate)_
- _Còn khi đã chốt kì lương, thì update lại bằng con số chính xác_

  —

  **SALON EARNINGS**
  - Total Service = (Service Sale - Service Refund)
  - Salon Supply Share (incl. Sale & Refund)
  - **Salon Commission (40%) = (Total Service x 40%) - Salon Supply Share**
    - **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn để tính thông số này trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.
  - Product Sale
  - Product Refund
  - Total Discount = Discount - Discount Reversed
    - _Discount_
    - _Discount Reversed_
  - **Net Earnings = Salon Commission (40%) + Product Sale - Product Refund - Total Discount**
  - Staff Supply Share
  - Clean up fee
  - **Staff Salary:** lương cứng của staff, theo setting, được cộng dồn theo tổng số staff tính lương theo Salary trên tổng số ngày xem report, theo rule như sau:
    - Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì **Staff Salary** mới show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó.
      - VD:
        - Pay Period: 1 week
        - Salary by Period = $7000
        - Xem report cho 3 ngày
        - Rate = $1000
        - **Staff Salary = $1000 \* 3 = $3000**
    - Wage Per Hour: lương 1h
      - **Staff Salary = \[Lương 1h \* số giờ\]**
    - Wage Per Day: lương 1 ngày
      - **Staff Salary = \[Lương 1 ngày \* số ngày\]**

        **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.

  - **TOTAL EARNING = Net Earnings + Staff Supply Share (60%) + Clean up fee - Staff Salary**
    - _Vì số tiền cho Supply fee của service chủ tiệm đã bỏ ra rồi, thì sau khi tổng kết lại tổng số tiền chủ tiệm thu được sẽ gồm Supply fee service mà staff chia 1 phần và trả cho chủ tiệm_
  - Tax Collected: total tax

—---------------------------------------------------------------------------------

## **Staff Income**

- Staff listing: gồm những thông tin sau:
  - Search: Staff Nickname
  - Filter: ngày xem report
  - Data table: gồm những column
    - Staff: show staff nickname
    - Orders: tổng số lượng order của staff
    - Subtotal = Sale - Refund
    - Supply Fee
    - Tip
    - Total Income
- Staff Income detail theo từng staff và theo từng setting Compensation của staff đó:

1. **STAFF INCOME - Commission**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date:
       - Xem theo 1 ngày:
         - Date: 04/15/2025
       - Xem theo range:
         - Date: 04/15/2025 - 04/30/2025
         - No. of WD: 8 days
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Supply: total supply trên tất cả sevice trên order
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Supply Fee (incl. Sale & Refund)
     - **Staff Commission = (Subtotal - Supply fee) x 60%**
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Staff Commission - Clean up fee + Tip**
2. **STAFF INCOME (1 day) - Salary / Commission + Salary**  
   **Pay by Hour/Day/Period**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date: 04/15/2025
     - Clock In: 9:00:00 AM
     - Clock Out: 5:00:00 PM
     - Working Hours: 8
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Rate: số được setting trong staff Compensation - Salary
       - Nếu là Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì Gross Income mới show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó. VD:
         - Pay Period: 1 week
         - Salary by Period = $7000
         - Xem report cho 3 ngày
         - Rate = $1000
         - Gross Income = $1000 \* 3 = $3000
       - Wage Per Hour: lương 1h
       - Wage Per Day: lương 1 ngày
     - Gross Income: \[số ngày/giờ làm việc\] x \[rate\]
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Gross Income + Clean Up Fee + Tip**  
       (Hourly Pay - Clean up fee + Tip)

**Một số lưu ý:**

- Salary by Period: trả lương theo kì payroll
- Wage Per Hour: trả lương theo giờ, cần Checkin - Checkout để count được số giờ làm việc.
- Wage Per Day: trả lương theo ngày, cần Checkin để count được số ngày có đến tiệm làm việc.
- Staff Income chỉ là report dự trù số tiền Staff sẽ được nhận, con số chính xác vẫn là trong Payroll khi chốt kì lương.
- Nếu Staff đang có setting **Salary** hoặc **Commission + Salary,** thì trên Staff Income luôn show cả 2 phần cho cả Commission và Salary, nhưng Total Income sẽ show phần Salary. Vì chỗ này còn phụ thuộc vào setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary

—----------------------------------------------------------------------------

## **Staff Payroll**

Staff Income detail theo từng staff: theo 2 setting Commission và Salary

1. **STAFF PAYROLL - Commission**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
  - Working Days: 8 days
- **Order listing**
  - Date
  - Sale: total amount order sale trong ngày
  - Refund: total amount order refund trong ngày (số âm)
  - Supply: total supply trên tất cả sevice trong order trong ngày
  - Tip: total tip của tất cả order trong ngày
- **Staff Income Detail**
  - Sale = total Sale
  - Refund = total refund
  - **Subtotal = Total (Sale - Refund)**
  - Supply Fee (incl. Sale & Refund) = Total Supply
  - **Staff Commission = (Subtotal - Supply fee) x 60%**
  - Clean Up Fee: số $ setting trong staff và nhân lên theo số ngày xem report
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - Tip = Total Tip
  - **TOTAL INCOME = Staff Commission - Clean up fee + Tip**
    - Pay 1 (Staff Commission x 30% - Clean up fee)
    - Pay 2 (Staff Commission x 70% + Tip)
      - _Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

2. **STAFF PAYROLL - Salary**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
- **Staff Payroll Detail**
  - Working Days: tổng số ngày làm việc
  - Working Hours: tổng số giờ làm việc
  - **Salary Amount: tổng số lương phải trả**
    - Salary by Period: ghi nhận con số được setting trong Employee Compensation/Salary by Period
    - **Wage Per Day:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Days\]
    - **Wage Per Hour:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Hour\]
  - Deduction/Clean up fee: số $ setting trong staff và nhân lên theo số ngày tính lương
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - **Tip** = Total Tip
  - **TOTAL INCOME = Salary Amount - Clean up fee + Tip**  
    **(Salary - Clean up fee + Tip))**
    - Pay 1 (Salary x 30% - Clean up fee)
    - Pay 2 (Salary x 70% + Tip)
      - Salary _x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

**Một số lưu ý:**

- Nếu staff đang được setting theo Commission + Salary: thì tùy thuộc vào staff đó có setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary
- Phần Tip sẽ được cộng vào hoặc trừ ra tùy thuộc vào setting **Exclude Tips From Cash/Check Income** của mỗi staff đang enable hay disable

---

_Source: Google Docs — "Income Version 1" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Income Version 2

_Linear doc: https://linear.app/fastboy/document/income-version-2-94d2aa985225_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **POS Income Version 2 - Bao gồm: Card Charge % – Discount Charge**

Define specs: [https://docs.google.com/spreadsheets/d/1NtBfxEsGjaijFWn7rlzR79sLzmeHTAjNqMDatAnY0wo/edit?gid=1736528834#gid=1736528834](https://docs.google.com/spreadsheets/d/1NtBfxEsGjaijFWn7rlzR79sLzmeHTAjNqMDatAnY0wo/edit?gid=1736528834#gid=1736528834)

## **Daily Sale Report**

Update giao diện, thêm một số thông tin show trong chart: [Business Snapshot](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit?pli=1&tab=t.wgdnihz0qr1u)

- **Daily Sale Report Chart**
  - **Orders**
    - Tooltip: _Total number of order, excluding cancel/refunds/ manual refunds._
  - **Sale** = total sale/refund/partial refund sau Discount và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard)
    - Tooltip: _Total sale amount of the order, including refund/partial refund values after discount is applied, excluding Tax and Tip._
  - **Total Tips** = total Tip (không tính order Cancel)
    - Tooltip: _Total tips received, not included in sales revenue but counted in collected amounts._
  - **Total Payment**
    - Tooltip: _The final revenue includes Gift Card Redemption._  
      _—_
  - **Filter:**
    - Default: Today
    - Cho phép xem theo từng ngày được chọn
- **Daily Sale Report detail:**

```
 List Order Detail
```

- Order #: orderCode
- Sale: total amount service sale/refund trên order sau Discount
- Tax = Tax trên order
- Tip = Tip (Total tip trên order)
- Total = Total Sale + Tip + Tax  
  —  
  **INCOME DETAIL**
- Sale = Total Sale/Refund amount sau Discount
- Tip = Total tip
- Tax Collected = total Tax
- **Total Payment = Sale + Tip + Tax Collected**  
  **—**  
  **PAYMENT DETAIL**
- Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card )
- Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash)
- Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others)
- **Amount Collected = Card + Cash + Others**
- Gift Card Redemption: Total gift card redemption
- **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

**—------------------------------------------------------------------------------------------------**

## **Income Summary**

- **Income Summary chart**
  - **Filter**: date range và chọn xem data bên dưới theo Day/Week/Month
    - Default: Day - Today
    - Chọn Day: show list report cho từng ngày theo date range được chọn, 1 day là 1 record
    - Chọn Week:
      - Show list report theo week của năm hiện tại, show đến week hiện tại. Một week là 1 record
      - Filter date show: 2026
      - Nếu chọn năm trong quá khứ (2025), thì show list report theo tất cả week của năm đó.
    - Chọn Month:
      - Show list report theo tháng của năm hiện tại, show đến tháng hiện tại. Một tháng là 1 record.
      - Nếu chọn năm trong quá khứ thì show đủ 12 tháng
  - **Total Income:** Total Net Income, theo thời gian đã chọn và luôn luôn compare với khoảng thời gian đó trước đó
    - Total Income chart: theo 3 thông số
      - **Gross Income**: Total amount of sales, sau discount và trước refunds. Does not include tips, tax and gift card loads and activations
        - _Note: gift card loads - là tiền được nạp vào GiftCard, không được cộng vào report của POS._
      - **Net Income**: Total sale amount sau discount, sau refund/partial refund và không tính Tip, tax, không tính order Cancel, không tính gift card loads and activations.
      - **Total Tip**
  - **Total Income table:**
    - **Date**
    - **Sale**: total sale/refund/partial refund, sau discount và không tính Tip, Tax, không tính order Cancel (Card/Cash/Other/GiftCard) trên tất cả order của ngày xem report.
    - **Tip**
    - **Tax**
    - **Total Payment**: (Sale + Tip + Tax) The final revenue includes Gift Card Redemption.
- **Income Summary detail**

  **PAYMENT DETAILS**
  - Card = Total Sale amount by Card = (Total Sale Card - Total Refund Card + Total tip by card + Total tax Card)
    - Sale: Total Sale Card
    - Refund: Total Refund Card
    - Tip: Total tip by card
    - Tax: Total tax by card
  - Cash = Total Sale amount by Cash = (Total Sale Cash - Total Refund Cash + Total tip by Cash + Total tax Cash)
    - Sale: Total Sale Cash
    - Refund: Total Refund Cash
    - Tip: Total tip by Cash
    - Tax: Total tax by cash
  - Others = Total Sale amount by Others = (Total Sale Others - Total Refund Others + Total tip Others + Total tax Others)
    - Sale: Total Sale Others
    - Refund: Total Refund Others
    - Tip: Total tip by Others
    - Tax: Total tax by Others
  - **Amount Collected = Card + Cash + Others**
  - Gift Card Redemption: Total gift card redemption (Payments covered by previously sold gift cards)
    - Sale: Total Sale by gift card
    - Tip: Total tip by gift card
    - Tax: Total tax by gift card
  - **TOTAL PAYMENT = Amount Collected + Gift Card Redemption**

    **—**

  **SALE DETAILS**
  - **Total Sale = Gift card Sale + Service Sale + Product Sale**
    - Service Sale: total amount bán Service
    - Product Sale: total amount bán Product
    - Gift card Sale: total amount bán Giftcard (Add Fund cho giftcard khi create order)
  - **Total Refund = Service Refund + Product Refund**
    - Service Refund
    - Product Refund
  - **Subtotal = Total Sale - Total Refund**
  - Discount = Discount - Discount Reversed
    - _Discount: All discounts: promotions, service discounts, loyalty rewards_
    - _Discount Reversed (The discount was taken back due to a refund) (Số tiền discount trong payment refund, sẽ được trừ trả lại)_
  - **Net Total = Subtotal - Discount**
  - Tip = total tip của tất cả các hình thức thanh toán
  - Tax Collected = total tax của tất cả các hình thức thanh toán
  - **TOTAL PAYMENT = Net Total + Tax +Tip**

    **—**

  **SUPPLY FEE**
  - Total Supply Fee: Total Supply fee theo từng Service, được setting trong Service detail
  - Staff Supply Share = Total Supply Fee \* 0.6
    - _Supply fee của service mà staff chia với chủ tiệm, phần trăm theo setting trong Staff Commission Setting - For Service, vd: setting Staff 60% - Owner 40%_
  - Salon Supply Share = Total Supply Fee - Staff Supply Share
    - _Supply fee của service mà chủ tiệm chịu chung với staff, phần trăm theo setting trong Staff Commission Setting - For Service,_ vd: setting Staff 60% - Owner 40%

    —

  **STAFF PAYOUT**
  - Total Service = (Service Sale - Service Refund)
  - Staff Supply Share (incl. Sale & Refund)
  - **Staff Commission (60%) = (Total Service x 60%) - Staff Supply Share**
    - _Staff Commission (60%): dựa trên setting Commission Setting - For Service của từng staff, nếu staff chỉ setting Salary thì chỗ này bằng 0._ Vd: setting Staff 60% - Owner 40%
  - Tip = total tip
  - Clean up fee: _số $ setting Deduction Per Day trong staff và nhân lên theo số ngày đã làm việc của staff tới thời điểm xem report (phí dọn dẹp)_
  - Staff Discount Charge\*: Tổng số tiền promotion staff chia với chủ tiệm\*
  - Staff Card Charge - Commission: _Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Commission, được setting trong Staff Compensation - On Staff Commission_
  - _Staff Card Charge - Tip: Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Tip, được setting trong Staff Compensation - On Credit Card Tip_
  - **Staff Salary:** lương cứng của staff, theo setting, được cộng dồn theo tổng số staff tính lương theo Salary trên tổng số ngày xem report, theo rule như sau:
  - Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì **Staff Salary** show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó.
    - VD:
      - Pay Period: 1 week
      - Salary by Period = $7000
      - Xem report cho 3 ngày
      - Rate = $1000
      - **Staff Salary = $1000 \* 3 = $3000**
  - Wage Per Hour: lương 1h
    - **Staff Salary = \[Lương 1h \* số giờ\]**
  - Wage Per Day: lương 1 ngày
    - **Staff Salary = \[Lương 1 ngày \* số ngày\]**

      **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.

  - **TOTAL STAFF PAYOUT =** Staff Commission + Tips + Salary – Supply Fee – Cleanup Fee – Discount Charge - Staff Card Charge Commission - Staff Card Charge Tip
    - Pay 1 = \[\[Staff Salary + (Staff Commission – Supply Fee)\] x 30% \]\] – Clean up fee – Discount Charge - Staff Card Charge Commission - Staff Card Charge Tip)
    - Pay 2 = \[(Staff Salary + Staff Commission) x 70%\] + Tip
      - _Staff Salary / Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

    _Lưu ý: phần STAFF PAYOUT, show Commision hay Salary:_

- _Nếu như xem report cho thời gian chưa được chốt kì lương, thì sẽ lấy số lớn hơn để tính Income Summary (lúc này có thể hiểu là nó đang estimate)_
- _Còn khi đã chốt kì lương, thì update lại bằng con số chính xác_

  —

  **SALON EARNINGS**
  - Total Service = (Service Sale - Service Refund)
  - Salon Supply Share (incl. Sale & Refund)
  - **Salon Commission (40%) = (Total Service x 40%) - Salon Supply Share**
    - **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn để tính thông số này trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.
  - Product Sale
  - Product Refund
  - Total Discount = Discount - Discount Reversed
    - _Discount_
    - _Discount Reversed_
  - **Net Earnings = Salon Commission (40%) + Product Sale - Product Refund - Total Discount**
  - Staff Supply Share
  - Clean up fee
  - Staff Discount Charge\*: Tổng số tiền promotion staff chia với chủ tiệm\*
  - Staff Card Charge - Commission: _Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Commission, được setting trong Staff Compensation - On Staff Commission_
  - _Staff Card Charge - Tip: Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Tip, được setting trong Staff Compensation - On Credit Card Tip_
  - **Staff Salary:** lương cứng của staff, theo setting, được cộng dồn theo tổng số staff tính lương theo Salary trên tổng số ngày xem report, theo rule như sau:
    - Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì **Staff Salary** mới show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó.
      - VD:
        - Pay Period: 1 week
        - Salary by Period = $7000
        - Xem report cho 3 ngày
        - Rate = $1000
        - **Staff Salary = $1000 \* 3 = $3000**
    - Wage Per Hour: lương 1h
      - **Staff Salary = \[Lương 1h \* số giờ\]**
    - Wage Per Day: lương 1 ngày
      - **Staff Salary = \[Lương 1 ngày \* số ngày\]**

        **Lưu ý:** nếu staff đó đang setting theo Commission + Salary, nhưng thuộc kì lương chưa chốt, thì chọn show con số lớn hơn trong report, còn nếu đã chốt thì phải show con số được chọn để tính lương cho staff đó.

  - **TOTAL EARNING =** Net Earnings + Staff Supply Share + Cleanup Fee + Staff Discount Charge – Staff Salary + Staff Card Charge Commission + Staff Card Charge Tip
    - _Vì số tiền cho Supply fee của service chủ tiệm đã bỏ ra rồi, thì sau khi tổng kết lại tổng số tiền chủ tiệm thu được sẽ gồm (Supply fee service / phần promotion / phần khấu trừ dựa trên phí thanh toán card và tip) mà staff chia 1 phần và trả cho chủ tiệm_
  - Tax Collected: total tax

—---------------------------------------------------------------------------------

## **Staff Income**

- Staff listing: gồm những thông tin sau:
  - Search: Staff Nickname
  - Filter: ~~ngày xem report~~
    - Filter theo Payroll Period
    - Đối với kỳ lương hiện tại chưa chốt, hiển thị ở đầu danh sách: Current Period (06/15 - 06/28)
  - Data table: gồm những column
    - Staff: show staff nickname
    - Orders: tổng số lượng order của staff
    - Subtotal = Sale - Refund
    - Supply Fee
    - Tip
    - Total Income
- Staff Income detail theo từng staff và theo từng setting Compensation của staff đó:

1. **STAFF INCOME - Commission**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date:
       - Xem theo 1 ngày:
         - Date: 04/15/2025
       - Xem theo range:
         - Date: 04/15/2025 - 04/30/2025
         - No. of WD: 8 days
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Supply: total supply trên tất cả sevice trên order
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Supply Fee (incl. Sale & Refund)
     - **Staff Commission = (Subtotal - Supply fee) x 60%**
     - Discount Charge\*: Tổng số tiền promotion staff chia với chủ tiệm\*
     - Card Charge - Commission: _Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Commission, được setting trong Staff Compensation - On Staff Commission_
     - _Card Charge - Tip: Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Tip, được setting trong Staff Compensation - On Credit Card Tip_
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = (Staff Commission - Clean up fee + Tip - Card Charge Commission - Card Charge Tip – Discount Charge)**
       - Pay 1 = (Staff Commission x 30% - Clean up fee - Card Charge Commission - Card Charge Tip – Discount Charge)
       - Pay 2 = (Staff Commission x 70% + Tip)
2. **STAFF INCOME (1 day) - Salary / Commission + Salary**  
   **Pay by Hour/Day/Period**
   - **Satff Info:**
     - Staff Name: Nickname
     - Date: 04/15/2025
     - Clock In: 9:00:00 AM
     - Clock Out: 5:00:00 PM
     - Working Hours: 8
   - **Order listing**
     - Order#
     - Sale/Refund: total amount order sale/refund
     - Tip: total tip trên order
   - **Staff Income Detail**
     - Sale = total amount SALE của order
     - Refund = total amount REFUND của order
     - **Subtotal = Sale - Refund**
     - Rate: số được setting trong staff Compensation - Salary
       - Nếu là Salary by Period: lương 1 kì nhưng được chia cho số ngày trong kì đó, để nếu xem report cho số ngày nhỏ hơn 1 kì lương, thì Gross Income mới show đúng = Số ngày đang xem x số lương của 1 ngày trong kì đó. VD:
         - Pay Period: 1 week
         - Salary by Period = $7000
         - Xem report cho 3 ngày
         - Rate = $1000
         - Gross Income = $1000 \* 3 = $3000
       - Wage Per Hour: lương 1h
       - Wage Per Day: lương 1 ngày
     - Gross Income: \[số ngày/giờ làm việc\] x \[rate\]
     - Clean Up Fee/Deduction: số $ setting trong staff và nhân lên theo số ngày xem report
     - Tip = Total tip
     - **TOTAL INCOME = Gross Income + Clean Up Fee + Tip**  
       (Hourly Pay - Clean up fee + Tip)

**Một số lưu ý:**

- Salary by Period: trả lương theo kì payroll
- Wage Per Hour: trả lương theo giờ, cần Checkin - Checkout để count được số giờ làm việc.
- Wage Per Day: trả lương theo ngày, cần Checkin để count được số ngày có đến tiệm làm việc.
- Clean Up Fee/Deduction: nếu tính Salary by Period, thì tính fee trên số ngày nhận lương của kì đó
- Staff Income chỉ là report dự trù số tiền Staff sẽ được nhận, con số chính xác vẫn là trong Payroll khi chốt kì lương.
- Clock In/Clock Out:
  - Nếu xem theo 1 ngày, và chỉ có 1 ca được checkin, thì show Clock In/Clock Out cụ thể
  - Nếu xem theo 1 range date:
    - Để trống Clock In/Clock Out
    - Wage Per Hour: show tổng Working Hours
    - Wage Per Day: show tổng Working Days
    - Salary by Period: luôn để trống Clock In/Clock Out và show tổng Working Days
- Nếu Staff đang có setting **Salary** hoặc **Commission + Salary,** thì trên Staff Income luôn show cả 2 phần cho cả Commission và Salary, nhưng Total Income sẽ show phần Salary. Vì chỗ này còn phụ thuộc vào setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary

—----------------------------------------------------------------------------

## **Staff Payroll**

Staff Income detail theo từng staff: theo 2 setting Commission và Salary

1.

### **STAFF PAYROLL - Commission**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
  - Working Days: 8 days
- **Order listing**
  - Date
  - Sale: total amount order sale trong ngày
  - Refund: total amount order refund trong ngày (số âm)
  - Supply: total supply trên tất cả sevice trong order trong ngày
  - Tip: total tip của tất cả order trong ngày
- **Staff Income Detail**
  - Sale = total Sale
  - Refund = total refund
  - **Subtotal = Total (Sale - Refund)**
  - Supply Fee (incl. Sale & Refund) = Total Supply
  - **Staff Commission = (Subtotal - Supply fee) x 60%**
  - Discount Charge\*: Tổng số tiền promotion staff chia với chủ tiệm\*
  - Card Charge - Commission: _Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Commission, được setting trong Staff Compensation - On Staff Commission_
  - _Card Charge - Tip: Tổng số tiền chiết khấu trừ dựa trên phí thanh toán thẻ trên Tip, được setting trong Staff Compensation - On Credit Card Tip_
  - Clean Up Fee: số $ setting trong staff và nhân lên theo số ngày xem report
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - Tip = Total Tip
  - **TOTAL INCOME = (Staff Commission - Clean up fee + Tip - Card Charge Commission - Card Charge Tip – Discount Charge)**
    - Pay 1 = (Staff Commission x 30% - Clean up fee - Card Charge Commission - Card Charge Tip – Discount Charge)
    - Pay 2 (Staff Commission x 70% + Tip)
      - _Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

2.

### **STAFF PAYROLL - Salary**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
- **Staff Payroll Detail**
  - Working Days: tổng số ngày làm việc
  - Working Hours: tổng số giờ làm việc
  - **Salary Amount: tổng số lương phải trả**
    - Salary by Period: ghi nhận con số được setting trong Employee Compensation/Salary by Period
    - **Wage Per Day:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Days\]
    - **Wage Per Hour:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Hour\]
  - Deduction/Clean up fee: số $ setting trong staff và nhân lên theo số ngày tính lương
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - **Tip** = Total Tip
  - **TOTAL INCOME = Salary Amount - Clean up fee + Tip**  
    **(Salary - Clean up fee + Tip))**
    - Pay 1 (Salary x 30% - Clean up fee)
    - Pay 2 (Salary x 70% + Tip)
      - Salary _x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

**Một số lưu ý:**

- Nếu staff đang được setting theo Commission + Salary: thì tùy thuộc vào staff đó có setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary
- Phần Tip sẽ được cộng vào hoặc trừ ra tùy thuộc vào setting **Exclude Tips From Cash/Check Income** của mỗi staff đang enable hay disable

---

### Promotion Cost Sharing

- Merchant luôn có thể cấu hình tỷ lệ phân chia Promotion giữa **Owner** và **Staff**.
- Phần Promotion thuộc về Staff sẽ được phân bổ cho tất cả staff tham gia order theo tỷ lệ giá trị service của từng người, không phụ thuộc Compensation hiện tại.
- Tuy nhiên, chỉ những staff có Compensation chứa Commission mới thực sự chịu phần Promotion đó khi tính Income/Payroll. Phần Promotion được phân bổ cho staff Salary-only sẽ do Owner chịu.

### Khi tính Income / Payroll

#### Staff có Compensation chứa Commission

Bao gồm:

- Commission
- Salary + Commission

Phần Promotion được phân bổ cho staff này sẽ được dùng để giảm Income/Commission theo quy tắc.

#### Staff chỉ có Salary

Phần Promotion được phân bổ cho staff này chỉ được ghi nhận để phục vụ việc phân bổ trên order, nhưng **không ảnh hưởng đến Income hoặc Payroll của staff**.

Khoản Promotion này sẽ được chuyển sang phần chi phí mà Owner chịu.

---

**Description cho một số vị trí, khi xem report cho nhiều kì lương. thì sẽ show rõ thông số setting của mỗi kì như sau:**

**Staff Income Report: tại những field sau**

- **Đối với staff setting Commission**
  - Staff Commission
    - Commission Rate (mm/dd/yyyy - mm/dd/yyyy): x%
    - Commission Rate (mm/dd/yyyy - mm/dd/yyyy): x%
  - Total Income
    - Pay 1
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
    - Pay 2
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
      - Pay 2 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
- **Đối với staff setting Commission + Salary và Salary**
  - Rate
    - Rate (mm/dd/yyyy - mm/dd/yyyy): x%
    - Rate (mm/dd/yyyy - mm/dd/yyyy): x%
  - Total Income
    - Pay 1
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
    - Pay 2
      - Pay 1 Rate (mm/dd/yyyy - mm/dd/yyyy): x%
      - Pay 2 Rate (mm/dd/yyyy - mm/dd/yyyy): x%

---

_Source: Google Docs — "Income Version 2" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Business Snapshot

_Linear doc: https://linear.app/fastboy/document/business-snapshot-ac4f3735e3c2_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**\[Daily Sale Report\] Update**

Màn hình dashboard tổng quan trong POS, giúp Merchant/Admin nắm nhanh tình hình kinh doanh hiện tại thông qua các chỉ số chính như doanh thu, số giao dịch và trạng thái thanh toán. Tính năng này không thay thế báo cáo chi tiết mà đóng vai trò “check nhanh sức khỏe business”.

Mục tiêu là xem nhanh – hiểu nhanh – click để xem xu hướng, không đi sâu chi tiết ở màn này.

- **Dữ liệu: Realtime (nếu hệ thống cho phép)**
- **Default period: Today**
- **Cho phép chọn period khác**
- **So sánh:**
  - **Previous period cùng độ dài**
  - **Hiển thị dưới dạng % tăng / giảm**

Gồm những field thông tin như sau:

1. **Date range picker:** Default period: Today
2. **Cards info**

- **Total Orders**: hiển thị số lượng order được create mới vào ngày đang xem report. Khi click vào card này, show column chart ghi nhận order theo giờ
- Lưu ý:
  - Chỉ ghi nhận order được create, còn đối với những order Refund / Partial Refund thì được cộng giá trị vào những card info khác.
  - Đối với order bị Cancel, thì Total Order KHÔNG countt
- **Sale Income**
- **Total Tip**
- **Total Refund** (Refund + Partial Refund)
- **Net Income**
- **Amount Collected**

Mỗi card gồm:

- Giá trị hiện tại theo date đang được chọn
- % so với previous period
- Mũi tên tăng / giảm
- Click vào mối card info, show column chart data theo giờ

---

_Source: Google Docs — "Business Snapshot" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Staff Management

_Linear doc: https://linear.app/fastboy/document/staff-management-e01aa8aef908_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# VOLT POS — Staff Management Portal Module <document id="efc46a16-ceb1-482b-933f-e598888037b1" href="https://linear.app/fastboy/document/settings-6fe2b4cc81a4">Settings</document>

## Overview

Central HR management system for Business Owners and Managers to configure employee data and sync to POS devices.

---

## Module Scope

| Section             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Staff Directory     | List/grid view of all employees with search, filter, sort |
| Staff Detail Form   | 5-tab form for complete employee configuration            |
| Timekeeping         | Check-in/out tracking via staff code                      |
| Payroll Config      | Period management with lock/unlock functionality          |
| Staff Income Report | Commission + Tips + Salary − Deductions breakdown         |

## Staff Directory

**Features:**

- Search by: Name, nickname, email
- Filter by: All / Active (default) / Inactive
- Sort by: Created At, Updated At

Đây là nội dung mô tả tính năng "Import, Export Staff" (Nhập/Xuất Dữ liệu Nhân viên) mà bạn có thể thêm vào tài liệu:-----**Import/Export Staff (Nhập/Xuất Dữ liệu Nhân viên)**

Tính năng này được thêm vào trang quản lý (có thể là Management Page/Insight) để hỗ trợ việc quản lý và cập nhật dữ liệu nhân viên một cách hàng loạt.

- **Import Staff (Nhập Nhân viên):**
  - Cho phép người dùng tải lên một tập tin (CSV) để nhập thông tin nhân viên mới hoặc cập nhật thông tin nhân viên hiện có.
  - Cần có một template (mẫu) file nhập chuẩn để đảm bảo dữ liệu hợp lệ.
  - Các trường dữ liệu chính bao gồm: Nickname, first name, last name, Số điện thoại (Phone), Email, staff code, Trạng thái (Status - Active/Inactive),...
- **Export Staff (Xuất Nhân viên):**
  - Cho phép người dùng tải về một tập tin (CSV) chứa thông tin chi tiết của toàn bộ nhân viên.
  - Dữ liệu xuất có thể được sử dụng để backup hoặc thực hiện chỉnh sửa hàng loạt trước khi nhập lại (re-import) vào hệ thống.
  - File xuất ra bao gồm tất cả các thông tin chi tiết của nhân viên có trong hệ thống.

**Per-row actions:**

- View / Edit Staff
- Activate / Deactivate
- Toggle Technician ON/OFF

---

## Staff Detail Form (5 Tabs)

### Tab 1: Profile Information

| Field         | Rules                                 |
| ------------- | ------------------------------------- |
| Avatar        | JPG/PNG ≤5MB                          |
| First Name    | Required, max 25 chars                |
| Last Name     | Required, max 25 chars                |
| Nick Name     | Required, unique                      |
| Staff Code    | Required, 4 digits, unique (auth key) |
| Phone         | Required                              |
| Email         | Required, unique                      |
| SSN           | Optional                              |
| Display Color | Required                              |

### Tab 2: Role & Permissions

**Gồm 2 phần:**

- **Fixed Roles:** Owner, Manager, Partner, Staff
- Show dạng dropdown gồm 3 option Manager / Partner / Staff

| Permission               | Owner | Manager | Partner | Staff |
| ------------------------ | ----- | ------- | ------- | ----- |
| Turn Management          | ✓     | ✓       | ✓       | ✓     |
| View Income              | ✓     | ✓       | ✓       | ✓     |
| Staff Daily Income       | ✓     | ✓       | ✓       | —     |
| Payroll Access           | ✓     | ✓       | ✓       | —     |
| Batch Close / History    | ✓     | ✓       | —       | —     |
| Void / Refund (Critical) | ✓     | —       | —       | —     |
| Cash Drawer              | ✓     | ✓       | —       | —     |

- **Extra Permission:**
  - **Extra Permission: show list permission không thuộc role đang chọn, để có thể add thêm permission cho employee đó.**
  - **UI sẽ hiện thị tương tự như bên tab permission, nhưng chỉ hiển thị những permission không thuộc role đang được chọn, nếu chọn lại Role khác thì fetch lại list extra permission tương ứng**
  - Riêng đối với page Admin, tất cả đều phải lưu log, cũng như lưu log khi có sự thay đổi từ POS, sau đó sync lên page Admin.
    - Ví dụ log:
      - Employee: John
      - Role: Staff → Manager
      - Extra Permission Added: Refund
      - Source: POS / POS Admin
      - Created By / Updated By: user (name / email)
      - Created At / Updated At : 14:22 03/16/2026

### Tab 3: Compensation Configuration

**Model A — Commission Only**

- Service Commission %
- Product Commission %
- Gift Card Commission %

**Model B — Salary Only**

- Amount ($)
- Type: Per Hour / Per Day / Per Period

**Model C — Commission + Salary**

- Combination of above

**Sub-settings:**

- Paycheck Split (toggle)
- Deduction Per Day ($)
- Card Fee Charge (toggle)
- Tips on Check (default: ON)
- Days Off Limit

### Tab 4: Service Skills

- Checkbox tree: Category → Services
- Maps which services staff can perform

### Tab 5: Work Hours

- Weekly schedule per staff
- Per day: Active toggle, In Time, Out Time

---

## Staff Status Rules

| Status   | Login POS | Check-in/out | Assign Orders |
| -------- | --------- | ------------ | ------------- |
| Active   | ✓         | ✓            | ✓             |
| Inactive | ✗         | ✗            | ✗             |

**Technician Toggle:** Stored status; blocking rules in future phase.

---

## Timekeeping Module

- Check-in/out via 4-digit Staff Code
- No break/lunch tracking
- Owner can edit logs (if payroll not locked)
- View logs by date

---

## Employee Management

1. **Employee List**

View All Employees: A list of all employees (technicians, receptionists, etc.) in the salon.  
Location: This is the main screen when the user clicks on Employee Management from the left sidebar.

- Search Bar (at the top left of the list): Allows quick searching by employee name or role
- Add Button (at the top right of the list): Create a new staff member profile, enter details, assign a role, and set initial permissions.
- Import button: dùng để insert staff hàng loạt cho tiệm, thay vì add từng staff
  - Template import: [https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=1010353810#gid=1010353810](https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=1010353810#gid=1010353810)
- Filter (At the top of the list):
  - Employee Status (Active/Inactive)
  - Employee Role
- Table/Grid Layout: A clean grid or table layout to display the staff members with relevant information and actions.

| Employee Name |     | Role    | Status   | Phone Number | Email                                         | Actions |
| ------------- | --- | ------- | -------- | ------------ | --------------------------------------------- | ------- |
| Jane Doe      |     | Owner   | Active   | 123 456 7891 | [jane@example.com](mailto:jane@example.com)   | Edit    |
| John Smith    |     | Manager | Inactive | 123 456 7891 | [john@example.com](mailto:john@example.com)   | Edit    |
| Mary Johnson  |     | Staff   | Active   | 123 456 7891 | [marry@example.com](mailto:marry@example.com) | Edit    |

**Employee Info Columns:**

- Employee Name: Displays the name of the employee
- Role: Shows the employee's role
- Status: Indicates whether the employee is active or inactive (with an Active/Inactive toggle).
- Phone Number: Contact number for the employee.
- Email: Email address for communication.

**Actions**:

- Edit: Opens the profile to modify details (e.g., name, role, …).
- Change status Employee: Mark employees as inactive in their profiles when they leave.

2. **Employee Profile Detail**

Each employee will have a profile where all details are stored. For nail salons, the profile typically includes:  
**Profile Information:**

- Active/Inactive Toggle: Quickly change an employee's status (e.g., active if working or inactive if on leave).
- Appointment Staff Toggle: Marks whether an employee is available to handle customer appointments.
- First Name, Last Name, Nickname (for internal use or customer-facing).
- Phone Number, Email, Address (contact details for communication or scheduling).
- Staff Code: A unique identifier for each employee in the system.
- Role: Owner, Manager, Partner, Staff
- SSN (optional): For payroll purposes.
- Permission: toggle
  - Summary Income
  - Staff Payroll
  - Cancel Order
  - Open Cash Drawer
  - Daily Income
  - Batch History
  - Refund Order
  - Staff Income
  - Edit Order

**Compensation:**

- Commission
- Salary
- Commission + Salary

**Service Skills:** show full list service ở dạng checkbox  
**Work Hours:** Shift Availability: Indicate the days and hours the employee is available to work.  
**Actions:**

- Edit: Opens the profile to modify details (e.g., name, role, payroll).
- Remove: Option to remove the employee from the system (with confirmation).

3. **Add/Edit/View Employee Profile (Modal or New Screen)**

Location: This is opened when you Edit an employee from the list or Add a new employee.  
Form Fields for Employee Profile:

**Profile Information Section (on top):**

- Status Section (below role): Active/Inactive Toggle: A switch to mark employees as active (working) or inactive (on leave or terminated).
- Appointment Staff Toggle: Toggle to enable/disable the employee’s ability to take appointments.
- First Name, Last Name, Nickname (optional).
- Phone, Email, Address (contact information).
- Role: Dropdown to select the employee’s role
- Staff Code: Unique identifier for internal tracking
- SSN (optional): For payroll and tax purposes.
- Permissions Section (below status): A list of permissions that can be toggled for each employee based on their role:
- Access Summary Income: Toggle to give access to overall income reports.
- View Daily Income: Toggle for daily sales or tips reports.
- Access Staff Payroll: Enable or disable access to payroll info.
- Void/Refund/Cancel Orders: Allow certain staff to modify or cancel orders.
- Access Client Information: Toggle for receptionists or managers to access client booking details.
- Shift Management: Permission for scheduling shifts and tracking attendance.
- Open Cash Drawer: Permission for cashiers or front desk staff to open the drawer.  
  Note: Each toggle has a label for clarity and ease of understanding.

**Compensation:** show UI giống như POS, chọn option nào thì config cho option đó

- Commission
- Salary
- Commission + Salary

!\[\]\[image11\]  
**Service Skills:** show full list service ở dạng checkbox, show UI giống như POS  
!\[\]\[image12\]

**Work Hours:** Shift Availability: Indicate the days and hours the employee is available to work. Show UI giống như POS  
!\[\]\[image13\]  
**Buttons**:

- Save: Save the employee’s profile and return to the employee list.
- Cancel: Discard changes and return to the employee list.

4. **Import Staff**

**4.1. Objective**

Cho phép user import hàng loạt Staff (Employee) vào POS Portal thông qua file Excel, bao gồm:

- Thông tin nhân viên
- Role
- Trạng thái hoạt động
- Compensation logic cấu hình linh hoạt (Commission / Salary / Combination)

Tách riêng:

- Sheet 1: cấu hình compensation
- Sheet 2: danh sách staff

---

**4.2. Location**

POS Portal → Staff Management

UI:

- Button Download Template
- Button Import Staff

---

**4.3. User Flow**

1. User tải template (2 sheets)
2. Fill:
   - Sheet 1: Compensation Settings
   - Sheet 2: Staff List
3. Upload file
4. System validate:
   - Nếu lỗi → popup
   - Nếu hợp lệ → preview
5. User:
   - Confirm → import
   - Cancel → hủy

---

**4.4. File Format**

- **Support: .xlsx**
- **File gồm 2 sheets bắt buộc:**
  - **Compensation Settings**
  - **Staff List**

---

**5. SHEET 1 — COMPENSATION SETTINGS**  
**5.1 Purpose**

Define cấu hình compensation cho từng loại:

- Commission
- Salary
- Commission + Salary

---

**5.2 Structure**

Compensation Types:

- Commission
- Salary
- Commission + Salary

---

**5.3 Fields & Rules**

**A. Commission Settings**

| Field                       | Rule            |
| --------------------------- | --------------- |
| Commission for Service      | % Staff / Owner |
| Commission for Product      | % Staff / Owner |
| Commission for GiftCard     | % Staff / Owner |
| Pay 1 / Pay 2 Split         | Tổng = 100%     |
| Deduction per day           | \>= 0           |
| Card Fee – Staff Commission | %               |
| Card Fee – Credit Card Tip  | %               |

---

**B. Salary Settings**

| Field             | Rule        |
| ----------------- | ----------- |
| Salary by period  | \>= 0       |
| Wage per day      | \>= 0       |
| Wage per hour     | \>= 0       |
| Pay split         | Tổng = 100% |
| Deduction per day | \>= 0       |

---

**C. Commission + Salary**

Kết hợp toàn bộ:

- Salary settings
- Commission settings
- Pay split
- Deduction
- Card fee

---

**5.4 Validation Rules**

- Mỗi compensation type phải có đầy đủ config nếu được sử dụng
- % phải hợp lệ (0–100)
- Pay split:
  - Pay1 + Pay2 = 100%
- Không được để trống field quan trọng

---

**5.5 Business Rule**

- Sheet này là nguồn config duy nhất
- Staff sẽ reference theo Compensation Type

---

**4.6. SHEET 2 — STAFF LIST**  
**4.6.1 Template:** [https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=1010353810#gid=1010353810](https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=1010353810#gid=1010353810)

| Column                   | Required | Rule        |
| ------------------------ | -------- | ----------- |
| Employee First Name (\*) | Yes      | Max 50      |
| Employee Last Name (\*)  | Yes      | Max 50      |
| Employee Nickname (\*)   | Yes      | Max 50      |
| Employee Code (\*)       | Yes      | Unique      |
| Employee Role (\*)       | Yes      | Text        |
| SSN                      | No       | Text        |
| Employee Phone (\*)      | Yes      | Valid       |
| Employee Email           | No       | Valid email |
| Address                  | No       | Text        |
| Country                  | No       | Text        |
| State                    | No       | Text        |
| City                     | No       | Text        |
| Zip Code                 | No       | Text        |
| Compensation (\*)        | Yes      | 3 values    |
| Services Active Full     | No       | 0 / 1       |
| Working Hours Active     | No       | 0 / 1       |
| Booking Online Active    | No       | 0 / 1       |

---

**4.6.2 Compensation Type**

Chỉ nhận:

- Commission
- Salary
- Commission + Salary

---

4.6.3 Mapping Logic

| Staff chọn          | System lấy config    |
| ------------------- | -------------------- |
| Commission          | Sheet 1 → Commission |
| Salary              | Sheet 1 → Salary     |
| Commission + Salary | Sheet 1 → Combined   |

---

**4.6.4 Validation Rules**

**Employee Code**

- Required
- Unique
- Trùng → fail

---

**Name fields**

- Required
- Max 50 chars

---

**Phone**

- Required
- Format hợp lệ

---

**Email**

- Optional
- Nếu có → đúng format

---

**Role**

- Required

---

**Boolean fields**

- Chỉ nhận 0 / 1
- Blank → default = 0

---

**4.6.5 Business Rules**

- Không update staff cũ
- Luôn create mới
- Không dedupe theo email/phone (phase này)

---

**4.7. IMPORT LOGIC**

Rule: All or Nothing

- Có 1 lỗi → fail toàn bộ
- Không import partial

---

**4.8. PREVIEW SCREEN**

- Hiển thị toàn bộ staff
- Không cho edit
- Actions:
  - Confirm
  - Cancel

---

**4.9. ERROR HANDLING**

Popup:

Import failed. Please check row 2, row 5.

---

**4.10. PERMISSION**

User cần: Create Staff

---

**4.11. AUDIT LOG**

Lưu:

- User import
- Thời gian
- Tổng records success
- Tổng records failed
- Status

### **5. Export Staff**

**5.1 Objective**

Cho phép user tùy chọn dữ liệu cần export thay vì export toàn bộ mặc định.

Mục tiêu:

- Linh hoạt theo nhu cầu từng user
- Giảm file size
- Tăng usability (đặc biệt với data lớn)

---

**5.2. Entry Point**

POS Portal → Staff Management → Export Staff

---

**5.3. UX Flow**

1. User click **Export Staff**
2. System mở Export Modal
3. User chọn:
   - Format file
   - Filter data
   - Columns cần export
4. Click Export
5. System generate file

---

**5.4. Export Modal Structure**

**5. 4.1 Export Format**

Options:

- CSV (.csv)
- Excel (.xlsx)

Default: Excel (.xlsx)

---

**5.4.2 Filter – Staff Status**

Cho phép filter theo trạng thái:

- Active
- Inactive
- All (default = select all)

---

**5.4.3 Filter – Compensation Type**

- Commission
- Salary
- Commission + Salary

Multi-select  
Default: All selected

---

**5.4.4 Filter – Role**

- Owner
- Manager
- Partner
- Staff

Multi-select  
Default: All selected

---

**5.4.5 Select Columns to Export**

User có thể chọn field cần export

Group: Basic Info

- Employee First Name
- Employee Last Name
- Employee Nickname
- Employee Code

Group: Contact

- Phone
- Email
- Address
- Country
- State
- City
- Zip Code

Group: Work Info

- Role
- Compensation

Group: Status

- Services Active Full
- Working Hours Active
- Booking Online Active

Default:

- Select tất cả

---

**5.5. Business Rules**

\*\*5.\*\*5.1 Column Selection

- User phải chọn ít nhất 1 column
- Nếu không → disable Export button

---

\*\*5.\*\*5.2 Filter Logic

- Apply AND logic giữa các filter
- Ví dụ:
  - Status = Active
  - Compensation = Commission  
     → chỉ export staff thỏa cả 2

---

\*\*5.\*\*5.3 Data Scope

- Nếu không chọn filter → export toàn bộ

---

**5.5.4 Format Output**

CSV

- Plain data
- Không format

Excel

- Có header
- Có format basic (bold header)

---

**5.5.5 Boolean Fields**

- Export dạng 0 / 1

---

**5.5.6 Compensation**

- Chỉ export type (không export config)

---

**5.6. File Naming**

```
staff_export_YYYYMMDD_HHMM.xlsx
```

Nếu CSV:

```
staff_export_YYYYMMDD_HHMM.csv
```

---

**5.7. Permission**

User cần: View Staff Management

---

**5.8. Audit Log**

Lưu:

- User thực hiện export
- Thời gian export
- File name
- Trạng thái:
  - Success
  - Failed

---

**5.9. Error Handling**

- Không chọn column → disable Export
- System fail → show:  
   Export failed. Please try again.

---

_Source: Google Docs — "Staff Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Payroll

_Linear doc: https://linear.app/fastboy/document/payroll-23dadb3e0003_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

## **Staff Payroll**

Staff Income detail theo từng staff: theo 2 setting Commission và Salary

1. **STAFF PAYROLL - Commission**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
  - Working Days: 8 days
- **Order listing**
  - Date
  - Sale: total amount order sale trong ngày
  - Refund: total amount order refund trong ngày (số âm)
  - Supply: total supply trên tất cả sevice trong order trong ngày
  - Tip: total tip của tất cả order trong ngày
- **Staff Income Detail**
  - Sale = total Sale
  - Refund = total refund
  - **Subtotal = Total (Sale - Refund)**
  - Supply Fee (incl. Sale & Refund) = Total Supply
  - **Staff Commission = (Subtotal - Supply fee) x 60%**
  - Clean Up Fee: số $ setting trong staff và nhân lên theo số ngày xem report
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - Tip = Total Tip
  - **TOTAL INCOME = Staff Commission - Clean up fee + Tip**
    - Pay 1 (Staff Commission x 30% - Clean up fee)
    - Pay 2 (Staff Commission x 70% + Tip)
      - _Staff Commission x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

2. **STAFF PAYROLL - Salary**

- **Satff Info:**
  - Staff Name: Nickname
  - Pay Period: Date: 04/15/2025 - 04/30/2025
- **Staff Payroll Detail**
  - Working Days: tổng số ngày làm việc
  - Working Hours: tổng số giờ làm việc
  - **Salary Amount: tổng số lương phải trả**
    - Salary by Period: ghi nhận con số được setting trong Employee Compensation/Salary by Period
    - **Wage Per Day:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Days\]
    - **Wage Per Hour:** Salary Amount = \[số được setting trong Employee Compensation/Wage Per Day\] \* \[Working Hour\]
  - Deduction/Clean up fee: số $ setting trong staff và nhân lên theo số ngày tính lương
    - VD: Clean Up Fee = deduction fee \* số ngày tính lương
  - **Tip** = Total Tip
  - **TOTAL INCOME = Salary Amount - Clean up fee + Tip**  
    **(Salary - Clean up fee + Tip))**
    - Pay 1 (Salary x 30% - Clean up fee)
    - Pay 2 (Salary x 70% + Tip)
      - Salary _x 30%: dựa trên setting **Pay 1 - Pay 2 Split** của từng staff_

**Một số lưu ý:**

- Nếu staff đang được setting theo Commission + Salary: thì tùy thuộc vào staff đó có setting **Staff Days Off Setting** > thì mới chốt được là staff này nhận Commission hay Salary
- Phần Tip sẽ được cộng vào hoặc trừ ra tùy thuộc vào setting **Exclude Tips From Cash/Check Income** của mỗi staff đang enable hay disable

---

# Print Check

- "Print Check" là việc in phiếu lương (commission check) từ hệ thống POS, thể hiện thu nhập của từng nhân viên (staff) trong một kỳ làm việc (thường là 1 tuần hoặc 2 tuần).
- Phát phiếu check giấy (paycheck) để nhân viên mang ra ngân hàng hoặc mobile app deposit vào tài khoản của họ.
- Quy trình thực tế vận hành Print Check trong tiệm nail:
  - Tổng hợp doanh thu & tip:
    - POS hoặc kế toán tổng hợp service income, tip, commission rate theo từng nhân viên.
    - Dữ liệu lấy từ Order / Report / Time Keepings.
  - Tính toán lương (Commission or Salary): thường sẽ chia thành 2 hình thức
    - Trả tiền mặt
    - Check
  - In Check
  - Nhân viên đem phiếu ra ngân hàng

Mẫu giấy dùng để in check: [https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9hNDMwMzRkYmNiMTIyZmQxL0VRWWg0ZE9QVEpKTnFuTFMyakxZWGlZQnozOTVrWFJQdTFhWVZIUTRhWFBTakE&cid=A43034DBCB122FD1&id=A43034DBCB122FD1%21sd3e121064c8f4d92aa72d2da32d85e26&parId=A43034DBCB122FD1%21sd7eb2564f3f14c83b35f1e2813891327&o=OneUp](https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9hNDMwMzRkYmNiMTIyZmQxL0VRWWg0ZE9QVEpKTnFuTFMyakxZWGlZQnozOTVrWFJQdTFhWVZIUTRhWFBTakE&cid=A43034DBCB122FD1&id=A43034DBCB122FD1%21sd3e121064c8f4d92aa72d2da32d85e26&parId=A43034DBCB122FD1%21sd7eb2564f3f14c83b35f1e2813891327&o=OneUp)

## Bank Account

Danh sách thông tin account ngân hàng của chủ tiệm, gồm những thông tin sau:

- Bank Name
- Account Name
- Account Number
- Routing Number
- Bank Link
- Search: Bank Name / Account Name
- Action: Update
- Button: Create New
- Create New bank account, form create new gồm 3 fields thông tin sau:
  - Title: **Bank Information**
  - **(1) Bank Account Information: thông tin ngân hàn của chủ tiệm**
    - Account Name: (required), tên chủ tài khoản ngân hàng, là tên người hoặc doanh nghiệp đứng tên tài khoản.
    - Account Number: (required), dãy số định danh tài khoản của merchant tại ngân hàng
    - Bank Name: (required), tên ngân hàng mà merchant đang sử dụng
    - Routing Number: (required), số định tuyến ngân hàng tại Mỹ (ABA Routing Number), thường bao gồm 9 digits
    - Confirm Account Number: (required), nhập lại số tài khoản để xác nhận, field này phải khớp chính xác 100% với _Account Number_
    - Bank Website (Link): (required), địa chỉ website chính thức của ngân hàng.
  - **(2) Address Information: thông tin địa chỉ của tiệm**
    - Nick Name: (required), tên merchant
    - Address Line 1: (Optional)
    - Address Line 2: (Optional)
    - City: (required)
    - State: (required)
    - Zip: (required)
  - (3) **Contact Information: thông tin liên hệ của chủ tiệm**
    - Phone: (required)
    - Email: (required)
  - Button:
    - Default: set thành account default để print check
    - Create: click để create bank account

---

## Checks List

### Check List listing

Gồm những thông tin sau:

- ID: số thứ tự (ID) của check, count từ 1
- Employee Name: staff name
- Created At: thời gian create check (add staff để tạo check) hh:mm mm/dd/yyyy
- Check: amount check, số tiền thanh toán bằng hình thức check
- Memo: payroll được in check (dạng note)
- Actions: View / Print / Delete / Archive / Void
- Filter date: Created At
- Filter status:
  - Created: default
  - Printed
  - Voided
  - Deleted
- Signature
- Add Staff button

---

### Create Signature

- Là chữ ký của chủ tiệm (Owner), chữ ký của người có thẩm quyền phát hành chi phiếu (Authorized Signer)
- Mục đích:
  - Check được phê duyệt hợp lệ
  - Số tiền đã được ngân hàng cấp phép rút từ tài khoản của merchant
  - Đây là chi phiếu hợp pháp để nhân viên đem ra ngân hàng/cash check
- Hiển thị trên check

---

### Add Staff

Tạo check cho staff:

- Điều kiện hiển thị của list staff:
  - Chỉ staff Active mới được trả lương → mới hiện trong danh sách tạo check.
  - Nếu staff không có thu nhập trong kỳ trả lương → default không xuất hiện, do default filter là "Has staff income" (Staff phải có Timekeeping / Hour Worked / Commission để trả lương)
  - Staff chỉ được chọn nếu thuộc cùng Merchant đang tạo check.
  - Lưu ý: nếu staff đã được chọn để create check, nhưng check chưa được proccess, thì trong list staff vẫn hiển thị lại staff đó, nhưng bị disable đi (Đã tồn tại check cho staff đó ở thời điểm hiện tại)
- Filter:
  - Has Staff Income / All: staff đang có income đến thời điểm hiện tại hoặc show tất cả (kể cả những staff không có income)
  - Bank Account list: show list bank account được tạo ở tab Bank Account
  - Payroll:
    - Select date range theo payroll cố định của tiệm (dựa vào setting Pay Period)
    - Không cho phép chọn ngày lẻ (số lượng ngày lớn hơn hoặc nhỏ hơn payroll)
- Search: Staff name
- List Staff: gồm những field thông tin sau
  - Name (First name/Last name)
  - Income: total Staff Income đến thời điểm hiện tại của staff chưa được in check (Nếu gồm cả 2 payroll liên tiếp thì show tổng của 2 payroll)
  - Staff Role: role hiện tại của staff
  - Lastest Check: lần in Check gần nhất của staff
  - Sort theo alphabet Name
- Option Select All: chọn hết tất cả staff đang thỏa điều kiện để create check hàng loạt
- **Lưu ý:** nếu payroll đã được print check nhưng chỉ xuất cho pay 1, thì xem như payroll đó đã complete print check rồi, không hiển thị số tiền pay 2 chưa đc print check trong Income hiện tại của staff nữa. Vì thông thường sẽ trả bằng check một pay và trả bằng cash một pay để giảm phần thuế cho staff/store

---

### Check detail

Gồm những field thông tin sau:

- **(1) Thông tin merchant:**
  - Avatar merchant
  - Merchant name
  - Merchant Address
  - Bank name
  - Bank link
- **(2) Thông tin khởi tạo Check:**
  - Date (Issue Date): Ngày người dùng tạo check (ngày phát hành check)
    - Khi create Check, hệ thống sẽ tự động gán **Issue Date = current date**
    - Lưu ý:
      - Check được tạo vào ngày 11/17/2025 > **Issue Date = 11/17/2025** nhưng chưa được print
      - Đến ngày 11/18/2025, mở lại check đó để xử lý > **Issue Date = 11/18/2025**
      - Nhưng **Created At** ngoài Check List vẫn là **11/17/2025**
  - Check number: số định danh của tờ check
    - Là số tăng dần tự động mỗi khi tạo check mới
    - Thường có định dạng padding 6 digits: 000001, 000002…
    - Hiện thị ở 3 vị trí như trên hỉnh
    - Mục đích của Check number:
      - Nhận diện từng tờ check riêng biệt
      - Theo dõi lịch sử phát hành check
      - Dùng để đối chiếu với ngân hàng (bank verification)
      - Tránh trùng lặp hoặc gian lận payroll
- **(3) Thông tin số tiền sẽ thanh toán cho staff trên check:**
  - PAY TO THE ORDER OF - Staff Name: thanh toán cho staff nào
  - Amount in Number: số tiền của Pay được chọn trên list **Check 1 Payout** or **Check 2 Payout** or **Check 1&2 Payout**
  - Amount in Words: hiển thị số tiền ở dạng text theo **rules** để chuyển số → chữ theo format check của ngân hàng Mỹ

### Công thức/Quy tắc để chuyển amount → text trên check

**Công thức/Quy tắc để chuyển amount → text trên check**

Giả sử số tiền là **$1,902.34**, hệ thống sẽ convert thành:

➡️ **"ONE THOUSAND NINE HUNDRED TWO AND 34/100"**

Đây là đúng format của payroll check ở Mỹ.

---

**1) Phần nguyên (Dollar Amount)**

Chuyển từng nhóm số (clusters) theo cấu trúc:

- 1–19 → dùng bảng đặc biệt (one, two, three…)
- Tens (20, 30, 40…) → twenty, thirty…
- Hundred → "… hundred"
- Thousand → "… thousand"
- Million → "… million"
- Billion → "… billion"

**Ví dụ:** 1902 →

- 1 thousand → "one thousand"
- 900 → "nine hundred"
- 2 → "two"

Gộp lại: ➡️ **"one thousand nine hundred two"**

---

**2) Phần thập phân (Cents)**

Quy tắc cố định trong check Mỹ:

**XX/100**

Dựa trên 2 số cuối của số tiền:

- 0.05 → 05/100
- 0.30 → 30/100
- 0.99 → 99/100

Ví dụ 0.34 → **34/100**

---

**3) Gộp chung theo format của check**

Format chuẩn của US banking:

**\[DOLLAR WORDS\] AND \[CENTS\]/100**

Ví dụ: "ONE THOUSAND NINE HUNDRED TWO AND 34/100"

Không cần thêm "dollars", vì từ "DOLLARS" đã in sẵn bên phải.

---

**4) Tất cả luôn viết in hoa (uppercase)**

Hầu hết hệ thống payroll/check đều in chữ hoa để:

- Dễ đọc với máy
- Tránh bị chỉnh sửa tay
- Chuẩn ngân hàng

**VD: $1276.37**

- Tách phần nguyên và phần thập phân
  - Số tiền: `$1276.37`
  - Phần nguyên: `1276`
  - Phần thập phân: `37` → cents
- Viết phần nguyên bằng chữ: 1276 = `One Thousand Two Hundred Seventy-Six`
- Viết phần thập phân: 37 cents → `37/100`
- Ghép lại theo chuẩn check: One Thousand Two Hundred Seventy-Six and 37/100 Dollars

---

- **(4) Thông tin pay period, chữ kí** **và MICR line:**
  - MEMO: auto fill pay period được tạo check **\[mm/dd/yyyy TO mm/dd/yyyy\] - Staff Nickname**
  - Chữ kĩ: chữ kí của owner được setup ở ngoài Check List listing page
  - Dãy số: "000786" |:111000611|: 585883120" > được gọi là MICR line (Magnetic Ink Character Recognition line)
    - 000786 - Check number
    - 111000611 - Routing Number của bank account được chọn khi create check
    - 585883120 - Account Number của bank account được chọn khi create check
    - Ký tự phân tách MICR: `:`, `|`… giúp máy nhận diện từng trường.
    - More info: mục đích chính của MICR line > Tự động hóa quá trình xử lý check. Ngân hàng sử dụng máy đọc MICR để scan nhanh thông tin routing number, account number và check number. Giúp xác định nguồn tiền và ngân hàng phát hành mà không cần nhập tay.
- **(5) Thông tin chi tiết của staff income trong pay period được tạo check:**
  - Show Staff Payroll theo từng ngày, gồm những column thông tin sau:
    - DATE
    - SALE
    - SUPPLY
    - COMMISSION
    - TIP
    - TOTAL
  - Summary gồm những thông tin sau:
    - Total Sale
    - Supplies
    - Net Sale = Total Sale - Supplies
    - Commission (60%)
    - Clean Up Fee
    - Total tip
    - Pay 1
    - Pay 2
    - Total Pay
- **(6) Một số action:**
  - Edit Info Check: only check status - Created, sẽ được update những thông tin sau
    - Created At (Issue Date)
    - Check Number: update nhưng không được trùng với với những check number đang có ở hiện tại, ngoại trừ status Delete là vẫn được trùng
    - Nickname
    - Name
    - Pay 1
    - Pay 2
    - Memo: là field điền sẵn thông tin pay period được print check, nhưng nếu chủ tiệm muốn update sang ngày khác thì vẫn được phép. Vì check được in ra là dựa trên Pay Period cố định, field Memo không ảnh hưởng
    - **Lưu ý:** những thông tin sau khi update chỉ apply cho Check đó thôi, k ảnh hưởng đến những setting hiện tại của staff.
  - Select option: gồm 3 options
    - Check 1 Payout
    - Check 2 Payout
    - Check 1 & 2 Payout
  - Print Memo: print check

---

### **Workflow**

- **Status**:

| Status  | Định nghĩa                     |
| ------- | ------------------------------ |
| Created | Check vừa mới đc tạo ra        |
| Printed | Check đã được in               |
| Voided  | Cancel check vừa in (Printed)  |
| Deleted | Xóa check vừa tạo ra (Created) |

- **Action**:

| Action      | Định nghĩa                                                                                                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **View**    | \* Cho phép người dùng mở và xem toàn bộ thông tin của check. - Chỉ xem, không được chỉnh sửa thông tin check đã phát hành                                                                                                                                                      |
| **Print**   | \* In ra phiếu lương (paycheck) cho staff. - Đây là bản chính để staff mang ra ngân hàng nhận tiền - Chỉ cho in đúng 1 lần và cần xác nhận nếu in lại (Reprint) - Click icon Print là được tính là đã in check, nếu có vấn đề về máy in cần in lại, thì sử dụng action Re-print |
| **Delete**  | \* Xóa hoàn toàn check khỏi hệ thống (thường áp dụng cho check chưa in, chưa gửi nhân viên). - Chỉ cho phép delete khi check đang status Created - Xóa xong sẽ không thể khôi phục lại                                                                                          |
| **Archive** | \* Ẩn check khỏi danh sách hiển thị chính nhưng vẫn giữ trong hệ thống để tra cứu khi cần                                                                                                                                                                                       |
| **Void**    | \* Hủy hiệu lực của check đã phát hành (đặc biệt là check đã in), để đảm bảo không thể sử dụng để lấy tiền. - Check chuyển trạng thái Voided - Không được in hoặc sử dụng lại - Không thể xóa (Delete) sau khi Void                                                             |

- **Action trên check theo status:**

| Status / Action | View | Print                      | Delete                     | Archive                     | Void                      | Re-print                   |
| --------------- | ---- | -------------------------- | -------------------------- | --------------------------- | ------------------------- | -------------------------- |
| **Created**     | Yes  | Yes Status update: Printed | Yes Status update: Deleted | Yes Status update: Archived | No                        | No                         |
| **Printed**     | Yes  | No                         | No                         | No                          | Yes Status update: Voided | Yes Status update: Printed |
| **Voided**      | Yes  | No                         | No                         | No                          | No                        | No                         |
| **Deleted**     | Yes  | No                         | No                         | No                          | No                        | No                         |

Một số lưu ý sau khi create Check:

- **Created**: staff bị disable > phải Delete thì mới enable lại
- **Printed** (Đã xử lý):
  - Nếu staff vẫn còn Income chưa thanh toán, phải enable lại để có thể xuất check tiếp tục.
  - Nếu staff đã hết Income thì hiển thị giống hình
  - Nếu Void ngay check đó, thì enbale lại staff với số tiền Income đã Void để có thể xuất lại check đó

---

## **Quick Book**

Tạo nhanh 1 check cho list staff trong merchant, và không bị ảnh hưởng đến Income hay Payroll của staff đó, đơn giản là khoản bonus mà chủ tiệm muốn thanh toán cho staff.

Gồm những thông tin sau:

**Create Check section:**

- Bank Account: list bank account của chủ tiện đã tạo ở tab Bank Account
- Ending Balance: tổng số tiền thanh toán cho staff bằng Quick-Book, gồm tất cả các status của Check
- PAY TO THE ORDER OF: selector staff, show full list staff của tiệm, bao gồm status Inactive
- Amount ($): số tiền sẽ trả trên check
- Amount in Words: hiển thị số tiền ở dạng text theo **rules**
- MEMO

**Check listing section:**

- ID
- Employee Name: \[Nickname - Full name\]
- Created At: ngày create check
- Check
- Memo
- Action: View / Print / Delete / Archive / Void / Reprint

Một số lưu ý:

- Không cho phép Edit Check

---

## History

- List status riêng của History:
  - Active: đối với check đang có status là Created
  - Archive: đối với check đã printed và archive
  - Delete: đối với check đã bị delete
  - Void: đối với check đã bị void
- History listing gồm những thông tin sau:
  - ID
  - Employee: \[Nickname - Name\] của staff
  - Created At: thời gian tạo check \[hh:mm mm/dd/yyyy\]
  - Amount: số tiền bank sẽ thanh toán cho staff
  - Memo: pay period của check
  - Sort default desc theo ID
  - History Detail: gồm những thông tin sau
    - ID
    - Employee: \[Nickname - Name\]
    - Status: status hiện tại của check
    - Activities: ghi log khi có update trên check
      - User
      - Change Fields:
        - Field name: \[old value\] > \[new value\]
        - Field name: \[old value\] > \[new value\]
      - Action: những action sẽ ghi lại log
        - Edit check
        - Delete check
        - Reprint check
        - Void check
      - Reason
      - Updated At: \[hh:mm mm/dd/yyyy\]

---

---

_Source: Google Docs — "Payroll" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Recalculate Report

_Linear doc: https://linear.app/fastboy/document/recalculate-report-84a21a4ac2ce_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **Recalculate Report for Unprinted Payroll Period**

# **Overview**

Cho phép Owner/Admin thực hiện **Recalculate Payroll** đối với các kỳ lương chưa được Print Check nhằm xử lý các trường hợp Payroll được generate trước khi Compensation của staff được cấu hình đầy đủ hoặc được cập nhật chính xác.

Sau khi Compensation được cập nhật, hệ thống cho phép tính toán lại Payroll và đồng bộ toàn bộ dữ liệu liên quan để đảm bảo các báo cáo luôn phản ánh số liệu mới nhất.

---

# **Business Problem**

Hiện tại có thể xảy ra trường hợp:

- Payroll Period đã được generate.
- Một hoặc nhiều staff chưa được cấu hình Compensation.
- Payroll được tính ra không chính xác.
- Sau đó Owner mới cập nhật Compensation cho staff.

Trong trường hợp này, hệ thống cần cho phép tính lại Payroll mà không cần tạo lại Payroll Period.

---

# **Scope**

In Scope

- Recalculate Payroll Period chưa Print Check.
- Áp dụng lại Compensation hiện tại của staff.
- Cập nhật lại Payroll data.
- Đồng bộ lại các báo cáo liên quan.
- Giữ nguyên các dữ liệu nhập thủ công.
- Ghi nhận Audit Log.

Out of Scope

- Payroll đã Print Check.

---

# **Permission**

Cho phép các role có quyền Payroll thực hiện trên Portal.

---

# **UI Proposal**

Payroll Detail

Hiển thị action: Recalculate Payroll

Điều kiện hiển thị

Hiển thị khi:

- Payroll chưa Print Check

Ẩn hoặc Disable khi:

- Payroll đã Print Check

Tooltip:

Payroll cannot be recalculated after checks have been printed.

---

# **Recalculate Flow**

**Step 1:** Tại kì Payroll đang xem, click chọn Recalculate Payroll

**Step 2:** Hiển thị Confirmation Dialog

**Title:** Recalculate Payroll

Message

_Payroll amounts will be recalculated using current compensation settings._

_Manual adjustments will remain unchanged._

_Do you want to continue?_

Actions

- Cancel
- Recalculate

**Step 3:** System thực hiện Recalculate.

**Step 4:** Hiển thị kết quả.

Ví dụ: Payroll recalculated successfully.

---

# **Business Rules**

**Rule 1 – Compensation**

Khi thực hiện Recalculate:

Hệ thống áp dụng tất cả các setting trong Compensation hiện tại của staff.

---

**Rule 2 – Staff chưa có Compensation**

Nếu staff chưa được cấu hình Compensation:

- Vẫn hiển thị trong Payroll.
- Payroll Amount = $0.
- Không chặn quá trình Recalculate.
- Không phát sinh lỗi.

---

**Rule 3 – Các khoản được tính lại**

Hệ thống tính lại toàn bộ dữ liệu Payroll được generate tự động:

- Commission
- Salary
- Pay1/Pay2
- Các setting khác phát sinh từ Compensation

---

**Rule 4 – Recalculate nhiều lần**

Cho phép Recalculate nhiều lần.

Mỗi lần thực hiện:

- Sử dụng Compensation hiện tại.
- Ghi đè kết quả Payroll do hệ thống tự động tính trước đó.

---

# **Data Synchronization**

Sau khi Recalculate thành công, hệ thống phải đồng bộ lại tất cả module liên quan.

- Staff Payroll
- Staff Income Repor
- Income Summary Report

---

# **Processing Sequence**

Khi user thực hiện Recalculate Payroll:

```
Recalculate Staff Payroll
        ↓
Update Staff Income Report
        ↓
Update Income Summary Report
        ↓
Save Audit Log
```

Chỉ được xem là thành công khi toàn bộ các bước hoàn tất.

---

# **Transaction Rule**

Toàn bộ quá trình phải thực hiện trong cùng một action.

Nếu bất kỳ bước nào thất bại:

- Rollback toàn bộ dữ liệu.
- Không lưu dữ liệu một phần.

Ví dụ không được xảy ra trường hợp:

- Staff Payroll = dữ liệu mới
- Staff Income = dữ liệu cũ
- Income Summary = dữ liệu cũ

---

# **Audit Log**

Bắt buộc lưu Audit Log cho user thực hiện action Recalculate

---

# **Error Handling**

Payroll đã Print Check

Không cho phép Recalculate. Disable button action

Message: _Payroll cannot be recalculated after checks have been printed._

---

Không có thay đổi dữ liệu

Message: _Payroll recalculated successfully. No payroll changes detected._

---

# **Acceptance Criteria**

**AC01**

Given Payroll chưa Print Check

When user chọn Recalculate Payroll

Then hệ thống cho phép thực hiện Recalculate.

---

**AC02**

Given Payroll đã Print Check

When user chọn Recalculate Payroll

Then hệ thống không cho phép thực hiện.

---

**AC03**

Given Compensation của staff đã được cập nhật

When Payroll được Recalculate

Then Payroll Amount phải được tính lại theo Compensation mới nhất.

---

**AC04**

Given Staff chưa có Compensation

When Payroll được Recalculate

Then Payroll Amount của staff vẫn bằng $0.

---

**AC05**

Given Payroll có Bonus hoặc Deduction nhập thủ công

When Payroll được Recalculate

Then các giá trị này vẫn được giữ nguyên.

---

**AC06**

Given User thực hiện Recalculate Payroll

When quá trình hoàn tất

Then hệ thống phải lưu Audit Log.

---

**AC07**

Given User thực hiện Recalculate nhiều lần

When mỗi lần Recalculate hoàn tất

Then hệ thống luôn sử dụng Compensation hiện tại để tính toán.

---

**AC08**

Given Payroll được Recalculate thành công

When User mở Staff Payroll

Then dữ liệu phải phản ánh kết quả mới nhất.

---

**AC09**

Given Payroll được Recalculate thành công

When User mở Staff Income Report

Then dữ liệu phải phản ánh kết quả mới nhất.

---

**AC10**

Given Payroll được Recalculate thành công

When User mở Income Summary Report

Then dữ liệu phải phản ánh kết quả mới nhất.

---

**AC11**

Given một bước trong quá trình cập nhật dữ liệu thất bại

When Recalculate Payroll đang thực hiện

Then hệ thống phải rollback toàn bộ transaction.

---

**AC12**

Given Payroll được Recalculate thành công

When User xem các module Payroll, Staff Income và Income Summary

Then số liệu giữa các module phải đồng nhất và không được lệch nhau.

---

_Source: Google Docs — "Recalculate Report" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Time Keeping

_Linear doc: https://linear.app/fastboy/document/time-keeping-e0f3efd072d0_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

1. **Time Keeping**

## **1. Mục đích**

- Ghi nhận thời gian làm việc thực tế của nhân viên (Check-In / Check-Out).
- Dùng dữ liệu này để:
  - Giờ làm việc (Working Hours)
  - Tính Tip / Commission / Payroll
  - Tính giờ làm – lương (Salary per hour)
  - Quản lý ca làm (shift) và attendance (đi trễ / về sớm).
- Menu nằm chung với home

## **2. Tích hợp với các module**

- **Payroll** (tính lương): Lấy dữ liệu giờ làm × rate (lương/giờ) để tính tổng lương cho staff.
- **Staff Report**: Hiển thị tổng giờ, doanh thu, tip, commission trong ngày/tuần/tháng.
- **Permission:** chỉ user có permission mới được view và action trên Time Keeping management của tiệm

## 3\. **Workflow**

1. **Check-In**
   - Khi nhân viên đến tiệm → mở POS → chọn "Check In".
   - Hệ thống lưu lại:
     - Giờ Check-In (Local Time)
     - Nickname staff

(Nếu POS có **Dual Screen**, có thể cho phép nhân viên nhập mã staff code hoặc quét mã QR để Check-In > Optional)

2. **Check-Out**
   - Khi kết thúc ca làm, nhân viên chọn "Check Out".
   - Hệ thống lưu lại:
     - Giờ Check-Out (Local Time)
     - Tổng thời gian làm việc (Total Hours = Check-Out – Check-In)
     - Chưa Check-In thì không Check-Out được
3. **Auto Check-Out**
   - Nếu nhân viên **q**uên Check-Out, hệ thống có thể:
     - Tự động Check-Out lúc 23:59:59 (Local Time)
     - Owner có quyền chỉnh sửa ca làm thủ công.
4. Một số lưu ý
   - Nếu quên Check-Out, ca đó không được tính cho đến khi Owner xác nhận hoặc auto Checkout vào lúc **23:59:59 cùng ngày**
   - Có checkin thì được tính là ngày đó có đi làm.
   - Dual Screen Support: Cho phép nhân viên Check-In/Out trên màn hình khách > optional, support sau
   - Không block create order với những staff không Check-Out – Check-In, vì có staff tính lương theo Commission
   - Offline Mode: Nếu POS offline, vẫn lưu local và sync lại khi có mạng
5. **Các TH không cho phép update thời gian CHECK-IN/CHECK-OUT của staff:**
   - Đã khóa kỳ Payroll (Payroll Locked): Nếu Timekeeping nằm trong kỳ lương đã được locked, không được phép chỉnh sửa.
   - Không có permission.

## **4. Giao diện Check in / Check out Staff**

- Chỉ hiển thị list Staff - Active
- Gồm những field thông tin sau:
  - Unavailable Staff:
    - Staff nickname
    - Staff avatar
    - OUT date gần nhất: thời gian checkout trước đó
    - Sắp xếp theo staff nickname alphabet
  - Available Staff
    - Staff nickname
    - Staff avatar
    - IN date: thời gian thực hiện checkin
    - Sắp xếp theo thời gian checkin, user checkin mới nhất nằm trên cùng
- Action:
  - Click chọn staff ở tab Unavailable Staff để thực hiện Check In
  - Click chọn staff ở tab Available Staff để thực hiện Check Out

---

2. **Time Tracking**

- Thông tin staff sau khi thực hiện Check-In Check-Out sẽ được quản lý trong Time Keeping management
- Edit Time Keeping: Chỉ Owner có quyền:
  - Chỉnh sửa giờ Check-In / Check-Out (khi nhân viên quên thao tác)
  - Lý do chỉnh sửa cần được ghi lại (log).
- Vị trí: là 1 tab nằm trong home, dưới Time Keeping

1. **Time Keeping listing gồm những thông tin sau:**
   - Staff nickname
   - Date IN: format \[mm/dd/yyyy hh:mm AM/PM\]
   - Date OUT: format \[mm/dd/yyyy hh:mm AM/PM\]
   - Total Hours (= CheckOut – CheckIn): tính ra theo đơn vị giờ
   - Created At: thời gian staff thực hiện checkin hoặc thời gian owner add time keeping
   - Updated At: thời gian update time keeping trong Time Keeping management gần nhất
   - Action:
     - Edit: Update time keeping của staff
     - Delete: xóa time keeping của staff
   - Filter date range: Date IN - Date OUT
   - Search: staff nickname
   - Button action:
     - Add: add new time keeping cho staff chưa thực hiện Checkin
     - Export (later)

Note:

- Trong page này hiển thị tất cả Staff, kể cả Inactive
- Vẫn cho phép action trên những record time tracking của inactive staff nếu không rơi vào kì payroll đã locking.

2. **Action Add: mở modal add new time keeping với những thông tin sau**
   - Title: Add new time keeping
   - Staff: (required) staff listing - status Active
   - Date IN: (required) format \[mm/dd/yyyy hh:mm AM/PM\]
   - Date OUT: (optional) format \[mm/dd/yyyy hh:mm AM/PM\]
   - Note: (optional) max 255 characters
   - Button:
     - Submit
     - Cancel
3. **Action Edit: mở modal edit new time keeping với những thông tin có thể được update như sau**
   - Title: Edit time keeping
   - Staff: staff nickname - Disable, không được update
   - Date IN: format \[mm/dd/yyyy hh:mm AM/PM\]
   - Date OUT: format \[mm/dd/yyyy hh:mm AM/PM\]
   - Note: max 255 characters
   - Button:
     - Submit
     - Cancel
4. **Action Delete: remove time keeping khỏi hệ thống**
   - Title: Delete Timekeeping Record
   - Description: _Are you sure you want to delete this time record of_ **Staff: {Staff Nickname}\***?\* _This action cannot be undone._
   - Button:
     - Delete
     - Cancel
   - Lưu ý:
     - Không cho phép delete nếu time keeping này thuộc Payroll locked
     - Show message: _This record cannot be deleted because it's included in locked payroll._

   _!\[\]\[image2\]_

5. **Một số lưu ý:**

- Một nhân viên chỉ có 1 ca đang mở (Check-In): Không được Check-In lần nữa nếu chưa Check-Out ca trước
- Cho phép 1 staff Check-In / Check-Out nhiều lần trong 1 ngày (staff làm nhiều ca). Nhưng không được trùng thời gian trước đó (chỉ xảy ra khi owner add new time keeping manual cho staff)
- Không cho phép Check-In / Check-Out là 2 ngày khác nhau
- Log: Mọi thay đổi thời gian phải có log (ai chỉnh, lúc nào, note)

---

_Source: Google Docs — "Time Keeping" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Count Days Off

_Linear doc: https://linear.app/fastboy/document/count-days-off-8a55b2dcc45e_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Feature Definition — Count Days Off**

# **1. Business Purpose**

Tính năng **Count Days Off** được sử dụng để hỗ trợ cơ chế thỏa thuận trả lương giữa Chủ tiệm (Owner) và Nhân viên/Thợ (Staff).

Trong mô hình này, Staff có thể được áp dụng:

- Salary cố định
- Commission theo doanh thu/dịch vụ

Tính năng này cho phép Owner kiểm soát điều kiện nghỉ làm của Staff để xác định Staff có đủ điều kiện nhận Commission hay không.

---

# **2. Feature Overview**

Setting Name: Limit days off for this staff

Mục đích: cho phép giới hạn

- Số ngày nghỉ tối đa
- Các ngày không được phép nghỉ

Nếu Staff vi phạm bất kỳ điều kiện nào, Staff sẽ không đủ điều kiện nhận Commission và chỉ được nhận Salary.

---

# **3. Settings Configuration**

3.1. Enable/Disable Count Days Off

Field: Limit days off for this staff

Values

- OFF → Không áp dụng kiểm tra ngày nghỉ
- ON → Áp dụng kiểm tra ngày nghỉ

  3.2. Maximum Days Allowed to Be Off

Field: Max days off allowed

Definition: Số ngày nghỉ tối đa mà Staff được phép nghỉ trong một payroll period.

Example: Max days off allowed = 2 → Staff chỉ được nghỉ tối đa 2 ngày.

| Total Day Off | Result   |
| ------------- | -------- |
| ≤ 2           | Valid    |
| \> 2          | Violated |

3.3. Days Not Allowed to Be Off

Field: Days not allowed to be off

Definition: Các ngày trong tuần mà Staff không được phép nghỉ.

**Example**

Selected:

- Friday
- Saturday
- Sunday

→ Staff không được nghỉ vào Friday, Saturday hoặc Sunday.

Nếu Staff nghỉ vào bất kỳ ngày nào trong danh sách này → Vi phạm rule.

---

# **4. Time Keeping Integration**

Business Requirement: Để xác định Staff có nghỉ làm hay không, hệ thống sẽ sử dụng dữ liệu từ tính năng **Time Keeping**.

Staff bắt buộc phải:

- Check-in khi đến làm việc
- Check-out khi kết thúc ca làm (optional)

---

# **5. Day Off Definition**

Một ngày được xem là **Day Off** khi:

```
Staff không có check-in/check-out hợp lệ trong ngày làm việc được yêu cầu
```

---

# **6. Valid Attendance Definition**

Một ngày được xem là làm việc hợp lệ khi:

- Staff có check-in hợp lệ trên Time Keeping
- Staff có check-out hợp lệ (opional)
- HOẶC hệ thống thực hiện Auto Check-out thành công  
  6.1. Auto Check-out Mechanism  
  Business Rule

Trong trường hợp Staff:

- đã check-in
- nhưng quên check-out

Hệ thống sẽ tự động thực hiện:

```
Auto Check-out at end of day
```

Ngày làm việc đó vẫn được xem là:

```
Valid Attendance
```

và KHÔNG bị tính là Day Off.

6.2. Day Off Definition (Updated)

Một ngày chỉ được tính là Day Off khi:

```
Staff không có check-in hợp lệ trong ngày làm việc được yêu cầu
```

Điều này có nghĩa:

- Có check-in nhưng quên check-out → vẫn được xem là đi làm hợp lệ nhờ Auto Check-out
- Không có check-in → mới bị xem là nghỉ làm (Day Off)

---

# **7. Violation Rules**

Staff được xem là vi phạm Count Days Off nếu:

```
Total Day Off  > Max days off allowed
```

HOẶC

```
Staff takes off on restricted weekdays
```

Ví dụ:

- Nghỉ vào Friday/Saturday/Sunday
- Dù tổng số ngày nghỉ chưa vượt mức cho phép  
   → vẫn bị xem là vi phạm.

---

# **8. Payroll Calculation Logic**

**Case 1 — Count Days Off = OFF**  
Condition

```
Limit days off for this staff = OFF
```

Business Rule

Hệ thống sẽ so sánh:

- Salary
- Commission

Payroll Logic

| Condition           | Final Payment  |
| ------------------- | -------------- |
| Commission > Salary | Pay Commission |
| Commission ≤ Salary | Pay Salary     |

Formula

```
Final Payment = MAX(Salary, Commission)
```

---

**Case 2 — Count Days Off = ON**  
Condition

```
Limit days off for this staff = ON
```

Hệ thống sẽ kiểm tra:

- Maximum days allowed to be off
- Days not allowed to be off

---

8.1. Staff DOES NOT violate any day-off rules  
Conditions

Staff đồng thời thỏa:

- Total Day Off ≤ Max days off allowed
- Không nghỉ vào restricted weekdays

Payroll Logic

| Condition           | Final Payment  |
| ------------------- | -------------- |
| Commission > Salary | Pay Commission |
| Commission ≤ Salary | Pay Salary     |

Formula

```
Final Payment = MAX(Salary, Commission)
```

---

8.2. Staff VIOLATES any day-off rule  
Conditions - Staff vi phạm ít nhất 1 rule:

- Total Day Off > Max days off allowed  
   HOẶC
- Nghỉ vào restricted weekdays

Payroll Logic

Staff sẽ mất quyền nhận Commission.

Hệ thống mặc định:

```
Final Payment = Salary
```

Kể cả khi:

```
Commission > Salary
```

→ Staff vẫn chỉ nhận Salary.

---

# **9. Payroll Rule Priority**

Khi Count Days Off được bật:

| Priority  | Rule                            |
| --------- | ------------------------------- |
| Highest   | Count Days Off validation       |
| Secondary | Salary vs Commission comparison |

Điều này có nghĩa:

- Nếu Staff vi phạm day-off rules  
   → hệ thống bỏ qua Commission calculation  
   → chỉ trả Salary.

---

# **10. Payroll Flow**

```
Step 1:
Check if Count Days Off is enabled

Step 2:
If OFF
→ Final Payment = MAX(Salary, Commission)

Step 3:
If ON
→ Validate attendance from Time Keeping

Step 4:
Check:
- Total Day Off
- Restricted weekdays off

Step 5:
If violation exists
→ Final Payment = Salary only

Else
→ Final Payment = MAX(Salary, Commission)
```

---

# **11. Examples**

**Example 1 — Count Days Off OFF**

| Salary | Commission | Result         |
| ------ | ---------- | -------------- |
| $1,000 | $1,500     | Receive $1,500 |
| $1,000 | $800       | Receive $1,000 |

---

**Example 2 — Count Days Off ON and NO violation**

Setting

- Max days off allowed = 2
- Restricted weekdays = Friday, Saturday

Actual

- Staff nghỉ 1 ngày
- Không nghỉ Friday/Saturday
- Salary = $1,000
- Commission = $1,500

Result

```
Final Payment = $1,500
```

---

**Example 3 — Violate Maximum Days Off**

Setting

- Max days off allowed = 2

Actual

- Staff nghỉ 3 ngày
- Salary = $1,000
- Commission = $1,500

Result

```
Final Payment = $1,000
```

Commission sẽ không được áp dụng.

---

**Example 4 — Violate Restricted Weekday**

Setting

- Restricted weekdays = Saturday

Actual

- Staff nghỉ Saturday
- Salary = $1,000
- Commission = $2,000

Result

```
Final Payment = $1,000
```

Dù Commission cao hơn vẫn chỉ nhận Salary.

---

# **12. Edge Cases / Clarification Needed**

12.1. Missing Check-out

Nếu Staff:

- Có check-in
- Cuối ngày sẽ có auto checkout

Attendance vẫn hợp lệ

Không tính Day Off

Không ảnh hưởng Count Days Off validation

---

12.2. Manual Attendance Adjustment

Owner/Manager có thể:

- chỉnh sửa Time Keeping
- approve attendance thủ công

Attendance đã approve sẽ được xem là hợp lệ.

---

12.3. Non-working Schedule

Nếu Staff không được schedule làm việc trong ngày đó:  
 → ngày đó không được tính là Day Off.

---

_Source: Google Docs — "Count Days Off" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Staff Rating

_Linear doc: https://linear.app/fastboy/document/staff-rating-2ed9110c2c67_

> 🚧 **Placeholder** — chưa có spec (Google Docs gốc cũng rỗng). PO viết trực tiếp tại đây khi có nội dung.

---

_Source: Google Docs — "Staff Rating" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# [POS] Promotion Split Between Owner & Staff

_Linear doc: https://linear.app/fastboy/document/pos-promotion-split-between-owner-and-staff-42155f32c420_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Tính năng: Chia Promotion giữa Chủ tiệm và Thợ**

# **Tổng quan**

Tính năng này cho phép salon cấu hình cách chia phần giảm giá của Promotion giữa:

- Chủ tiệm (Owner)
- Thợ (Staff)

Hiện tại Promotion chỉ giảm trực tiếp trên tổng bill nhưng chủ tiệm là người chịu phần discount này.  
 Sau khi triển khai tính năng, hệ thống sẽ:

- Tính phần discount chủ tiệm chịu
- Tính phần discount thợ chịu
- Phân bổ phần discount của thợ cho nhiều thợ trong cùng order

**Mục tiêu nghiệp vụ**

Cho phép salon:

- Tự chịu toàn bộ promotion
- Chia promotion với thợ
- Theo dõi promotion cost theo từng nhân viên

**Phạm vi áp dụng**  
Áp dụng cho: Promotion discount

Không áp dụng cho

- Reward
- Gift card
- Discount item/manual discount
- Reward balance
- Tax

---

**Yêu cầu chức năng**

# **1. Cấu hình chia Promotion**

Khi apply Promotion, hệ thống cho phép nhập:

- Percent for owner (%)
- Percent for staff (%)

Quy tắc

- Tổng phải bằng 100%
- Default:
  - Owner = 50%
  - Staff = 50%

---

# **2. Hỗ trợ các loại Promotion**

Logic chia áp dụng cho:

- Promotion theo %
- Promotion theo số tiền ($)

---

# **3. Logic tính Promotion Split**

Ví dụ

Order Total = $100  
 Promotion = $10  
 Owner = 50%  
 Staff = 50%

Kết quả

- Owner chịu: $5
- Staff chịu: $5

---

# **4. Chia Promotion cho nhiều thợ**

Nếu order có nhiều thợ, phần promotion của staff sẽ được chia theo tỷ lệ giá trị service mà mỗi thợ thực hiện.

**Công thức**

```
Staff Promo Allocation =
(Staff Service Total / Total Service Amount)× Total Staff Promotion Amount
```

Ví dụ

Service

| Staff   | Service Total |
| ------- | ------------- |
| Staff A | $70           |
| Staff B | $30           |

Promotion

- Total Promo = $10
- Staff Portion = $5

Kết quả

| Staff   | Promo Share |
| ------- | ----------- |
| Staff A | $3.50       |
| Staff B | $1.50       |

---

# **5. Lưu dữ liệu**

Hệ thống cần lưu snapshot promotion split theo từng order để đảm bảo dữ liệu lịch sử không bị thay đổi khi config thay đổi sau này.

Dữ liệu cần lưu

Order Level

```
{
 "promotion_discount": 10,
 "promo_split_owner_percent": 50,
 "promo_split_staff_percent": 50,
 "promo_owner_amount": 5,
 "promo_staff_amount": 5
}
```

Staff Allocation Level

```
[
 {
   "staff_id": "A",
   "service_total": 70,
   "promo_staff_amount": 3.5
 },
 {
   "staff_id": "B",
   "service_total": 30,
   "promo_staff_amount": 1.5
 }
]
```

---

# **6. Yêu cầu UI**

Promotion Modal, thêm section mới: **Order promotion discount setting**

**Bao gồm:**

- Percent for owner (%)
- Percent for staff (%)

**Behavior**

- Validate tổng = 100
- Không cho Confirm nếu invalid
- Default = 50 / 50

**Validation Rules**

| Rule                | Behavior                  |
| ------------------- | ------------------------- |
| Owner + Staff ≠ 100 | Hiển thị validation error |
| Giá trị âm          | Không cho phép            |
| Empty value         | Không cho phép            |
| Promotion = 0       | Không tạo allocation      |

---

# **7. Report / Income / Payroll**

Hệ thống cần expose:

- Owner promotion expense
- Staff promotion expense
- Promotion allocation theo từng thợ

Dữ liệu này sẽ được dùng cho:

- Payroll
- Commission
- Sale report

---

_Source: Google Docs — "\[POS\] Promotion Split Between Owner & Staff" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Admin Site

_Linear doc: https://linear.app/fastboy/document/admin-site-26e00d300fd6_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Sau khi login thành công, sẽ show list merchant, gồm những thông tin sau:**

- Merchant listing: Display a list of merchants registered to use Volt POS, including the following basic information:
  - Merchant Name
  - Whmcs ID
  - Package
  - Status
  - Merchant Owner Email
  - Merchant Owner Phone
  - Merchant Start Date
  - Updated Date
  - Active Date (Onboarded At)
  - Action: View / Edit / Activity Logs
- Double-click on the Merchant record to access the details menu for that merchant, gồm list bên dưới, page default sẽ là Merchant Overview

1.  **Merchant Overview**  
    <document id="8e891c1c-83f4-4c5d-9088-d6f4afa9b68c" href="https://linear.app/fastboy/document/merchant-overview-48df980f19e3">Merchant Overview</document>
2.  **Merchants Management - Ongoing** <document id="1f382a86-58f9-4b3c-90f7-8f26c43650b3" href="https://linear.app/fastboy/document/merchants-management-2f21dec89944">Merchants Management</document>
3.  **Staff Management - Ongoing** <document id="5b8b466a-c274-4948-814b-aa4e03c4fa86" href="https://linear.app/fastboy/document/staff-management-e01aa8aef908">Staff Management</document>
4.  **Services Management - Ongoing**  
    <document id="c882ec10-a767-41bf-b03e-958c37a4000e" href="https://linear.app/fastboy/document/services-management-bb5c06fb3976">Services Management</document>
5.  **Package Management - Ongoing** <document id="abf445e3-7910-40e1-9e63-52fa70202e35" href="https://linear.app/fastboy/document/package-management-a13018e280ab">Package Management</document>
6.  **Order Management - Ongoing** <document id="0ce3807f-e79b-4e1f-bb86-82a76f6c914f" href="https://linear.app/fastboy/document/order-management-afeb73979dd4">Order Management</document>
7.  **Customer Management**

    <document id="b8656c71-958a-4c4a-b8ff-7ef70443a0eb" href="https://linear.app/fastboy/document/customer-management-5a2f35d3c8fc">Customer Management</document>

8.  **Gift Card Management** <document id="9b5a34e6-53c7-4ad3-a884-e3a9bf994720" href="https://linear.app/fastboy/document/gift-card-management-aac032d6e34a">Gift Card Management</document>
9.  **Batches** <document id="ff35ac6d-8fb1-4126-8b75-ade4532eac99" href="https://linear.app/fastboy/document/batches-1ad99f112d7a">Batches</document>
10. **Device Management** <document id="9c98d8a6-9baf-4b3d-9d2c-03751397d5c8" href="https://linear.app/fastboy/document/device-management-75de848ac60a">Device Management</document>
11. **Promotion Management** <document id="2ad922c5-bec5-4165-9283-538ff32acfb1" href="https://linear.app/fastboy/document/promotion-management-08b531d2158d">Promotion Management</document>
12. **Version Management - Ongoing** <document id="4e51fce1-a889-48a1-bb35-6fbc7d984527" href="https://linear.app/fastboy/document/version-management-df865e39d169">Version Management</document>
13. **Insight Dashboard**
14. **Support**
15. **Edit Order** <document id="2091a17f-aebf-4bc5-9344-ab245ecdb2d1" href="https://linear.app/fastboy/document/portal-support-edit-completed-order-314443cfc00f">Portal Support – Edit Completed Order</document>

---

_Source: Google Docs — "Admin Site" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Merchant Overview

_Linear doc: https://linear.app/fastboy/document/merchant-overview-48df980f19e3_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Merchant Overview**  
<document id="efc46a16-ceb1-482b-933f-e598888037b1" href="https://linear.app/fastboy/document/settings-6fe2b4cc81a4">Settings</document>

Sau khi login Admin site, chọn Merchant thì sẽ hiển thị page overview của merchant trước, thể hiện những thông tin cơ bản của merchant, để có cái nhìn tổng quát về tiệm, rồi sau đó muốn vào một page cụ thể nào đó thì sẽ chọn từ thanh menu bên trái.

## **Mô tả:**

Merchant overview sẽ gồm những thông tin cơ bản sau:

1. **Merchant Information**

- Merchant Avatar
- Merchant Name
- Merchant Whmcs ID
- Merchant Status
- POS Package
- Active Date

2. **Merchant Contact**

- Merchant Owner name
- Merchant Owner phone
- Merchant Owner email
- Merchant address

3. **Device Overview**

- Tổng số device
- Danh sách device:
  - Device name / ID: POS / DOT / Printer / Cash Drawer
  - Device type (Bamboo POS / Bamboo Terminal / Printer / Cash Drawer …)
  - Device status:
    - Connected
    - Disconnected

4. **Order Report**

- Order report tổng hợp (ở mức summary)
  - Total order
  - Total Appointment
  - …
- Số liệu phản ánh tình trạng hiện tại của merchant

5. **Batch History (Summary)**: Giúp Admin biết merchant đã close batch gần nhất hay chưa.

- Batch Date gần nhất: today
- Batch Status: Open / Closed

## **Tổng quan bố cục (1 screen)**

**Header:** Merchant Name + Status

---

### **Block 1: Today Summary**

**Mục đích:** Cho phép Admin xem nhanh tình trạng hoạt động trong ngày của merchant.

Display merchant daily operational summary.

- Total Orders: tổng số order được create thành công, không tính Cancel/Refund/Partial Refund
- Total Tips: tổng số tiền tip thu được trên total order
- Average Order: trung bình mỗi order khách thanh toán bao nhiêu
- Total Refunds: tổng số tiền bị refund/partial refund
- Total Appointments: tổng số appointment được book trong ngày hôm nay
- Total Payment (Revenue) = **Sale - Refund + Tip + Tax Collected**
  - Final revenue includes Gift Card Redemption
- Button: View All.
  - Clicking this button will redirect you to the Income Report menu for more details.

Lưu ý: All Today Summary data must follow: Merchant Timezone

---

### **Block 2: Merchant Information**

Merchant Profile

- Merchant Avatar
- Merchant Name
- Merchant WHMCS ID
- Merchant Status
- POS Package
- Active Date

Merchant Contact

- Merchant Owner Name
- Merchant Owner Phone
- Merchant Owner Email
- Merchant Address

Card này **không cần action**, chỉ để nhận diện & kiểm soát trạng thái.

---

### **Block 3: Device Summary**

**Mục đích:** Giúp Admin theo dõi tình trạng kết nối và hoạt động của thiết bị merchant.

Device Structure

Mỗi Bamboo POS sẽ bao gồm:

- 1 Bamboo DOT / Bamboo Terminal
- 1 Printer

Device Status Sync

- Device status được sync mỗi 1 tiếng/lần.

Device Summary Display

Mỗi device group hiển thị:

- Bamboo POS name / ID
- POS status:
  - Online
  - Offline
- Bamboo DOT status:
  - Connected
  - Disconnected
- Printer status:
  - Connected
  - Disconnected

Device Detail Drawer

Khi click vào một Bamboo POS:

- Hệ thống mở Device Detail drawer.

Device Detail Information

- Device Name
- Device Status
- Device ID
- Terminal Serial
- Last Connected
- Last Disconnected
- Uptime (7 ngày gần nhất)

Connection History

Hiển thị:

- Date
- Uptime %
- Status:
  - Online
  - Offline

UX Requirements

- Device offline/disconnected phải hiển thị warning state.
- Nếu không có dữ liệu connection history thì hiển thị empty state.

---

### **Block 4: Batch History**

**Mục đích:** Giúp Admin nhanh chóng xác định merchant đã close batch hay chưa.

Thông tin hiển thị

- Batch Date
- Batch Number
- Amount
- Status:
  - Open
  - Closed

**B**utton:View All

**Behavior:** Khi click View All

- Hệ thống redirect user đến menu: Batch History
- User có thể xem toàn bộ batch history và thông tin chi tiết liên quan.

---

_Source: Google Docs — "Merchant Overview" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Merchants Management

_Linear doc: https://linear.app/fastboy/document/merchants-management-2f21dec89944_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **Merchants Management**

Left Sidebar Menu (Navigation Panel): Purpose: Provides quick access to various settings for the business. Clicking on each item will bring up the corresponding setting page.

- General Settings (Main section for configuring business-wide settings)
  - Business Profile
  - POS Package
  - Payment & Transactions
- Services & Products Management
- Employee Management

1. **General Settings Page (Main Area)**

- Once you click on General Settings from the sidebar menu, the user is directed to the General Settings Dashboard.
- General Settings Dashboard: The user can click on each tab to go directly to the respective section.
  - Business Profile
  - POS Package
  - Payment & Transactions
- **Business Profile:** Includes the following fields
  - Business Name: Text field but unable to edit unless admin role
  - Business Legal Name: Text field but unable to edit unless admin role.
  - Business Address: Unable to edit unless admin role.
    - Address: Text input for the business address.
    - City: Text input
    - State: Dropdown select a state and able to search
    - Zip code: Numeric input
    - Country: Dropdown select a country and able to search
  - Contact Owner Information:
    - Phone Number: Text input for the contact number.
    - Email: Text input for the business email.
    - Website URL: Text input for the business website link.
  - Business Hours: Toggle Open/Close per day and time picker for each open day.
  - Logo Upload: Button to upload the business logo (.png or jpg file - max 5MB).
  - Welcoming Sign Upload: Button to upload the welcoming sign which will be displayed on the customer view screen. If no image is uploaded then using a default welcoming sign. (.png or jpg file - max 5MB).
  - Info message: If you need to update business name, legal name or address, please contact Fastboy support at (832) 968 6668
  - Contact CRM (View only):
    - Retrieve data from the CRM, including: Phone, Business Phone, Email, Role, and Name of each contact.
    - Include both active and inactive contacts, but highlight active contacts.
  - Buttons:
    - Save: To save any changes to business profile settings.
    - Cancel: To discard changes and return to the General Settings page.

—----------------------------------------------------------------------------------------------------

- **POS Package:**
  - Show 3 POS packages; clicking on each package will display a list of the main features included in that package, allowing users to view the detailed content of each package.
  - Displaying the select button, there must always be a product package selected for that merchant.
    - GO POS BASIC
    - GO POS DELUXE
    - GO POS PREMIUM
  - Gán Package cho Merchant
- Mỗi merchant chỉ được gán 1 package tại 1 thời điểm
- Package được gán kèm:
  - Package name (Basic / Deluxe / Premium)
  - Effective date
- Effective date là ngày package bắt đầu có hiệu lực
- Trước effective date: Merchant vẫn sử dụng package cũ
- Đến effective date: Hệ thống tự động áp dụng package mới
- Không cho phép: 2 package cùng active
  - UI tham khảo:

| \-------------------------------------------------- |
| --------------------------------------------------- |
| CURRENT PACKAGE                                     |
|                                                     |
| Package: Deluxe                                     |
| Effective from: 01/01/2026                          |
| Status: Active                                      |
|                                                     |
|                                                     |
|                                                     |
| SCHEDULE NEW PACKAGE                                |
|                                                     |
| Package: \[ Premium \] \[dropdown\]                 |
| Effective date: \[ 01/02/2026 \]                    |
|                                                     |
| \[ Save Changes \]                                  |
|                                                     |

—----------------------------------------------------------------------------------------------------

- **Payment & Transactions:** includes the following subsections
  - Payment Methods: checkbox option
    - Credit Card: Checkbox to enable credit card payments.
    - Cash: Checkbox to enable cash payments.
    - Gift Cards: Checkbox to enable gift card payments.
    - Others: Checkbox to enable external payments.
  - Tax Settings:
    - Tax: Numeric input for sales tax percentage (e.g., 8% for services and products).
    - Tax Inclusive or Exclusive: Radio buttons to choose whether tax is included in the service/product price or added during checkout.
    - Tax Exemption: Checkbox to select tax-exempt services/products (e.g., medical treatments).
  - Tipping Setting:
    - Tip Acceptance:
      - Radio button: YES / NO to enable the "Ask for Tip" feature.
      - If YES is selected, display the following sections:
    - When Ask for Tip & Signature: Radio button options
      - Sign and leave a tip on the printed receipt.
      - Sign and leave tip before payment
      - Tip before, sign after payment success
    - Tip Options:
      - Description: Configure up to 4 default tip options for customers to select on the terminal during payment, or display these suggestions at the bottom of the printed receipt.
      - Show Tip In: Radio button: % / $.
      - Based on selections, display 4 numeric input boxes (for percentage or fixed amount).
      - Each option can have an optional label
      - Default setup: 15% , 18% , 20% , 25%
    - Tip Payment Method: Allow Tip By: Checkboxes to select applicable payment methods (Card, Cash, Gift Card, Others, etc.).
  - Receipt Setting:
    - Receipt Customize:
      - Receipt Types: Dropdown with options: Order, Gift Card, Gift Card Balance Check, Cancelled, Refund, etc.
      - Receipt Content: Checkbox list. Display based on selected receipt type. User can toggle switch info to show on receipt
    - Receipt Delivery Method: Checkbox list with options: Print paper receipt, Send e-receipt via email, Send e-receipt via phone number
  - Buttons:
    - Save: save all changes but not push the updates to devices
    - Cancel: cancel all changes
    - Publish to all devices: only enable when having any change. There are 2 options: Now or Schedule publish time.

---

_Source: Google Docs — "Merchants Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Order Management

_Linear doc: https://linear.app/fastboy/document/order-management-afeb73979dd4_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **PORTAL DOCUMENTATION: ORDER MANAGEMENT** <document id="633fec43-fcc4-426b-9b95-f3e4263ed237" href="https://linear.app/fastboy/document/order-flow-1bd212f296da">Order Flow</document>

## **1. Tổng quan (Overview)**

Module **Order Management** trên Portal cho phép Admin/Owner theo dõi toàn bộ lịch sử giao dịch diễn ra tại cửa hàng theo thời gian thực. Tại đây, người quản trị có thể tra cứu chi tiết đơn hàng, kiểm tra trạng thái thanh toán và thực hiện các nghiệp vụ xử lý sau bán hàng (Void/Refund) mà không cần thao tác trực tiếp trên máy POS.

## **2. Danh sách đơn hàng (Order Listing)**

### **2.1. Bộ lọc và Tìm kiếm (Filter & Search)**

Giao diện cung cấp các công cụ lọc để Admin nhanh chóng tìm thấy giao dịch cần thiết:

- **Search:** Tìm kiếm theo **Order ID** hoặc **Tên/Số điện thoại khách hàng**.
- **Date Range:** Lọc theo ngày tạo đơn (Created At) hoặc ngày cập nhật trạng thái (Updated At).
- **Payment Method:** Lọc theo hình thức thanh toán (Cash, Card, Gift Card, Other).
- **Status:** Lọc theo trạng thái đơn hàng (Successful, Refunded, Canceled, v.v.).

### **2.2. Thông tin hiển thị (Columns)**

Bảng danh sách hiển thị các thông tin tóm tắt:

- **Order ID:** Mã định danh duy nhất (VD: #OD10023).
- **Date/Time:** Thời gian giao dịch.
- **Customer:** Tên khách hàng (hoặc "Walk-in" nếu không có tên).
- **Total Amount:** Tổng giá trị đơn hàng.
- **Payment Method:** Phương thức thanh toán.
- **Status:** Trạng thái hiện tại (Được mã hóa màu sắc để dễ nhận diện).

---

## **3. Chi tiết đơn hàng (Order Details)** Khi nhấp vào một Order ID, hệ thống hiển thị chi tiết giao dịch bao gồm các phần sau:

### **3.1. Thông tin chung (Order Info)**

- **Order Summary:**
  - Subtotal (Tổng tiền dịch vụ/sản phẩm).
  - Discount (Giảm giá).
  - Tax (Thuế - nếu có).
  - Tip (Tiền boa).
  - **Total (Tổng thanh toán cuối cùng).**
- **Customer Info:** Tên, Số điện thoại, Nhóm khách hàng.

### **3.2. Chi tiết dịch vụ (Service Details)**

Liệt kê các dịch vụ/sản phẩm trong đơn hàng:

- Tên dịch vụ/sản phẩm.
- Nhân viên thực hiện (Staff name).
- Giá tiền: Giá cuối cùng và phần (-số tiền đã giảm/ % đã giảm)

### **3.3. Chi tiết thanh toán (Payment Details)**

Hiển thị lịch sử các lần thanh toán (Checks) trong đơn hàng:

- **Card:** Loại thẻ (Visa/Master...), 4 số cuối (Last 4 digits), Mã giao dịch (Auth Code/Trans ID).
- **Cash:** Số tiền khách đưa và tiền thừa (Change).
- **Gift Card:** Mã thẻ quà tặng đã sử dụng.

### **3.4. Lịch sử hoàn tiền/hủy (Refund/Void Logs)**

Nếu đơn hàng đã bị chỉnh sửa, mục này hiển thị,:

- Người thực hiện (By Staff).
- Thời gian thực hiện.
- Số tiền (Amount).
- Lý do (Reason: Staff mistake, Customer request, v.v.).

---

## **4. Định nghĩa trạng thái đơn hàng (Order Status Definitions)**

Admin cần nắm rõ các trạng thái sau để quản lý đối soát:

| Trạng thái                 | Mô tả                                                                                                 | Hành động cho phép trên Portal                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Successful - Unsettled** | Đơn hàng đã thanh toán nhưng chưa chốt sổ (Batch Close). Thường là các giao dịch trong ngày hiện tại. | View, Void (Cancel), Adjust Tip                               |
| **Successful - Settled**   | Đơn hàng đã hoàn tất và đã chốt sổ (tiền đã về hoặc đang xử lý bank).                                 | View, Refund (Full/Partial).                                  |
| **Canceled (Void)**        | Đơn hàng đã bị hủy toàn bộ giao dịch trước khi chốt sổ.                                               | View Only.                                                    |
| **Refunded**               | Đơn hàng đã được hoàn tiền 100%.                                                                      | View Only.                                                    |
| **Partial Refunded**       | Đơn hàng đã được hoàn tiền một phần.                                                                  | View, Partial Refund.                                         |
| **Refund Issue**           | **Quan trọng:** Giao dịch hoàn tiền qua thẻ bị lỗi từ phía Gateway.                                   | **Retry Refund** (Thực hiện lại lệnh hoàn tiền trên Gateway). |

_Lưu ý: Trạng thái **Refund Issue** là trường hợp đặc biệt chỉ xảy ra với thẻ (Card). Trên POS không thể xử lý lại, bắt buộc Admin phải vào Portal để kiểm tra và Retry lại giao dịch này_ trên Gateway\*.\*

---

## **5. Các tính năng quản trị (Admin Actions)**

Dựa trên trạng thái đơn hàng, Admin có thể thực hiện các hành động sau:

### **5.1. Void Order (Hủy đơn hàng)**

- **Điều kiện:** Chỉ áp dụng cho đơn hàng **Successful - Unsettled**.
- **Tác động:** Hủy toàn bộ giao dịch (Void transaction). Tiền sẽ không bị trừ khỏi thẻ khách hàng (đối với thẻ) hoặc ghi nhận trả lại tiền mặt.
- **Báo cáo:** Ghi nhận trạng thái Canceled, không tính vào doanh thu.

### **5.2. Refund / Partial Refund (Hoàn tiền)**

- **Điều kiện:**
  - Áp dụng cho đơn hàng **Successful - Settled**.
  - Nếu trong 1 Order có credit transaction chưa Batch/Close → disable nút Refund
- **Partial Refund (Hoàn một phần):**
  - Bắt buộc phải chọn service/product (Item) để thực hiện partial refund
  - Nếu chọn All option, tức là chọn hết service trong order đó > thì thực hiện full refund
  - Nếu chọn ít hơn total service > thì thực hiện partial refund
  - **Specical Case: Khi select service để partial refund mà trong order có discount/TAX:** Thì mình cũng sẽ refund trên giá service sau discount, phần discount apply cho order thì mình chia phần trăm tỉ lệ trên từng service, rồi sau refund trên giá đó
  - **Specical Case: nếu 1 cái promotion rule apply là đối với order từ $100 trở lên, nên partial refund sẽ giảm order về dưới $100, thì cái promotion cũ mình nên giữ không?**
    - Promotion vẫn nên giữ, tại vì đúng là đã chốt tại lúc checkout order (settled) rồi > k thay đổi gì cả
- **Quy tắc tiền Tip (Lưu ý quan trọng):**
  - Nếu giao dịch gốc là **Auth** (thường thấy ở nhà hàng/nail salon): Chỉ được hoàn tối đa số tiền gốc (Base Amount), **không hoàn được tiền Tip** khi Partial Refund.
  - Nếu giao dịch gốc là **Sale**: Có thể hoàn cả Tip.
- **Full Refund:** Hoàn trả 100% bao gồm cả Tip và Service Fee.

### **5.3. Adjust Tip**

Adjust Tip: chỉnh sửa lại số tiền Tip sau khi order đã được thanh toán thành công. Thêm action Adjust Tip trong Order Detail đối với những order thỏa điều kiện sau:

- Status của order: **Successful - Unsettled**
- Payment trong order được thanh toán bằng method: **Card / Cash / Other**
- Riêng đối với method Card, status của payment trong order: **Auth**
- Đối với order có nhiều payment method: hiển thị list payment method và phải select 1 payment method cụ thể để thực hiện Adjust Tip

**Lưu ý:**

- Đối với method Gift Card: KHÔNG cho phép Adjust Tip
- Sau khi Adjust TIP, nếu order có nhiều Staff, thì auto update lại Split Tip với tip mới.
- Chỉ cho phép add Tip khi có Staff trong order

### **5.4. Xử lý sự cố giao dịch (Issue Handling)**

- **Retry Refund:** Đối với các đơn hàng có trạng thái **Refund Issue**, Admin sử dụng Portal để gửi lại lệnh hoàn tiền trên Gateway.
- **View Receipt:** Xem và in lại hóa đơn (gửi email cho khách nếu cần).

---

## **6. Logic Báo cáo liên quan (Report Impact)**

Mọi thao tác trên Order Management sẽ ảnh hưởng trực tiếp đến báo cáo tài chính trên Portal,:

- **Net Income** = (Total Sale - Total Refund) - Total Discount + Tip - Gift Card Sale.
- **Amount Collected** (Tiền thực thu) = Card + Cash + Others + Tip.
- **Gift Card Sales:** Doanh thu bán Gift Card chưa được tính là thu nhập (Income) cho đến khi thẻ đó được dùng để thanh toán cho một đơn hàng khác (Redeemed).

---

_Source: Google Docs — "Order Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Portal Order History

_Linear doc: https://linear.app/fastboy/document/portal-order-history-ba2903a15df5_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# Portal Order History — Backend Business Rules

**Audience:** Backend team **Purpose:** Business rules, action conditions, validation logic, and data flows. Backend team decides API/database design.

---

## 1\. Order Status Display

The portal shows these statuses to users. Both `status` and `settled` flag are needed to display correctly:

| Status             | Settled? | Display label          |
| ------------------ | -------- | ---------------------- |
| `successful`       | `false`  | Successful - Unsettled |
| `successful`       | `true`   | Successful - Settled   |
| `canceled`         | —        | Canceled               |
| `canceling`        | —        | Canceling              |
| `cancel_issue`     | —        | Cancel Issue           |
| `refunded`         | —        | Refunded               |
| `partial_refunded` | —        | Partial Refunded       |
| `refund_issue`     | —        | Refund Issue           |
| `refunding`        | —        | Refunding              |
| `re_open`          | —        | Re-opened              |

**Default filter:** Exclude `pending` orders from the list.

---

## 2\. Settled vs. Unsettled — The Critical Distinction

The `settled` flag controls which actions are available. This is a **payment processor constraint**, not just a business rule.

|                      | Unsettled (`settled = false`) | Settled (`settled = true`) |
| -------------------- | ----------------------------- | -------------------------- |
| **Meaning**          | Card batch still open         | Card batch closed          |
| **Cancel/Void**      | Yes                           | No                         |
| **Reopen**           | Yes                           | No                         |
| **Adjust Tip**       | Yes (with conditions)         | No                         |
| **Refund (full)**    | No                            | Yes (with conditions)      |
| **Refund (partial)** | No                            | Yes (with conditions)      |
| **Send Receipt**     | Yes                           | Yes                        |

The portal does NOT control when batches close — this happens automatically (typically daily at the time configured in `merchant_setting.batch_close_time`).

---

## 3\. Order Status Lifecycle

```
                          +-------------------------------------+
                          |                                     |
  +---------+    payment  |  +------------+                     |
  | pending |------------>|  | successful |                     |
  +---------+             |  +-----+------+                     |
                          |        |                            |
               +----------+--------+------------+               |
               |          |        |            |               |
          [unsettled]     |   [settled]    [unsettled]          |
               |          |        |            |               |
               v          |        v            v               |
        +----------+      |  +----------+  +----------+        |
        |canceling |      |  |refunding |  | re_open  |--------+
        +----+-----+      |  +----+-----+  +----------+
             |            |       |          (back to successful
        +----+----+       |  +----+----+     after re-checkout)
        |         |       |  |         |
        v         v       |  v         v
  +----------+ +--------+ | +--------+ +------------------+
  | canceled | |cancel_ | | |refunded| |partial_refunded  |
  +----------+ | issue  | | +--------+ +-------+----------+
               +--------+ |                    |
                           |              [can refund again]
                           |                    |
                           |                    v
                           |              +----------+
                           |              |refunding |--> refunded / partial_refunded
                           |              +----+-----+
                           |                   |
                           |                   v
                           |             +-----------+
                           |             |refund_    |
                           |             |  issue    |
                           |             +-----------+
                           +----------------------------
```

### Transition rules

| From                     | To                 | Trigger                     |
| ------------------------ | ------------------ | --------------------------- |
| `pending`                | `successful`       | Payment completed           |
| `successful` (unsettled) | `canceling`        | Cancel initiated            |
| `successful` (settled)   | `refunding`        | Refund initiated            |
| `successful` (unsettled) | `re_open`          | Reopen initiated            |
| `canceling`              | `canceled`         | Cancel succeeded            |
| `canceling`              | `cancel_issue`     | Cancel failed               |
| `cancel_issue`           | `canceling`        | User retries cancel         |
| `refunding`              | `refunded`         | Full refund succeeded       |
| `refunding`              | `partial_refunded` | Partial refund succeeded    |
| `refunding`              | `refund_issue`     | Refund failed               |
| `partial_refunded`       | `refunding`        | Another refund initiated    |
| `re_open`                | `successful`       | Re-checkout completed       |
| `re_open`                | `canceling`        | User cancels reopened order |

### Transitional state blocking

When an order is in `refunding` or `canceling`, **all actions must be blocked**. The user must wait for the operation to complete or fail before taking another action.

---

## 4\. Action Conditions & Flows

### 4.1 Full Refund

**All conditions must be true:**

| \#  | Condition                                                                          |
| --- | ---------------------------------------------------------------------------------- |
| 1   | Order `settled = true`                                                             |
| 2   | Order `status` is `successful` or `partial_refunded`                               |
| 3   | Order has at least one non-gift-card payment (cannot refund gift-card-only orders) |
| 4   | Order is NOT in a transitional state (`refunding`, `canceling`)                    |
| 5   | User has `refund` permission                                                       |

**Required input:** Reason (see [Section 5](#5-reasons))

**What happens on execution:**

1. Order status changes to `refunding`
2. A refund transaction is created for each original sale transaction, linked via `reference_id`
3. Card transactions: process refund through payment gateway
4. Cash / gift card / other: record the refund (no gateway needed)
5. Each refund transaction amount = original sale amount (excluding tip for card payments)
6. Update `refunded_amount` on all order items
7. Update `refunded_amount` on all tip shares
8. **Success** → status becomes `refunded`
9. **Failure** → status becomes `refund_issue` (no auto-retry, requires manual resolution)

---

### 4.2 Partial Refund

**All conditions must be true:**

| \#  | Condition                                                                  |
| --- | -------------------------------------------------------------------------- |
| 1   | Order `settled = true`                                                     |
| 2   | Order `status` is `successful` or `partial_refunded`                       |
| 3   | The selected transaction exists on this order                              |
| 4   | The selected transaction has remaining refund balance > 0                  |
| 5   | If card payment: card batch must be closed (`batch_closed_at` is not null) |
| 6   | Refund amount > 0                                                          |
| 7   | Refund amount <= remaining balance                                         |
| 8   | Order is NOT in a transitional state                                       |
| 9   | User has `refund` permission                                               |

**Required input:** Transaction ID, refund amount (integer cents). Reason is optional.

**Remaining balance calculation:**

- **Card payments:** `remaining = original_amount - original_tip - SUM(previous refunds on this transaction)`
  - Card refunds exclude the tip portion from the refundable amount
- **Cash / gift card / other:** `remaining = original_amount - SUM(previous refunds on this transaction)`

"Previous refunds" = all transactions where `reference_id` points to the target transaction and `transaction_type = 'refund'`.

**Condition 5 — batch not closed error message:**

"The transaction batch is not closed. Refund not available until batch is closed."

**What happens on execution:**

1. Order status changes to `refunding`
2. A single refund transaction is created, linked to the target transaction via `reference_id`
3. **Success** → status becomes `partial_refunded`
4. **Failure** → status becomes `refund_issue`

**Note:** A `partial_refunded` order can be refunded again for remaining balances on any transaction, following the same flow.

---

### 4.3 Cancel / Void

**All conditions must be true:**

| \#  | Condition                                                                        |
| --- | -------------------------------------------------------------------------------- |
| 1   | Order `settled = false`                                                          |
| 2   | Order `status` is `successful`, `pending`, `partial_refunded`, or `cancel_issue` |
| 3   | Order is NOT in a transitional state (except `cancel_issue` which allows retry)  |
| 4   | User has `cancel_order_void` permission                                          |

**Required input:** Reason (see [Section 5](#5-reasons))

**What happens on execution:**

1. Order status changes to `canceling`
2. All sale transactions are voided — a new void transaction is created for each, linked via `reference_id`
3. Card transactions: process void through payment gateway
4. **Success** → status becomes `canceled`
5. **Failure** → status becomes `cancel_issue`

**Cancel vs. Refund:** Cancel/void is for **unsettled** orders (batch still open, transactions can be reversed). Refund is for **settled** orders (batch closed, requires a new reverse transaction). This is a payment processor constraint.

**Retry:** `cancel_issue` can be retried from the portal (goes back to `canceling`). `refund_issue` **cannot** be retried from the portal — requires manual resolution.

---

### 4.4 Reopen Order

**All conditions must be true:**

| \#  | Condition                                   |
| --- | ------------------------------------------- |
| 1   | Order `settled = false`                     |
| 2   | Order `status` is `successful` or `re_open` |
| 3   | User has `edit_order` permission            |

If status is already `re_open`, the button label should be "Continue Re-open" instead of "Re-Open Order".

**What happens on execution:**

1. Order status changes to `re_open`
2. Order enters edit mode where the user can:
   - Add / remove / modify line items (service, price, staff assignment, discount)
   - Adjust order-level amounts (subtotal, tax, total, discount, tip)
   - Update notes
3. Order stays in `re_open` until payment is reprocessed → then back to `successful`

---

### 4.5 Adjust Tip

**All conditions must be true:**

| \#  | Condition                                              |
| --- | ------------------------------------------------------ |
| 1   | Order `settled = false`                                |
| 2   | Order `status` is `successful`                         |
| 3   | Merchant's tip timing is configured as `AFTER_PAYMENT` |
| 4   | Order has at least one assigned staff member           |
| 5   | User has `adjust_tip` permission                       |

**Required input:** Transaction ID, new tip amount, split tip will auto convert to `evenly`.

**What happens on execution:**

1. Selected transaction's tip amount is updated
2. Order's total `tip_amount` is recalculated (SUM of all transaction tips)
3. Tip share records are updated based on split method:
   - **Evenly** — tip divided equally among all staff on the order
   - **Proportional** — tip divided based on each staff's service price proportion (`staff's total final_price / order subtotal`)
   - **Manual** — user-specified amounts per staff (must sum to the new tip total)
4. Order's `tip_split_method` is updated

---

### 4.6 Send Receipt

**Conditions:** Any order, any status. User needs `view_orders` permission.

**Required input:** Delivery method (`email` or `sms`) and recipient.

**Validation:**

- Email: valid email format
- SMS: valid phone number (10+ digits)

Pre-fill recipient with the customer's email/phone if available.

---

### 4.7 Export

**Conditions:** Available on the order list view. User needs `export_orders` permission.

**Input:** Current filter state + format choice (`csv` or `pdf`)

**Export columns:** Order Code, Date/Time, Location, Status (including settled/unsettled for successful), Total, Tip, Payment Method(s), Staff Name(s), Customer Name.

---

## 5\. Reasons

Both refund and cancel share the same reason list:

| Value                      | Display label            |
| -------------------------- | ------------------------ |
| `customer_request`         | Customer Request         |
| `service_issue`            | Service Issue            |
| `incorrect_order`          | Incorrect Order          |
| `duplicate_payment`        | Duplicate Payment        |
| `promotion_discount_error` | Promotion/Discount Error |
| `staff_mistake`            | Staff Mistake            |
| `other`                    | Other                    |

- **Required** for: Full refund, Cancel/void
- **Optional** for: Partial refund

---

## 6\. Permission Matrix

| Action                   | Permission key      |
| ------------------------ | ------------------- |
| View order list & detail | `view_orders`       |
| Full refund              | `refund`            |
| Partial refund           | `refund`            |
| Cancel/void              | `cancel_order_void` |
| Reopen order             | `edit_order`        |
| Adjust tip               | `adjust_tip`        |
| Send receipt             | `view_orders`       |
| Export orders            | `export_orders`     |

If the user lacks a permission, the action button is hidden.

---

## 7\. Multi-Location

- A portal user can access **multiple** store locations
- Default view: all orders across all accessible locations
- Location filter narrows to a specific store
- Each order belongs to exactly one location
- If user requests an order from a location they don't have access to, treat as not found

---

## 8\. Order List Filters & Search

| Filter                   | Behavior                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Search by order code** | Partial match, case-insensitive                                                                                           |
| **Search by customer**   | Match on customer name, phone, or email                                                                                   |
| **Location**             | Single-select from user's accessible locations                                                                            |
| **Status**               | Multi-select. `Successful - Settled` and `Successful - Unsettled` are separate options (differentiated by `settled` flag) |
| **Payment method**       | Multi-select: Card, Cash, Gift Card, Other                                                                                |
| **Staff**                | Multi-select: orders where any item was assigned to selected staff                                                        |
| **Date range**           | Presets: Today, Yesterday, Last 7 days, Last 30 days, This month. Also custom range.                                      |
| **Sort by**              | Created date (default) or Updated date. Ascending or descending.                                                          |

**Pagination:** 20 orders per page. Default sort: newest first by created date.

---

## 9\. Issue Status Handling

| Status         | Can retry from portal?                             | Resolution                                           |
| -------------- | -------------------------------------------------- | ---------------------------------------------------- |
| `cancel_issue` | **Yes** — user can retry, goes back to `canceling` | Portal retry or manual resolution                    |
| `refund_issue` | **No** — cannot retry from portal                  | Requires manual resolution via support or POS device |

Both issue statuses should display a message explaining what went wrong.

---

## 10\. Audit Log

This is **new for the portal** — the POS does not have an audit log.

Every action on an order should be logged with:

- **What** happened (action label)
- **Who** did it (staff name, portal user name, or "System")
- **Where** it was done from (`pos` or `portal`)
- **When** it happened
- **Context** (refund amount, reason, etc.)

### Actions to log

| Action                     | When                                  |
| -------------------------- | ------------------------------------- |
| `created`                  | Order first created                   |
| `payment_completed`        | Payment processed successfully        |
| `settled`                  | Batch settled                         |
| `refund_initiated`         | User starts a refund                  |
| `refund_completed`         | Refund succeeds                       |
| `refund_failed`            | Refund fails                          |
| `partial_refund_completed` | Partial refund succeeds               |
| `cancel_initiated`         | User starts a cancel                  |
| `cancel_completed`         | Cancel succeeds                       |
| `cancel_failed`            | Cancel fails                          |
| `reopened`                 | Order reopened for editing            |
| `order_updated`            | Reopened order items/amounts modified |
| `tip_adjusted`             | Tip amount changed                    |
| `receipt_sent`             | Receipt emailed or SMS'd              |

Entries are displayed chronologically (oldest first) in the order detail view.

---

## 11\. Transaction Reference Chain

When a refund or void happens, a new transaction record is created with:

- `transaction_type`: `refund` or `void`
- `reference_id`: points to the original `sale` transaction

This chain enables:

- Tracking which payment was refunded/voided
- Calculating remaining refund balance per transaction
- Grouping related transactions in the detail view (original sale + all its refunds/voids shown together)

---

## 12\. Money Rules

- All amounts stored as **integer cents** (e.g., $50.00 = `5000`)
- Never use floating point for money calculations
- Currency code accompanies all amounts
- Frontend displays using `money()` helper

---

## 13\. Tip Split Methods

| Method           | Calculation                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Evenly**       | Equal share to all staff on the order                                                        |
| **Proportional** | Based on each staff's service price relative to total (`staff_final_price / order_subtotal`) |
| **Manual**       | Specific amounts assigned per staff by the user                                              |

---

## 14\. POS Parity Notes

The portal and POS both operate on the same cloud database. Key consistency requirements:

1. **Same data shape** — Refund/cancel results must be identical whether initiated from POS or portal (same transaction records, same status transitions, same `refunded_amount` updates).
2. **Status values are exact lowercase strings** — `pending`, `successful`, `canceled`, `canceling`, `cancel_issue`, `refunded`, `partial_refunded`, `refund_issue`, `refunding`, `re_open`.
3. **Settled flag** is set to `true` when the card batch closes (a payment processor operation). Neither POS nor portal controls when this happens.
4. **Tip adjustments** must update: the transaction's `tip`, the order's `tip_amount`, and the `order_tip_share` records — same as POS does.

---

## 15\. Summary of Action Eligibility (Quick Reference)

| Action               | Settled? | Allowed statuses                                            | Extra conditions                                     |
| -------------------- | -------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **Refund (full)**    | Yes      | `successful`, `partial_refunded`                            | Not gift-card-only                                   |
| **Refund (partial)** | Yes      | `successful`, `partial_refunded`                            | Transaction has remaining balance; card batch closed |
| **Cancel/Void**      | No       | `successful`, `pending`, `partial_refunded`, `cancel_issue` | —                                                    |
| **Reopen**           | No       | `successful`, `re_open`                                     | —                                                    |
| **Adjust Tip**       | No       | `successful`                                                | Tip timing = AFTER_PAYMENT; has staff                |
| **Send Receipt**     | Any      | Any                                                         | Valid email or phone                                 |
| **Export**           | Any      | Any                                                         | —                                                    |

---

_Source: Google Docs — "Portal Order History" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Portal Support – Edit Completed Order

_Linear doc: https://linear.app/fastboy/document/portal-support-edit-completed-order-314443cfc00f_

# Order Correction Policy

Để hỗ trợ xử lý các sai sót sau khi đơn hàng đã hoàn thành, đội ngũ Support có thể giúp chỉnh sửa một số thông tin trên Order theo các điều kiện bên dưới.

## Điều kiện áp dụng

Support chỉ có thể hỗ trợ chỉnh sửa các đơn hàng:

- Successful - Unsettled
- Successful - Settled
- Partial Refund

Không hỗ trợ chỉnh sửa các đơn hàng:

- Void
- Refund

Ngoài ra, đơn hàng chỉ có thể được chỉnh sửa trước khi kỳ lương của nhân viên được chốt và in check.

---

# Những thông tin có thể chỉnh sửa

## 1. Thông tin khách hàng

Support có thể hỗ trợ:

- Gắn khách hàng vào Order
- Thay đổi khách hàng của Order
- Gỡ khách hàng khỏi Order

Lưu ý:

- Điểm thưởng và lịch sử chi tiêu của khách hàng có thể được cập nhật lại sau khi thay đổi.
- Nếu đơn hàng đã sử dụng Reward hoặc Loyalty Program, một số quyền lợi có thể bị ảnh hưởng.

---

## 2. Dịch vụ (Services)

Support có thể hỗ trợ:

- Thêm dịch vụ
- Xóa dịch vụ
- Thay đổi dịch vụ
- Chỉnh sửa số lượng dịch vụ
- Chuyển dịch vụ sang nhân viên khác

Lưu ý:

- Một số thay đổi có thể làm ảnh hưởng đến doanh thu và thu nhập của nhân viên trong kỳ lương hiện tại.

---

## 3. Giá dịch vụ hoặc sản phẩm

Support có thể hỗ trợ chỉnh sửa giá của:

- Service
- Product

Ví dụ:

- Nhập sai giá dịch vụ
- Chọn nhầm bảng giá
- Điều chỉnh giá theo yêu cầu của chủ tiệm

---

## 4. Phương thức thanh toán

Support có thể hỗ trợ thay đổi giữa:

- Cash
- Gift Card
- Other

Không hỗ trợ thay đổi các giao dịch đã thanh toán bằng Card.

Ví dụ:

✅ Cash → Gift Card

✅ Gift Card → Cash

✅ Cash → Other

❌ Card → Cash

❌ Card → Gift Card

❌ Card → Other

---

## 5. Tiền Tip

Support có thể hỗ trợ chỉnh sửa Tip đối với:

- Cash
- Gift Card
- Other

Không hỗ trợ chỉnh sửa Tip đối với các giao dịch đã thanh toán bằng Card.

---

## 6. Discount

Support có thể hỗ trợ chỉnh sửa Discount trên từng Service hoặc Product.

Ví dụ:

- Thêm Discount cho một Service cụ thể
- Xóa Discount khỏi một Service
- Chỉnh sửa Discount của một Product

Không hỗ trợ chỉnh sửa:

- Discount áp dụng trên toàn bộ Order
- Reward Redeem
- Loyalty Redeem
- Membership Discount

---

# Một số lưu ý quan trọng

## Đối với đơn hàng thanh toán bằng Card

Để đảm bảo tính chính xác của giao dịch ngân hàng:

- Không thể thay đổi số tiền đã thanh toán
- Không thể thay đổi Tip
- Không thể chuyển sang phương thức thanh toán khác

---

## Đối với đơn hàng thanh toán bằng Gift Card

Support có thể hỗ trợ cập nhật thông tin Order.

Tuy nhiên nếu thay đổi liên quan đến Gift Card, đội ngũ Support có thể cần thực hiện các bước điều chỉnh số dư Gift Card tương ứng.

---

# Sau khi chỉnh sửa

Sau khi Order được cập nhật:

- Doanh thu sẽ được cập nhật lại
- Báo cáo dịch vụ sẽ được cập nhật lại
- Báo cáo nhân viên sẽ được cập nhật lại
- Điểm thưởng và lịch sử khách hàng có thể được cập nhật lại

Tất cả các thay đổi đều được lưu lại để phục vụ việc kiểm tra và hỗ trợ sau này.

---

# Portal Access Control & Authorization

_Linear doc: https://linear.app/fastboy/document/portal-access-control-and-authorization-5b0a253f7223_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **Portal Access Control & Authorization**

## **1. Overview**

### **1.1 Background**

Portal là hệ thống dùng để:

- Quản lý merchant POS
- Onboard merchant
- Vận hành và support merchant

Hiện tại chưa có cơ chế phân quyền rõ ràng, dẫn đến:

- User có thể truy cập quá nhiều hoặc sai dữ liệu
- Khó kiểm soát thao tác nhạy cảm
- Không audit được thay đổi

### **1.2 Objective**

Xây dựng hệ thống **Access Control** đảm bảo:

- Phân quyền theo role
- Giới hạn truy cập theo merchant
- Hỗ trợ 2 nhóm user: Internal & External
- Hỗ trợ extra permission ở cấp user
- Permission đơn giản, dễ quản lý (hardcode)
- Có audit log cho các hành động quan trọng

---

## **2. Definitions**

| Term             | Description                                  |
| ---------------- | -------------------------------------------- |
| Permission       | Quyền thực hiện 1 action cụ thể              |
| Role             | Tập hợp các permission                       |
| Extra Permission | Permission được add thêm cho user ngoài role |
| Merchant Access  | Quyền truy cập vào merchant                  |
| Merchant Context | Merchant mà user đang thao tác               |
| Internal User    | User nội bộ Fastboy                          |
| External User    | User thuộc merchant                          |

---

## **3. User Scope**

## **3.1 Internal User**

### **Definition**

- Email domain: @[fastboy.net](http://fastboy.net)
- Login bằng Google SSO

### **Capabilities**

- Được assign:
  - Role
  - Merchant access (1 hoặc nhiều merchant)
  - Extra permission

### **Constraints**

- Chỉ truy cập được merchant được assign
- Permission giống nhau trên tất cả merchant

## **3.2 External User**

### **Definition**

- User thuộc merchant
- Truy cập qua Business App

### **Default Roles:** Owner / Manager / Partner / Staff

### **Capabilities**

- Có thể thuộc nhiều merchant
- Có role + extra permission
- Permission giống nhau trên tất cả merchant

---

## **4. Permission Model**

## **4.1 Permission**

### **Characteristics**

- Được hardcode bởi dev
- Không tạo từ UI
- Format: module.action

### **Example**

- merchant.view
- merchant.edit
- report.view
- report.export
- staff.manage

## **4.2 Role**

### **Characteristics**

- Là tập hợp permission
- Được quản lý tại Role level
- Không chỉnh trực tiếp trên user

## **4.3 Extra Permission (User-level)**

### **Supported Actions**

- Add extra permission
- Remove extra permission đã add

### **Not Supported**

- Không được remove permission từ role
- Không có negative permission

## **4.4 Effective Permission**

**Effective Permission = Role Permission + Extra Permission**

---

## **5. Merchant Access Model**

## **5.1 Separation of Concern**

| Layer           | Purpose                    |
| --------------- | -------------------------- |
| Merchant Access | User vào được merchant nào |
| Permission      | User làm được gì           |

## **5.2 Rules**

- User có thể thuộc nhiều merchant
- Permission không cấu hình theo merchant
- Permission áp dụng đồng nhất cho tất cả merchant

## **5.3 Merchant Context**

Mọi request phải:

- Xác định merchant_id
- Check user có access merchant đó
- Apply permission của user

## **5.4 Merchant Switching**

### **Behavior**

- Nếu user có 1 merchant → auto select
- Nếu nhiều → show merchant selector
- Cho phép switch merchant

---

## **6. Authentication & Access Flow**

## **6.1 Internal**

- Login bằng Google SSO
- Validate domain @fastboy.net

## **6.2 External**

- Truy cập từ Business App / QR
- Xác thực qua token/session

## **6.3 Authorization Flow**

- Authenticate user
- Xác định merchant context
- Check merchant access
- Load role + extra permission
- Check permission
- Allow / Deny

---

## **7. User Management**

## **7.1 Internal User Management**

### **Attributes**

- Name
- Email
- Role
- Merchant Access (multi)
- Extra Permission
- Status (Active / Disabled)

## **7.2 External User Management**

### **Attributes**

- Name
- Role
- Merchant Access (multi)
- Extra Permission
- Status

---

## **8. UI/UX Requirements (CRITICAL)**

## **8.1 Permission Display Structure**

UI phải tách rõ 2 phần:

### **A. Role Permission (Read-only)**

- Hiển thị permission từ role
- Không cho edit
- Label: **“From Role”**

### **B. Extra Permission (Editable)**

- Hiển thị permission có thể add
- Checkbox để add/remove
- Label: **“Custom”**

## **8.2 UI Rules**

- **Không hiển thị duplicate -** Permission đã có trong role → không hiển thị ở extra
- **Không cho remove role permission -** Không cho phép remove permission từ role
- **Group permission -** gom permission theo từng feature lớn để dễ handle (Merchant/Staff/Report…)
- **Visual distinction**
- Role permission → màu xám / disabled
- Extra permission → màu xanh / editable

## **8.3 Optional UX Enhancements**

- Search permission name / role name
- Tooltip giải thích hoặc description của từng permission
- Select all theo group

---

## **9. Audit Log**

## **9.1 Scope**

Log các action:

- Login (success / fail)
- Assign role
- Change role
- Add/remove merchant access
- Add/remove extra permission
- Enable/disable user
- Export data
- Edit merchant
- Onboard merchant
- …

## **9.2 Log Fields**

- actor_id
- actor_type (internal / external)
- merchant_id
- action
- target_type
- target_id
- before_data
- after_data
- timestamp

---

## **10. Business Rules**

1.  Permission được hardcode
2.  Role là nguồn permission chính
3.  User chỉ có thể add/remove extra permission
4.  Không được revoke permission từ role
5.  Permission không cấu hình theo merchant
6.  User có thể thuộc nhiều merchant
7.  Permission giống nhau trên tất cả merchant
8.  User chỉ truy cập merchant được assign
9.  Mọi action liên quan đến access control phải được audit log
10. Mọi API phải check merchant context
11. Không hỗ trợ permission khác nhau giữa các merchant cho cùng 1 user

---

## **11. Open Items (Future)**

- Internal invite flow
- External invite flow
- Permission dependency validation
- Advanced security (MFA, device control)

---

## **12. Permission List**

[https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=284235142#gid=284235142](https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=284235142#gid=284235142)

---

_Source: Google Docs — "Portal Access Control & Authorization" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Customer Management

_Linear doc: https://linear.app/fastboy/document/customer-management-5a2f35d3c8fc_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

1. **Tổng quan**

Customer Management cho phép Admin (toàn hệ thống) và Merchant:

- Xem danh sách customer theo từng merchant
- Xem order history
- Quản lý Loyalty (chỉnh điểm thủ công)
- Xem lịch sử thay đổi điểm
- Tier được auto tính theo rule
- Customer unique theo phone number trong từng merchant.

2. **Cấu trúc menu**

- Gồm 3 phần chính:
  - Customer List
  - Customer Detail
    - Profile tab
    - Order History tab
    - Points History tab

3. **Customer Listing Page**

- Column hiển thị:
  - Name
  - Phone (unique – không cho edit)
  - Email
  - Total Visit
  - Current Points
  - Cashback Balance: số tiền tích được từ Cashback
  - ~~Tier~~
  - Last Visit Date
  - Action: View Detail
- Search: Search theo Phone / Name
- Filter: Filter theo: Tier / Last Visit Date (date range)
- Sort mặc định theo Created At (DESC)

4. **Customer Detail Page**

Khi click vào 1 customer, sẽ chia thành 3 tabs như sau:

- **Profile tab**
  - Hiển thị:
    - Customer Name (editable)
    - Phone (read-only)
    - Email (editable)
    - Total Visit (editable)
    - Current Points (editable)
    - Reward balance: số tiền tích được từ Cashback
    - Tier (editable)
    - Birthday (editable)
    - Note (editable)
    - Created At
  - Rule\*\*:\*\* Khi update
    - Lưu Audit Log
    - Không gửi notification
    - Không cho update Phone
- **Order History tab**
  - Default hiển thị đơn hàng trong 30 ngày gần nhất
  - Chỉ View
  - Không có action (refund, edit, etc.)
  - Có thể paginate nếu nhiều đơn
  - Gồm những thông tin sau:
    - Checkin At
    - Checkout At
    - Point: số điểm ngay sau khi checkout order success
    - Reward/Discount: total amount được Reward/Discount trong order
    - Checkout By: staff thực hiện complete order
    - Staff: staff trong order
    - Services/Products: list service/product trong order
- **Points History tab**
  - Current Points
  - Tier (auto tính, read-only)
  - Data table gồm những column:
    - Content: gồm những loại sau
      - Complete order #ODcode
      - Reward title: số điểm được redeem từ Reward nào
      - Update point: Manual Adjustment từ Volt POS
      - Update point: Manual update từ DTS
    - Action Type:
      - Redeem: số điểm được redeem từ Reward
      - Checkout: được cộng Point sau khi Complete order
      - Review (Pending - new feature)
      - Update: volt_pos_update update manual từ Portal (Manual Adjustment)
      - Update: chủ tiệm update Point từ Admin POS DTS
    - Points: số điểm cộng hay trừ từ những action trên
    - Update By:
      - Account email: đối với Volt POS update từ portal
      - System: dành cho những casecòn lại
    - Updated At (datetime)

| Content                        | Action Type                    | Point | Updated By             | Updated At |
| ------------------------------ | ------------------------------ | ----- | ---------------------- | ---------- |
| Redeem: Free Gel Manicure      | Redeem                         | +20   | System                 |            |
| Complete order #OD20260315-001 | Checkout                       | +50   | System                 |            |
| Update point (-5)              | Manual Adjustment              | \-5   | User đang login Portal |            |
| Update point (+5)              | Update                         | +5    | System                 |            |
| \*                             | Review (Pending - new feature) | \*    | \*                     |            |

5. **Points History - Loyalty Logic:**

- **Points Adjustment: Admin hoặc Merchant được phép update trực tiếp Point từ Portal**
  - Nhập số điểm >= 0, không cho tổng điểm âm
  - Nếu muốn trừ quá số hiện tại → chỉ được đưa về 0
- **Points Adjustment Rules**
  - Không cần nhập Reason
  - Không gửi notification
  - Bắt buộc lưu Points History Log

6. **Tier Logic**

- **Tier gồm:**
- New: Visit Count = 1 & Last Visit < 14 Days
- At Risk: Khác VIP & Last Visit > 60 Days
- Regular: Khác VIP & Visit Count > 2 & Last Visit < 14 Days
- Vip: 10 Visit Count hoặc 1000 Point
- Normal: Visit Count = 0 hoặc Last Visit > 15 Days và Last Visit < 60
- Import: Customer Import lần đầu
- Booking: Customer Booking lần đầu
- **Rule:**
  - Tier auto tính
  - Không cho chỉnh tay
  - Không cho override rule
  - Khi point/visit count thay đổi → tier tự động update theo rule system

7. **Customer Group Management**

Là một tab trong menu Customer

**Mục tiêu:** Cho phép tạo và quản lý các **Customer Group** để phục vụ cho việc quản lí khách và chọn nhóm khách hàng khi tạo Campaign. Campaign sẽ được gửi đến các customer thuộc những group đã chọn.

Gồm những thông tin sau:

1. **Customer Group Listing**

Hiển thị danh sách Customer Group dưới dạng table, gồm các cột:

- Group Name
- Description
- Total Customers
- Created At
- Action: View / Edit / Delete

Các chức năng hỗ trợ:

- Search theo **Customer Group Name**
-

## Button: **Create Group**

2. **Create Customer Group**

Khi click **Create Group**, mở modal:

**Title:** Create Customer Group

**Fields:**

- **Group Name** _(required)_
- **Description** _(optional)_

**Buttons:**

- Cancel
- Create Group

**Validation:**

-

## Không cho phép tạo group nếu chưa nhập **Group Name**

3. **Update Customer Group**

Khi click **Edit**, mở modal:

**Title:** Update Customer Group

**Fields:**

- **Group Name** _(required)_
- **Description** _(optional)_

**Buttons:**

- Cancel
- Update Group

**Validation:**

-

## Không cho phép update nếu **Group Name** để trống

4. **Delete Customer Group**

Khi click **Delete**, mở modal confirm:

**Title:** Delete Customer Group

**Description:**  
 Are you sure you want to delete this customer group? This action will remove the group only. Customers currently in this group will not be deleted from the system.

**Buttons:**

- Cancel
- Delete Group

**Validation:** nếu group đang có customer vẫn cho phép xóa bình thường, và customer không còn group đó nữa thôi (đối với customer, group là optional)

---

5. **View Customer Group Detail**

Khi click **View**, hiển thị thông tin chi tiết của group gồm:

**Group information:**

- **Group Name**
- **Description**
- **Total Customers**

**Customer listing** trong group, gồm các cột:

- Name
- Phone
- Email
-

## Added At

6. **Manage Group Members**

   **Add Member**

Action: **Add Member**

Khi chọn **Add Member**:

- Hiển thị danh sách **Customer đang có trong hệ thống nhưng chưa thuộc group hiện tại**
- Cho phép chọn một hoặc nhiều customer để add vào group

  **Remove Member**

Action: **Remove Member**

- Mỗi customer trong group có checkbox để chọn
- Merchant chọn một hoặc nhiều member, sau đó click **Remove Member** để xóa khỏi group
-

## Action này chỉ xóa customer khỏi group, **không xóa customer khỏi hệ thống**

7. **Business Purpose**

- Merchant có thể chủ động phân loại customer theo từng mục đích chăm sóc hoặc marketing
- Khi tạo **Campaign**, merchant có thể chọn một hoặc nhiều **Customer Group** làm đối tượng nhận campaign
-

## Hệ thống sẽ gửi campaign đến toàn bộ customer thuộc các group đã chọn

8. **Cashback History**

Lưu lại Cashback log khi có sự thay đổi số dư của ví cashback, gồm những thông tin sau:

- Date/Time: order create date/time
- Type: Earn / Redeem / Reverse / Restore
- Amount: được cộng trừ
- Balance: số tiền tích luỹ được ở thời điểm đó
- Order: số tiền được cộng/trừ từ order ID nào
- Description: mô tả chi tiết action được cộng/trừ cashback
- Sort: default DESC theo Date/Time

VD cho những case cụ thể:

- Re-open Order:

| Time  | Type    | Amount | Balance | Order | Description                      |
| ----- | ------- | ------ | ------- | ----- | -------------------------------- |
| 10:00 | Earn    | +5     | 5       | #1001 | Earn cashback                    |
| 10:10 | Reverse | \-5    | 0       | #1001 | Re-open order → reverse cashback |
| 10:15 | Earn    | +3     | 3       | #1001 | Recalculated cashback            |

- Full Refund:

| Time  | Type    | Amount | Balance | Order | Description                         |
| ----- | ------- | ------ | ------- | ----- | ----------------------------------- |
| 09:00 | Earn    | +5     | 5       | #1001 | Earn cashback                       |
| 09:30 | Redeem  | \-3    | 2       | #1002 | Redeem cashback                     |
| 10:00 | Reverse | \-5    | \-3     | #1001 | Full refund → reverse earn          |
| 10:00 | Restore | +3     | 0       | #1002 | Refund Order #1001 → restore redeem |

---

_Source: Google Docs — "Customer Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Promotion Management

_Linear doc: https://linear.app/fastboy/document/promotion-management-08b531d2158d_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Promotion Management Page**

- **Mục tiêu:** Xây dựng một trang quản lý Promotion cho tiệm Nail, cho phép:
- Tạo và quản lý các chương trình khuyến mãi
- Tự động áp dụng vào POS khi phù hợp
- Theo dõi lịch sử sử dụng và doanh thu từ promotion
- **Đối tượng sử dụng:**
- Chủ tiệm (Merchant)
- Admin (hỗ trợ vận hành)
- **Phạm vi:** Page gồm 4 nhóm chính:
- Promotion (giảm giá trực tiếp)
- Rewards (dùng điểm để đổi ưu đãi)
- Reminder (nhắc khách quay lại)
- Birthday (ưu đãi sinh nhật)
- **Tổng quan UI/UX**
- 1 màn hình duy nhất, chia thành 4 tab: Promotion | Rewards | Reminder | Birthday
- Mỗi tab gồm:
  - Danh sách (list view)
  - Filter theo status và thời gian
  - Create / Edit / Duplicate (làm sau)
  - View Usage History

1. **Promotion**

- Mô tả: Giảm giá trực tiếp trên toàn bộ bill
- POS Behavior:
  - Áp dụng cho toàn bộ bill
  - Hiển thị danh sách promotion hợp lệ tại màn hình checkout
  - Không hiển thị nếu không thỏa điều kiện
  - Highlight promotion "tốt nhất" (discount cao nhất) (nếu làm được)
  - Cho phép user chọn 1 promotion trên 1 order
- Rule:
  - Mỗi order chỉ áp dụng 1 promotion
  - Có thể thay đổi trước khi checkout
  - Sau khi checkout: Promotion bị lock
  - Khi reopen order: Không cho thay đổi hoặc thêm promotion mới
- Giao diện: sẽ bao gồm những thông tin sau:

1. **Promotion listing: gồm những thông tin sau**

- Campaign Name: tên promorion
- Offer: giảm giá bao nhiêu % order hay fixed amount
- Target Audience: group customer được apply promotion
- Schedule: thời điểm gửi thông tin promotion cho customer qua sms/email (có thể hiểu là Date Send)
- Valid Period: khoảng thời gian có thể sử dụng promotion
- Action: Update
- Button: Add New
- Filter:
  - Status: Active/Expired. Default Active
  - Campaign Name
- Sort: default desc theo Schedule

2. **Promotion Detail:** sau khi click vào một promotion, sẽ show những thông tin sau

- Campaign Name
- Campaign Info:
  - Offer
  - Created: Thời gian tạo promotion này
  - Valid Period: Khoảng thời gian áp dụng promotion này.
  - Send To: list customer group - Group khách hàng nhận được tin nhắn
- Performance:
  - Total Delivery: Email / SMS / Total - Tổng số lượng SMS và Email đã gửi
  - Redemption: số tiền promotion đã được apply vào tất cả order, quy ra số tiền
  - Conversion Rate (%) = Total Delivery / Redemption \* 100
    - Tỉ lệ sử dụng chiếm bao nhiêu % trên tổng income của tất cả order
  - Income: Tổng số tiền khách trả của những orders có redeem promotion này
  - Redemption amount: Tổng số tiền đã giảm
- Customers Who Used This Offer - danh sách customer đã sử dụng promotion
  - #: số thứ tự
  - Name: customer name
  - Phone: customer phone
  - Used Total: số lượng promotion mà customer này đã sử dụng
  - Income: Tổng số tiền khách đã trả của những orders có redeem promotion này
  - Redemption amount: Tổng số tiền khách đã được giảm

3. **Add New Promotion:** click sẽ mở dialog

- Title: Add New Campaign
- **Campaign Type**: Promotion | Rewards | Reminder | Birthday > chọn Promotion thì sẽ show list action bên dưới
- **Campaign Detail:**
  - Campaign Name: max 50 characters
  - What do you want to offer? - phần trăm trên tổng order hoặc fixed amount sẽ được apply cho order
    - Nhập số %
    - Nhập amount
  - Message to show customer: field nhập nội dung của campain, max 80 characters.
  - Reply STOP to opt out: checkbox
    - Check:
      - Show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo promotion này về số phone nữa
    - Uncheck:
      - Không show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo promotion này về số phone nữa ????
  - Valid: MM/DD/YYYY: checkbox
    - Check: Show thêm text "Valid: MM/DD/YYYY" trong Message to show customer. Ngày này lấy từ End Date của field **How long to offer?**
    - Uncheck: không show thêm text "Valid: MM/DD/YYYY" trong Message to show customer
- **Usage Limit:** Toggle - Promotion for one time use only
  - Enable: 1 customer chỉ được sử dụng promotion này 1 lần
  - Disable: 1 customer có thể dùng promotion này nhiều lần cho nhiều order, 1 order chỉ apply 1 promotion.
- **Who to Send To:**
  - Checkbox option
  - Tất cả các group customer đang có trong hệ thống. Và 1 option All để chọn tất cả
- **Campaign Schedule**
  - How long to offer? - Khoảng thời gian có hiệu lực sử dụng promotion
    - Start Date
    - End Date
  - When to send? - Thời điểm gửi thông tin promotion này ra cho customer
    - Date
    - Time:
      - Chỉ cho phép chọn từ 8:00 đến 20:00 để gửi
      - Description:
        - _Submission time must be between 8:00 and 20:00_
        - _TCPA Compliance Notice : Promotional SMS messages are legally restricted under the Telephone Consumer Protection Act (TCPA). Messages may only be sent between 8:00 AM – 8:00 PM (recipient's local time). Sending messages outside this window may result in legal penalties of $500–$1,500 per message, and Fastboy is not responsible for violations caused by user action._
    - Sent Immediately: checkbox
      - Send ngay lập tức sau khi tạo promotion thành công
      - Nếu chọn option này thì disable 2 fields Date - Time, k cần chọn nữa
- **Test & Finalize**: test trước nội dung gửi ra cho customer
  - Phone number
    - Field nhập số phone, placeholder: _Enter phone number for test_
    - Button: Test Now
  - Email
    - Field nhập email, placeholder: _Enter email for test_
    - Button: Test Now
- Button:
  - Add: tạo promotion
  - (X): thoát khỏi form tạo promotion
- Một số lưu ý:
  - Không cho phép chọn **How long to offer?** thuộc thời điểm trong quá khứ
  - Không cho phép chọn **When to send?** thuộc thời điểm trong quá khứ và sau thời gian End Date của promotion

4. **Update Promotion**

- Chỉ được update promotion nếu promotion chưa đến thời gian schedual và chưa gửi thông tin ra cho Customer
- Nếu Promotion đã chạy, disable Save button và view only
- Nếu thỏa điều kiện được update, thì cho phép update tất cả các thông tin của promotion
- Promotion đã expired thì không sử dụng được nữa và không cho phép update lại

2. **Rewards**

- Mô tả: một dạng promotion, được sử dụng bằng cách đổi điểm tích lũy của khách hàng.
- Cơ chế tích điểm:
  - Sau khi order hoàn thành
  - Mặc định: $1 = 1 point (có thể cấu hình)
- POS Behavior:
  - Cho phép chọn 1 reward
  - Trừ điểm realtime khi checkout
- Rule:
  - Mỗi order chỉ áp dụng 1 reward
  - Không hoàn lại point khi refund
  - Không rollback điểm đã trừ
- Giao diện: sẽ bao gồm những thông tin sau:

1. **Rewards listing: gồm những thông tin sau**

- Reward Content: tên của reward
- Status: Active / Inactive
- Point: số điểm dùng để chuyển đổi
- Discount Value: số % hoặc fixed amount được apply khi đổi từ số point
- Action:
  - Update
- Lưu ý: Reward không có start date / end date, chỉ cần thỏa điều kiện point là có thể sử dụng

2. **Rewards Detail**

Gồm những thông tin sau:

3. **Update Rewards**

- Cho phép update reward thoải mái. Không phụ thuộc điều kiện gì. Update thì phải lưu lại log
- Không cho phép Delete, nếu k sử dụng nữa thì Inactive

4. **Add New Rewards**

- Title: Add New Campaign
- Campaign Type: Promotion | Rewards | Reminder | Birthday > chọn Rewards thì sẽ show list action bên dưới
- Reward name: input, max 50 characters
- What is the value of offer?
  - Theo %
  - Theo fixed amount $
- Point: nhập số điểm để đổi sang discount
- Status: default là Active
- Button:
  - Add: tạo reaward
  - (X): thoát khỏi form tạo reaward

3. **Reminder**

- Mô tả: Gửi thông báo nhắc khách quay lại nếu không phát sinh giao dịch sau một khoảng thời gian.
- Rule:
  - Chỉ gửi 1 lần khi thỏa điều kiện
  - Không gửi lại
  - Không reset sau khi gửi
- Giao diện: sẽ bao gồm những thông tin sau:

1. **Reminder listing: gồm những thông tin sau**

- Campaign Name: tên reminder
- Offer: giảm giá bao nhiêu % order hay fixed amount
- Target Audience: group customer được apply reminder
- Schedule: thời điểm gửi thông tin remindercho customer qua sms/email (có thể hiểu là Date Send)
  - Date sẽ được quy ra từ setting **Send to customers who haven't visited for,** \[**Current Date - Last Visit Date**\] = ngày được setting
  - Time: default 09:00AM
- Valid Period:
  - Khoảng thời gian có thể sử dụng reminder
  - Lấy tử setting: **How long should this reminder be valid?**
- Action: Update
- Button: Add New
- Filter:
  - Status: Active/Inactive. Default Active
  - Campaign Name
- Sort: default desc theo Schedule

2. **Reminder Detail:** sau khi click vào một reminder, sẽ show những thông tin sau

- Campaign Name
- Campaign Info:
  - Offer
  - Created: Thời gian tạo promotion này
  - Valid Period: Khoảng thời gian áp dụng promotion này.
  - Send To: list customer group - Group khách hàng nhận được tin nhắn
- Performance:
  - Total Delivery: Email / SMS / Total - Tổng số lượng SMS và Email đã gửi
  - Redemption: số tiền promotion đã được apply vào tất cả order, quy ra số tiền
  - Conversion Rate (%) = Total Delivery / Redemption \* 100
    - Tỉ lệ sử dụng chiếm bao nhiêu % trên tổng income của tất cả order
  - Income: Tổng số tiền khách trả của những orders có redeem promotion này
  - Redemption amount: Tổng số tiền đã giảm
- Customers Who Used This Offer - danh sách customer đã sử dụng promotion
  - #: số thứ tự
  - Name: customer name
  - Phone: customer phone
  - Used Total: số lượng promotion mà customer này đã sử dụng
  - Income: Tổng số tiền khách đã trả của những orders có redeem promotion này
- Redemption amount: Tổng số tiền khách đã được giảm

3. **Add New Reminder:** click sẽ mở dialog

- Title: Add New Campaign
- **Campaign Type**: Promotion | Rewards | Reminder | Birthday > chọn Reminder thì sẽ show list action bên dưới
- **Campaign Detail:**
  - Campaign Name: max 50 characters
  - What do you want to offer? - phần trăm trên tổng order hoặc fixed amount sẽ được apply cho order
    - Nhập số %
    - Nhập amount
  - Message to show customer: field nhập nội dung của campaign, max 80 characters.
  - Reply STOP to opt out: checkbox
    - Check:
      - Show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo reminder này về số phone nữa
    - Uncheck:
      - Không show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo reminder này về số phone nữa ????
  - Valid: MM/DD/YYYY: checkbox
    - Check:
      - Show thêm text "Valid: MM/DD/YYYY" trong Message to show customer.
      - Ngày này được quy ra từ **How long should this reminder be valid?** setting, lấy ngày cuối cùng
    - Uncheck: không show thêm text "Valid: MM/DD/YYYY" trong Message to show customer
- **Usage Limit:** Toggle - Promotion for one time use only
  - Enable: 1 customer chỉ được sử dụng promotion này 1 lần
  - Disable: 1 customer có thể dùng promotion này nhiều lần cho nhiều order, 1 order chỉ apply 1 promotion.
- **Who to Send To:**
  - Checkbox option
  - Tất cả các group customer đang có trong hệ thống. Và 1 option All để chọn tất cả
- **Campaign Schedule**
  - Send to customers who haven't visited for
    - Sẽ gửi thông tin promotion cho customer nếu số ngày mà customer đã không quay lại tiệm đúng bằng số ngày được setting, tính từ lần visit cuối cùng: \[**Current Date - Last Visit Date**\] = ngày được setting
    - Input: number (days)
  - How long should this reminder be valid?
    - Số ngày có thể sử dụng promotion này, kể từ ngày gửi thông tin promotion (reminder) cho customer.
    - Input: number (days)
- **Test & Finalize**: test trước nội dung gửi ra cho customer
  - Phone number
    - Field nhập số phone, placeholder: _Enter phone number for test_
    - Button: Test Now
  - Email
    - Field nhập email, placeholder: _Enter email for test_
    - Button: Test Now
- Button:
  - Add: tạo reminder
  - (X): thoát khỏi form tạo reminder

4. **Update Reminder**

- Reminder sẽ tương tự như Reward, sẽ k có Start Date và End Date, nên sẽ cho upadte thông tin của reminder thoải mái, không ràng buộc điều kiện
- Được update tất cả thông tin trong reminder.
- Đối với những customer đã được gửi reminder rồi, sau đó update lại reminder và customer đó vẫn thỏa điều kiện thì sẽ gửi tiếp tục cho customer.
- Không cho phép Delete, nếu k sử dụng nữa thì Inactive

4. **Birthday**

- Mô tả: Tự động gửi ưu đãi vào dịp sinh nhật khách hàng.
- Logic:
  - Gửi trước sinh nhật X ngày
  - Promotion có hiệu lực trong X ngày sau sinh nhật
- Rule:
  - Tự động gửi
  - Bỏ qua nếu customer không có ngày sinh
- Giao diện: sẽ bao gồm những thông tin sau

1. **Birthday listing: gồm những thông tin sau**

- Campaign Name: tên birthday compaign
- Offer: giảm giá bao nhiêu % order hay fixed amount
- Target Audience: group customer được apply birthday compaign
- Schedule:
  - Thời điểm gửi thông tin birthday compaign cho customer qua sms/email (có thể hiểu là Date Send)
  - Date sẽ được quy ra từ **Send this promotion before birthday** setting
  - Time: default 09:00AM
- Valid Period:
  - Khoảng thời gian có thể sử dụng birthday compaign.
  - Phụ thuộc vào **Promotion valid how long after birthday?** setting
- Action: Update
- Button: Add New
- Filter:
  - Status: Active/Inactive. Default Active
  - Campaign Name
- Sort: default desc theo Schedule

2. **Birthday Detail:** sau khi click vào một birthday compaign, sẽ show những thông tin sau

- Campaign Name
- Campaign Info:
  - Offer
  - Created: Thời gian tạo promotion này
  - Valid Period: Khoảng thời gian áp dụng promotion này.
  - Send To: list customer group - Group khách hàng nhận được tin nhắn
- Performance:
  - Total Delivery: Email / SMS / Total - Tổng số lượng SMS và Email đã gửi
  - Redemption: số tiền promotion đã được apply vào tất cả order, quy ra số tiền
  - Conversion Rate (%) = Total Delivery / Redemption \* 100
    - Tỉ lệ sử dụng chiếm bao nhiêu % trên tổng income của tất cả order
  - Income: Tổng số tiền khách trả của những orders có redeem promotion này
  - Redemption amount: Tổng số tiền đã giảm
- Customers Who Used This Offer - danh sách customer đã sử dụng promotion
  - #: số thứ tự
  - Name: customer name
  - Phone: customer phone
  - Used Total: số lượng promotion mà customer này đã sử dụng
  - Income: Tổng số tiền khách đã trả của những orders có redeem promotion này
  - Redemption amount: Tổng số tiền khách đã được giảm

3. **Add New Birthday:** click sẽ mở dialog

- Title: Add New Campaign
- **Campaign Type**: Promotion | Rewards | Reminder | Birthday > chọn Birthday thì sẽ show list action bên dưới
- **Campaign Detail:**
  - Campaign Name: max 50 characters
  - What do you want to offer? - phần trăm trên tổng order hoặc fixed amount sẽ được apply cho order
    - Nhập số %
    - Nhập amount
  - Message to show customer: field nhập nội dung của campaign, max 80 characters.
  - Reply STOP to opt out: checkbox
    - Check:
      - Show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo reminder này về số phone nữa
    - Uncheck:
      - Không show thêm text "Reply STOP to opt out" trong Message to show customer.
      - Khách hàng có thể nhắn "STOP" để không nhận tin nhắn quảng cáo reminder này về số phone nữa ????
  - Valid: MM/DD/YYYY: checkbox
    - Check:
      - Show thêm text "Valid: MM/DD/YYYY" trong Message to show customer.
      - Ngày này sẽ được quy ra từ filed **Promotion valid how long after birthday?** của mỗi customer, lấy ngày cuối cùng.
    - Uncheck: không show thêm text "Valid: MM/DD/YYYY" trong Message to show customer
- **Usage Limit:** Toggle - Promotion for one time use only
  - Enable: 1 customer chỉ được sử dụng promotion này 1 lần
  - Disable: 1 customer có thể dùng promotion này nhiều lần cho nhiều order, 1 order chỉ apply 1 promotion.
- **Who to Send To:**
  - Checkbox option
  - Tất cả các group customer đang có trong hệ thống. Và 1 option All để chọn tất cả
- **Campaign Schedule**
  - Send this promotion before birthday
    - Sẽ gửi thông tin birthday compaign cho customer trước ngày sinh nhật của customer x days
    - Input: number (days)
  - Promotion valid how long after birthday?
    - Số ngày có thể sử dụng birthday compaign này, kể từ ngày gửi thông tin promotion (birthday compaign) cho customer.
    - Input: number (days)
- **Test & Finalize**: test trước nội dung gửi ra cho customer
  - Phone number
    - Field nhập số phone, placeholder: _Enter phone number for test_
    - Button: Test Now
  - Email
    - Field nhập email, placeholder: _Enter email for test_
    - Button: Test Now
- Button:
  - Add: tạo reminder
  - (X): thoát khỏi form tạo reminder

4. **Update Birthday**

- Birthday campaign sẽ tương tự như Reward, sẽ k có Start Date và End Date, nên sẽ cho upadte thông tin của birthday campaign thoải mái, không ràng buộc điều kiện
- Được update tất cả thông tin trong birthday campaign.
- Đối với những customer đã được gửi birthday campaign rồi, sau đó update lại birthday campaign và customer đó vẫn thỏa điều kiện thì sẽ gửi tiếp tục cho customer.
- Không cho phép Delete, nếu k sử dụng nữa thì Inactive

---

_Source: Google Docs — "Promotion Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Gift Card Management

_Linear doc: https://linear.app/fastboy/document/gift-card-management-aac032d6e34a_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Gift Card Management**

1. **Listing page**

Gồm những field thông tin sau:

- Search: Gift Card Code
- Filter Status
- Giftcard Code
- Status: Active / Inactive / Not Sold Yet / Used Up
- Balance: current balance cảu giftcard tại thời điểm xem thông tin
- Action:
  - View Detail: Gifcard history
  - Edit
  - Reset
  - Logs

| Merchant: Luna Nail Spa                             |              |             |                            |
| --------------------------------------------------- | ------------ | ----------- | -------------------------- |
|                                                     |              |             |                            |
| \[Overview\] \[Orders\] \[Payments\] \[Gift Cards\] |              |             |                            |
|                                                     |              |             |                            |
|                                                     |              |             |                            |
| Gift Cards                                          |              |             |                            |
|                                                     |              |             |                            |
| **Code**                                            | **Status**   | **Balance** | **Action**                 |
| 484377128970                                        | Active       | $75.00      | View Detail Edit ResetLogs |
| 045775308821                                        | Used Up      | $0.00       | View Detail EditLogs       |
| 930670412317                                        | Inactive     | $75.00      | View Detail EditLogs       |
| 537574237772                                        | Not sold yet | $100.00     | View Detail EditLogs       |

2. **Action - View Detail (Check Balance)**

- Mục đích: Admin kiểm tra nhanh tình trạng tiền/history của gift card để support merchant / customer.
- Click sẽ mở page giftcard detail gồm những field thông tin sau:
  - Gift Card Code
  - Status
  - Current Balance
  - Balance detail: click sẽ show list order có thông tin của giftcard đó, tham khảo UI như bên dưới:  
    !\[\]\[image14\]
  - Last Updated At
- Rule:
  - Action này read-only
  - Áp dụng cho mọi status

3. **Action - Edit**

- Edit Balance (Adjust): Admin điều chỉnh balance của gift card hiện có (Add balance / Deduct balance)
- Edit status của giftcard
- Click sẽ mở dialog gồm những field thông tin sau:
  - Title: Edit Giftcard
  - Balance
  - Status
  - Reason (required)
  - Button: Cancel / Save Changes
- Rule:
  - Remaining Balance sau adjust không được < 0
  - Không cho adjust khi: Status = Used Up
  - Sau mỗi lần adjust:
    - Update Remaining Balance
    - Ghi log đầy đủ

4. **Action - Reset Balance**

- Admin reset balance của gift card (ví dụ xử lý lỗi hệ thống / support đặc biệt).
- Click Reset sẽ apply với những thông tin sau:
  - Balance về $0.00
  - Price về $0.00
  - Status: Not Sold Yet
- UI:
  - Action riêng, confirm modal
  - Bắt buộc nhập reason
- Rule: Reset được ghi log là action riêng (không gộp với adjust)

5. **Action - View Logs**

- **Log khi có action từ site Admin, không phải Giftcard History**
- Mục đích: Khác với History: tập trung vào hành vi của Admin
- Nội dung log:
  - Time
  - Admin user: user thực hiện
  - Action:
    - Check balance
    - Edit balance
    - Reset balance
    - Change status
    - Old value → New value
    - Reason
  - Rule:
    - Log không được chỉnh sửa
    - Không cho delete
    - Luôn hiển thị đầy đủ (compliance-friendly)
  - UI
    - Có thể filter theo:
      - Admin user
      - Action type
      - Date range

---

_Source: Google Docs — "Gift Card Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Services Management

_Linear doc: https://linear.app/fastboy/document/services-management-bb5c06fb3976_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Services Management**  
<document id="efc46a16-ceb1-482b-933f-e598888037b1" href="https://linear.app/fastboy/document/settings-6fe2b4cc81a4">Settings</document>

### 1\. Services Management listing page

- The left menu (navigation sidebar) will display an option for Services Management. When clicked, it will display the following actions:
- List of Items: This is the default view showing all services/products. Ngoài category Product là item type Product, còn lại là item type Service
- This could be a table or card list of all items (services/products) with options for Add, Edit, and Delete next to each item.
- Gồm những thông tin sau:
  - Button: Import Service
  - Search bar: service name
  - Category list:
    - Button: Add Category
    - Status: Active / Inactive (default show list Active)
    - Category Name
    - Category color
    - Action: Edit
  - Service field: show list service thuộc category đang được select, gồm:
    - Button: Add Service
    - Filter: status, default - Active
    - Service Name - Description
    - Price
    - Duration
    - Supply Fee
    - Status
    - Action: Edit

### 2\. Add New Category

When the user selects Add from the menu or the list of category items:  
Action: Click Add → Display the form to add a new item  
**UI Elements:**

- Form Fields: Display all the necessary fields for adding a new service/product.
  - Title: Create Category
  - Category Information
    - Category Name (required): Unlimited
    - Status: Toggle Active / Inactive - default Active
  - Category Color: Default selection of the first color in the available list.
  - Buttons:
    - Add: To save the new item.
    - Cancel: To discard the action and return to the previous page or list.

**Flow:**

- Once the Save button is clicked, the new item is added to the list, and the UI returns to the list of items view with the newly added item visible.
- If the Cancel button is clicked, the user is returned to the list of items without saving the new item.

### 3\. Add New Service

When the user selects Add from the menu or the list of items:  
Action: Click Add → Display the form to add a new item  
**UI Elements:**

- Form Fields: Display all the necessary fields for adding a new **SERVICE**
  - Service Name (Text Input)
  - Category Selection (Dropdown)
  - Price (Number Input)
  - Flexible Pricing: checkbox
  - Duration (Time Picker or Dropdown)
  - Supply Fee (Number Input)
  - Description (Text Area)
  - Visibility Setting: toggle option
    - Active
    - Shown on Go Checkin
    - Shown on Web Booking
    - Shown on Go POS
- Form Fields: Display all the necessary fields for adding a new **PRODUCT**.
  - Product Name (Text Input)
  - Category Selection (Dropdown)
  - Price (Number Input)
  - Flexible Pricing: checkbox
  - Description (Text Area)
  - Visibility Setting: toggle option
    - Active
- Buttons:
  - Add: To save the new item.
  - Cancel: To discard the action and return to the previous page or list.

**Flow:**

- Once the Save button is clicked, the new item is added to the list, and the UI returns to the list of items view with the newly added item visible.
- If the Cancel button is clicked, the user is returned to the list of items without saving the new item.

### 4\. Edit an existing Category

When the user selects Edit next to an item in the list:  
Action: Click Edit → Display a form pre-filled with the existing details of the selected item.  
**UI Elements:**

- Form Fields: Display all the necessary fields for adding a new service/product.
  - Title: Create Category
  - Category Information
    - Category Name (required): Unlimited
    - Status: Toggle Active / Inactive - default Active
  - Category Color: Default selection of the first color in the available list.
- Buttons:
  - Save: To save the changes made to the item.
  - Cancel: To discard the changes and return to the list of items.

**Flow**:

- Once Save is clicked, the item is updated with the new information and returned to the list of items view.
- If Cancel is clicked, the user is returned to the list of items without saving the changes.

### 5\. Edit an existing Service

When the user selects Edit next to an item in the list:  
Action: Click Edit → Display a form pre-filled with the existing details of the selected item.  
**UI Elements:**

- Pre-filled Fields: Display all editable fields with the current values populated.
  - Service/Product Name (Text Input)
  - Category Selection (Dropdown)
  - Price (Number Input)
  - Flexible Pricing: checkbox
  - Duration (Time Picker or Dropdown)
  - Supply Fee (Number Input)
  - Description (Text Area)
  - Visibility Setting: toggle option
- Buttons:
  - Save: To save the changes made to the item.
  - Cancel: To discard the changes and return to the list of items.

**Flow**:

- Once Save is clicked, the item is updated with the new information and returned to the list of items view.
- If Cancel is clicked, the user is returned to the list of items without saving the changes.

### 6\. Import Service

6.1 Mục tiêu

Bổ sung tính năng **Import Service** trong POS Portal, tại menu **Service Management**, nhằm hỗ trợ merchant/user import hàng loạt Service hoặc Product bằng file Excel thay vì phải tạo từng item thủ công.

---

6.2 **Vị trí tính năng**

**POS Portal → Service Management**

Thêm các UI components:

- Button: **Download Template**
- Button: **Import Service**

---

6.3. User Flow

1. User vào màn **Service Management**
2. Click **Download Template** → tải file Excel mẫu
3. Điền dữ liệu vào file
4. Click **Import Service**
5. Upload file Excel
6. System validate dữ liệu:
   - Nếu invalid → show error popup
   - Nếu valid → hiển thị Preview
7. User chọn:
   - **Confirm** → thực hiện import
   - **Cancel** → hủy
8. System xử lý import
9. Hiển thị kết quả

---

6.4. Import Template

File format:

- Chỉ support: **Excel (.xlsx)**
- Template: [https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=589564261#gid=589564261](https://docs.google.com/spreadsheets/d/14EG7souxH1ner_PNu9MAgOHui7fAEFJkYL41La5HHC8/edit?pli=1&gid=589564261#gid=589564261)

| Column                     | Required | Rule                  |
| -------------------------- | -------- | --------------------- |
| STT                        | No       | Dùng để tham chiếu    |
| Category (\*)              | Yes      | Tên category          |
| ~~Service Item Type (\*)~~ | ~~Yes~~  | ~~Service / Product~~ |
| Services Name (\*)         | Yes      | Max 50 ký tự          |
| Price                      | No       | Blank → 0             |
| Service Description        | No       | Max 80 ký tự          |
| Duration (Minutes)         | No       | Blank → 0             |
| Supply Share               | No       | Blank → 0             |
| Show On Checkin            | No       | 0 / 1                 |
| Show On Booking            | No       | 0 / 1                 |
| Show On POS                | No       | 0 / 1                 |

---

6.5. Business Rules

Category

- Import bằng tên
- Nếu tồn tại → dùng lại
- Nếu chưa tồn tại → auto create
- Không được để trống
- Lưu ý: Nếu trong tiệm đang có sẵn 2 category trùng name, thì báo lỗi khi review file import.

---

~~Service Item Type~~

- ~~Bắt buộc~~
- ~~Chỉ nhận:~~
  - ~~Service~~
  - ~~Product~~
- ~~Sai value → fail import~~

---

Services Name

- Bắt buộc
- Max length: 50 ký tự
- Cho phép trùng với data hiện tại
- Import luôn:
  - Tạo mới record
  - Không update record cũ
- Nếu:
  - Trống → fail
  - 50 ký tự → fail

---

Service Description

- Optional
- Max length: 80 ký tự
- 80 ký tự → fail

---

Price

- Optional
- Blank → default = 0
- Nếu có value:
  - Phải là số hợp lệ
  - = 0

---

**Duration (Minutes)**

- Optional
- Blank → 0
- Phải là số nguyên ≥ 0

---

**Supply Share**

- Optional
- Blank → 0
- Phải là số ≥ 0

---

**Boolean Fields**

Áp dụng cho:

- Show On Checkin
- Show On Booking
- Show On POS

Rule:

- Chỉ nhận 0 hoặc 1
- 1 = Show
- 0 = Hide
- Value khác → fail

---

6.6. Import Logic

Rule: All or Nothing

- Nếu tất cả rows hợp lệ → import toàn bộ
- Nếu có ít nhất 1 row lỗi → không import bất kỳ row nào

---

6.7. Preview Screen

Hiển thị sau khi upload file hợp lệ.

Yêu cầu:

- Show toàn bộ data
- Không cho chỉnh sửa
- Có:
  - Button **Confirm**
  - Button **Cancel**

Hành vi:

- Confirm → thực hiện import
- Cancel → hủy

---

6.8. Error Handling

Khi có lỗi:

- Show popup lỗi tổng quát
- Có chỉ rõ row bị lỗi

Format message:

Ví dụ:

Import failed. Please check row 3, row 7.

---

6.9. Permission

User có thể import nếu có quyền: **Create Staff**

---

6.10. Audit Log

Mỗi lần import cần lưu:

- User thực hiện
- Thời gian
- Tổng số record thành công
- Tổng số record failed
- Status:
  - Success
  - Failed

Theo rule All-or-Nothing:

- Success:
  - success = total rows
  - failed = 0
- Failed:
  - success = 0
  - failed = số row lỗi

---

6. UI Requirements

Download Template

- Button visible tại Service Management
- Download file Excel mẫu chuẩn format

Import Button

- Mở dialog upload file

---

### **7. Export Service**

**7.1 Objective**

Cho phép user export danh sách **Service/Product** theo nhu cầu cụ thể, thay vì export toàn bộ mặc định.

User có thể:

- Lựa chọn định dạng file
- Lọc dữ liệu cần export
- Chọn các trường thông tin cần export

Mục tiêu:

- Tăng tính linh hoạt
- Giảm dữ liệu không cần thiết
- Phục vụ nhiều use case (report, audit, chỉnh sửa)

---

**7.2. Location**

**POS Portal → Service Management**

Thêm: Button **Export Service**

---

**7.3. User Flow**

1. User vào màn **Service Management**
2. Click **Export Service**
3. System mở **Export Modal**
4. User cấu hình:
   - Export format
   - Filters
   - Columns
5. Click **Export**
6. System generate file và download

---

7.4. Export Modal UI

**7.4.1 Modal Title: Export Service**

**7.4.2 Modal Sections**

**Export Format**

User có thể chọn:

- CSV (.csv)
- Excel (.xlsx)

  Default:

- Excel (.xlsx)  
  **Filters**

  Service Item Type

- Service
- Product  
   → Multi-select  
   → Default: tất cả

  Category

- Multi-select từ danh sách category hiện có  
   → Default: tất cả

  Visibility

  Áp dụng cho:

- Show On Checkin
- Show On Booking
- Show On POS

  → Cho phép filter  
   → Default: không giới hạn

**7.4.3. Select Columns to Export**

User chọn các trường cần export

Group: Basic Information

- Category
- Service Item Type
- Services Name  
  Group: Pricing & Duration
- Price
- Duration (Minutes)
- Supply Share  
  Group: Description
- Service Description  
  Group: Visibility
- Show On Checkin
- Show On Booking
- Show On POS  
  Default: tất cả columns được chọn

**7.4.4 Modal Actions (Buttons)**

- **Cancel**
  - Đóng modal
  - Không thực hiện export
- **Export**
  - Trigger export file
  - Disabled nếu:
    - Không có column nào được chọn

---

**7.5. Business Rules**

**7.5.1 Column Selection**

- User phải chọn ít nhất **1 column**
- Nếu không chọn column nào:
  - Disable nút Export

**7.5.2 Filter Logic**

- Áp dụng **AND logic giữa các nhóm filter**
- Ví dụ:
  - Type = Service
  - Category = Manicure  
     → chỉ export service phù hợp

**7.5.3 Data Scope**

- Nếu không chọn filter → export toàn bộ Service/Product

**7.5.4 Boolean Fields**

- Export dưới dạng:
  - 1 = enabled / hiển thị
  - 0 = disabled / ẩn

**7.5.5 Output Format**

CSV

- Plain text
- Không format

Excel

- Có header
- Header được format (bold)

**7.5.6 Data Snapshot**

- Data export là snapshot tại thời điểm click Export

---

**7.6. File Naming Convention**

Excel:

```
service_export_YYYYMMDD_HHMM.xlsx
```

CSV:

```
service_export_YYYYMMDD_HHMM.csv
```

---

**7.7. Permission**

User có thể export nếu có quyền:

**View Service Management**

---

**7.8. Audit Log**

System cần lưu:

- User thực hiện export
- Thời gian export
- File name
- Trạng thái:
  - Success
  - Failed

---

**7.9. Error Handling**

Trường hợp: User không chọn column

→ Disable nút Export

Trường hợp: System không generate được file

→ Hiển thị message: Export failed. Please try again.

---

_Source: Google Docs — "Services Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Package Management

_Linear doc: https://linear.app/fastboy/document/package-management-a13018e280ab_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **Package Management**

- Identify and define the features available in each package, aligned with Fastboy’s business information.
- Mục tiêu
- Xây dựng trang quản lý Package & Feature dành cho Admin nội bộ, cho phép cấu hình các tính năng hiển thị và thao tác trên giao diện (UI) dựa trên gói dịch vụ (Package) mà Merchant đang sử dụng.
- Trang này chỉ dùng để:
  - Quyết định feature nào được hiển thị
  - Quyết định action nào được phép thao tác trên UI
- Hệ thống có 3 Package cố định, đồng thời cũng chính là 3 level dịch vụ: BASIC / DELUXE / PREMIUM
- Package được tính theo chu kỳ tháng
- Mỗi merchant chỉ có 1 package tại 1 thời điểm
- Feature: Feature đại diện cho một màn hình / một tab / một nút hoặc một hành động trên UI
- Mỗi feature có trạng thái: Enable (ON) - Disable (OFF)
- Feature có thể được dùng chung cho nhiều package
- Với mỗi package (Basic / Deluxe / Premium): Admin có thể bật hoặc tắt từng feature
- Quy tắc hiển thị UI cho Merchant sau khi apply package: Merchant chỉ nhìn thấy và thao tác được feature khi đồng thời thỏa tất cả điều kiện sau:
- Merchant đang có package đang active
- Thời điểm hiện tại lớn hơn hoặc bằng effective date của package
- Feature được Enable trong package tương ứng
- Nếu feature bị Disable:
- UI liên quan sẽ không hiển thị
- Action tương ứng sẽ không cho thao tác
- UI tham khảo:
  - Package List

| Package | Description  | Enabled Features | Last Updated | Action        |
| ------- | ------------ | ---------------- | ------------ | ------------- |
| Basic   | Gói cơ bản   | 8 / 25           | 20/01/2026   | View / Update |
| Deluxe  | Gói nâng cao | 15 / 25          | 22/01/2026   | View / Update |
| Premium | Gói cao cấp  | 25 / 25          | 25/01/2026   | View Update   |

- Click View / Update sẽ hiển thị Package Detail như sau:

| \[← Back\] Package: Deluxe     |                |                              |            |
| ------------------------------ | -------------- | ---------------------------- | ---------- |
|                                |                |                              |            |
| **Feature Group**              | **Feature**    | **Description**              | **Enable** |
| Payment & Transaction Features | Card Payment   | Cho phép thanh toán bằng thẻ | ☐          |
| Payment & Transaction Features | Partial Refund | Hoàn tiền 1 phần             | ☑          |
| Reporting                      | Export CSV     | Xuất báo cáo CSV             | ☑          |
|                                | ...            |                              |            |
| \[ Save Changes \]             |                |                              |            |

- Audit & lịch sử thay đổi:
- Hệ thống cần lưu lịch sử cho:
- Thay đổi cấu hình feature trong package
- Gán / thay đổi package cho merchant
- Thông tin audit bao gồm:
- Người thực hiện
- Thời gian
- Nội dung thay đổi (trước / sau)

---

_Source: Google Docs — "Package Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# System Management

_Linear doc: https://linear.app/fastboy/document/system-management-ed7003c21496_

> 🚧 **Placeholder** — chưa có spec (Google Docs gốc cũng rỗng). PO viết trực tiếp tại đây khi có nội dung.

---

_Source: Google Docs — "System Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Device Management

_Linear doc: https://linear.app/fastboy/document/device-management-75de848ac60a_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

**Device Management**

- Mỗi merchant có một page quản lý device riêng.
- Device chính là **POS**.
- Mỗi POS có thể gắn với nhiều **Terminal/Card Reader** và **Printer**.
- Quản lý POS theo **Device ID**.
- Quản lý Terminal theo **Serial Number**.
- Version cần hiển thị là **App version**.
- Status cập nhật theo chu kỳ khoảng **mỗi giờ**, cơ chế polling/push để BE quyết định.

**Thông tin hiển thị trên POS**

- POS status: Online / Offline.
- Terminal status: Active / Inactive
- Printer status: Ready / Not connected.
- Last connected:
  - **Definition:** Thời điểm gần nhất thiết bị:
- Kết nối thành công với server
- Và chuyển sang trạng thái Online
  - **Trigger update khi:**
- Device login thành công
- Device reconnect sau mất mạng
- App reopen / app active lại
- Heartbeat reconnect thành công
- Last disconnected:
  - **Definition:** Thời điểm gần nhất thiết bị:
- Mất kết nối với server
- Hoặc chuyển sang trạng thái Offline
  - **Trigger update khi:**
- Device logout
- App closed
- Heartbeat timeout
- Internet disconnected
- Token/session invalidated
- Last seen/offline since.
- Uptime trong 7 ngày.
- Last payment nếu có.
- App version.
- Terminal SN đi kèm POS.

**Remote POS**

- Remote action theo từng POS device.
- Remote credential lưu trực tiếp trên từng POS device.
- Chỉ user có permission mới được xem/sử dụng credential và remote.
- Click remote nếu thành công thì vào được ngay.
- Nếu không remote được thì hiển thị lý do cụ thể: POS offline, credential sai, timeout, remote app unavailable, session conflict, v.v.
- Không cần chặn payment/refund/action nhạy cảm vì các action đó đã được bảo vệ bằng passcode riêng.

**Audit log / Device History**

- Cần lưu log tất cả action thực hiện từ page này.
- Ví dụ: Disconnect, Remote View, Remote failed, credential updated.
- History filter theo:
  - Device ID
  - Terminal SN
  - event/action type
  - user thực hiện
  - status/result
  - time range
- Lưu toàn bộ history, chưa cần giới hạn retention.
- Chưa cần export.
- Chưa cần remote session recording.

---

### 1\. Scope tổng thể

- Quản lý **Device theo từng Merchant**.
- Device chính: **POS**.
- Mỗi POS có thể gắn:
  - **Terminal (Card reader)** → quản lý theo SN
  - **Printer**
- Cập nhật trạng thái **\~ mỗi giờ** (BE quyết định polling/push).

---

### 2\. Merchant Device Page (List POS)

Hiển thị dạng list POS

Mỗi POS bao gồm:

Thông tin cơ bản

- Device ID
- App version
- POS status: **Online / Offline**
- Last connected
- Last disconnected
- Offline since (last seen)

Connection status

- Terminal:
  - SN
  - Status: Active / Inactive
- Printer:
  - Ready / Not connected
- Last payment (nếu có)

Action

- **Remote View**
- **Disconnect**
- **View Detail**

---

### 3\. POS Device Detail Page

Thông tin POS

- Device ID
- Last connected / disconnected
- Uptime (7 ngày)
- Current status

Connection History (7 ngày)

- Uptime theo ngày
- Status theo ngày (Online / Offline)

Terminal List (thuộc POS)

Hiển thị list Terminal:

- Terminal SN
- Status
- Last connected
- Last disconnected
- (Optional) uptime/history

Không có remote action ở Terminal

### \---

**4. Remote POS**

Nguyên tắc

- Remote theo **từng POS**
- Remote credential:
  - Lưu **trực tiếp trên POS device**
  - Chỉ user có permission mới xem/sử dụng

Hành vi

- Click → remote ngay (không cần nhập lại credential)
- Remote giống như user đang dùng app

Khi fail

Hiển thị rõ lý do:

- POS offline
- Sai credential
- Timeout
- Remote service unavailable
- Session conflict
- ...

UX khi POS offline

- Vẫn cho click Remote
- Sau đó show lỗi tương ứng

---

### 5\. Device History / Audit Log

Scope

Log tất cả action từ page này:

- Remote View
- Remote fail
- Disconnect
- Credential update
- (Các action khác trong tương lai)

Thông tin log

- Device ID
- Terminal SN (nếu liên quan)
- Action type
- User thực hiện
- Result: success / fail
- Timestamp
- Failure reason (nếu có)

Filter

- Device ID
- Terminal SN
- Action type
- User
- Time range

**Retention:** Lưu toàn bộ (không giới hạn)

---

### 6\. Permission

- Remote và xem credential: Phụ thuộc permission user
- Hiện tại: Cho phép tất cả nếu được config

### \---

**7. UI Flow tổng**

1. Merchant vào **Device Page**
2. Xem list POS
3. Click vào POS → Xem detail + terminal list + history
4. Tại list: Có thể remote trực tiếp
5. Mọi action → ghi log

---

_Source: Google Docs — "Device Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Device Pending

_Linear doc: https://linear.app/fastboy/document/device-pending-a98d6c65061a_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

# **POS Portal - Device Management & POS Login Control**

## **1. Summary**

Xây dựng trang **Device Management** trên Portal để quản lý tập trung toàn bộ thiết bị POS trong hệ thống, bao gồm:

- Kiểm soát trạng thái thiết bị (Pending / Active / Inactive)
- Thiết lập workflow phê duyệt device trước khi login POS
- Hỗ trợ login POS bằng OTP trong trường hợp scan QR lỗi
- Theo dõi thông tin device, merchant và app version

---

## **2. Problem**

Hiện tại:

- Không có cơ chế quản lý tập trung device POS
- Device có thể login mà không có bước xác thực/phê duyệt
- Khi login bằng QR lỗi, không có phương án fallback
- Không kiểm soát được device nào đang hoạt động trong hệ thống

---

## **3. Goal**

- Kiểm soát toàn bộ device POS trong hệ thống
- Đảm bảo chỉ device được phê duyệt mới có thể sử dụng POS
- Hỗ trợ login nhanh bằng OTP khi cần
- Tăng tính bảo mật và khả năng vận hành

---

## **4. Scope**

### **4.1. Device Management Page (Portal)**

- Menu **không phụ thuộc Merchant Selector**
- Hiển thị toàn bộ device trong hệ thống

#### **Fields hiển thị:**

- Device ID
- Merchant Name
- WHMCS ID
- Status: Pending / Active / Inactive
- App Version (POS version gần nhất)
- Registered At
- Last Active At _(đề xuất)_
- Action

### **4.2. Actions**

| Status   | Available Actions                 |
| -------- | --------------------------------- |
| Pending  | Activate / Inactive               |
| Active   | Inactive / Get Merchant Login OTP |
| Inactive | Activate                          |

### **4.3. Search & Filter**

- Search:
  - Device ID
  - Merchant Name
  - WHMCS ID
- Filter:
  - Status
  - App Version
  - Date (Registered At)
- Sort:
  - Registered At
  - Last Active At

---

## **5. Device Lifecycle & Flow**

### **5.1. Tạo device (Auto registration)**

- Khi user login POS:
  - App gửi **Device ID** lên Portal
- Nếu device chưa tồn tại:
  - Tạo mới với:
    - Status = **Pending**
    - Lưu Merchant
    - Lưu App Version
    - Lưu Registered At

### **5.2. Login control**

- Device **Pending** → Không login được
- Device **Active** → Login thành công
- Device **Inactive** → Không login được

### **5.3. Cập nhật device**

Nếu device đã tồn tại:

- Update:
  - App Version
  - Last Active At
- Không thay đổi status

---

## **6. Status & Transition Rule**

### **6.1. Status definition**

- **Pending**
  - Device mới
  - Chưa được phê duyệt
  - Không được login
- **Active**
  - Đã được phê duyệt
  - Được phép login POS
  - Có thể generate OTP
- **Inactive**
  - Bị vô hiệu hóa
  - Không login được

### **6.2. Transition Rule**

- Pending → Active / Inactive
- Active → Inactive only
- Inactive → Active only
- Không cho phép chuyển về Pending trong mọi trường hợp

---

## **7. OTP Login Flow**

### **7.1. Use case**

- Device đang Active nhưng POS bị logout
- Login bằng QR lỗi → Dùng OTP để login nhanh

### **7.2. Portal action**

- Button: **Get Merchant Login OTP**
- Chỉ áp dụng cho device: Status = Active

### **7.3. OTP Rule**

- Hiệu lực: **5 phút**
- Dùng **1 lần duy nhất**
- Gắn với **1 device cụ thể**
- Generate OTP mới → invalidate OTP cũ
- Mỗi device chỉ có **1 OTP active tại 1 thời điểm**

### **7.4. UI OTP Modal**

- Device ID
- Merchant Name
- OTP Code
- Countdown (5 phút)
- Action:
  - Copy OTP
  - Close

### **7.5. POS Login Flow**

#### **Thêm option:**

- Login by QR Code (existing)
- **Login by OTP (new)**

#### **Validate:**

- OTP hợp lệ
- OTP chưa hết hạn
- Đúng device
- Device = Active

### **7.6. Error message**

- Invalid OTP
- OTP expired
- Device not activated
- OTP not valid for this device

---

## **8. Device Status Actions (UI)**

### **Activate**

- Applies: Pending, Inactive
- Confirm modal:
  - “This device will be allowed to use POS”

---

### **Deactivate**

- Applies: Active
- Confirm modal:
  - “This device will no longer be allowed to log in to POS”

---

### **Get OTP**

- Applies: Active only

---

## **9. Data Rules**

### **Device uniqueness:** Device ID là unique

### **Merchant mapping**

- **1 device chỉ thuộc 1 merchant**
- Không auto change merchant khi login khác merchant

### **Tracking**

- Update:
  - Last Active At khi device call lên system
  - App Version khi có thay đổi

---

## **10. Audit Log**

Track các action:

- Device created
- Activate / Deactivate
- OTP generated

Fields:

- Device ID
- Merchant
- Action
- Performed by
- Timestamp

---

## **11. Edge Cases**

- Pending login nhiều lần → vẫn fail
- Active → Inactive khi đang login:
  - Đề xuất: không force logout, chỉ chặn login tiếp theo
- OTP:
  - Generate liên tục → chỉ OTP mới nhất valid
  - OTP hết hạn khi đang nhập → fail
- Device gửi sai ID → cần validate/log
- Attempt chuyển status về Pending → reject

---

### **Login control**

- Chỉ Active mới login được

---

_Source: Google Docs — "Device Pending" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Version Management

_Linear doc: https://linear.app/fastboy/document/version-management-df865e39d169_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

### **Version Management – POS App**

### **Overview**

Tính năng Version Management cho phép Admin quản lý các version của POS app trực tiếp từ Portal, bao gồm việc publish version mới, thay thế version hiện tại và kiểm soát hành vi update của POS.

Mục tiêu là đảm bảo việc release version được kiểm soát chặt chẽ, an toàn và tránh các rủi ro như downgrade hoặc sử dụng version lỗi.

### **Business Objectives**

- Quản lý tập trung tất cả version của POS app
- Chủ động kiểm soát version đang được sử dụng trên hệ thống
- Đảm bảo POS luôn update theo chiều hướng nâng cấp (không downgrade)
- Cho phép xử lý nhanh khi cần thay thế version lỗi (force update)
- Đơn giản hóa flow vận hành cho team internal

---

### **Key Behaviors**

#### **1. Version Visibility**

- Tất cả version từ BE sẽ được hiển thị trên Portal
- Mỗi version có trạng thái rõ ràng:
  - Unpublished (chưa sử dụng)
  - Published (đang active)
  - Deprecated (không còn sử dụng)

#### **2. Publish Version**

- Admin có thể chọn publish một version mới
- Khi publish:
  - Version đó trở thành version chính thức trên POS
  - Version trước đó sẽ tự động bị thay thế (deprecated)
- Có thể cấu hình:
  - Force Update (bắt buộc POS update)

#### **3. Deprecate (Replace Version)**

- Không đơn thuần là “tắt” version hiện tại
- Khi thực hiện Deprecate:
  - Hệ thống sẽ tự động chuyển sang version mới nhất chưa publish
  - Đồng thời bật Force Update để đảm bảo tất cả POS update ngay

Mục tiêu: xử lý nhanh các trường hợp cần thay thế version lỗi

#### **4. Version Control Rules**

- Tại một thời điểm chỉ có **1 version active**
- Không cho phép downgrade:
  - POS chỉ được update lên version cao hơn
  - Không cho phép publish version thấp hơn version hiện tại

#### **5. Update Control (POS Behavior)**

- POS sẽ:
  - Tự động update khi có version mới cao hơn
  - Bắt buộc update nếu Force Update được bật
- Nếu version thấp hơn hoặc bằng → không thực hiện update

#### **6. Safety & Operational Control**

- Không cho phép sử dụng lại version cũ (rollback bằng cách release version mới)
- Tránh việc merchant sử dụng version lỗi hoặc không phù hợp
- Đảm bảo quá trình update diễn ra đồng nhất trên toàn hệ thống

---

### **Expected Outcome**

- Quản lý version POS một cách tập trung và minh bạch
- Giảm rủi ro khi release version mới
- Có khả năng phản ứng nhanh khi có sự cố (force update)
- Đảm bảo tất cả merchant sử dụng version hợp lệ và mới nhất

---

_Source: Google Docs — "Version Management" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# Force Update

_Linear doc: https://linear.app/fastboy/document/force-update-9a6c15819716_

**Mô tả chung** Tính năng Force Update cho phép quản trị viên chủ động kiểm soát việc nâng cấp phiên bản trên các thiết bị POS thông qua Portal. Khi một phiên bản bị đánh dấu Deprecated, hệ thống sẽ tự động ép buộc toàn bộ thiết bị POS đang chạy đúng phiên bản đó cập nhật lên phiên bản mới nhất đã được Published. Các thiết bị POS đang chạy phiên bản khác sẽ không bị ảnh hưởng, chỉ nhận được thông báo có phiên bản mới.

**Luồng hoạt động**

1. Trên Portal:

Hệ thống đang có phiên bản mới 0.1.554 đã được build và Published trên Portal. Quản trị viên thực hiện thao tác Deprecate phiên bản 0.1.552. Sau khi thao tác thành công, trạng thái của phiên bản 0.1.552 chuyển từ Published sang Deprecated.

2. Đối với các POS đang ở phiên bản bị Deprecated (0.1.552):

Toàn bộ thiết bị POS đang chạy phiên bản 0.1.552 sẽ tự động cập nhật (auto update) lên phiên bản 0.1.554. Đây là cập nhật bắt buộc — người dùng không thể bỏ qua và buộc phải nâng cấp lên phiên bản 0.1.554 để tiếp tục sử dụng.

3. Đối với các POS không ở phiên bản bị Deprecated:

Các thiết bị POS đang chạy phiên bản khác (ví dụ phiên bản hiện tại 0.1.551) vẫn hoạt động bình thường. Hệ thống hiển thị toast thông báo rằng đã có phiên bản mới, nhưng không bắt buộc người dùng phải cập nhật lên 0.1.554. Người dùng có thể tiếp tục sử dụng và chủ động cập nhật sau.

![Hình ảnh](https://uploads.linear.app/48af1d4d-bdb8-403a-a96b-66898fda1a34/6ba3025b-d1ee-4bd7-9148-efacd9b7e00b/c62490ed-4b31-4e3a-88fe-dac5078f7e45?signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiLzQ4YWYxZDRkLWJkYjgtNDAzYS1hOTZiLTY2ODk4ZmRhMWEzNC82YmEzMDI1Yi1kMWVlLTRiZDctOTE0OC1lZmFjZDliN2UwMGIvYzYyNDkwZWQtNGIzMS00ZTNhLTg4ZmUtZGFjNTA3OGY3ZTQ1IiwiaWF0IjoxNzgyMTgzNzA5LCJleHAiOjE3ODIxODQwMDl9.BXp1Am5uJG2UR7Z5EhcXbShrTM7uyRT6_JwkMSDI9MI)

---

# Main Flow Onboard

_Linear doc: https://linear.app/fastboy/document/main-flow-onboard-7df28580516e_

> 📌 **Source of truth: Linear** (từ 2026-06-11). PO viết & sửa spec trực tiếp tại đây — bản Google Docs gốc đã freeze, chỉ để tham khảo lịch sử.

1. CRM create order cho tiệm mới và create ticket New Client gồm những thông tin dịch vụ mà khách sử dụng trong order đó (Device, POS Package, …)
2. Dựa trên ticket CRM vừa tạo với khách cho tiệm mới, team Payment US sẽ list những thiết bị cần ship ra cho khách.

- Order device: [https://crm.fastboy.dev/tickets/detail/1180716](https://crm.fastboy.dev/tickets/detail/1180716)

3. Team Merchant dùng thông tin khách, đăng kí application tạo merchant trên Secure Bancard
4. Team AE tạo ticket request tạo account POS và assign cho tech team DTS.

- Create Account: [https://crm.fastboy.dev/tickets/detail/1163773](https://crm.fastboy.dev/tickets/detail/1163773)

5. Sau khi đã nhận được thông tin account từ DTS gửi về và thông tin từ team AE đã làm việc với khách và collect thông tin, tạo ticket gửi team SS để setup thông tin trên POS cho chủ tiệm

- Setup: [https://crm.fastboy.dev/tickets/detail/1178238](https://crm.fastboy.dev/tickets/detail/1178238)

6. Sau khi đã hoàn tất quá trình cbi thiết bị và setup tiệm. Team SS tiến hành setup device tại tiệm và hướng dẫn sử dụng

- Onboard: [https://crm.fastboy.dev/tickets/detail/1194610](https://crm.fastboy.dev/tickets/detail/1194610)

**CRM**  
│  
├─ (1) Create Order cho tiệm mới  
│ - Device  
│ - POS Package  
│ - Service khác (nếu có)  
│  
└─ Create Ticket: "New Client"  
 - Bao gồm toàn bộ dịch vụ trong order  
 ───────────────►

**Payment US**  
│  
├─ (2) Review ticket New Client  
│  
└─ List thiết bị cần ship cho khách  
 ───────────────►

**Merchant Team**  
│  
├─ (3) Dùng thông tin khách  
│  
└─ Đăng ký Application tạo Merchant trên Secure Bancard  
 ───────────────►

**AE Team**  
│  
├─ (4) Tạo ticket request tạo POS Account  
│  
└─ Assign ticket cho Tech SS > gửi ticket qua DTS  
 ───────────────►

**DTS (Tech Team)**  
│  
├─ Tạo POS Account (Admin Insight) dựa trên Package trong ticket  
│  
└─ Gửi lại thông tin account cho AE  
 ───────────────►

**AE Team**  
│  
├─ Nhận account từ DTS  
├─ Thu thập thêm thông tin từ khách  
│  
└─ (5) Tạo ticket gửi SS để setup POS  
 ───────────────►

**SS Team**  
│  
├─ Setup thông tin trên POS system  
├─ Chuẩn bị thiết bị  
│  
└─ (6) Setup device tại tiệm & training cho chủ tiệm

**\[Volt POS\] Login flow - Account Test**

1. **Thực hiện tải app POS trong link sau:**  
   [https://drive.google.com/drive/folders/1Q-54F-tZdMyeugyurzDssOtJWZdhuyAh?usp=drive_link](https://drive.google.com/drive/folders/1Q-54F-tZdMyeugyurzDssOtJWZdhuyAh?usp=drive_link)  
   !\[\]\[image25\]
2. **Kết nối máy in và cài đặt driver:**  
   File driver trong link sau: [https://drive.google.com/drive/folders/1Q-54F-tZdMyeugyurzDssOtJWZdhuyAh?usp=drive_link](https://drive.google.com/drive/folders/1Q-54F-tZdMyeugyurzDssOtJWZdhuyAh?usp=drive_link)  
   !\[\]\[image26\]
3. **Mở app và login bằng cách Scan QCcode từ Business App**

- App Business: [https://dev.business.gocheckin.net/](https://dev.business.gocheckin.net/)
- Tiệm: Volt POS 14 - WhmcsID 14
- Owner phone: 205 205 2052 / 123456
- **Lưu ý**: nhớ chọn đúng tiệm 14 rồi sau đó mới thực hiện Scan QR code

4. **Kết nối Bamboo DOT**

- Add Serial Number của terminal trên Fastboy Portal: [https://dev.fastboypay.com/terminals?offset=0&limit=20&sort=created_at.desc](https://dev.fastboypay.com/terminals?offset=0&limit=20&sort=created_at.desc)

!\[\]\[image27\]

5. **Kiểm tra kết nối của tất cả các thiết bị đi kèm**

- Printer / Bamboo DOT: hiển thị Connected (như hình)
- Scanner / Keyboard / Mouse: gắn vào là dùng được
- Cash Drawer đi theo máy in

---

_Source: Google Docs — "Main Flow Onboard" tab in [Volt Pos Documents](https://docs.google.com/document/d/1cwBOliobcnSqxDpH0ZcjKXiHxvGAYlrO7wM95jNKTl4/edit)._

---

# [DEMO] QR Payment - Spec & Requirements

_Linear doc: https://linear.app/fastboy/document/demo-qr-payment-spec-and-requirements-c421e841d51e_

## Overview

This is the **PO spec document** for the QR Payment Q2 feature. In the proposed Linear refactor, this is where Loan (PO) would write requirements that span multiple repos.

Authors of this kind of document: **Loan (PO)** — supported by Tien for clarifications.

---

## 1\. Background

Customers currently pay by cash or card. We want to enable **QR-based payments** (VietQR / MoMo / ZaloPay scan-to-pay) at point of sale.

## 2\. User Stories

### Cashier (POS app)

- As a cashier, I want to display a QR code on the customer-facing screen so customers can scan and pay.
- As a cashier, I want to see real-time confirmation when payment is received.

### Customer

- As a customer, I want to scan a single QR and choose my payment app.

### Merchant Admin (Portal)

- As a merchant admin, I want to enable/disable QR payment for my store.
- As a merchant admin, I want to configure which QR providers to accept.

## 3\. Scope by Squad

| Squad                | Repo             | Work                                                                                                         |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **BE** (Trịnh)       | `volt-pos-api`   | New endpoints: `POST /payments/qr/generate`, webhook `/payments/qr/callback`. DB schema for QR transactions. |
| **FE POS** (Việt)    | `volt-pos`       | QR display screen, polling for payment confirmation, success/fail UI.                                        |
| **FE Portal** (Thơm) | `fastboy-portal` | Settings page: toggle QR payment per store, select QR providers.                                             |
| **QC** (Hưng)        | —                | Test end-to-end across 3 repos.                                                                              |

## 4\. Acceptance Criteria

- [ ] Cashier can generate QR for any order amount
- [ ] Payment confirmation appears within 5 seconds of customer scan
- [ ] Merchant admin can toggle QR per store, settings persist
- [ ] All 3 QR providers tested end-to-end
- [ ] Failed payments show clear error to cashier

## 5\. Out of Scope

- Refund flow for QR payments (Q3)
- Multi-currency support (Q3)

---

## How this Document fits the refactor

- **This document lives in the Initiative**, not in any project.
- All 3 squad leads can read it without subscribing to other squads' projects.
- When the spec is ready, leads break it into issues in their respective projects (linked below as <issue id="94b0d7db-0b77-4f45-87a2-308117a2fcd4" href="https://linear.app/fastboy/issue/VP-1241">VP-1241</issue>, <issue id="21baa2d9-9918-409a-8879-a27fc691552f" href="https://linear.app/fastboy/issue/VP-1242">VP-1242</issue>, <issue id="e70dca0d-5674-43a3-9bcc-f682366a4a3e" href="https://linear.app/fastboy/issue/VP-1243">VP-1243</issue>).
- This Document is the **single source of truth** for the feature — when scope changes, update here.

---

# POS for Android Device - P8 Dual

_Linear doc: https://linear.app/fastboy/document/pos-for-android-device-p8-dual-0c753006a132_
_Created: 2026-06-26 · Updated: 2026-06-26 · Author: Loan Dang_

## 1. Giới thiệu

**P8 Android POS** là phiên bản POS chạy trên thiết bị Android P8 — giải pháp bán hàng nhỏ gọn, linh hoạt, hoạt động trong cùng hệ sinh thái với Fastboy POS. Merchant có thể dùng P8 độc lập hoặc song song với Windows POS trong cùng cửa hàng.

Toàn bộ dữ liệu trên P8 đồng bộ với Windows POS và Portal: Services, Staff, Customers, Orders, Payments, Gift Cards, Promotions, Discounts, Rewards, Reports, Merchant Settings.

**Nguyên tắc cốt lõi: P8 không xây dựng business logic riêng** — toàn bộ quy trình nghiệp vụ, công thức tính toán, dữ liệu dùng chung với Windows POS để đảm bảo tính nhất quán trên toàn hệ thống.

## 2. Order Management

- **Pending Orders**: xem danh sách, tạo mới, chỉnh sửa, tiếp tục thanh toán. Luôn đồng bộ giữa tất cả thiết bị POS của cùng Merchant (2 chiều Windows POS ↔ P8).
- **Create Order**: chọn Customer, thêm Service, chỉ định Staff, thêm Note, checkout.
- **Order History**: danh sách, search, filter theo ngày, xem chi tiết.

## 3. Payment

Payment Methods: Card, Cash, Gift Card, Other.

### Card Payment (App-to-App với BambooPay)

P8 **không** trực tiếp xử lý giao dịch thẻ — dùng cơ chế **App-to-App** gọi sang app **BambooPay** trên cùng thiết bị. BambooPay xử lý toàn bộ giao dịch thẻ và trả kết quả về P8.

Quy trình: Merchant chọn Card trên P8 → P8 gửi thông tin giao dịch sang BambooPay → BambooPay xử lý → trả kết quả về P8 → P8 cập nhật Payment Status / Order Status / Batch / Reports → đồng bộ sang Windows POS & Portal.

Các case xử lý: thành công, thất bại, merchant hủy, không kết nối được BambooPay, timeout/không phản hồi. Nếu thất bại, Order giữ nguyên trạng thái trước thanh toán để thử lại hoặc đổi phương thức khác.

- **Promotion, Reward & Item Discount** áp dụng lúc checkout — business logic và công thức giống hoàn toàn Windows POS.

## 4. Split Order

Chia 1 Order thành nhiều Check độc lập, cùng thuộc 1 Order. Hình thức: **Split by Items**, **Split by Amount**, **Split Equally**.

Mỗi Check có Payment Method / Status / Receipt / Card Signature riêng. Order chỉ hoàn thành khi tất cả Check đã thanh toán.

Lưu ý: không đổi cách split sau khi có Check đã thanh toán (phải Void trước nếu muốn split lại); Tip nhập riêng từng Check; Tax/Discount/Promotion phân bổ tự động theo business rule hiện hành.

## 5. Merge Order

Gộp ≥2 **Pending Order** thành 1 Order duy nhất trước khi thanh toán (nhiều khách thanh toán chung, nhiều order cần gộp hóa đơn, nhiều nhân viên tạo order riêng nhưng checkout cùng lúc).

Sau khi merge: services gộp vào 1 order, tổng tiền/Promotion/Discount/Tax tính lại theo order mới. Chỉ hỗ trợ merge Pending Order (không merge order đã thanh toán); sau merge thành công, các Pending Order cũ bị thay thế bởi order mới.

## 6. Gift Card

Tra cứu nhanh: nhập Gift Card Code hoặc quét QR, xem Balance / Status / Transaction History.

## 7. Batch History

Xem danh sách Batch, filter theo ngày/trạng thái, xem chi tiết (Batch Date, Status, Total Amount, Total Orders) và danh sách Order thuộc từng Batch.

## 8. Refund / Void

- **Void Payment**: dùng khi Payment đã thanh toán nhưng **chưa Batch Close**. Sau void: Payment → Void, Order/Reports/Batch cập nhật, đồng bộ Windows POS & Portal.
- **Refund Payment**: Full hoặc Partial Refund (theo Payment Method hỗ trợ). Sau refund: Payment History cập nhật, Order cập nhật, Reports tính lại, Income/Payroll Staff điều chỉnh theo business rule hiện hành.
- **Refund History**: amount, time, status, reason, người thực hiện.

Khả năng Void/Refund phụ thuộc trạng thái Payment và Payment Gateway; quy trình giống hoàn toàn Windows POS.

## 9. Receipt Management

View / Print / Send Receipt (Email, SMS). Receipt luôn hiển thị dữ liệu mới nhất của Order; nếu Order đã Refund/Void thì Receipt hiển thị trạng thái tương ứng. Dùng cùng mẫu và Receipt Settings với Windows POS.

## 10. Reports

### Daily Sale Report

List Order Detail: Order # · Sale (sau discount) · Tax · Tip · Total = Sale+Tip+Tax.
Income Detail: Sale, Tip, Tax Collected → **Total Payment = Sale+Tip+Tax Collected**.
Payment Detail: Card/Cash/Others (Sale − Refund mỗi loại) → **Amount Collected = Card+Cash+Others** → **Total Payment = Amount Collected + Gift Card Redemption**.

### Staff Income

Staff listing: search theo nickname, filter theo Payroll Period (kỳ hiện tại chưa chốt hiển thị đầu danh sách là "Current Period").

**Case 1 — Commission**: Sale, Refund → Subtotal = Sale−Refund; Supply Fee; **Staff Commission = (Subtotal − Supply Fee) × 60%**; Discount Charge (promotion share với chủ); Card Charge – Commission/Tip (theo Staff Compensation setting); Clean Up Fee/Deduction; Tip.
**Total Income = Staff Commission − Clean Up Fee + Tip − Card Charge Commission − Card Charge Tip − Discount Charge**

- Pay 1 = Staff Commission × 30% − Clean up fee − Card Charge Commission − Card Charge Tip − Discount Charge
- Pay 2 = Staff Commission × 70% + Tip

**Case 2 — Salary / Commission+Salary (1 day)**: Clock In/Out, Working Hours, Rate (Salary by Period được quy đổi ra rate/ngày theo kỳ payroll, Wage Per Hour, Wage Per Day). **Gross Income = số ngày/giờ làm × rate**. **Total Income = Gross Income + Clean up fee + Tip**.

Lưu ý: Staff Income là report dự trù, số chính xác cuối cùng nằm ở Payroll khi chốt kỳ. Nếu staff có setting Salary hoặc Commission+Salary, Staff Income luôn show cả 2 phần Commission và Salary nhưng Total Income show phần Salary — quyết định cuối cùng còn phụ thuộc **Staff Days Off Setting**.

## 11. Đồng bộ dữ liệu

- **Master Data**: Services, Staff, Customers, Promotions, Rewards, Discounts, Taxes, Price List, Gift Cards, Merchant/Payment/Order Settings — thay đổi trên Windows POS/Portal tự động cập nhật xuống P8.
- **Order & Payment**: 2 chiều Windows POS ↔ P8; Pending Order luôn đồng bộ; khi thanh toán, status cập nhật toàn hệ thống; Payment/Batch/Reports cập nhật ngay sau giao dịch.

## 12. Hardware & System Integration

- **BambooPay**: thanh toán thẻ qua App-to-App, BambooPay xử lý toàn bộ giao dịch và trả kết quả về P8.
- **Printer**: in Receipt / in lại Receipt sau khi Order hoàn tất.
- **QR Scanner / Camera**: quét Gift Card và các mã QR khác trong tương lai.

## 13. So sánh Windows POS vs P8

| Chức năng                          | Windows POS     | P8                          |
| ---------------------------------- | --------------- | --------------------------- |
| Pending Order                      | ✅              | ✅                          |
| Create Order                       | ✅              | ✅                          |
| Order History                      | ✅              | ✅                          |
| Payment                            | ✅              | ✅                          |
| Card Payment gateway               | Magensa Gateway | Bamboo Gateway (App-to-App) |
| Promotion / Reward / Item Discount | ✅              | ✅                          |
| Split Order                        | ✅              | ✅                          |
| Merge Order                        | ✅              | ✅                          |
| Gift Card Balance                  | ✅              | ✅                          |
| Batch History                      | ✅              | ✅                          |
| Daily Sale Report                  | ✅              | ✅                          |
| Staff Income                       | ✅              | ✅                          |
| Refund / Void                      | ✅              | ✅                          |
| Receipt Management                 | ✅              | ✅                          |

**Nguyên tắc hoạt động chốt lại**: P8 dùng chung business logic với Windows POS, không có logic riêng; dữ liệu giữa P8 / Windows POS / Portal luôn đồng bộ; merchant có thể dùng song song mà không đổi quy trình vận hành hiện tại.

---

# Training videos and useful links

_Linear doc: https://linear.app/fastboy/document/training-videos-and-useful-links-e41a13dafe23_
_Created: 2026-06-25 · Updated: 2026-06-25 · Author: Tien Pham_

Tài liệu hướng dẫn chung dành cho mọi người, gồm video training và các link hữu ích. Nội dung sẽ được bổ sung dần theo từng chủ đề.

## General

### How to create an issue on Linear

Dùng khi cần tạo issue mới đúng project và đúng thông tin chuẩn. Có video hướng dẫn đính kèm trong doc gốc trên Linear (embed video, không có bản text tương đương — xem trực tiếp tại link Linear doc trên).

---

# [DRAFT] Income Version 2 — New Format

_Linear doc title: "Test new format Document" — https://linear.app/fastboy/document/test-new-format-document-b5be492b1ec0_
_Created: 2026-06-24 · Updated: 2026-06-24 · Author: Tien Pham_

> ⚠️ Đây là **bản draft định dạng lại** spec [Income Version 2](18-income-version-2.md), viết chi tiết hơn nhiều (đầy đủ formula, edge case, note cho dev/QA). Tên doc trên Linear vẫn là "Test new format Document" — có thể PO đang thử format mới trước khi merge/rename thành bản chính thức. Giữ file này làm tham khảo bổ sung cho [18-income-version-2.md](18-income-version-2.md), **chưa thay thế** bản gốc cho đến khi PO xác nhận.

## Overview

Spec **POS Income Version 2**: Card charge %, Discount charge, Income reporting, Staff income & payroll reporting.

References: [spreadsheet](https://docs.google.com/spreadsheets/d/1NtBfxEsGjaijFWn7rlzR79sLzmeHTAjNqMDatAnY0wo/edit?gid=1736528834#gid=1736528834) · Business Snapshot UI reference (Google Doc) · Historical source: Google Docs "Income Version 2" tab.

## Shared rules

- **Canceled orders** excluded unless noted.
- **Refund / partial refund** included where formula explicitly says so.
- **Tip / Tax** excluded from sales metrics unless explicitly included.
- **Gift card loads/activations** are **not** POS income; **gift card redemption** is included in payment totals where specified.
- **Gross Income** = sales after discount, before refund; excludes tip/tax/gift card loads & activations.
- **Net Income** = sales after discount and after refund/partial refund; excludes tip/tax/canceled orders/gift card loads & activations.
- **Amount Collected** = Card + Cash + Others.

## 1) Daily Sale Report

Chart metrics: Orders (excl. canceled/refunded/manual-refund), Sale (after discount, excl. tip/tax), Total Tips, Total Payment (includes Gift Card Redemption). Filter default: Today.

Detail: Order list (Order#, Sale, Tax, Tip, Total=Sale+Tip+Tax) → Income detail (Sale, Tip, Tax Collected → **Total Payment = Sale+Tip+Tax Collected**) → Payment detail (Card/Cash/Others = Sale−Refund mỗi loại → **Amount Collected** → **Total Payment = Amount Collected + Gift Card Redemption**).

## 2) Income Summary

Filter: date range, group by Day/Week/Month (default Day-Today). Week/Month grouping: năm hiện tại chỉ show đến kỳ hiện tại, năm quá khứ show đủ.

**Total Income = Total Net Income** kỳ đã chọn, luôn so sánh với kỳ tương đương trước đó.

### Payment details

Card/Cash/Others mỗi loại = Sale − Refund + Tip + Tax (theo phương thức đó) → **Amount Collected = Card+Cash+Others**; **Gift Card Redemption** (Sale/Tip/Tax by Gift Card) → **Total Payment = Amount Collected + Gift Card Redemption**.

### Sale details

**Total Sale = Gift Card Sale + Service Sale + Product Sale**; **Total Refund = Service Refund + Product Refund**; **Subtotal = Total Sale − Total Refund**; **Discount = Discount − Discount Reversed**; **Net Total = Subtotal − Discount**; **Total Payment = Net Total + Tax + Tip**.

### Supply fee

**Total Supply Fee** theo config từng service; **Staff Supply Share = Total Supply Fee × 0.6** (theo Staff Commission Setting, ví dụ 60/40); **Salon Supply Share = Total Supply Fee − Staff Supply Share**.

### Staff payout

**Total Service = Service Sale − Service Refund**; **Staff Commission (60%) = (Total Service × 60%) − Staff Supply Share** (0 nếu staff Salary-only); trừ Tip, Clean Up Fee, Staff Discount Charge, Card Charge (Commission/Tip).

Salary rules: **Salary by Period** quy đổi ra rate/ngày (VD Pay Period 1 week, $7000/kỳ, xem 3 ngày → rate $1000 → Salary=$3000); **Wage Per Hour** = hourly×hours; **Wage Per Day** = daily×days.

Nếu staff **Commission + Salary**: kỳ chưa chốt → show giá trị **lớn hơn**; kỳ đã chốt → show theo **phương thức thực tế đã chọn** trong payroll.

**Total Staff Payout = Staff Commission + Tip + Salary − Supply Fee − Clean Up Fee − Discount Charge − Staff Card Charge Commission − Staff Card Charge Tip**

- Pay 1 = ((Salary + (Commission − Supply Fee)) × 30%) − Clean Up Fee − Discount Charge − Card Charge Commission − Card Charge Tip
- Pay 2 = ((Salary + Commission) × 70%) + Tip
  (tỷ lệ 30/70 theo setting **Pay 1 - Pay 2 Split** của từng staff)

### Salon earnings

**Total Service = Service Sale − Service Refund**; **Salon Commission (40%) = (Total Service×40%) − Salon Supply Share**; **Net Earnings = Salon Commission + Product Sale − Product Refund − Total Discount**; **Total Earning = Net Earnings + Staff Supply Share + Clean Up Fee + Staff Discount Charge − Staff Salary + Staff Card Charge Commission + Staff Card Charge Tip**.

> Note nghiệp vụ: Supply fee là chi phí owner đã trả trước, nên salon earnings cuối cùng phải cộng lại phần chia về owner qua supply fee, promotion, và card-fee deduction.

## 3) Staff Income

Listing: search Nickname, filter theo report date. Columns: Staff, Orders, Subtotal=Sale−Refund, Supply Fee, Tip, Total Income.

**Case 1 — Commission**: Subtotal=Sale−Refund; **Staff Commission=(Subtotal−Supply Fee)×60%**; **Total Income = Staff Commission − Clean Up Fee + Tip − Card Charge Commission − Card Charge Tip − Discount Charge**; Pay1=Commission×30%−(fees); Pay2=Commission×70%+Tip.

**Case 2 — Salary/Commission+Salary (1 ngày)**: Rate theo Salary by Period/Wage Per Hour/Wage Per Day; **Gross Income = worked days/hours × rate**; **Total Income = Gross Income − Clean Up Fee + Tip**.

Clock In/Out display: 1 ngày + 1 ca → show cụ thể; range date → để trống, show tổng Working Hours/Days (Salary by Period luôn để trống, chỉ show Working Days).

Nếu staff Salary hoặc Commission+Salary: luôn show cả 2 phần Commission & Salary, nhưng **Total Income show phần Salary** — quyết định cuối cùng phụ thuộc **Staff Days Off Setting**. Staff Income là report **dự trù**, số chính xác nằm ở Payroll khi chốt kỳ.

## 4) Staff Payroll

**Commission**: giống Staff Income Case 1 nhưng theo Pay Period; Order listing theo ngày (Date, Sale, Refund, Supply, Tip).

**Salary**: Working Days/Hours; **Salary Amount** theo Salary by Period (giá trị config) / Wage Per Day×Working Days / Wage Per Hour×Working Hours; **Total Income = Salary Amount − Clean Up Fee + Tip**; Pay1=Salary×30%−Clean Up Fee; Pay2=Salary×70%+Tip.

Note: Commission+Salary phụ thuộc **Staff Days Off Setting**; Tip có thể bị exclude theo setting **Exclude Tips From Cash/Check Income**.

## 5) Promotion Cost Sharing

Merchant config chia cost Promotion giữa **Owner** và **Staff**. Phần Staff được phân bổ theo tỷ trọng service contribution của từng staff trên order — **không phụ thuộc loại compensation**.

- Staff có Commission (Commission hoặc Salary+Commission): promotion giảm trực tiếp Income/Commission.
- Staff **Salary-only**: promotion vẫn phân bổ ở mức order nhưng **không** giảm Income/Payroll của staff — phần đó trở thành **chi phí của Owner**.

## 6) Multi-pay-period UI

Khi report trải nhiều payroll period, UI cần show rate hiệu lực theo từng period (Commission Rate / Pay 1 Rate / Pay 2 Rate theo từng khoảng ngày) — áp dụng cho cả 2 nhóm compensation (Commission thuần / Salary hoặc Commission+Salary).

## 7) Implementation notes cho dev

- Các label giống nhau ở nhiều report có thể có công thức khác nhau — ví dụ **Daily Sale Report > Payment Detail > Card** (không tính tip/tax) khác **Income Summary > Payment Details > Card** (có tính tip/tax). Không tự ý chuẩn hoá nếu chưa đổi requirement.
- Nhiều giá trị report là **estimate trước khi payroll finalize**, phải trở thành **final** sau khi chốt payroll — đặc biệt ảnh hưởng Commission+Salary và Salary by Period.
- Data dependency: Wage Per Hour cần check-in/out; Wage Per Day cần check-in; Salary by Period cần payroll period boundaries; Promotion sharing cần service-level contribution của staff trên từng order.
- QA cần test kỹ: canceled orders, refund/partial refund, discount reversed khi refund, gift card sale vs redemption, Salary-only vs Commission vs Commission+Salary, payroll chưa/đã chốt, multi-pay-period report, tip include/exclude rule cho cash/check, promotion allocation qua mixed compensation types.
