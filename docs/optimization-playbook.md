# Playbook: các bước tối ưu ĐÃ THÀNH CÔNG

**Cập nhật:** 2026-08-12 · **Nguồn số liệu:** đo thật bằng `src/reporters/TimingReporter.ts`,
máy 12-core, app (Tauri + Vite dev) chạy cùng máy với browser.

File này chỉ ghi **những bước đã làm và đã đo được kết quả**, theo đúng thứ tự nên
áp dụng lại. Phân tích đầy đủ (kể cả các nhánh sai) nằm ở
[test-performance-optimization.md](test-performance-optimization.md).

---

## Kết quả tổng

| mốc                      | tests | workers | wall clock               | efficiency | long pole |
| ------------------------ | ----- | ------- | ------------------------ | ---------- | --------- |
| **Trước** (toàn suite)   | 300   | 1       | **3544s** (59 phút)      | 1.0x       | 548s      |
| Sau — PR lane, 1 máy     | 259   | 8       | **549s** (9.2 phút)      | 6.32x      | 45.8s     |
| Sau — CI shard chậm nhất | 66    | 6       | **167.4s** (2.8 phút) ✅ | 5.05x      | 29.8s     |

**Mục tiêu <300s đã đạt trên CI** (4 shard chạy song song ⇒ wall clock = shard chậm nhất).
Trên 1 máy vẫn 549s vì app dùng chung CPU với browser.

Đường đi của shard chậm nhất: `386s → 220s → 179.6s → 167.4s` (bước 6, 7 bên dưới).

---

## Bước 1 — `workers: 1 → 8` bằng staff isolation _(đòn lớn nhất)_

**Chặn cũ:** comment trong config ghi "2 workers gây race trên active order của cùng
một staff". Điều đó **đúng** — nhưng race là **per-staff, không phải global**.

**Đã làm:**

- [src/fixtures/workerStaff.fixture.ts](../src/fixtures/workerStaff.fixture.ts) — fixture
  worker-scope cấp cho mỗi worker một staff riêng theo `parallelIndex`.
- [src/pages/pos/HomePage.ts](../src/pages/pos/HomePage.ts) — `selectAnyStaff()` mặc định
  lấy staff của worker mình ⇒ **không spec nào phải sửa**.
- `RESERVED_STAFF_NICKNAMES` trong [src/data/static/staff.ts](../src/data/static/staff.ts) —
  loại 3 staff bị spec pin cứng (AMELIA / EMMA2 / LUNA) ra khỏi pool.

**Kết quả:** `3544s → 549s`, efficiency đo được **6.32x / 8**.

**3 quyết định đã cứu bug về sau:**

| quyết định                                             | nếu làm sai thì sao                                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Claim theo **slot số** trên roster LIVE, sort theo tên | Claim theo nickname từ file snapshot: shop khác ⇒ mọi nickname miss ⇒ mọi worker rơi về card đầu tiên, **mất isolation âm thầm** |
| Dùng `parallelIndex`, **không** dùng `workerIndex`     | `workerIndex` tăng mãi khi worker bị teardown sau fail ⇒ chạy quá cuối pool giữa run                                             |
| Vượt pool thì **throw**                                | Im lặng cho 2 worker dùng chung 1 staff = race quay lại dưới dạng flake                                                          |

> Efficiency 6.32/8 nghĩa là **parallel đã hết dư địa**. Đừng tối ưu tiếp theo hướng "thêm worker".

---

## Bước 2 — Tag `@exclusive` cho những gì KHÔNG song song được

Staff isolation **không** bảo vệ 2 loại này (tài nguyên chúng chạm không thuộc staff nào):

| loại                              | spec                                                                                       | vì sao                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Đổi setting toàn merchant         | `TC-language-switch`, `TC-passcode-setting`                                                | worker khác thấy setting đã đổi giữa lúc đang chạy       |
| Assert tổng shop-wide của HÔM NAY | `TC19.21.38-live-delta`, `TC02…refund-cancel`, `TC16.24-payment-types`, `bulkCreateOrders` | worker khác tạo đơn là tổng đổi ngay dưới chân assertion |

**Đã làm:** tag `Tag.EXCLUSIVE` ([src/types/testTags.ts](../src/types/testTags.ts)) → project
`serial` trong config → chạy riêng bằng `npm run test:serial --workers=1`, **sau** lane song song.

> Playwright không có worker count theo project — isolation đến từ **lần gọi riêng**, không từ block config.

