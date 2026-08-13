import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { Urls } from '@constants/urls';
import { Timeouts } from '@configs/constants/timeouts';

/** One row of the turn board: rank badge, staff nickname, turn value. */
export interface TurnBoardRowSnapshot {
  /** 1-based position in the current sort. */
  rank: number;
  /** Staff nickname as rendered in the row's `<p>`. */
  name: string;
  /** Avatar fallback letter — empty when the staff has an avatar image. */
  avatarText: string;
  /** Raw turn value text, e.g. "4.24", "0", "7". */
  turnText: string;
  /** {@link turnText} parsed as a number (NaN when unparseable). */
  turnCount: number;
  /** The unit label next to the value — "Turns", or "Turn" when the count is 1. */
  label: string;
}

/** One row of the Turn Quick View popover (no unit label, no date/sort toolbar). */
export interface TurnQuickViewRowSnapshot {
  rank: number;
  name: string;
  turnText: string;
  turnCount: number;
}

/** Persisted position of the floating Quick View handle. */
export interface TurnQuickViewPosition {
  side: 'left' | 'right';
  topPct: number;
}

export const TURN_SORT = {
  FEWEST: 'Fewest turns first',
  MOST: 'Most turns first',
  EARLIEST_CHECKIN: 'Earliest check-in first',
  LATEST_CHECKIN: 'Latest check-in first',
} as const;

export type TurnSortLabel = (typeof TURN_SORT)[keyof typeof TURN_SORT];

/**
 * Turn (Turn Board) — a DIALOG, not a route.
 *
 * It is mounted by the `_app` layout and opened by the `?dialog=turn-board`
 * search param on ANY route inside that layout, so this page object takes the
 * host route (default `/home`) and deep-links `<route>?dialog=turn-board`. The
 * sidebar entry does the same thing client-side ({@link openFromSidebar}).
 *
 * There is no passcode gate on the dialog itself — only on the route behind it.
 *
 * Rows are plain `div`s (no `row`/`button` role), so {@link readRows} scrapes
 * them by their DOM shape instead: rank span, avatar, `<p>` nickname, then a
 * value/unit pair. Same reason the sort `combobox` is located positionally: it
 * carries no accessible name, only its current value as text.
 *
 * Test cases: docs/screens/turn/turn-test-cases.md
 */
export class TurnBoardPage extends BasePage {
  protected readonly path: string;

  /** Route the dialog is opened on top of (`/home` unless overridden). */
  readonly route: string;

  /** Public form of {@link path} — `<route>?dialog=turn-board`. */
  readonly deepLink: string;

  readonly dialog: Locator;
  readonly heading: Locator;
  readonly closeButton: Locator;
  readonly dateButton: Locator;
  readonly sortSelect: Locator;
  readonly adjustTurnButton: Locator;
  readonly settingButton: Locator;
  readonly emptyState: Locator;
  readonly skeletons: Locator;

  /** Calendar popover of the date button (portaled OUTSIDE the dialog). */
  readonly calendarPopover: Locator;
  readonly calendarGrid: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  /**
   * Su…Sa header cells.
   *
   * Located by markup, not by role: react-day-picker renders the header row
   * inside `<thead aria-hidden="true">`, so `getByRole('columnheader')` matches
   * nothing even though the cells are on screen.
   */
  readonly weekdayHeaders: Locator;

  /** Floating "TURN" tab — only on /home, /order-pending, /order-history. */
  readonly quickViewTab: Locator;
  /**
   * The same handle, located by markup instead of role.
   *
   * Once the Turn dialog is open, Radix marks the page behind it `aria-hidden`,
   * so {@link quickViewTab} stops matching — use this to assert on the handle's
   * state while a modal is up.
   */
  readonly quickViewTabElement: Locator;
  readonly quickViewPopover: Locator;
  readonly quickViewTitle: Locator;
  readonly viewTurnButton: Locator;

  /** localStorage key holding the Quick View handle position. */
  static readonly QUICK_VIEW_POSITION_KEY = 'turn_quick_view_position';

