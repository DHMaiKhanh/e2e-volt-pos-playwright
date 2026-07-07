---
title: Luồng code-gen — Thông tin doanh nghiệp (Business Info)
generated-at: 2026-07-06
---

# Luồng code-gen — Thông tin doanh nghiệp (Business Info)

## Sơ đồ (file → file)

```
Linear VP-871 / docs/linear/settings.md
  └─(skill 1 linear-feature-spec: quét Playwright MCP + screenshot)
     → docs/features/settings-business.md  (+ settings-business-assets/business-info.png)
        └─(skill 2 linear-testcase-gen: quét MCP → liệt kê case)
           → docs/testcases/settings-business-testcases.md
              ├─→ src/pages/settings/BusinessInfoPage.ts        (page object — locators + readPayPeriod)
              └─→ tests/regression/settings/business/TC-business-info.spec.ts  (spec, 11 test)
                   └─(khi chạy)→ reports/html, reports/allure-results, test-results/
  └─(skill 5 i18n-vietnamese-scan)
     → docs/i18n/settings-business-i18n-result.md  (+ reports/settings-business/compare.{html,json})
  └─(skill 6 screen-suite-report)
     → tests/regression/settings/business/TC-business-info-ALL.spec.ts
        └─(khi chạy)→ reports/settings-business/settings-business-scan.{html,json}
```

## Bảng mắt xích

| #   | File nguồn                                | →   | File đích                                                             | Khâu tạo                 | Ghi chú                                  |
| --- | ----------------------------------------- | --- | --------------------------------------------------------------------- | ------------------------ | ---------------------------------------- |
| 1   | Linear VP-871 + `docs/linear/settings.md` | →   | `docs/features/settings-business.md`                                  | skill 1                  | Quét MCP live + chụp `business-info.png` |
| 2   | `docs/features/settings-business.md`      | →   | `docs/testcases/settings-business-testcases.md`                       | skill 2                  | 12 case (read-only)                      |
| 3   | testcases.md                              | →   | `src/pages/settings/BusinessInfoPage.ts`                              | skill 2                  | Đã có sẵn — mở rộng thêm locators        |
| 4   | testcases.md                              | →   | `tests/regression/settings/business/TC-business-info.spec.ts`         | skill 2                  | 11 test, chạy xanh                       |
| 5   | route live                                | →   | `docs/i18n/settings-business-i18n-result.md`                          | skill 5                  | 70 ✅ / 0 chưa dịch (sau khi vào gate)   |
| 6   | testcases + spec                          | →   | `TC-business-info-ALL.spec.ts` + `reports/settings-business/*-scan.*` | skill 6                  | 1-big-test kiểu Home                     |
| 7   | mọi `.md`                                 | →   | `reports/settings-business/*.html`                                    | `scripts/md-to-html.mjs` | HTML kèm hero image                      |

## Ghi chú

- **Passcode gate:** màn gated → mọi spec phải unlock `8888` trước; helper dùng `PasscodeDialog`.
- Page object `BusinessInfoPage` đã tồn tại từ pipeline income (đọc Pay Period) → skill 2 chỉ **mở rộng** locators, không tạo mới.
- Mắt xích còn thiếu: chưa có spec Linear riêng cho phần POS (Pay Period / Store Policies) — xem §6 feature doc.