---

## Bước 3 — Bỏ passcode gate khỏi ~150 test

**Đã xác minh bằng thực nghiệm:** tick "Do not require passcode for the next 30 minutes"
ghi localStorage `volt-passcode-skip` = `{"staffId":"…","expiresAt":<epoch ms>}`. Context mới
**có** storageState đó ⇒ không còn gate; không có ⇒ có gate.

**Đã làm:**

- [tests/setup/pos.setup.ts](../tests/setup/pos.setup.ts) — project `pos-setup` mở khoá **một
  lần**, lưu storageState; mọi project browser `dependencies: ['pos-setup']` + dùng lại state.
- [src/components/modal/PasscodeDialog.ts](../src/components/modal/PasscodeDialog.ts) —
  `enterPasscode()` giờ **tolerant by default**: đọc `grantRemainingMs()`, biết chắc có gate
  hay không, return ngay nếu không có. Thêm `unlockIfPrompted()` (race gate ⟷ nội dung màn hình).
- `armGate()` cho các test mà **chính gate là đối tượng kiểm thử** — dùng `addInitScript` xoá
  grant thừa hưởng, có latch `sessionStorage` để chỉ xoá ở document load ĐẦU TIÊN (nếu xoá mọi
  load thì TC-34 tự tick "remember 30 phút" rồi navigate sẽ bị xoá đúng cái grant nó đang assert).

**Kết quả:** tiết kiệm ~3-5s × ~150 test có gate.

**Bẫy bắt buộc phải xử cùng lúc:** khi cache grant làm gate biến mất, mọi test _khẳng định gate
phải hiện_ sẽ fail. Đã arm đủ 5 file: `TC32.33.34-permission`, `TC-IST-staff-income`,
`TC-settings-shell`, `TC-business-info`, `TC-passcode-setting`.
Trên cùng shard: `failed 23 → 14`, `passed 38 → 45`.

> **Bài học:** cache một trạng thái toàn cục để tăng tốc ⇒ phải rà **mọi** test lấy chính
> trạng thái đó làm đối tượng kiểm thử.

---

## Bước 4 — Chia lane, cắt chi phí không cần thiết ở lane PR

[playwright.config.ts](../playwright.config.ts), điều khiển bằng `LANE=fast|full`:

| hạng mục            | fast (PR)            | full (nightly)    | lý do                                                                                                   |
| ------------------- | -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| `retries`           | **0**                | 1 (CI)            | retry trả lại **toàn bộ** chi phí navigation cho một fail deterministic                                 |
| `video`             | **off**              | retain-on-failure | `retain-on-failure` vẫn **RECORD mọi test** rồi xoá ⇒ run xanh trả full chi phí encode để không dùng gì |
| `trace`             | on-first-retry       | retain-on-failure | —                                                                                                       |
| `allure-playwright` | **bỏ**               | bật               | reporter đắt nhất ở đây (detail từng step)                                                              |
| `timeout`           | 30s                  | 60s               | xem bước 7                                                                                              |
| `blob`              | khi `PW_BLOB_REPORT` | —                 | để `merge-reports` gộp shard                                                                            |

`npm run test:pr` = `test:fast` (song song) → `test:serial` (tail `@exclusive`).

---

## Bước 5 — Chẻ nhỏ "monster test"

`TC-income-reports-v2-compare.spec.ts` từng là **1121s = 32% cả suite**: 3 test, mỗi test loop
60 ngày tuần tự (`test.setTimeout(40 * 60_000)`).

**Đã làm:** chuyển thành **1 test / (ngày × case)** _và_ `test.describe.configure({ mode: 'parallel' })`.
**Cả hai nửa đều cần** — suite chạy `fullyParallel: false` nên test cùng file dùng **một** worker;
chỉ split không thôi thì vẫn nối tiếp.

Đo trên 3 ngày (10 test), pass/fail **giống hệt**:

| workers | wall      | aggregate | efficiency |
| ------- | --------- | --------- | ---------- |
| 1       | 148.5s    | 139.3s    | 0.94x      |
| 8       | **49.4s** | 158.6s    | 3.21x      |

⇒ **3.0x**, không sinh flake mới. Cửa sổ so sánh thành biến `IRV2_RANGE_DAYS` (PR: 7 ngày, nightly: 60).

> Aggregate **tăng** 139→159s: split thêm chi phí khởi tạo context mỗi test. Split **không miễn phí** —
> nó đổi aggregate lấy wall clock.

