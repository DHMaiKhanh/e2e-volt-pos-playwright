---
title: Chi tiết luồng code-gen — Thông tin doanh nghiệp (Business Info)
expands: docs/codegen-flow/settings-business-flow.md
generated-at: 2026-07-06
---

# Chi tiết luồng code-gen — Thông tin doanh nghiệp (Business Info)

## Tổng quan công nghệ

| Công nghệ                    | Vai trò trong luồng gen                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| **Playwright MCP**           | Quét live `/settings/business`, nhập passcode, snapshot cây a11y, chụp full-page |
| **Linear MCP**               | Đọc VP-871 + sub-task để lấy spec/nghiệp vụ                                      |
| **Playwright Test**          | Chạy spec (`@fixtures/index`, `expect`, `test.step`)                             |
| **Page Object (BasePage)**   | `BusinessInfoPage` kế thừa `BasePage` — locator + action, không assert           |
| **PasscodeDialog component** | Mở khoá gate (`enterPasscode`, `tickRemember30m`)                                |
| **TS path alias**            | `@pages`, `@components`, `@fixtures`, `@/`                                       |
| **scripts/md-to-html.mjs**   | Render `.md` → HTML tự-chứa kèm hero image                                       |

## Chi tiết theo file

### 1. src/pages/settings/BusinessInfoPage.ts

- **Vai trò:** page object — locator các section/field + đọc Pay Period.

```ts
this.heading = page.getByRole('heading', { name: 'Business Info' });
this.payPeriodGroup = page.locator('[role="radiogroup"]');
this.editButton = page.getByRole('button', { name: 'Edit', exact: true });
field(name: string): Locator { return this.page.getByRole('textbox', { name, exact: true }); }
daySwitch(day: string): Locator { return this.page.getByRole('switch', { name: `Open on ${day}` }); }
async isFieldEditable(name: string): Promise<boolean> { return this.field(name).first().isEditable().catch(() => false); }
```

- **Giải thích:** dùng **role-based locator** (`getByRole`) — bền hơn CSS, khớp trực tiếp cây a11y đã quét bằng MCP. `readPayPeriod()` đọc `data-state="checked"` của Radix radio.
- **Công nghệ:** Playwright locators + Radix a11y attributes.

### 2. src/components/modal/PasscodeDialog.ts (tái dùng)

- **Vai trò:** mở khoá owner passcode gate.

```ts
await passcodeDialog.tickRemember30m();
await passcodeDialog.enterPasscode('8888'); // click từng nút số, chờ dialog ẩn
```

- **Công nghệ:** Radix dialog + `getByRole('button', { name: digit, exact: true })`.

### 3. tests/regression/settings/business/TC-business-info.spec.ts

- **Vai trò:** 11 test read-only.

```ts
async function openUnlocked(businessInfoPage, passcodeDialog) {
  await businessInfoPage.goto();
  await passcodeDialog.waitForVisible(8_000).catch(() => {}); // cold-load: dialog mount trễ
  if (await passcodeDialog.isOpen()) {
    await passcodeDialog.tickRemember30m();
    await passcodeDialog.enterPasscode(PASSCODE);
  }
  await businessInfoPage.waitForReady();
}
```

- **Giải thích:** bài học khi chạy — trên cold `goto`, dialog passcode mount **sau** khi app render, nên phải `waitForVisible` (best-effort) trước khi kiểm `isOpen()`; nếu kiểm ngay sẽ bỏ qua unlock → form bị gate chặn → `waitForReady` timeout (9/11 test từng fail vì lỗi này).
- **Công nghệ:** Playwright Test + custom fixtures (`businessInfoPage`, `passcodeDialog`).

### 4. scripts/md-to-html.mjs

- **Vai trò:** render mọi `.md` (feature/testcases/flow/i18n) → HTML tự-chứa, nhúng `business-info.png` base64.
- **Công nghệ:** Node script + markdown→HTML + base64 image inlining.

## So với bản map (skill 3)

Bản map chỉ liệt kê file→file; bản này thêm **đoạn code thật** + **bài học runtime** (cold-load passcode race) và **công nghệ** từng mắt xích.
