import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

/**
 * Settings — shell layout shared by every `/settings/*` page.
 *
 * `/settings` has no page of its own — it redirects to `/settings/business`.
 * Covers the sidebar navigation, the Logout confirm dialog, and the footer
 * (version / device id / support). Passcode-gated like every `/settings/*`
 * route — `goto` does NOT wait for readiness, the caller unlocks first via
 * `PasscodeDialog`, then calls `waitForReady`.
 *
 * Test cases: docs/screens/settings/settings-test-cases.md
 */
export class SettingsShellPage extends BasePage {
  protected readonly path = '/settings';

  readonly heading: Locator;
  readonly navigation: Locator;
  readonly logoutButton: Locator;
  readonly confirmLogoutDialog: Locator;
  readonly confirmLogoutCancelButton: Locator;
  readonly confirmLogoutButton: Locator;
  readonly versionText: Locator;
  readonly deviceIdButton: Locator;
  readonly supportText: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Setting', level: 3 });
    this.navigation = page.getByRole('navigation');
    this.logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
    this.confirmLogoutDialog = page.getByRole('alertdialog', { name: 'Confirm Logout' });
    this.confirmLogoutCancelButton = this.confirmLogoutDialog.getByRole('button', {
      name: 'Cancel',
    });
    this.confirmLogoutButton = this.confirmLogoutDialog.getByRole('button', {
      name: 'Logout',
      exact: true,
    });
    this.versionText = page.getByText(/^Version: /);
    this.deviceIdButton = page.getByRole('button', { name: /^Device ID:/ });
    this.supportText = page.getByText(/^Support: /);
  }

  async goto(): Promise<void> {
    this.logger.info(`Navigate to ${this.path}`);
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    // Intentionally NOT calling waitForReady() — caller unlocks the passcode first.
  }

  async waitForReady(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.navigation).toBeVisible();
  }

  /** A sidebar link by its visible text, e.g. "Business Info", "Permissions". */
  navLink(name: string): Locator {
    return this.navigation.getByRole('link', { name, exact: true });
  }

  /** True when the given sidebar link carries the active-route marker. */
  async isNavLinkActive(name: string): Promise<boolean> {
    return (await this.navLink(name).getAttribute('active')) !== null;
  }

  async clickNavLink(name: string): Promise<void> {
    await this.navLink(name).click();
  }

  async openLogoutConfirm(): Promise<void> {
    await this.logoutButton.click();
    await expect(this.confirmLogoutDialog).toBeVisible();
  }

  async cancelLogout(): Promise<void> {
    await this.confirmLogoutCancelButton.click();
    await expect(this.confirmLogoutDialog).toBeHidden();
  }
}