  constructor(page: Page, route: string = Urls.HOME) {
    super(page);
    this.route = route;
    this.path = `${route}?dialog=turn-board`;
    this.deepLink = this.path;

    // `exact` matters: without it the substring match would also hit the
    // "Adjust Manual Turn" and "Turn Settings" child dialogs.
    this.dialog = page.getByRole('dialog', { name: 'Turn', exact: true });
    this.heading = this.dialog.getByRole('heading', { name: 'Turn', exact: true });
    this.closeButton = this.dialog.getByRole('button', { name: 'Close' });
    // Stable id set by the shared DatePickerSecondary trigger.
    this.dateButton = this.dialog.locator('#selected-date-range');
    this.sortSelect = this.dialog.getByRole('combobox');
    this.adjustTurnButton = this.dialog.getByRole('button', { name: 'Adjust Turn' });
    this.settingButton = this.dialog.getByRole('button', { name: 'Setting', exact: true });
    this.emptyState = this.dialog.getByText('No staff clocked in for this day');
    this.skeletons = this.dialog.locator('[data-slot="skeleton"]');

    this.calendarPopover = page
      .locator('[data-slot="popover-content"]')
      .filter({ has: page.getByRole('grid') });
    this.calendarGrid = this.calendarPopover.getByRole('grid');
    this.monthSelect = this.calendarPopover.getByRole('combobox').first();
    this.yearSelect = this.calendarPopover.getByRole('combobox').nth(1);
    this.weekdayHeaders = this.calendarPopover.locator('th[scope="col"]');

    // Scoped to the app content wrapper so the sidebar's own "Turn" menu button
    // can never match; the regex keeps "View Turn" out (and tolerates the
    // handle's uppercase rendering).
    this.quickViewTab = page.locator('#main-content-wrapper').getByRole('button', {
      name: /^turn$/i,
    });
    this.quickViewTabElement = page
      .locator('#main-content-wrapper button[aria-expanded]')
      .filter({ hasText: /turn/i });
    this.quickViewPopover = page
      .locator('[data-slot="popover-content"]')
      .filter({ hasText: 'Turn Order' });
    this.quickViewTitle = this.quickViewPopover.getByText('Turn Order');
    this.viewTurnButton = this.quickViewPopover.getByRole('button', { name: 'View Turn' });
  }

  /** Deep-link `<route>?dialog=turn-board` and wait for the board to settle. */
  async goto(): Promise<void> {
    this.logger.info(`Navigate to ${this.path}`);
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForReady();
  }

  /** Navigate to the host route WITHOUT opening the dialog. */
  async gotoRoute(): Promise<void> {
    await this.page.goto(this.route, { waitUntil: 'domcontentloaded' });
  }

  async waitForReady(): Promise<void> {
    await this.expectReady(this.heading, Timeouts.MEDIUM);
    await this.waitForBoardSettled();
  }

  /** Wait out the loading skeletons so row scraping sees the real list. */
  async waitForBoardSettled(): Promise<void> {
    await expect(this.skeletons).toHaveCount(0, { timeout: Timeouts.MEDIUM });
  }

  /** Open the dialog the way a user does: hamburger → sidebar → "Turn". */
  async openFromSidebar(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open sidebar' }).click();
    const sidebar = this.page.getByRole('dialog', { name: 'Sidebar' });
    await expect(sidebar).toBeVisible({ timeout: Timeouts.SHORT });
    await sidebar.getByRole('button', { name: 'Turn', exact: true }).click();
    await expect(sidebar).toBeHidden({ timeout: Timeouts.SHORT });
    await this.waitForReady();
  }