---

## Bước 6 — Phá trần "một file = một worker"

Sau khi shard hoá, nghẽn của mỗi shard là **MỘT file chạy tuần tự**, không phải tổng công việc.
Đo shard 1/4 (wall 220.3s): `otherPayment.e2e.spec.ts` **một mình 200.9s / 15 test** — gần đúng
bằng wall clock của cả shard. Thêm worker không giúp gì cho file đó.

**Đã làm:** bật `test.describe.configure({ mode: 'parallel' })` cho các file mà test **độc lập nhau**:

| file                                                               | loại                                                |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| `otherPayment.e2e`, `createOrder.e2e`                              | mỗi test tự dựng đơn của nó, chỉ assert trên đơn đó |
| `TC-IST-staff-income` (đặt ở **file scope** vì file có 3 describe) | chỉ đọc báo cáo                                     |
| `TC01.03…overview`, `TC20.21…payment-details`, `TC02.05.07-filter` | chỉ đọc báo cáo                                     |

**Kết quả (shard 1/4, 6 workers):**

|       | wall       | efficiency | aggregate `otherPayment` |
| ----- | ---------- | ---------- | ------------------------ |
| trước | 220.3s     | 3.59x      | 200.9s                   |
| sau   | **179.6s** | **5.05x**  | **382.6s**               |

Chú ý cột cuối: aggregate **tăng gần gấp đôi** trong khi wall clock **giảm** — chạy song song thì
mỗi test chậm đi do tranh chấp tài nguyên, nhưng chúng chồng lên nhau.
**Đừng dùng aggregate để đánh giá thay đổi kiểu này.**

**Checklist trước khi bật** (không bật bừa): có biến `let` ở scope describe/module không · có
`beforeAll` dựng state dùng chung không · test có assert lên tổng toàn shop không · test có phụ
thuộc thứ tự không (như `bulkCreateOrders` chạy "Order 1/10".."10/10" — phải giữ tuần tự).

---

## Bước 7 — Timeout: giữ CHẶT toàn cục + `test.slow()` cho vài test dài

Hệ quả của bước 6: mỗi test song song chậm đi ⇒ long pole lên 31.2s ⇒ `timedOut` tăng 2 → 4,
các test thanh toán e2e bị **giết oan** ở mốc 30s. Phản xạ tự nhiên là nới timeout. **Đo thật thì ngược lại:**

| cấu hình                               | wall clock                | timedOut | failed |
| -------------------------------------- | ------------------------- | -------- | ------ |
| 30s toàn cục                           | 179.6s                    | 4        | 15     |
| 40s toàn cục                           | **213.6s** ⬅ chậm hơn 34s | 2        | 18     |
| **30s + `test.slow()` cho 2 spec e2e** | **167.4s** ✅             | **0**    | 18     |

**Vì sao:** khi ~1/4 lane đang fail, timeout toàn cục bị chi phối bởi **test FAIL**, không phải
test chậm — cứu 2 test bị giết oan thì phải trả thêm 10s cho _mọi_ test fail.

⇒ Giữ 30s, cho riêng `otherPayment.e2e` + `createOrder.e2e` gọi `test.slow()`. Ai chậm thì người
đó trả, không bắt cả lane trả.

> **Bài học:** khi suite còn nhiều fail, **timeout là bảng giá cho fail**, không phải hạn mức cho pass.

---

## Bước 8 — Fail nhanh khi app sập, thay vì đốt hết timeout

Cụm lỗi lớn nhất trong lần đo đầu (9 × `getByText('Daily Sale Report')`, 6 × heading
`Order History`) **không phải selector drift** — kiểm chứng lại trên app khoẻ, cả 3 locator
resolve đúng (count=1). Nguyên nhân thật: app render error boundary **"Something went wrong"**
thay cho cả màn hình, nên **mọi** `expect(...).toBeVisible()` đốt hết timeout rồi báo
"element(s) not found" — một thông báo không nói gì về nguyên nhân thật.

**Đã làm:** `BasePage.expectReady()` ([src/pages/BasePage.ts](../src/pages/BasePage.ts)) —
race giữa nội dung màn hình và error boundary. App sập ⇒ fail trong ~1s kèm thông báo nói rõ
"đây là lỗi môi trường, không phải selector". Đã nối vào `waitForReady()` của Daily Sale Report /
Income Summary / Staff Income / Order History.

