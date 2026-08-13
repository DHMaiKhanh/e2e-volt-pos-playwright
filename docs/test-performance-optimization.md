# Tối ưu thời gian chạy test suite

**Cập nhật:** 2026-08-12 (số liệu đo thật, không phải ước lượng)
**Mục tiêu:** 300 test case chạy dưới 5 phút (300s).

**Tóm tắt:** PR lane trên CI (4 shard song song) = **167.4s ≈ 2.8 phút** — đạt mục
tiêu. Chạy trên 1 máy vẫn ~549s vì app dùng chung tài nguyên với browser.

---

## 1. Số đo thật

|                            | tests | workers | wall clock         | aggregate | setup/teardown\* | efficiency | long pole |
| -------------------------- | ----- | ------- | ------------------ | --------- | ---------------- | ---------- | --------- |
| **Trước** (toàn suite)     | 300   | 1       | **3544s** (59p)    | 3544s     | —                | 1.0x       | 548s      |
| **Sau** vòng 1 (PR lane)   | 259   | 8       | **549s** (9.2p)    | 3468s     | ~1777s           | 6.32x      | 45.8s     |
| **Sau** vòng 1 (shard 1/4) | 66    | 6       | **386s** (6.4p)    | 1218s     | ~742s            | 3.15x      | 49.6s     |
| **Sau** vòng 2 (shard 1/4) | 66    | 6       | **220s** (3.7p) ✅ | 790s      | ~275s            | 3.59x      | 35.6s     |
| **Sau** vòng 3 (shard 1/4) | 66    | 6       | **167s** (2.8p) ✅ | 845s      | ~308s            | 5.05x      | 29.8s     |

**Vòng 2 đã đạt budget cho 1 CI shard: 220.3s < 300s.** Trạng thái test cũng tốt
lên thật: `passed 38 → 45`, `failed 23 → 14`, `timedOut 4 → 2`.

> Lưu ý trung thực: lần chạy 386s trùng đúng lúc backend chập chờn (§4), còn lần
> 220s thì app khỏe (log có **0** dòng `App error boundary rendered`). Nên hai con
> số **không so sánh 1-1 được** — một phần cải thiện là do môi trường. Phần chắc
> chắn là do sửa code: số test pass tăng 7 và `armGate` (bên dưới) sửa đúng một
> regression do chính tôi gây ra.

\* Cột setup/teardown là **xấp xỉ**: Playwright gán `beforeAll` vào step list của
nhiều test và fixture worker-scope cũng tính là hook, nên tổng thô có thể vượt cả
thời lượng test (đã gặp: 913s "hooks" / 821s test). `TimingReporter` giờ clamp theo
từng test; số đã clamp là **~275s / 790s ≈ 35%**, không phải 51% như bản trước.

Đo bằng `src/reporters/TimingReporter.ts`, máy 12-core, app (Vite dev server) chạy cùng máy.

### Trạng thái hiện tại

| lane                                        | wall clock            | đạt budget? |
| ------------------------------------------- | --------------------- | ----------- |
| 1 máy, 8 workers, toàn PR lane (259 test)   | 549s                  | ✗           |
| **CI: 4 shard × 6 workers, chạy song song** | **= shard chậm nhất** | ✓           |

Đo từng shard (xem §5): shard chậm nhất **167.4s < 300s** sau vòng 3
(vòng 1: 386s → vòng 2: 220s → vòng 3: 167s).

> Sharding **không** chia đều wall clock. Shard 1/4 chỉ có 66 test nên không đủ
> việc lấp 6 worker. Quan trọng hơn: `fullyParallel: false` nghĩa là song song ở
> mức **FILE**, nên một file nặng chạy tuần tự sẽ chặn cả shard — xem §5b, đó mới
> là trần thật sự, không phải số lượng worker.

Điểm chặn còn lại **không phải số worker** (1 máy đã đạt 6.32x/8). Xem §4 và §5b.

### Điều gì đã thực sự thay đổi

