# Tổng quan cấu trúc dự án `volt-pos-playwright`

Tài liệu này mô tả luồng dữ liệu/file (file nào sinh ra file nào) và mức độ quan trọng của từng file/thư mục, giúp người mới nắm nhanh dự án test tự động cho VOLT POS.

## 1. Cấu trúc thư mục cấp cao

| Ưu tiên | File/Thư mục                                                  | Vai trò                                                                                                                                                           |
| ------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | `package.json`                                                | Scripts npm (test, lint, dashboard, report, codegen...), dependencies (`@playwright/test`, `allure-playwright`, `winston`...)                                     |
| 2       | `playwright.config.ts`                                        | `testDir: ./tests`, reporters (list/html/json/junit/allure), projects: `chromium`, `no-retry`, `api`, `portal-auth`, `portal`; `workers: 1` (backend share state) |
| 3       | `tsconfig.json`                                               | Path alias: `@/*`, `@api`, `@pages`, `@components`, `@fixtures`, `@helpers`, `@utils`, `@domains`, `@data`, `@types`, `@constants`, `@configs`, `@tests`          |
| 4       | `.claude/skills/*`                                            | 5 skill điều phối toàn bộ quy trình sinh doc + code (chi tiết mục 5)                                                                                              |
| 5       | `configs/env`, `configs/constants`                            | Env loader (`loadEnv`), hằng số                                                                                                                                   |
| 6       | `scripts/*.mjs`                                               | `generate-test-commands.mjs`, `check-server.mjs`, `build-dashboard.mjs`, `build-reports-index.mjs`, `md-to-html.mjs`                                              |
| —       | `README.md`, `CONTRIBUTING.md`, `.gitlab-ci.yml`, `.mcp.json` | Tài liệu chung, CI, cấu hình MCP                                                                                                                                  |

> Không có `CLAUDE.md` ở root — quy trình vận hành nằm trong `.claude/skills/*/SKILL.md` và `docs/screens/README.md`.

## 2. Thư mục `docs/`

```
docs/
├── dashboard-guide.md          # chuẩn văn phong tài liệu
├── report-field-formulas.md
├── test-commands.md            # TỰ SINH — không sửa tay
├── linear/                     # bản mirror offline các Linear doc (nguồn spec khi MCP Linear không khả dụng)
│   └── order-pending.md, income-report.md, order-flow.md, settings.md, ... (39 file)
├── features/                   # tài liệu cũ + *-assets (ảnh) cho các màn chưa có code-detail
└── screens/                    # tài liệu chuẩn theo từng màn hình
    └── <màn>/
        ├── <màn>-test-cases.md    # Feature Overview + Test Cases
        └── <màn>-code-detail.md   # Flow Map + Code Detail + "## i18n Notes"
```

Quy ước bắt buộc (xem `docs/screens/README.md`): **tối đa 2 file/màn hình**.

`docs/test-commands.md`: tự sinh bởi `scripts/generate-test-commands.mjs`, liệt kê toàn bộ test case kèm lệnh `npx playwright test <file>:<line>` chính xác (hiện ~270 test case / 70 file).

## 3. Danh sách màn hình đã có trong `docs/screens/`

| Màn                    | Route                           | test-cases |      code-detail       |
| ---------------------- | ------------------------------- | :--------: | :--------------------: |
| home                   | `/home`                         |     ✅     |           ✅           |
| income-daily           | `/incomes/income-daily`         |     ✅     |           ✅           |
| income-staff           | `/incomes/income-staff`         |     ✅     |           ✅           |
| income-summary         | `/incomes/income-summary`       |     ✅     |           ✅           |
| income-reports-v2      | —                               |     ✅     |           —            |
| order-history          | `/order-history`                |     ✅     |           ✅           |
| order-pending          | `/order-pending`                |     ✅     |           ✅           |
| order-flow             | `/home` (create order/checkout) |     ✅     | — (chồng lấn với Home) |
| settings-business      | `/settings/business`            |     ✅     |           ✅           |
| appointment            | `/appointment`                  |     ✅     |           —            |
| charge-fee             | `/settings/charge-fee`          |     ✅     |           —            |
| receipt                | `/settings/receipt`             |     ✅     |           —            |
| settings-accessibility | `/settings/accessibility`       |     ✅     |           —            |
| settings-language      | `/settings/language`            |     ✅     |           —            |
| settings-roles         | `/settings/roles`               |     ✅     |           —            |
| settings-services      | `/settings/services`            |     ✅     |           —            |
| settings-staffs        | `/settings/staffs`              |     ✅     |           —            |
| staff-payroll          | —                               |     ✅     |           —            |
| time-keeping           | `/home?dialog=time-keeping`     |     ✅     |           —            |