> Chi tiết dễ làm sai: sau khi race xong phải re-assert với timeout **1s**, không phải `timeout`
> gốc — nếu không thì mọi fail-không-crash chờ **gấp đôi** so với trước khi có hàm này.

---

## Bước 9 — Thay sleep cứng bằng tín hiệu thật (những chỗ đo được là có lợi)

| chỗ                        | trước                         | sau                                                                        |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| `PasscodeDialog` mỗi digit | `waitForTimeout(150)` cứng    | `waitForFunction` đếm indicator đã điền, **cap đúng 150ms**                |
| `HomePage` nút Remove      | `isVisible({ timeout: 500 })` | `isVisible()` — timeout đó là **no-op**, `isVisible()` không bao giờ retry |
| `HomePage` dialog confirm  | `isVisible({ timeout: 500 })` | `waitFor({ timeout: 2000 })` — cái này **thật sự** là async mount          |

Hai chi tiết quan trọng:

- **Cap 150ms là có chủ ý.** Selector indicator là best-effort; trên build render khác thì điều
  kiện không bao giờ đúng, và cap dài hơn sẽ làm nó **chậm hơn cả cái sleep nó thay thế**
  (4 digit × 400ms = 1.6s vs 0.6s cũ). Ở 150ms, trường hợp xấu nhất chỉ **bằng** hành vi cũ.
- **`isVisible()` không chờ, và đó là ĐÚNG ở đây.** Caller đã chờ `staffSearchInput` nên cart panel
  đã render; "không có nút Remove" thật sự nghĩa là "không có đơn sót". Bất cứ thứ gì chờ ở đây sẽ
  cộng full timeout vào **MỌI** `goto()`, vì ca phổ biến là không có gì phải dọn.

> Ngược lại: `locator.isVisible({ timeout })` gọi ngay sau navigate gần như luôn trả `false` vì SPA
> chưa mount. Chính bẫy này khiến 3 lần probe đầu kết luận sai rằng "gate không còn xuất hiện".
> Cần chờ thì dùng `expect(locator).toBeVisible({ timeout })`.

---

## Bước 10 — CI: shard hoá

[.github/workflows/e2e.yml](../.github/workflows/e2e.yml):

| job      | nội dung                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------- |
| `static` | typecheck + lint **trước** — lỗi compile không nên tốn cả matrix browser                        |
| `fast`   | **4 shard × 6 workers**, `--shard=i/4`. Shard là máy riêng ⇒ app instance không tranh chấp nhau |
| `serial` | `@exclusive`, `--workers=1`, `needs: fast` ⇒ không chồng lấn                                    |
| `report` | `playwright merge-reports` từ blob của mọi shard → 1 HTML                                       |

Đo thật cả 4 shard (vòng 2):

| shard | tests | wall clock             | efficiency |
| ----- | ----- | ---------------------- | ---------- |
| 1/4   | 66    | **220.3s** ← chậm nhất | 3.59x      |
| 2/4   | 82    | 102.4s                 | 3.64x      |
| 3/4   | 50    | 100.8s                 | 4.12x      |
| 4/4   | 64    | 75.2s                  | 4.05x      |

4 shard song song ⇒ wall clock = shard chậm nhất = **167.4s** sau bước 6+7 ⇒ **đạt <5 phút**.

`nightly-regression.yml`: 6 shard, `LANE=full`, có `@slow` (i18n scan, IRV2 60 ngày, RECON/PAST
pipeline), `IRV2_RANGE_DAYS` cấu hình được.

> Đây là thời gian **chạy test**. Job CI còn cộng checkout + `npm ci` + `playwright install`
> (~1-3 phút tuỳ cache) — muốn tổng job cũng dưới 5 phút thì cache `~/.cache/ms-playwright`.

---

## Bước 11 — Dụng cụ đo + 2 cái gate

Không có bước nào ở trên chọn đúng được nếu không đo. Hai file:

**[src/reporters/TimingReporter.ts](../src/reporters/TimingReporter.ts)** — in 3 số phải nhìn:

| số             | nghĩa                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **aggregate**  | tổng công việc. Muốn giảm wall clock **bền vững** thì giảm cái này                                                                  |
| **efficiency** | số worker trung bình đang làm việc. Thấp hơn nhiều so với `workers` ⇒ đang bị chặn bởi long pole/dependency, **thêm worker vô ích** |
| **long pole**  | test đơn lẻ chậm nhất. **Wall clock không bao giờ thấp hơn số này**, bất kể bao nhiêu worker                                        |