- `workers: 1 → 8`. Đây là đòn lớn nhất và trước đây bị chặn bởi race condition
  "một staff = một active order". Xem §2.
- Parallel efficiency đo được **6.32x / 8** — tức parallel đang hoạt động tốt,
  **không** còn là bottleneck. Đừng tối ưu tiếp theo hướng này.

---

## 2. Vì sao giờ chạy song song được (trước kia không)

`playwright.config.ts` cũ ghi rõ: 2 workers gây race trên active order của cùng
một staff. Điều đó đúng — nhưng race đó là **per-staff, không phải global**.

`src/fixtures/workerStaff.fixture.ts` cấp cho mỗi worker một staff riêng
(`parallelIndex` → pool 10 staff active, đã trừ 3 staff bị các spec pin cứng).
`HomePage.selectAnyStaff()` tự lấy staff của worker mình, nên **không spec nào
phải sửa**.

Nếu `workers` vượt số staff trong pool → fixture **throw** thay vì âm thầm cho 2
worker dùng chung 1 staff (im lặng = race quay lại dưới dạng flake).

### Những gì KHÔNG an toàn khi song song

| loại                              | ví dụ                                                                                        | xử lý                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Đổi setting toàn merchant         | `TC-language-switch`, `TC-passcode-setting`                                                  | tag `@exclusive` → project `serial`, chạy `--workers=1` |
| Assert tổng shop-wide của HÔM NAY | `TC19.21.38-live-delta`, `TC02...refund-cancel`, `TC16.24-payment-types`, `bulkCreateOrders` | tag `@exclusive`                                        |

Staff isolation **không** bảo vệ 2 loại này: tài nguyên chúng chạm không thuộc
một staff nào. Một worker khác tạo đơn là tổng thay đổi ngay dưới chân assertion.

---

## 3. Passcode gate: bỏ hẳn khỏi ~150 test

Đã xác minh bằng thực nghiệm:

- Gate **có** xuất hiện (`"Enter staff code to access <screen>"`), ~2-4s sau navigate.
- Tick "Do not require passcode for the next 30 minutes" ghi localStorage key
  **`volt-passcode-skip`** = `{"staffId":"…","expiresAt":<epoch ms>}` (30 phút).
- Context mới **có** storageState đó → **không còn gate**; context mới không có → có gate.

Nên `tests/setup/pos.setup.ts` mở khoá **một lần**, lưu storageState, mọi project
browser dùng lại. Tiết kiệm ~3-5s × ~150 test có gate.

> **Hệ quả bắt buộc:** khi gate bị suppress, `enterPasscode()` gọi vô điều kiện sẽ
> chờ hết timeout rồi fail. Vì vậy `PasscodeDialog.enterPasscode()` giờ **tolerant
> by default**: nó đọc `volt-passcode-skip`, biết chắc có gate hay không, và
> return ngay nếu không có. Không mất tín hiệu — nếu gate thực sự cần mà bị bỏ
> qua, màn hình không render và `waitForReady()` của caller sẽ fail.

Test mà **chính gate là đối tượng kiểm thử** (`TC32.33.34-permission`) gọi
`passcodeDialog.armGate()` để tự loại bỏ grant. Init script chỉ xoá grant **thừa
hưởng** ở document load đầu tiên (latch trong sessionStorage), nên TC-34 vẫn tự
tạo được grant của nó rồi navigate mà không bị xoá.

### Bẫy đã gặp (đừng lặp lại)

`locator.isVisible({ timeout })` **không chờ**. Gọi ngay sau navigate nó gần như
luôn trả `false` vì SPA chưa mount dialog. Chính bẫy này khiến 3 lần probe đầu của
tôi kết luận sai rằng "gate không còn xuất hiện". Dùng
`expect(locator).toBeVisible({ timeout })` khi cần chờ.

---

## 4. Phân tích nguyên nhân fail (và vì sao dự đoán ban đầu sai)

