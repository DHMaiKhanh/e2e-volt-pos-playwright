import { type Locator, type Page, expect } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';
import { Timeouts } from '@configs/constants/timeouts';
import { Urls } from '@constants/urls';

/** A staff card in the Time Keeping dialog. */
export interface TimeKeepingCard {
  name: string;
  /**
   * `IN` = clocked in (Available column), `OUT` = clocked out (Unavailable
   * column), `selected` = the card is expanded and showing its action button.
   */
  status: 'IN' | 'OUT' | 'selected';
  /** Action offered while selected ("Check In" / "Check Out"), else null. */
  action: string | null;
}

/**
 * "Time Keeping" — the self-service clock-in dialog (`?dialog=time-keeping`),
 * NOT the owner-facing `/time-tracking` table.
 *
 * Two columns: "Unavailable Staff" (clocked out) and "Available Staff" (clocked
 * in). Clicking a card expands it and reveals its single action button.
 *
 * The turn board only lists staff with a clock-in record for the selected day,
 * so the Turn specs use this dialog to create the precondition they need — check
 * a staff in, assert the board, check them back out.
 *
 * Test cases: docs/screens/time-keeping/time-keeping-test-cases.md
 */
export class TimeKeepingDialog extends BaseComponent {
  readonly dialog: Locator;
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly closeButton: Locator;
  readonly unavailableColumnTitle: Locator;
  readonly availableColumnTitle: Locator;

  constructor(page: Page) {
    const dialog = page.getByRole('dialog', { name: 'Time Keeping' });
    super(page, dialog);
    this.dialog = dialog;
    this.heading = dialog.getByRole('heading', { name: 'Time Keeping' });
    this.searchInput = dialog.getByPlaceholder('Search staff');
    this.closeButton = dialog.getByRole('button', { name: 'Close' });
    this.unavailableColumnTitle = dialog.getByText('Unavailable Staff');
    this.availableColumnTitle = dialog.getByText('Available Staff');
  }

  /** Deep-link the dialog onto a route (default `/home`). */
  async goto(route: string = Urls.HOME): Promise<void> {
    await this.page.goto(`${route}?dialog=time-keeping`, { waitUntil: 'domcontentloaded' });
    await this.waitForVisible(Timeouts.MEDIUM);
  }

  async waitForVisible(timeout: number = Timeouts.SHORT): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout });
    await expect(this.searchInput).toBeVisible({ timeout });
  }

  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.dialog).toBeHidden({ timeout: Timeouts.SHORT });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    // The list is debounced; give it the same window the app uses.
    await this.page.waitForTimeout(Timeouts.DEBOUNCE);
  }

  /**
   * Scrape the staff cards.
   *
   * Cards carry no role. An idle card is a div of exactly two children — a
   * header holding the nickname span, and a footer whose first span is the
   * IN/OUT badge. A selected card has an action button in place of that footer.
   */
  async readCards(): Promise<TimeKeepingCard[]> {
    return this.dialog.evaluate((root) => {
      const norm = (s: string | null | undefined): string => (s ?? '').replace(/\s+/g, ' ').trim();
      const cards: TimeKeepingCard[] = [];
      root.querySelectorAll('div').forEach((el) => {
        const kids = Array.from(el.children);
        if (kids.length !== 2) return;
        const nameSpan = kids[0].querySelector('span');
        if (!nameSpan) return;
        const name = norm(nameSpan.textContent);
        if (!name) return;

        const button = kids[1].querySelector('button');
        if (button) {
          cards.push({ name, status: 'selected', action: norm(button.textContent) });
          return;
        }
        const badge = norm(kids[1].querySelector('span')?.textContent);
        if (badge !== 'IN' && badge !== 'OUT') return;
        cards.push({ name, status: badge, action: null });
      });
      return cards;
    }) as Promise<TimeKeepingCard[]>;
  }

  /** Clock status of one staff, or `undefined` when they have no card. */
  async statusOf(name: string): Promise<TimeKeepingCard['status'] | undefined> {
    return (await this.readCards()).find((c) => c.name === name)?.status;
  }

  async isCheckedIn(name: string): Promise<boolean> {
    return (await this.statusOf(name)) === 'IN';
  }

  /** Expand a staff's card so its action button renders. */
  async selectCard(name: string): Promise<void> {
    if ((await this.statusOf(name)) === 'selected') return;
    await this.dialog.getByText(name, { exact: true }).first().click();
  }

  /** Clock a staff in. No-op when they are already in. */
  async checkIn(name: string): Promise<void> {
    if (await this.isCheckedIn(name)) return;
    await this.selectCard(name);
    await this.dialog.getByRole('button', { name: 'Check In', exact: true }).click();
    await expect.poll(() => this.statusOf(name), { timeout: Timeouts.MEDIUM }).toBe('IN');
  }

  /** Clock a staff out. No-op when they are already out. */
  async checkOut(name: string): Promise<void> {
    if ((await this.statusOf(name)) === 'OUT') return;
    await this.selectCard(name);
    await this.dialog.getByRole('button', { name: 'Check Out', exact: true }).click();
    await expect.poll(() => this.statusOf(name), { timeout: Timeouts.MEDIUM }).toBe('OUT');
  }

  /**
   * Open the dialog on `route`, clock a staff in/out, and close it again — the
   * one-call form the Turn specs use to arrange their preconditions.
   */
  async setClockedIn(name: string, clockedIn: boolean, route: string = Urls.HOME): Promise<void> {
    await this.goto(route);
    await this.search(name);
    if (clockedIn) await this.checkIn(name);
    else await this.checkOut(name);
    await this.close();
  }
}
