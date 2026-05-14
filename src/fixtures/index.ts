import { mergeTests, expect } from '@playwright/test';
import { pagesFixture } from './pages.fixture';
import { apiFixture } from './api.fixture';

/**
 * Single entry point for tests:
 *
 *   import { test, expect } from '@fixtures/index';
 *
 *   test('...', async ({ homePage, checkoutPage, graphql }) => { ... });
 */
export const test = mergeTests(pagesFixture, apiFixture);
export { expect };