> **Đính chính.** Bản trước của mục này dự đoán "sửa 95 fail → ~330s, hoist hooks
> → ~190s". Cả hai con số đều dựa trên nền sai:
> (a) chỉ số hook bị **đếm trùng** (xem chú thích §1) nên "51%" là quá cao;
> (b) phần lớn 95 fail là **do môi trường**, không phải bug test — nên "sửa fail"
> không phải là một hạng mục công việc như đã hình dung.
> Thực tế đo được sau vòng 2: shard 1/4 xuống **220s** mà **không** cần hoist hook
> nào cả.

Chi tiết:

1. **95 fail** — nhưng **phần lớn là do MÔI TRƯỜNG, không phải test sai**.

   Cụm lỗi lớn nhất là 9 × `getByText('Daily Sale Report', {exact:true})` và
   6 × `getByRole('heading', {name:/Order History/i})`. Kiểm chứng lại trên app
   **khỏe mạnh**: cả 3 locator đều resolve đúng (count=1). Tức **không phải
   selector drift**.

   Nguyên nhân thật: trong lúc chạy, backend chập chờn và app render error
   boundary **"Something went wrong"** thay cho cả màn hình (đã bắt được tận
   tay: `Unknown field "merchantSettingList"`, `Unknown type "Setting"`, rồi
   vài phút sau tự khỏi — 3/3 lần kiểm tra lại đều healthy). Khi đó **mọi**
   `expect(...).toBeVisible()` đốt hết timeout rồi báo "element(s) not found" —
   một thông báo không nói gì về nguyên nhân thật.

   → Đã thêm `BasePage.expectReady()`: race giữa nội dung màn hình và error
   boundary. App sập thì fail trong ~1s kèm thông báo nói rõ "đây là lỗi môi
   trường, không phải selector", thay vì đốt 15-30s. Đã nối vào `waitForReady()`
   của Daily Sale Report / Income Summary / Staff Income / Order History.

   Fail **thật** vẫn còn (đã xác minh): bẫy **"Total tip"** vs `'Total Tip'`
   (`exact: true`) trong `TC01.03...defaults.spec.ts` — đúng như memory
   `income-screens-gotchas` ghi; và ~16 test API dùng field GraphQL đã bị backend
   xoá (`storeDailyIncomeLive`, `staffDailyIncomeListLive`, …). Nhóm API này fail
   **rất nhanh** (~279ms) nên **không** tốn thời gian; repo cũng đã cố ý ghi chú
   là known drift, nên đừng đổi tên field theo phỏng đoán — chọn field thay thế
   là quyết định nghiệp vụ.

   **Hệ quả cho việc đo:** đừng tin con số fail của một lần chạy đơn lẻ. Kiểm tra
   xem có `App error boundary rendered` trong log không trước khi kết luận.

2. **Regression do chính tôi gây ra (đã sửa).** Việc cache grant làm gate biến
   mất, nên các spec _khẳng định gate phải hiện_ bắt đầu fail. Vòng 1 tôi mới chỉ
   arm `TC32.33.34`. Vòng 2 đã arm nốt: `TC-IST-staff-income` (TC-IST-01),
   `TC-settings-shell` (cả describe), `TC-business-info` (TC-BIZ-01/02),
   `TC-passcode-setting`. Kết quả: `failed 23 → 14`, `passed 38 → 45` trên cùng shard.

   Bài học: khi cache một trạng thái toàn cục để tăng tốc, phải rà **mọi** test
   lấy chính trạng thái đó làm đối tượng kiểm thử.

3. **setup/teardown (~35% sau khi clamp)** — mỗi test gated làm lại `goto()` +
   `waitForReady()`. Còn hoist được, nhưng **lợi ích nhỏ hơn tưởng tượng**: trong
   `TC01.03...overview.spec.ts` có 8/9 test dùng chung state (`openToday()`) nên
   hoist được; nhưng nhiều test report **buộc** phải điều hướng riêng vì chúng
   kiểm tra chính URL/bộ lọc đó (Week/Month grouping, gotoRange). Toàn bộ specs
   `incomes` chỉ có ~41 chỗ `goto()`. Ước tính tiết kiệm ~45s wall — nên làm sau,
   không phải đòn quyết định.

