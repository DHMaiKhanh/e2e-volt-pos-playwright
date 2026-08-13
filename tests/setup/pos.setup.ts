import { test as setup, expect, type Page } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { shopPasscode } from '@data/static/shops';

/**
 * POS suite bootstrap — unlocks the passcode gate ONCE and caches the grant.
 *
 * WHY
 * Every gated screen (`/incomes/*`, `/settings/business`, …) opens a
 * "Enter staff code to access <screen>" dialog. Specs were paying for it per
 * test: ~2-4s for the dialog to mount, 4 keypad clicks, then the dismiss wait —
 * roughly 3-5s × ~150 gated tests.
 *
 * The dialog offers "Do not require passcode for the next 30 minutes", and that
 * grant is stored CLIENT side as the `volt-passcode-skip` localStorage key
 * (verified: a fresh context seeded with this storageState gets no gate at all,
 * while a fresh context without it does). So one real unlock here, saved to
 * storageState, removes the gate for every worker in the run.
 *
 * CONSEQUENCE FOR SPECS
 * With the grant cached the gate no longer appears, so an UNCONDITIONAL
 * `enterPasscode()` would now wait 10s and fail. Specs must unlock conditionally
 * — see `PasscodeDialog.unlockIfPrompted()`.
 *
 * EXPIRY
 * The grant lasts 30 minutes. The fast lane finishes well inside that. A long
 * full-lane run can outlive it, which is exactly why the unlock helper stays
 * conditional instead of being deleted.
 */

const STORAGE_STATE = process.env.POS_STORAGE_STATE ?? '.auth/pos-storage-state.json';

/** A gated screen used to trigger the dialog. */
const GATED_ROUTE = '/incomes/income-daily';

/**
 * Preflight: the shop must actually have staff.
 *
 * WHY THIS IS A HARD FAILURE, NOT A SKIP
 * Dozens of specs guard themselves with `test.skip(!found, 'No … to inspect')`
 * so they stay green on a thin dataset. That is reasonable per-test, but when the
 * dataset is EMPTY the whole suite quietly turns into ~80 skips and still reports
 * success — the run looks fine while testing almost nothing. Observed on
 * 2026-08-12: `staffList` returned `[]`, which also makes the passcode gate answer
 * "Failed to verify staff code" for every code, since there is no staff to verify
 * against. The failure surfaced as a confusing "passcode was rejected — check
 * OWNER_PASSCODE" instead of the real cause.
 *
 * Failing here, in the project every browser project depends on, converts that
 * into ONE unambiguous error.
 */
async function assertShopHasStaff(page: Page): Promise<void> {
  const result = await page
    .evaluate(async () => {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: '{ staffList { nickname status } }' }),
      });
      return res.json();
    })
    .catch((err: unknown) => ({ error: String(err) }));

  const list = (result as { data?: { staffList?: Array<{ status: string }> } })?.data?.staffList;

  if (!Array.isArray(list)) {
    console.warn(
      '[pos.setup] could not read staffList to preflight the dataset — continuing. ' +
        `Response: ${JSON.stringify(result).slice(0, 200)}`,
    );
    return;
  }

  const active = list.filter((s) => s.status === 'active').length;
  if (list.length === 0 || active === 0) {
    throw new Error(
      `The shop has no ${list.length === 0 ? 'staff at all' : 'ACTIVE staff'} ` +
        `(staffList returned ${list.length} rows, ${active} active).\n\n` +
        `This is an ENVIRONMENT problem, not a test bug. With no staff:\n` +
        `  - the passcode gate rejects every code ("Failed to verify staff code"),\n` +
        `  - no order can be created, so order-flow specs all skip,\n` +
        `  - the suite would otherwise report ~80 skips and still look green.\n\n` +
        `Reseed the dev shop, or point BASE_URL/SHOP at one that has staff.`,
    );
  }

  console.log(`[pos.setup] preflight OK — ${active} active staff of ${list.length}`);
}

setup('cache the passcode grant for the whole POS suite', async ({ page }) => {
  // Generous: this runs once and the whole suite depends on it, and a cold Vite
  // dev server can take several seconds to hand over the first gated screen.
  setup.setTimeout(120_000);

  const passcode = shopPasscode(process.env.SHOP ?? '');

  await page.goto(GATED_ROUTE, { waitUntil: 'domcontentloaded' });

  await assertShopHasStaff(page);

  const dialog = page.getByRole('dialog', { name: /Enter (your passcode|staff code)/i });

  // NOTE: a waiting assertion, not locator.isVisible() — isVisible() does not
  // wait, so it reports false while the SPA is still mounting the dialog.
  let gated = true;
  try {
    await expect(dialog).toBeVisible({ timeout: 20_000 });
  } catch {
    gated = false;
  }

  if (gated) {
    // Tick the 30-minute grant FIRST — this is the box whose effect we cache.
    const remember = dialog.getByRole('checkbox', {
      name: /Do not require passcode for the next 30 minutes/i,
    });
    if (await remember.isVisible().catch(() => false)) {
      if (!(await remember.isChecked().catch(() => false))) await remember.click();
      await expect(remember).toBeChecked();
    } else {
      // Without the checkbox there is no grant to cache; the run still works,
      // it just pays the gate per test. Say so rather than failing the suite.
      console.warn(
        '[pos.setup] "Do not require passcode for the next 30 minutes" checkbox not found — ' +
          'the grant cannot be cached and gated tests will unlock individually.',
      );
    }

    for (const digit of passcode) {
      await dialog.getByRole('button', { name: digit, exact: true }).click();
    }

    // The dialog renders "Failed to verify staff code" in place, so read it back
    // rather than reporting a bare timeout — otherwise the message blames
    // OWNER_PASSCODE when the real cause is usually the dataset (see the
    // preflight above) or a code that no longer exists in this shop.
    try {
      await expect(dialog).toBeHidden({ timeout: 15_000 });
    } catch {
      const shown = ((await dialog.innerText().catch(() => '')) || '').replace(/\s+/g, ' ');
      throw new Error(
        `Passcode "${passcode}" was not accepted — the gate stayed open.\n` +
          `Dialog said: "${shown.slice(0, 160)}"\n\n` +
          `Check, in order: (1) does the shop still have the staff this code belongs to, ` +
          `(2) OWNER_PASSCODE / SHOP env, (3) src/data/static/shops.ts SHOP_PASSCODES.`,
      );
    }
  } else {
    // Either the merchant disabled "Enable Passcode Verification", or a grant
    // from a previous run is still live. Both are fine: we save whatever state
    // exists so the suite behaves consistently.
    console.warn(
      '[pos.setup] no passcode gate appeared on ' +
        GATED_ROUTE +
        ' — saving state anyway (setting may be off, or a grant is still live).',
    );
  }

  // Prove the grant actually landed, so a silent miss shows up here and not as
  // 150 confusing downstream failures.
  const grant = await page.evaluate(() => window.localStorage.getItem('volt-passcode-skip'));
  if (grant === null) {
    console.warn(
      '[pos.setup] localStorage key `volt-passcode-skip` is absent after unlocking — ' +
        'the app may have changed how the grant is stored. Gated tests will fall back to ' +
        'unlocking individually (slower, still correct).',
    );
  } else {
    console.log(`[pos.setup] cached passcode grant: volt-passcode-skip=${grant}`);
  }

  const dir = path.dirname(STORAGE_STATE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE });
  console.log(`[pos.setup] storage state written to ${STORAGE_STATE}`);
});
