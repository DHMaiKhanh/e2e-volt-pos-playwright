import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';

const IGNORED_CONSOLE_ERRORS = [
  'imageUrlToBase64',        // Non-critical: printer logo fetch fails in browser
  'Failed to fetch',         // Network fetch failures in browser mode
  'Failed to load resource', // Asset loading failures (Tauri asset:// scheme)
  'ERR_UNKNOWN_URL_SCHEME',  // Tauri asset:// not available in browser
  'value` prop',             // React controlled input warnings
  'Cannot update a component', // React render-phase setState warnings
  'asset://',                // Tauri-specific asset protocol
];

test.describe(`Volt POS — smoke ${Tag.SMOKE}`, () => {
  test('home page loads with title, staff search, and service search', async ({ page }) => {
    await page.goto('/home');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle('Volt POS');
    await expect(page.getByPlaceholder('Search staff')).toBeVisible();
    await expect(page.getByPlaceholder('Search service')).toBeVisible();
  });

  test('displays staff members', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page.getByText('Elise Terry')).toBeVisible();
  });

  test('displays service categories', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page.getByText('Quick Pay')).toBeVisible();
    await expect(homePage.page.getByText('Gift Card')).toBeVisible();
  });

  test('has navigation links to Order History and Appointment', async ({ page }) => {
    await page.goto('/home');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('link', { name: 'Order History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Appointment' })).toBeVisible();
  });

  test('no critical console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        const isIgnored = IGNORED_CONSOLE_ERRORS.some((pattern) => text.includes(pattern));
        if (!isIgnored) errors.push(text);
      }
    });

    await page.goto('/home');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    expect(errors).toHaveLength(0);
  });
});