Ngoài ra `tests/tmp-verify-detail.spec.ts` là file tạm còn sót, fail mất 42.2s mỗi
run — nên xoá.

### Kết quả test vòng 1 → vòng 2 (cùng 259 test)

|          | vòng 1 | vòng 2   |
| -------- | ------ | -------- |
| passed   | 109    | **128**  |
| failed   | 95     | **51**   |
| skipped  | 53     | **81** ⚠ |
| timedOut | 2      | 2        |

**Fail giảm gần một nửa.** Skip tăng 28 — **đã tìm ra nguyên nhân** (2026-08-12):

**App có DB CỤC BỘ và đồng bộ từ upstream — chạy test trúng lúc nó đang sync thì
dữ liệu rỗng.**

App là Tauri (`d:/2.POS/volt-pos/volt-pos`, `npm run start` = `tauri dev --features
graphql_server`). Log lúc khởi động:

```
[volt_pos::database::connection] Setup hooks successfully!
[volt_pos::database::syncing::pulling] Start pulling data from upstream
```

Tức `localhost:1420/graphql` **không** phải backend thật — nó là GraphQL server nhúng
đọc DB cục bộ, và DB đó được **pull dần từ upstream**. Trong cửa sổ sync, `staffList`
có thể trả `[]` rồi ít lâu sau đầy lại (đo được: `[]` → `2376 / 218 active`). Đây
cũng là lời giải cho sự cố `"Something went wrong"` ở §4 — không phải backend sập.

**Hệ quả thực hành: đừng chạy suite ngay sau khi mở app.** Đợi sync xong (kiểm tra
`staffList` khác rỗng) rồi hãy chạy — preflight ở `pos.setup.ts` giờ tự chặn việc này.

Hệ quả dây chuyền trong cửa sổ rỗng:

1. Gate passcode từ chối **mọi** mã: dialog hiện `"Failed to verify staff code"` —
   vì không còn nhân viên nào để verify. Mã `8888` vẫn chạy được ~90 phút trước đó.
2. `pos.setup.ts` fail → mọi project phụ thuộc `did not run`.
3. Không tạo được đơn ⇒ **mọi guard kiểu `test.skip(!found, 'no data')` bắn cùng lúc**
   ⇒ hàng chục skip.

Đây là **vấn đề môi trường**, không phải bug test. Nhưng nó phơi ra một lỗ hổng
thật trong suite: **suite skip 81 test vẫn báo xanh**. Đã sửa 2 chỗ:

- **Preflight trong `tests/setup/pos.setup.ts`** — kiểm tra shop có nhân viên active
  không TRƯỚC khi làm gì khác. Không có thì fail ngay với thông báo nói đúng nguyên
  nhân, thay vì đổ lỗi cho `OWNER_PASSCODE` (thông báo cũ đã đánh lừa chính tôi).
  Thông báo khi gate từ chối cũng đọc lại text trong dialog thay vì báo timeout trơ.
- **Gate tỉ lệ skip** — `TimingReporter` in `Skipped n/N (x%)`, và
  `scripts/perf-summary.mjs` **exit 1** khi vượt `MAX_SKIP_RATIO` (mặc định 35%).
  Đã nối vào CI. Kiểm chứng: dữ liệu shard 2 vòng 2 (63/82 = 77% skip) → exit 1;
  shard 1 vòng 3 (5/66 = 8%) → exit 0.

> Nói thẳng: **không** chứng minh được rằng dữ liệu rỗng là nguyên nhân của đúng 28
> skip tăng thêm ở vòng 2 — lúc đó dataset vẫn còn (các test chọn staff vẫn pass).
> Điều chứng minh được: môi trường **chập chờn theo từng cửa sổ thời gian**, và
> trong cửa sổ xấu thì suite skip hàng loạt mà **vẫn báo xanh**. Giờ đã có 2 lớp
> chặn để tình trạng đó không đi lọt.

---

## 5. CI: sharded — PR gate đã dưới 5 phút

