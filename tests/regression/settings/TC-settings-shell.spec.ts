import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';

/**
 * Settings — shell layout shared by every `/settings/*` page (passcode gate,
 * sidebar navigation, active state, Logout, footer info).
 *
 * Test cases: docs/screens/settings/settings-test-cases.md
 */
const PASSCODE = process.env.OWNER_PASSCODE || '8888';

test.describe(`Settings — Shell ${Tag.REGRESSION}`, () => {
  test('TC-SETTINGS-01: navigating to /settings redirects to /settings/business', async ({
    page,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await settingsShellPage.goto();

    await expect(page).toHaveURL(/\/settings\/business$/);
    await passcodeDialog.waitForVisible();
    await expect(passcodeDialog.dialog).toBeVisible();
  });

  test('TC-SETTINGS-02: passcode gate blocks access until authenticated', async ({
    businessInfoPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();

    await passcodeDialog.waitForVisible();
    await expect(businessInfoPage.heading).toBeHidden();
  });

  test('TC-SETTINGS-03: entering the correct passcode unlocks Settings', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);

    await settingsShellPage.waitForReady();
    await expect(businessInfoPage.heading).toBeVisible();
  });

  test('TC-SETTINGS-04: ticking "Do not require passcode for the next 30 minutes" skips the gate on internal navigation', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.tickRemember30m();
    await passcodeDialog.enterPasscode(PASSCODE);

    await settingsShellPage.waitForReady();

    await settingsShellPage.clickNavLink('Roles');
    await expect(passcodeDialog.dialog).toBeHidden();
  });

  test('TC-SETTINGS-05: sidebar lists all 6 groups and their links', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    const links = [
      'Business Info',
      'Services & Products',
      'Employees',
      'Roles',
      'Permissions',
      'Receipt',
      'Charge & Fee',
      'Tipping Settings',
      'Payment Gateway',
      'Accessibility',
      'Language',
    ];
    for (const name of links) {
      await expect(settingsShellPage.navLink(name)).toBeVisible();
    }
  });

  test('TC-SETTINGS-06: clicking a sidebar link navigates and marks it active', async ({
    page,
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    await settingsShellPage.clickNavLink('Permissions');

    await expect(page).toHaveURL(/\/settings\/permissions$/);
    expect(await settingsShellPage.isNavLinkActive('Permissions')).toBe(true);
    await expect(page.getByRole('heading', { name: 'Permissions' })).toBeVisible();
  });

  test('TC-SETTINGS-07: navigating between sub-pages does not re-prompt the passcode', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    for (const name of ['Roles', 'Language', 'Business Info']) {
      await settingsShellPage.clickNavLink(name);
      await expect(passcodeDialog.dialog).toBeHidden();
      expect(await settingsShellPage.isNavLinkActive(name)).toBe(true);
    }
  });

  test('TC-SETTINGS-08: clicking Logout opens the confirm dialog', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    await settingsShellPage.openLogoutConfirm();

    await expect(settingsShellPage.confirmLogoutDialog).toContainText(
      'Are you sure you want to logout? You will need to login again to access the application.',
    );
    await expect(settingsShellPage.confirmLogoutCancelButton).toBeVisible();
    await expect(settingsShellPage.confirmLogoutButton).toBeVisible();
  });

  test('TC-SETTINGS-09: cancelling Logout stays on the current page', async ({
    page,
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    await settingsShellPage.openLogoutConfirm();
    await settingsShellPage.cancelLogout();

    await expect(page).toHaveURL(/\/settings\/business$/);
    await expect(businessInfoPage.heading).toBeVisible();
  });

  // TC-SETTINGS-10 (confirm Logout actually signs out) needs an isolated
  // session with its own re-login flow so it doesn't burn the shared login
  // session used by the rest of this suite — no LoginPage object exists yet
  // to do that safely. Per the source doc (§6), not implemented; add once a
  // re-login helper exists.
  test.skip('TC-SETTINGS-10: confirming Logout signs out of the application', async () => {});

  test('TC-SETTINGS-11: footer shows version, device ID, and support', async ({
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    await expect(settingsShellPage.versionText).toBeVisible();
    await expect(settingsShellPage.deviceIdButton).toBeVisible();
    await expect(settingsShellPage.supportText).toHaveText('Support: (832) 968 9900');
  });

  test('TC-SETTINGS-12: clicking Device ID does not raise a console error', async ({
    page,
    businessInfoPage,
    settingsShellPage,
    passcodeDialog,
  }) => {
    await businessInfoPage.goto();
    await passcodeDialog.enterPasscode(PASSCODE);
    await settingsShellPage.waitForReady();

    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await settingsShellPage.deviceIdButton.click();

    expect(consoleErrors).toEqual([]);
  });
});
