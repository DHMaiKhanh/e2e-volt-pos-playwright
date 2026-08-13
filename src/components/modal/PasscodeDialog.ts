import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

export class PasscodeDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    // Use a regex so trivial whitespace differences in the dialog title
    // don't make the locator miss. Volt POS renders either a generic
    // "Enter your passcode" title or a per-screen "Enter staff code to
    // access <screen>" title depending on the gate — match both.
    const dialog = page.getByRole('dialog', { name: /Enter (your passcode|staff code)/i });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = page.getByRole('heading', { name: /Enter (your passcode|staff code)/i });
  }

  async waitForVisible(timeout = 10_000): Promise<void> {
    await expect(this.dialog).toBeVisible({ timeout });
  }

  /** localStorage key holding the "don't ask for 30 minutes" grant. */
  static readonly GRANT_KEY = 'volt-passcode-skip';

  /**
   * Milliseconds until the cached passcode grant expires, or `null` when there
   * is no live grant.
   *
   * The app stores the grant as `{"staffId":"…","expiresAt":<epoch ms>}` under
   * {@link GRANT_KEY}. Reading it tells us for certain whether a gate is coming,
   * so the unlock helpers can skip instantly instead of waiting out a timeout.
   */
  async grantRemainingMs(): Promise<number | null> {
    const raw = await this.page
      .evaluate((key) => window.localStorage.getItem(key), PasscodeDialog.GRANT_KEY)
      .catch(() => null);
    if (!raw) return null;
    try {
      const { expiresAt } = JSON.parse(raw) as { expiresAt?: number };
      if (typeof expiresAt !== 'number') return null;
      const left = expiresAt - Date.now();
      return left > 0 ? left : null;
    } catch {
      return null;
    }
  }

  /**
   * Force the gate to appear for the rest of this test, by stripping the cached
   * grant on every document load.
   *
   * The suite deliberately caches a grant so ~150 gated tests skip the dialog
   * (see tests/setup/pos.setup.ts). Tests whose SUBJECT is the gate itself must
   * opt out of that. Call this BEFORE the first navigation — it installs an init
   * script, so it also survives the reloads and re-navigations those tests do.
   */
  async armGate(): Promise<void> {
    await this.page.addInitScript((key) => {
      try {
        // Drop the INHERITED grant on the first document load only, then get out
        // of the way: TC-34 ticks "remember 30 minutes" itself and then navigates,
        // so a script that cleared the key on every load would delete the very
        // grant that test is asserting on. sessionStorage survives same-tab
        // navigation, which makes it a natural once-per-page latch.
        const latch = '__pw_gate_armed';
        if (!window.sessionStorage.getItem(latch)) {
          window.localStorage.removeItem(key);
          window.sessionStorage.setItem(latch, '1');
        }
      } catch {
        /* storage can be unavailable on about:blank — nothing to clear there */
      }
    }, PasscodeDialog.GRANT_KEY);
  }

  /**
   * Enter a passcode digit-by-digit.
   *
   * TOLERANT BY DEFAULT. Whether the gate appears is a property of the RUN, not
   * of the test: the suite caches a 30-minute grant, a merchant can switch
   * passcode verification off entirely, and the grant can lapse mid-run. So when
   * no dialog is coming this returns `false` instead of spending its timeout and
   * failing — which is what made these calls cost ~10s each once the grant was
   * cached. Nothing is silently lost: if the gate WAS required, the screen stays
   * behind it and the caller's own `waitForReady()` fails.
   *
   * Pass `required: true` (or pre-assert with {@link waitForVisible}) when the
   * gate is the thing under test.
   *
   * @param code         The passcode digits to type.
   * @param opts.expectDismiss Default `true` — assert the dialog closes after
   *                     the last digit. Pass `false` for TC-33 (intentionally
   *                     wrong passcode where the dialog must stay open).
   * @param opts.required Default `false` — throw if no dialog appears.
   * @returns `true` if a passcode was typed, `false` if there was no gate.
   */
  async enterPasscode(
    code: string,
    opts: { expectDismiss?: boolean; required?: boolean } = {},
  ): Promise<boolean> {
    const expectDismiss = opts.expectDismiss ?? true;
    const required = opts.required ?? false;

    if (required) {
      await this.waitForVisible();
    } else if (!(await this.waitForGate())) {
      return false;
    }
    // Wait one extra frame so the keypad buttons inside Radix's portal are
    // interactive — the dialog can be visible a beat before its children
    // mount, especially on a cold load.
    await this.dialog
      .getByRole('button', { name: code[0], exact: true })
      .waitFor({ state: 'visible', timeout: 5_000 });

    for (const [i, digit] of [...code].entries()) {
      await this.dialog.getByRole('button', { name: digit, exact: true }).click();
      // Was a flat 150ms per digit. Wait for the keypad to actually register the
      // press instead: the dialog renders one filled indicator per entered digit,
      // so poll that count and continue as soon as it lands.
      //
      // The timeout is capped at the OLD fixed delay on purpose. The indicator
      // selector is best-effort — on a build that renders them differently the
      // condition never becomes true, and a longer cap would make this slower
      // than the sleep it replaced (4 digits x 400ms = 1.6s vs the old 0.6s).
      // At 150ms the worst case merely matches the old behaviour.
      await this.page
        .waitForFunction(
          (n) =>
            document.querySelectorAll('[role=dialog] [data-filled=true], [role=dialog] .bg-primary')
              .length >= n,
          i + 1,
          { timeout: 150 },
        )
        .catch(() => undefined);
    }

    if (expectDismiss) {
      // A correct passcode dismisses the dialog; if it stays, downstream
      // waits would otherwise hang silently.
      await expect(this.dialog).toBeHidden({ timeout: 5_000 });
    }
    return true;
  }

  /**
   * Wait for the gate only as long as it could plausibly still appear.
   *
   * Cost matters: this runs on ~150 gated tests, most of which will see no gate
   * at all because the run caches a grant. So when a live grant is present we
   * know the answer immediately and spend nothing; otherwise we allow a real
   * window for the SPA to mount the dialog.
   */
  private async waitForGate(): Promise<boolean> {
    const remaining = await this.grantRemainingMs();
    if (remaining !== null) {
      // A live grant means no gate is coming. Confirm cheaply in case the app
      // ignored the grant for this particular screen, then move on.
      return this.dialog.isVisible().catch(() => false);
    }
    try {
      await expect(this.dialog).toBeVisible({ timeout: 6_000 });
      return true;
    } catch {
      return false;
    }
  }

  /** Tick the "Do not require passcode for the next 30 minutes" checkbox. */
  async tickRemember30m(): Promise<void> {
    const checkbox = this.dialog.getByRole('checkbox', {
      name: /Do not require passcode for the next 30 minutes/i,
    });
    if (!(await checkbox.isChecked().catch(() => false))) {
      await checkbox.click();
    }
  }

  /**
   * True if the passcode dialog is ALREADY on screen right now.
   *
   * CAUTION: `locator.isVisible()` does not wait. Called straight after a
   * navigation it usually returns `false` simply because the SPA has not mounted
   * the dialog yet — which is why `if (await isOpen()) …` is an unreliable gate
   * check. Use {@link unlockIfPrompted} instead; this stays for tests that
   * assert on the dialog's instantaneous state.
   */
  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  /**
   * Enter the passcode only if the gate actually appears — the safe counterpart
   * to {@link enterPasscode} for tests whose subject is not the gate itself.
   *
   * The suite caches a 30-minute grant in storageState (see
   * tests/setup/pos.setup.ts), so on most runs no gate appears at all and an
   * unconditional `enterPasscode()` would burn its full 10s timeout and fail.
   * The grant can also expire mid-run on a long lane, so the gate must still be
   * handled when it does show up.
   *
   * Optionally races the gate against the screen's own readiness signal:
   * whichever settles first decides, so neither outcome waits on a timeout.
   *
   * @param code  passcode to enter if prompted.
   * @param opts.readySignal a locator that appears when the gated screen has
   *        rendered. Supply it when there is no cached grant to consult and you
   *        still want the no-gate path to resolve as soon as content appears.
   * @returns true if a passcode was entered, false if no gate appeared.
   */
  async unlockIfPrompted(code: string, opts: { readySignal?: Locator } = {}): Promise<boolean> {
    const { readySignal } = opts;

    if (readySignal && (await this.grantRemainingMs()) === null) {
      // Whichever of {gate, content} shows up first tells us what happened.
      const gateFirst = await Promise.race([
        this.dialog
          .waitFor({ state: 'visible', timeout: 20_000 })
          .then(() => true)
          .catch(() => null),
        readySignal
          .waitFor({ state: 'visible', timeout: 20_000 })
          .then(() => false)
          .catch(() => null),
      ]);
      if (gateFirst !== true) return false;
      return this.enterPasscode(code, { required: true });
    }

    // `enterPasscode` is already tolerant and consults the cached grant, so the
    // no-gate case costs one localStorage read.
    return this.enterPasscode(code);
  }

  async close(): Promise<void> {
    const closeButton = this.dialog.getByRole('button').first();
    await closeButton.click();
  }
}