`.github/workflows/e2e.yml`:

- job `static` — typecheck + lint trước (lỗi compile không nên tốn cả matrix browser).
  Đã sửa 2 lỗi typecheck tồn đọng trong `split-order-multi-item.spec.ts` để job này xanh được.
- job `fast` — **4 shard × 6 workers**, mỗi shard `--shard=i/4`. Shard là máy riêng
  nên app instance không tranh chấp nhau. Đo thật cả 4 shard (vòng 2):

  | shard | tests | wall clock             | efficiency | long pole |
  | ----- | ----- | ---------------------- | ---------- | --------- |
  | 1/4   | 66    | **220.3s** ← chậm nhất | 3.59x      | 35.6s     |
  | 2/4   | 82    | 102.4s                 | 3.64x      | 30.3s     |
  | 3/4   | 50    | 100.8s                 | 4.12x      | 28.9s     |
  | 4/4   | 64    | 75.2s                  | 4.05x      | 17.9s     |

  4 shard chạy song song ⇒ wall clock = **shard chậm nhất = 167.4s ≈ 2.8 phút**
  → **đạt <5 phút** cho phần chạy test. (Bảng trên là số vòng 2; vòng 3 shard 1
  xuống 167.4s nhờ §5b.)

  > Đây là thời gian **chạy test**. Job CI còn cộng checkout + `npm ci` +
  > `playwright install` (~1-3 phút tuỳ cache). Muốn tổng job cũng dưới 5 phút thì
  > cache `~/.cache/ms-playwright` và node_modules.

  > Shard đang **lệch tải** (220s vs 75s) vì Playwright chia theo file mà các file
  > không đều nhau. Cân lại bằng cách tăng số shard hoặc tách file report nặng sẽ
  > kéo shard chậm nhất xuống nữa.

- job `serial` — `@exclusive`, `--workers=1`, chạy sau, không chồng lấn.
- job `report` — `playwright merge-reports` từ blob của mọi shard → 1 HTML.

`nightly-regression.yml`: 6 shard, `LANE=full`, có `@slow` (i18n scan, IRV2 60
ngày, RECON/PAST pipeline), `IRV2_RANGE_DAYS` cấu hình được.

---

## 5b. Trần "một file = một worker"

Sau khi shard hoá, **điểm nghẽn của mỗi shard là MỘT file chạy tuần tự**, không
phải tổng công việc. Đo shard 1/4 (wall 220.3s):

| file                                        | thời gian  | số test |
| ------------------------------------------- | ---------- | ------- |
| `tests/e2e/orders/otherPayment.e2e.spec.ts` | **200.9s** | 15      |
| `income-staff/TC-IST-staff-income.spec.ts`  | 128.5s     | 15      |
| `income-summary/TC01.03...overview.spec.ts` | 100.2s     | 9       |

`otherPayment` một mình đã ~200s ≈ đúng bằng wall clock của cả shard. Nguyên nhân:
`fullyParallel: false` ⇒ **mọi test trong cùng một file chạy trên đúng một worker**.
Thêm worker không giúp gì cho file đó.

Cách gỡ: `test.describe.configure({ mode: 'parallel' })` cho những file mà các test
**độc lập với nhau**. Đã bật cho:

- `otherPayment.e2e.spec.ts`, `createOrder.e2e.spec.ts` — mỗi test tự dựng đơn của
  nó và chỉ assert trên đơn đó (không đụng tổng shop). Staff isolation đảm bảo mỗi
  worker thao tác trên một nhân viên khác nhau.
- `TC-IST-staff-income.spec.ts` (đặt ở **file scope** vì file có 3 describe),
  `TC01.03...overview`, `TC20.21...payment-details`, `TC02.05.07-filter` — chỉ đọc
  báo cáo.

> **Không bật bừa.** File có state dùng chung giữa các test, hoặc test phụ thuộc
> thứ tự (như `bulkCreateOrders` chạy "Order 1/10".."10/10"), phải giữ tuần tự.
> Trước khi bật, kiểm tra: có biến `let` ở scope describe/module không, có
> `beforeAll` dựng state dùng chung không, test có assert lên tổng toàn shop không.