Chính `long pole` là thứ chứng minh mục tiêu 5 phút từng **bất khả thi về mặt số học**: trước đây
long pole = 548s — **một test**. Giờ là 29.8s.

**[scripts/perf-summary.mjs](../scripts/perf-summary.mjs)** — `npm run perf`, exit non-zero khi:

1. **Vượt budget runtime** (mặc định 300s) ⇒ CI gate theo runtime giống như gate theo fail.
2. **Tỉ lệ skip quá cao** (`MAX_SKIP_RATIO`, mặc định 35%). Lỗ hổng thật đã phát hiện:
   **suite skip 81 test vẫn báo XANH** — dataset mỏng làm mọi guard `test.skip(!found, 'no data')`
   bắn cùng lúc. Kiểm chứng gate: shard 2 vòng 2 (63/82 = 77% skip) → **exit 1**;
   shard 1 vòng 3 (5/66 = 8%) → **exit 0**. Đã nối vào CI (`if: always()`).

---

## Bước 12 — Preflight dataset (chặn "xanh giả")

App là **Tauri có DB CỤC BỘ đồng bộ dần từ upstream** (`d:/2.POS/volt-pos/volt-pos`,
`npm run start` = `tauri dev --features graphql_server`). `localhost:1420/graphql` **không** phải
backend thật — nó là GraphQL server nhúng đọc DB cục bộ. Trong cửa sổ sync, `staffList` có thể trả
`[]` rồi ít lâu sau đầy lại (đo được: `[]` → `2376 / 218 active`).

Hệ quả dây chuyền trong cửa sổ rỗng: gate passcode từ chối **mọi** mã (`"Failed to verify staff code"`
— không còn nhân viên để verify) → `pos.setup.ts` fail → mọi project phụ thuộc `did not run`; hoặc
không tạo được đơn ⇒ hàng chục skip.

**Đã làm:** `assertShopHasStaff()` trong [pos.setup.ts](../tests/setup/pos.setup.ts) — query
`staffList` **TRƯỚC** khi làm gì khác, không có active staff thì fail ngay với thông báo nói đúng
nguyên nhân. Thông báo khi gate từ chối cũng **đọc lại text trong dialog** thay vì báo timeout trơ.

> Thông báo cũ đổ lỗi cho `OWNER_PASSCODE` và **đã đánh lừa chính tôi** một lần. Đây là lý do
> preflight fail ở project mà mọi project browser phụ thuộc: biến hàng chục lỗi mù thành **MỘT** lỗi rõ.

**Quy tắc vận hành: đừng chạy suite ngay sau khi mở app.** Đợi sync xong rồi hãy chạy.

---

## Checklist áp dụng lại (thứ tự)

1. **Đo trước đã** — không có `TimingReporter` thì mọi bước sau là đoán (bước 11).
2. Xem **long pole**: nếu một test > budget ⇒ chẻ nhỏ + `mode: 'parallel'` (bước 5).
3. Tìm tài nguyên mutable dùng chung ⇒ isolate **per-worker**, không pin toàn cục (bước 1).
4. Tag những gì thật sự không song song được ⇒ lane serial riêng (bước 2).
5. Cache trạng thái toàn cục đắt đỏ **một lần** ⇒ và rà mọi test lấy nó làm subject (bước 3).
6. Xem **efficiency**: nếu ≪ `workers` ⇒ nghẽn là **file**, không phải worker ⇒ `mode: 'parallel'`
   theo từng file, có checklist (bước 6).
7. Cắt chi phí không dùng ở lane PR: video, allure, retry (bước 4).
8. Timeout **chặt** + `test.slow()` cho ngoại lệ. **Đừng nới toàn cục** (bước 7).
9. Fail nhanh & nói đúng nguyên nhân khi môi trường sập (bước 8, 12).
10. Shard trên CI, `static` job trước (bước 10).
11. Gate cả **runtime** và **tỉ lệ skip** (bước 11).

---

## Phụ lục A — Đã thử / đã tin và SAI (để không đi lại)

