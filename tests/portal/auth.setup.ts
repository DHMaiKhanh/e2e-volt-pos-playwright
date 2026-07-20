import { test as setup } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { env } from '@configs/env/loadEnv';

/**
 * One-time login for the FASTBOY Portal (dev.v2.fastboypay.com).
 *
 * The portal only offers SSO (GCI Business / Google) — there is no
 * username/password form to script — so this setup opens the login page,
 * pauses, and waits for YOU to complete the SSO flow by hand. Once the portal
 * redirects away from /login, the authenticated storageState (cookies +
 * localStorage) is saved to PORTAL_STORAGE_STATE and reused by every spec in
 * tests/portal/** going forward (via the "portal" project in
 * playwright.config.ts), so this only needs to be run again after the
 * session expires.
 *
 * Run with: `npm run auth`
 */
setup('authenticate to FASTBOY Portal', async ({ page }) => {
  setup.setTimeout(5 * 60 * 1000); // generous — waiting on a human to log in

  await page.goto(`${env.PORTAL_BASE_URL}/login`);

  const portalHost = new URL(env.PORTAL_BASE_URL).host;

  // /login immediately redirects to Google's SSO chooser (accounts.google.com),
  // which is NOT /login — so waiting only for "pathname !== /login" resolves
  // instantly, before the human has actually logged in. Wait until the browser
  // is back on the portal's own host instead.
  await page.waitForURL((url) => url.host === portalHost && !url.pathname.startsWith('/login'), {
    timeout: 5 * 60 * 1000,
  });

  const storagePath = path.resolve(env.PORTAL_STORAGE_STATE);
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await page.context().storageState({ path: storagePath });
});