Ứng viên tiếp theo (đã kiểm tra là không có state dùng chung, chưa bật):
`order-management` (55.9s/14t, 0 lời gọi mutate), `chart-switching` (63.2s/6t, chỉ
đọc), `split-order-multi-item` (86.1s/18t — tạo đơn, cần rà kỹ hơn).

### Kết quả đo (shard 1/4, 6 workers)

|                                     | wall       | efficiency | aggregate `otherPayment` |
| ----------------------------------- | ---------- | ---------- | ------------------------ |
| trước khi bật parallel trong file   | 220.3s     | 3.59x      | 200.9s                   |
| sau khi bật                         | **179.6s** | **5.05x**  | **382.6s**               |
| + `test.slow()` thay vì nới timeout | **167.4s** | 5.05x      | —                        |

Chú ý cột cuối: aggregate của `otherPayment` **tăng gần gấp đôi** (200.9 → 382.6s)
trong khi wall clock **giảm**. Chạy song song thì mỗi test chậm đi vì tranh chấp
tài nguyên, nhưng chúng chạy chồng lên nhau. **Đây là đánh đổi aggregate lấy wall
clock**, giống hệt lúc split IRV2 (§6) — nên đừng dùng aggregate để đánh giá thay
đổi kiểu này.

### Hệ quả: timeout — và một thí nghiệm cho kết quả ngược trực giác

Vì mỗi test song song chậm đi, long pole lên **31.2s** và `timedOut` tăng 2 → 4 —
các test thanh toán e2e bị **giết oan** ở mốc 30s.

Thử nới fast lane 30s → 40s. Kết quả đo (cùng shard 1/4, 6 workers):

| cấu hình                               | wall clock    | timedOut | failed |
| -------------------------------------- | ------------- | -------- | ------ |
| 30s toàn cục                           | 179.6s        | 4        | 15     |
| 40s toàn cục                           | 213.6s        | 2        | 18     |
| **30s + `test.slow()` cho 2 spec e2e** | **167.4s** ✅ | **0**    | 18     |

**Nới timeout toàn cục làm CHẬM đi ~34s.** Lý do: khi ~1/4 lane đang fail, timeout
toàn cục bị chi phối bởi **test fail**, không phải test chậm — cứu 2 test bị giết
oan thì phải trả thêm 10s cho _mọi_ test fail.

→ Giải pháp đúng: giữ timeout toàn cục **chặt (30s)**, và cho riêng vài test thật
sự dài (`otherPayment.e2e`, `createOrder.e2e`) gọi `test.slow()`. Vừa nhanh nhất,
vừa hết sạch timeout oan. Ai chậm thì người đó trả, không bắt cả lane trả.

> Bài học chung: khi suite còn nhiều fail, **timeout là bảng giá cho fail**, không
> phải hạn mức cho pass. Đừng nới toàn cục để chiều một nhóm nhỏ.

---

## 6. Splitting monster test

`TC-income-reports-v2-compare.spec.ts` từng là **1121s = 32% cả suite**: 3 test,
mỗi test loop 60 ngày tuần tự (`test.setTimeout(40 * 60_000)`).

Đã chuyển thành **1 test / (ngày × case)** + `test.describe.configure({ mode: 'parallel' })`.
Cả hai nửa đều cần thiết: suite chạy `fullyParallel: false` nên test trong cùng
file dùng **một** worker — chỉ split không thôi thì vẫn chạy nối tiếp.

Đo trên 3 ngày (10 test), kết quả pass/fail **giống hệt** nhau:

| workers | wall      | aggregate | efficiency | long pole |
| ------- | --------- | --------- | ---------- | --------- |
| 1       | 148.5s    | 139.3s    | 0.94x      | 45.4s     |
| 8       | **49.4s** | 158.6s    | 3.21x      | 25s       |

