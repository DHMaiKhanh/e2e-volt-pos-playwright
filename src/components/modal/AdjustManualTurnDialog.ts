import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';
import { Timeouts } from '@configs/constants/timeouts';

/** One stepper row of the "Adjust Manual Turn" dialog. */
export interface AdjustTurnRowSnapshot {
  name: string;
  /** Raw "Current: <x>" text. */
  currentText: string;
  /** The saved turn count parsed out of {@link currentText}. */
  current: number;
  /** The pending (stepper) value shown between − and +. */
  pending: number;
  pendingText: string;
  decreaseEnabled: boolean;
  saveEnabled: boolean;
  resetEnabled: boolean;
}

/**
 * "Adjust Manual Turn" — opened from `button "Adjust Turn"` on the turn board.
 *
 * One row per staff on the board, in the board's current sort order. Each row is
 * an independent stepper: − / value / + / Save / Reset, with Save+Reset disabled
 * until that row is dirty. Saving writes ONE append-only `turn_adjustment`
 * ledger row holding the delta — "Reset" only reverts the pending value locally,
 * it does not undo a saved adjustment.
 *
 * Rows have no role, and the − / + buttons share aria-labels across rows, so
 * everything here is scoped to a row container reached from that row's
 * "Current: …" paragraph.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md
 */
export class AdjustManualTurnDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;
  readonly emptyState: Locator;
  /** The "Current: <x>" paragraph of every row, in display order. */
  readonly currentLabels: Locator;

  constructor(page: Page) {
    const dialog = page.getByRole('dialog', { name: 'Adjust Manual Turn' });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = dialog.getByRole('heading', { name: 'Adjust Manual Turn' });
    this.emptyState = dialog.getByText('No staff clocked in for this day');
    this.currentLabels = dialog.getByText(/^Current:/);
  }

  async waitForVisible(timeout: number = Timeouts.SHORT): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout });
  }

  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  async close(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Close' }).click();
    await expect(this.dialog).toBeHidden({ timeout: Timeouts.SHORT });
  }

  /** Row container: "Current:" paragraph → name wrapper → row. */
  row(index: number): Locator {
    return this.currentLabels.nth(index).locator('xpath=../..');
  }

  decreaseButton(index: number): Locator {
    return this.row(index).getByRole('button', { name: 'decrease' });
  }

  increaseButton(index: number): Locator {
    return this.row(index).getByRole('button', { name: 'increase' });
  }

  saveButton(index: number): Locator {
    return this.row(index).getByRole('button', { name: 'Save', exact: true });
  }

  resetButton(index: number): Locator {
    return this.row(index).getByRole('button', { name: 'Reset', exact: true });
  }

  /** The pending value — the span that immediately follows the − button. */
  pendingValue(index: number): Locator {
    return this.row(index).locator('button[aria-label="decrease"] + span');
  }

  async rowCount(): Promise<number> {
    return this.currentLabels.count();
  }

  /** Scrape every row: name, saved value, pending value, button states. */
  async readRows(): Promise<AdjustTurnRowSnapshot[]> {
    const raw = await this.dialog.evaluate((root) => {
      const norm = (s: string | null | undefined): string => (s ?? '').replace(/\s+/g, ' ').trim();
      const isDisabled = (el: Element | null): boolean =>
        !!el && (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true');

      return Array.from(root.querySelectorAll('p'))
        .filter((p) => /^Current:/.test(norm(p.textContent)))
        .map((p) => {
          const row = p.parentElement?.parentElement as HTMLElement;
          const name = norm(p.parentElement?.querySelector('p')?.textContent);
          const decrease = row.querySelector('button[aria-label="decrease"]');
          const buttons = Array.from(row.querySelectorAll('button'));
          // Button order inside a row: decrease, increase, Save, Reset.
          const save = buttons[2] ?? null;
          const reset = buttons[3] ?? null;
          return {
            name,
            currentText: norm(p.textContent),
            pendingText: norm(decrease?.nextElementSibling?.textContent),
            decreaseEnabled: !isDisabled(decrease),
            saveEnabled: !isDisabled(save),
            resetEnabled: !isDisabled(reset),
          };
        });
    });

    return raw.map((r) => ({
      name: r.name,
      currentText: r.currentText,
      current: Number(r.currentText.replace(/^Current:\s*/, '')),
      pending: Number(r.pendingText),
      pendingText: r.pendingText,
      decreaseEnabled: r.decreaseEnabled,
      saveEnabled: r.saveEnabled,
      resetEnabled: r.resetEnabled,
    }));
  }

  /** Index of a staff's row, or -1 when they have no row. */
  async indexOf(name: string): Promise<number> {
    return (await this.readRows()).findIndex((r) => r.name === name);
  }

  async increase(index: number): Promise<void> {
    await this.increaseButton(index).click();
  }

  async decrease(index: number): Promise<void> {
    await this.decreaseButton(index).click();
  }

  async reset(index: number): Promise<void> {
    await this.resetButton(index).click();
  }

  /**
   * Save one row and wait until its "Current:" catches up with the value that
   * was pending. There is no toast to wait on (and per the source doc tests must
   * not assert one), so the settled `Current:` text is the completion signal.
   */
  async save(index: number): Promise<void> {
    const pending = (await this.pendingValue(index).innerText()).trim();
    await this.saveButton(index).click();
    await expect(this.currentLabels.nth(index)).toHaveText(`Current: ${pending}`, {
      timeout: Timeouts.MEDIUM,
    });
  }

  /**
   * Save and wait for the ledger mutation itself to come back.
   *
   * Needed where `Current:` will NOT move — saving while a past day is shown
   * writes a row stamped `createdAt = now`, which that day never displays. The
   * GraphQL round-trip is then the only signal that the write happened.
   */
  async saveAndWaitForLedger(index: number): Promise<void> {
    const written = this.page.waitForResponse(
      (response) =>
        response.url().includes('/graphql') &&
        (response.request().postData() ?? '').includes('insertTurnAdjustment'),
      { timeout: Timeouts.MEDIUM },
    );
    await this.saveButton(index).click();
    await written;
  }
}