## 4. Thư mục `tests/` (spec) và `src/` (page objects, fixtures, tiện ích)

```
tests/
├── api/                     # test qua GraphQL API (project "api")
├── Bug/                     # spec tái hiện bug cụ thể
├── e2e/orders/              # tạo/xóa/thanh toán order end-to-end
├── portal/                  # test Portal (SSO qua auth.setup.ts, storageState)
├── regression/              # phần lớn test, chia theo domain
│   └── appointment/, i18n/, incomes/, order-history/, orders/, pos/, settings/
├── smoke/                   # voltPos.smoke.spec.ts
└── tmp-verify-detail.spec.ts
```

```
src/
├── pages/
│   ├── BasePage.ts          # base class mọi page object kế thừa
│   ├── pos/                 # HomePage, CheckoutPage, OrderHistoryPage, OrderPendingPage, AppointmentPage,
│   │                        # IncomeSummaryPage, IncomeStaffPage, DailySaleReportPage, StaffPayrollPage,
│   │                        # TimeTrackingPage, SplitOrderPage, OtherPaymentPage, PaymentSuccessPage
│   └── settings/            # AccessibilitySettingsPage, BusinessInfoPage, EmployeeSettingsPage, LanguageSettingsPage
├── fixtures/
│   ├── index.ts             # entry point: `import { test, expect } from '@fixtures/index'`
│   ├── pages.fixture.ts
│   └── api.fixture.ts
├── utils/                   # i18nScan.ts, i18nCompare.ts (GLOSSARY), checkReport.ts, dateUtils.ts, moneyUtils.ts, stringUtils.ts, retry.ts, logger.ts
├── domains/i18n/            # i18nHome.ts, i18nIncomes.ts, i18nOrderHistory.ts, i18nOrderPending.ts, i18nPopups.ts, i18nCheckoutPayment.ts, i18nSplitOrder.ts
├── domains/income/, domains/orders/, domains/reporting/
├── api/                     # GraphQL clients, models, services
├── db/VoltPosDb.ts
├── components/              # Sidebar, DataTable, PasscodeDialog, QuickPayDialog, BaseModal
├── constants/                # errorMessages.ts, urls.ts
└── types/testTags.ts         # `Tag` enum dùng để gắn @smoke/@regression/@ui...
```

## 5. Thư mục `reports/` (output tự sinh)

```
reports/
├── html/, json/, junit/                # output chuẩn Playwright reporter
├── dashboard/                          # dashboard tổng hợp (index.html + assets)
├── index.html                          # trang chỉ mục report (build bởi build-reports-index.mjs)
├── i18n-audit/                         # kết quả deep-scan tiếng Việt (home-scan.html/json, auto-scan.json)
└── <màn>/                              # mỗi màn 1 thư mục riêng
    ├── <màn>-scan.html / .json         # report "gộp 1 test lớn" (skill screen-suite-report)
    ├── compare.html / compare.json     # so sánh EN↔VI (skill i18n-vietnamese-scan)
    └── i18n-result.html                # HTML render từ code-detail.md kèm ảnh
```

Tất cả file trong `reports/` tự sinh khi chạy test — không viết tay.

## 6. Luồng sinh code — file nào ra file nào

