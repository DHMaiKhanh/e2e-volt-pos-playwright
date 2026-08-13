import { Page, Locator, expect } from '@playwright/test';
import { Timeouts } from '@configs/constants/timeouts';
import { Logger } from '@utils/logger';

/**
 * Base Page Object — all page objects should extend this.
 * Encapsulates common patterns: navigation, waiting, locator factories.
 */
export abstract class BasePage {
  protected readonly logger = Logger.child({ module: this.constructor.name });

  constructor(public readonly page: Page) {}

  /**
   * The app's error boundary ("Something went wrong … ← Back to Home"), which
   * replaces the whole screen when a GraphQL query fails.
   */
  private get appErrorBoundary(): Locator {
    return this.page.getByText('Something went wrong', { exact: false });
  }

  /**
   * Wait for a screen's readiness signal, but give up immediately if the app
   * renders its error boundary instead.
   *
   * WHY: when the backend hiccups, every gated screen renders "Something went
   * wrong" and no content at all. A plain `expect(heading).toBeVisible()` then
   * burns its full timeout before failing with "element(s) not found", which
   * says nothing about the real cause. In a measured run, non-passing tests ate
   * 40-51% of total test time, much of it exactly this.
   *
   * Racing the two turns a 30s timeout into a ~1s failure that names the cause.
   */
  protected async expectReady(ready: Locator, timeout = Timeouts.MEDIUM): Promise<void> {
    const crashed = await Promise.race([
      ready
        .waitFor({ state: 'visible', timeout })
        .then(() => false)
        .catch(() => null),
      this.appErrorBoundary
        .waitFor({ state: 'visible', timeout })
        .then(() => true)
        .catch(() => null),
    ]);

    if (crashed === true) {
      const detail = (await this.appErrorBoundary
        .locator('..')
        .innerText()
        .catch(() => '')) as string;
      throw new Error(
        `App error boundary rendered instead of the screen — the backend call behind this ` +
          `page failed, so this is an environment problem, not a selector one.\n` +
          `Screen detail: ${detail.replace(/\s+/g, ' ').slice(0, 200)}`,
      );
    }

    // Content won, or neither appeared. Either way the race has ALREADY given
    // `ready` its full window, so re-assert with a short timeout purely to
    // produce the familiar failure message. Passing `timeout` here again would
    // make every non-crash failure wait twice as long as before this method
    // existed — the opposite of the point.
    await expect(ready).toBeVisible({ timeout: 1_000 });
  }

  /** Subclasses must declare the URL path. baseURL is set in playwright.config. */
  protected abstract readonly path: string;

  async goto(): Promise<void> {
    this.logger.info(`Navigate to ${this.path}`);
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForReady();
  }

  /**
   * Override per page with a specific signal (e.g. a header locator becoming visible).
   * The base implementation waits for the `load` event — subclasses should prefer
   * locator-based waits because they reflect real readiness, not just resource loading.
   */
  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('load', { timeout: Timeouts.NAVIGATION });
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  async url(): Promise<string> {
    return this.page.url();
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  async expectUrlContains(part: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(part), { timeout: Timeouts.MEDIUM });
  }

  protected byTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }

  protected byRole(role: Parameters<Page['getByRole']>[0], options?: { name?: string | RegExp }) {
    return this.page.getByRole(role, options);
  }

  protected byText(text: string | RegExp): Locator {
    return this.page.getByText(text);
  }

  protected byLabel(label: string | RegExp): Locator {
    return this.page.getByLabel(label);
  }
}