  async isOpen(): Promise<boolean> {
    return this.dialog.isVisible().catch(() => false);
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.dialog).toBeHidden({ timeout: Timeouts.SHORT });
  }

  // ---------------------------------------------------------------- board rows

  /**
   * Scrape every board row.
   *
   * Rows carry no ARIA role, so they are found structurally: the nickname `<p>`
   * sits two levels below a row container whose four children are
   * [rank, avatar, name, value+unit]. That shape (not a text regex) is what
   * keeps numeric nicknames like "8888" parseable.
   *
   * CALL ORDER MATTERS: while "Adjust Manual Turn" or "Turn Settings" is open,
   * Radix marks the board dialog `aria-hidden`, so the role-based locator finds
   * nothing and this times out. Read the board before opening a child dialog, or
   * after closing it.
   */
  async readRows(): Promise<TurnBoardRowSnapshot[]> {
    await this.waitForBoardSettled();
    const raw = await this.dialog.evaluate((root) => {
      const norm = (s: string | null | undefined): string => (s ?? '').replace(/\s+/g, ' ').trim();
      const rows: {
        rank: string;
        name: string;
        avatarText: string;
        turnText: string;
        label: string;
      }[] = [];
      root.querySelectorAll('p').forEach((p) => {
        const row = p.parentElement?.parentElement;
        if (!row) return;
        const kids = Array.from(row.children);
        if (kids.length !== 4) return;
        const rank = norm(kids[0].textContent);
        if (!/^\d+$/.test(rank)) return;
        const value = kids[3];
        if (value.children.length !== 2) return;
        rows.push({
          rank,
          name: norm(p.textContent),
          avatarText: norm(kids[1].textContent),
          turnText: norm(value.children[0].textContent),
          label: norm(value.children[1].textContent),
        });
      });
      return rows;
    });

    return raw
      .map((r) => ({
        rank: Number(r.rank),
        name: r.name,
        avatarText: r.avatarText,
        turnText: r.turnText,
        turnCount: Number(r.turnText),
        label: r.label,
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  /** Staff nicknames in the current sort order. */
  async staffNames(): Promise<string[]> {
    return (await this.readRows()).map((r) => r.name);
  }

  /** The row for a staff nickname, or `undefined` when they are not listed. */
  async rowFor(name: string): Promise<TurnBoardRowSnapshot | undefined> {
    return (await this.readRows()).find((r) => r.name === name);
  }

  async isEmpty(): Promise<boolean> {
    await this.waitForBoardSettled();
    return this.emptyState.isVisible().catch(() => false);
  }

  /** How many dialogs are open right now (used to prove a click opened nothing). */
  async openDialogCount(): Promise<number> {
    return this.page.getByRole('dialog').count();
  }

  /** Click a staff row — per the spec this is inert, there is no detail panel. */
  async clickRow(index = 0): Promise<void> {
    const row = this.dialog.locator('p').nth(index).locator('xpath=../..');
    await row.click();
  }

  // -------------------------------------------------------------------- toolbar

  /** Text of the date button, e.g. "08/13/2026". */
  async dateButtonText(): Promise<string> {
    return (await this.dateButton.innerText()).replace(/\s+/g, ' ').trim();
  }

  /** Current sort, read off the combobox trigger (it has no accessible name). */
  async currentSortLabel(): Promise<string> {
    return (await this.sortSelect.innerText()).replace(/\s+/g, ' ').trim();
  }

  async selectSort(label: TurnSortLabel | string): Promise<void> {
    await this.sortSelect.click();
    await this.page.getByRole('option', { name: label, exact: true }).click();
    await expect(this.sortSelect).toContainText(label, { timeout: Timeouts.SHORT });
    await this.waitForBoardSettled();
  }

  /** Labels of every option in the sort combobox (leaves it open). */
  async openSortOptions(): Promise<string[]> {
    await this.sortSelect.click();
    const options = this.page.getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: Timeouts.SHORT });
    return options.allInnerTexts();
  }

  async closeSortOptions(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }

  // ---------------------------------------------------------------- date picker

  async openDatePicker(): Promise<void> {
    await this.dateButton.click();
    await expect(this.calendarGrid).toBeVisible({ timeout: Timeouts.SHORT });
  }

  async closeDatePicker(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.calendarPopover).toBeHidden({ timeout: Timeouts.SHORT });
  }

  /** Day cell by its aria-label fragment, e.g. `Monday, July 27th, 2026`. */
  dayCell(label: string | RegExp): Locator {
    return this.calendarPopover.getByRole('button', { name: label });
  }

  /** The cell for today — its label is prefixed "Today, " and marked selected. */
  get todayCell(): Locator {
    return this.calendarPopover.getByRole('button', { name: /^Today,/ });
  }

  /**
   * True when a day cell is non-interactive.
   *
   * react-day-picker marks blocked days with `aria-disabled` rather than the
   * `disabled` attribute in some builds, so both are checked.
   */
  async isDayDisabled(cell: Locator): Promise<boolean> {
    return cell.evaluate(
      (el) => el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
    );
  }

  /** A day cell by its `data-day` value (locale date string, e.g. "8/14/2026"). */
  dayCellByValue(value: string): Locator {
    return this.calendarPopover.locator(`button[data-day="${value}"]`);
  }

  /**
   * `data-day` values of every cell in the visible grid that falls after today.
   *
   * Evaluated in the page so "today" is the browser's (i.e. the shop's) clock,
   * and so cells spilling in from the next month are covered too.
   */
  async futureDayValues(opts: { onlyEnabled?: boolean } = {}): Promise<string[]> {
    const onlyEnabled = opts.onlyEnabled ?? false;
    return this.calendarPopover.evaluate((root, enabledOnly) => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      return Array.from(root.querySelectorAll('button[data-day]'))
        .filter((btn) => {
          const raw = btn.getAttribute('data-day') ?? '';
          const date = new Date(raw);
          if (Number.isNaN(date.getTime())) return false;
          date.setHours(0, 0, 0, 0);
          if (date.getTime() <= startOfToday.getTime()) return false;
          if (!enabledOnly) return true;
          return !(btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true');
        })
        .map((btn) => btn.getAttribute('data-day') ?? '');
    }, onlyEnabled);
  }

  async selectMonth(month: string): Promise<void> {
    await this.monthSelect.click();
    await this.page.getByRole('option', { name: month, exact: true }).click();
  }

  async selectYear(year: number | string): Promise<void> {
    await this.yearSelect.click();
    await this.page.getByRole('option', { name: String(year), exact: true }).click();
  }

  /** Option labels of the year combobox (leaves the listbox open). */
  async openYearOptions(): Promise<string[]> {
    await this.yearSelect.click();
    const options = this.page.getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: Timeouts.SHORT });
    return options.allInnerTexts();
  }

  /**
   * Pick a specific day: month dropdown → year dropdown (only when it differs
   * from the year already shown) → the day cell.
   */
  async pickDate(day: { month: string; day: number; year: number }): Promise<void> {
    await this.openDatePicker();
    const shownYear = (await this.yearSelect.innerText()).trim();
    if (shownYear !== String(day.year)) await this.selectYear(day.year);
    await this.selectMonth(day.month);
    await this.dayCell(new RegExp(`${day.month}\\w* ${day.day}(st|nd|rd|th), ${day.year}`)).click();
    await expect(this.calendarPopover).toBeHidden({ timeout: Timeouts.SHORT });
    await this.waitForBoardSettled();
  }

  // ----------------------------------------------------------------- quick view

  async isQuickViewTabVisible(): Promise<boolean> {
    return this.quickViewTab.isVisible().catch(() => false);
  }

  async openQuickView(): Promise<void> {
    await this.quickViewTab.click();
    await expect(this.quickViewTitle).toBeVisible({ timeout: Timeouts.SHORT });
  }

  /**
   * Scrape the Quick View list. Its rows are [rank, avatar, `<p>` name, value] —
   * one child fewer than a board row, and with no unit label.
   */
  async readQuickViewRows(): Promise<TurnQuickViewRowSnapshot[]> {
    const raw = await this.quickViewPopover.evaluate((root) => {
      const norm = (s: string | null | undefined): string => (s ?? '').replace(/\s+/g, ' ').trim();
      const rows: { rank: string; name: string; turnText: string }[] = [];
      root.querySelectorAll('p').forEach((p) => {
        const row = p.parentElement;
        if (!row) return;
        const kids = Array.from(row.children);
        if (kids.length !== 4) return;
        const rank = norm(kids[0].textContent);
        if (!/^\d+$/.test(rank)) return;
        rows.push({ rank, name: norm(p.textContent), turnText: norm(kids[3].textContent) });
      });
      return rows;
    });

    return raw
      .map((r) => ({
        rank: Number(r.rank),
        name: r.name,
        turnText: r.turnText,
        turnCount: Number(r.turnText),
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  async clickViewTurn(): Promise<void> {
    await this.viewTurnButton.click();
    await this.waitForReady();
  }

  /** Read the persisted handle position, or `null` when nothing is stored. */
  async quickViewPosition(): Promise<TurnQuickViewPosition | null> {
    const raw = await this.page.evaluate(
      (key) => window.localStorage.getItem(key),
      TurnBoardPage.QUICK_VIEW_POSITION_KEY,
    );
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TurnQuickViewPosition;
    } catch {
      return null;
    }
  }

  async clearQuickViewPosition(): Promise<void> {
    await this.page.evaluate(
      (key) => window.localStorage.removeItem(key),
      TurnBoardPage.QUICK_VIEW_POSITION_KEY,
    );
  }

  /**
   * Drag the floating handle to an absolute viewport point.
   *
   * The handle tracks POINTER events (not HTML5 drag), and it only treats the
   * gesture as a drag past a 6px threshold — hence the intermediate move.
   */
  async dragQuickViewTab(to: { x: number; y: number }): Promise<void> {
    const box = await this.quickViewTab.boundingBox();
    if (!box) throw new Error('Turn quick-view handle is not rendered — nothing to drag.');
    const from = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

    await this.page.mouse.move(from.x, from.y);
    await this.page.mouse.down();
    await this.page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, { steps: 10 });
    await this.page.mouse.move(to.x, to.y, { steps: 10 });
    await this.page.mouse.up();
  }
}