```
Linear MCP (mcp__linear-server) hoặc bản offline docs/linear/<x>.md
        │
        ▼  [Skill: linear-spec-testcase]
        │  - Đọc spec Linear + sub-task/issue con
        │  - Quét màn hình THẬT bằng Playwright MCP (cuộn hết trang, mở panel/dialog trước khi ghi nhận UI)
        ▼
docs/screens/<màn>/<màn>-test-cases.md
   (## Feature Overview + ## Test Cases — mỗi TC-ID map 1-1 sang 1 test())
        │
        ├─► src/pages/pos|settings/<Màn>Page.ts   (page object, kế thừa BasePage, chỉ locator + action)
        └─► tests/regression/<nhóm>/<màn>/TC-*.spec.ts
                  (import @fixtures/index, Tag từ @/types/testTags)
        │
        ▼  [Skill: codegen-flow]  (chỉ ĐỌC lại các mắt xích trên, không sinh thêm code)
docs/screens/<màn>/<màn>-code-detail.md
   (## Flow Map: sơ đồ file→file + bảng mắt xích
    ## Code Detail: trích code thật + giải thích công nghệ — Playwright, MCP,
       TanStack Router window.__TSR_ROUTER__.navigate, fixtures, alias @, Allure, Tag)
        │
        ▼  [Skill: i18n-vietnamese-scan]  (bổ sung, không tạo file mới)
   thêm mục "## i18n Notes" vào cuối file code-detail.md
   (chạy TC-i18n-screen-compare.spec.ts → reports/<màn>/compare.json/html
    → phân tích missing/suspect/uiBroken theo GLOSSARY trong src/utils/i18nCompare.ts)
        │
        ▼  [Skill: screen-suite-report]  (tuỳ chọn, gộp các TC rời thành 1 test lớn kiểu Home)
tests/regression/<nhóm>/<màn>/TC-<màn>.spec.ts
   (1 test(), mỗi case = test.step qua helper check(), dùng src/utils/checkReport.ts:
    captureShot / writeCheckReport / summarize / SkipCheck)
        │
        ▼ (khi chạy: npx playwright test ...)
reports/<màn>/<màn>-scan.html + .json   (report tự-chứa, screenshot base64, không abort khi fail)
        │
        ▼  [Skill: test-commands-sync]  (chạy sau khi có test mới)
node scripts/generate-test-commands.mjs  →  ghi đè docs/test-commands.md
```

Ví dụ luồng thật đã hoàn chỉnh (màn **Home**):
`docs/linear/main-flow-onboard.md` → `docs/screens/home/home-test-cases.md` → `src/pages/pos/HomePage.ts` + `tests/regression/i18n/TC-i18n-home-vietnamese-scan.spec.ts` (dùng `src/utils/i18nScan.ts`, `src/domains/i18n/i18nHome.ts`, `src/domains/i18n/i18nPopups.ts`) → `reports/i18n-audit/home-scan.html/json`.

## 7. File quan trọng — xếp theo thứ tự ưu tiên tổng thể

1. **Config gốc**: `package.json`, `playwright.config.ts`, `tsconfig.json`, `.mcp.json`, `configs/env/loadEnv.ts`
2. **Docs quy trình / skill**:
   - `.claude/skills/linear-spec-testcase/SKILL.md`
   - `.claude/skills/codegen-flow/SKILL.md`
   - `.claude/skills/i18n-vietnamese-scan/SKILL.md`
   - `.claude/skills/screen-suite-report/SKILL.md`
   - `.claude/skills/test-commands-sync/SKILL.md`
   - `docs/screens/README.md` (quy ước 2-file-per-screen)
   - `docs/dashboard-guide.md`
3. **Nguồn spec**: `docs/linear/<x>.md` (offline mirror), Linear MCP (ưu tiên khi khả dụng)
4. **Tài liệu theo màn** (đọc trước khi sinh code): `docs/screens/<màn>/<màn>-test-cases.md`, `docs/screens/<màn>/<màn>-code-detail.md`
5. **Fixtures/hạ tầng test dùng chung**: `src/fixtures/index.ts`, `src/pages/BasePage.ts`, `src/utils/i18nScan.ts`, `src/utils/i18nCompare.ts`, `src/utils/checkReport.ts`, `src/types/testTags.ts`
6. **Page objects**: `src/pages/pos/*.ts`, `src/pages/settings/*.ts`
7. **Spec test**: `tests/regression/**/TC-*.spec.ts`, `tests/e2e/**`, `tests/api/**`, `tests/smoke/**`
8. **Script tự động hoá**: `scripts/generate-test-commands.mjs`, `scripts/check-server.mjs`, `scripts/md-to-html.mjs`, `scripts/build-reports-index.mjs`, `scripts/build-dashboard.mjs`
9. **Output/report** (chỉ đọc, không sửa tay): `docs/test-commands.md`, `reports/<màn>/*.html|json`, `reports/html`, `reports/json`, `reports/junit`, `reports/dashboard`, `reports/index.html`