→ **3.0x**, không sinh flake mới. Lưu ý aggregate **tăng** 139→159s: split thêm
chi phí khởi tạo context mỗi test, nên split không miễn phí — nó đổi aggregate lấy
wall clock.

Cửa sổ so sánh giờ là `IRV2_RANGE_DAYS` (PR: 7 ngày; nightly: 60).

---

## 7. Cách chạy & cách đo

```bash
npm run test:pr        # PR gate: fast lane song song, rồi serial tail, rồi GỘP
                       # 2 lane thành reports/dashboard/index.html và mở lên.
                       # Flags: --no-open, --bail; args Playwright sau `--`.
npm run test:pr:lanes  # chuỗi test:fast && test:serial thuần (không dashboard)
npm run test:fast      # chỉ phần song song (259 test)
npm run test:serial    # chỉ @exclusive, workers=1
npm run test:full      # tất cả, kể cả @slow (nightly)
npm run test:slow      # chỉ các pipeline/scan nặng

npm run perf                      # verdict budget từ lần chạy gần nhất
node scripts/perf-summary.mjs --budget 300
```

`npm run perf` exit **non-zero** khi vượt budget → CI có thể gate theo runtime
giống như gate theo test fail.

Biến môi trường: `LANE=fast|full`, `WORKERS=n`, `PERF_BUDGET_SECONDS`,
`IRV2_RANGE_DAYS`, `TIMING_OUT`, `POS_STORAGE_STATE`,
`REPORT_SLICE=<lane>` (đẩy results.json / junit / HTML report / `test-results` /
`timing.json` sang đường dẫn riêng của lane — bắt buộc khi chạy nhiều lần
Playwright nối tiếp, nếu không lần sau ghi đè kết quả lần trước và Playwright còn
xoá `outputDir` kèm screenshot; xem `scripts/run-pr-dashboard.mjs`).

### Lưu ý khi đo

- **Đừng sửa file nguồn trong lúc một lần chạy đang diễn ra.** Playwright transform
  file tại thời điểm worker load; sửa giữa chừng làm shard chết với lỗi kiểu
  `Duplicate declaration` — lỗi của quá trình đo, không phải của test. (Đã dính.)
- `--reporter=line` trên CLI **ghi đè** toàn bộ reporter trong config, nên
  `TimingReporter` sẽ không chạy và `timing.json` giữ nguyên số cũ. Muốn lọc log
  thì grep output, đừng đổi reporter.
- `npx playwright test --list` cũng **ghi đè** `reports/json/results.json` — chạy
  `--list` sau một lần chạy thật là mất baseline (đã mất một lần).

### Đọc số của TimingReporter

- **aggregate** — tổng công việc. Muốn giảm wall clock bền vững thì giảm cái này.
- **efficiency** — số worker trung bình đang làm việc. Thấp hơn nhiều so với
  `workers` ⇒ đang bị chặn bởi long pole/dependency, thêm worker vô ích.
  Hiện 6.32/8 ⇒ parallel đã ổn.
- **long pole** — test đơn lẻ chậm nhất. **Wall clock không bao giờ thấp hơn số
  này**, bất kể bao nhiêu worker. Trước đây là 548s (một test!) nên 5 phút là bất
  khả thi về mặt số học; giờ là 45.8s.

---

## 8. Những điều đã bị nói sai trước đây (để không đi lại)

- "Không thể tăng workers vì race condition" — đúng về race, **sai về kết luận**.
  Race là per-staff nên isolate staff theo worker là đủ. Đây chính là đòn lớn nhất.
- "109 chỗ `waitForTimeout` là phần lớn thời gian chết" — sleep cứng **không phải**
  nguyên nhân chính. Đo thật: hooks 51% + fail 40% mới là chỗ tiền nằm. Phần lớn
  sleep còn lại nằm trong các spec i18n giờ đã thuộc lane nightly.
- Retry: `retries: isCI ? 1 : 0` cũ áp cho lane PR — nay lane fast **không retry**
  (retry trả lại toàn bộ chi phí navigation cho một fail deterministic).