| điều từng tin                                         | thực tế đo được                                                                                                                                                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Không tăng workers được vì race condition"           | Đúng về race, **sai về kết luận**. Race là per-staff ⇒ isolate theo worker là đủ. Đây chính là đòn lớn nhất.                                                                                                                       |
| "109 chỗ `waitForTimeout` là phần lớn thời gian chết" | Sleep cứng **không** phải nguyên nhân chính. Hooks + fail mới là chỗ tiền nằm. Phần sleep còn lại nằm trong spec i18n giờ thuộc lane nightly.                                                                                      |
| "Nới timeout để cứu test bị giết oan"                 | **Chậm hơn 34s** (bước 7).                                                                                                                                                                                                         |
| "95 fail là do selector drift"                        | Kiểm chứng: cả 3 locator resolve đúng trên app khoẻ. Phần lớn là **môi trường** (bước 8, 12).                                                                                                                                      |
| "Hook chiếm 51% ⇒ hoist hook là đòn quyết định"       | Chỉ số hook bị **đếm trùng** (Playwright gán `beforeAll` vào nhiều test, fixture worker-scope cũng tính là hook — đã gặp 913s "hooks" / 821s test). Sau khi clamp: **~35%**. Thực tế shard xuống 220s **mà không hoist hook nào**. |

**Bẫy khi đo** (đã dính, đừng lặp lại):

- **Đừng sửa file nguồn trong lúc một lần chạy đang diễn ra** — Playwright transform file tại thời
  điểm worker load; sửa giữa chừng làm shard chết với `Duplicate declaration`. Lỗi của quá trình đo,
  không phải của test.
- `--reporter=line` trên CLI **ghi đè toàn bộ** reporter trong config ⇒ `TimingReporter` không chạy,
  `timing.json` giữ số cũ. Muốn lọc log thì grep output.
- `npx playwright test --list` cũng **ghi đè** `reports/json/results.json` ⇒ chạy `--list` sau một
  lần chạy thật là **mất baseline** (đã mất một lần).
- Đừng tin con số fail của một lần chạy đơn lẻ — kiểm tra có `App error boundary rendered` trong log
  không trước khi kết luận.

---

## Phụ lục B — Còn tồn đọng (chưa làm)

| việc                                                                                                       | ước lượng  | ghi chú                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Xoá `tests/tmp-verify-detail.spec.ts`                                                                      | ~42.2s/run | File tạm còn sót, fail mỗi lần chạy. **Vẫn còn trong repo.**                                                                                                              |
| Bật `mode: 'parallel'` cho `order-management` (55.9s/14t, 0 mutate), `chart-switching` (63.2s/6t, chỉ đọc) | —          | Đã kiểm tra là không có state dùng chung                                                                                                                                  |
| `split-order-multi-item` (86.1s/18t)                                                                       | —          | Có tạo đơn ⇒ cần rà kỹ hơn trước khi bật                                                                                                                                  |
| Hoist hook trong `TC01.03…overview` (8/9 test dùng chung `openToday()`)                                    | ~45s wall  | **Lợi ích nhỏ hơn tưởng** — nhiều test report **buộc** phải điều hướng riêng vì chúng kiểm tra chính URL/bộ lọc đó                                                        |
| Cân lại tải giữa các shard (220s vs 75s)                                                                   | —          | Playwright chia theo file mà file không đều; tăng số shard hoặc tách file report nặng                                                                                     |
| Cache `~/.cache/ms-playwright` + node_modules trên CI                                                      | 1-3 phút   | Để **tổng job** cũng dưới 5 phút, không chỉ phần chạy test                                                                                                                |
| ~16 test API dùng field GraphQL đã bị backend xoá                                                          | 0s         | Fail **rất nhanh** (~279ms) nên không tốn thời gian. Repo đã ghi chú là known drift — **đừng đổi tên field theo phỏng đoán**, chọn field thay thế là quyết định nghiệp vụ |

---

## Lệnh chạy

```bash
npm run test:pr        # PR gate: fast lane song song, rồi serial tail
npm run test:fast      # chỉ phần song song (259 test)
npm run test:serial    # chỉ @exclusive, workers=1
npm run test:full      # tất cả, kể cả @slow (nightly)
npm run test:slow      # chỉ các pipeline/scan nặng

npm run perf                      # verdict budget + skip rate từ lần chạy gần nhất
node scripts/perf-summary.mjs --budget 300 --max-skip-ratio 0.35
```

Biến môi trường: `LANE=fast|full`, `WORKERS=n`, `PERF_BUDGET_SECONDS`, `MAX_SKIP_RATIO`,
`IRV2_RANGE_DAYS`, `TIMING_OUT`, `POS_STORAGE_STATE`, `TRACE`, `VIDEO`.
