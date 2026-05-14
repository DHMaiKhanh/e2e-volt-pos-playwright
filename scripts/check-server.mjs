/**
 * Pre-test check: verify the Volt POS app is running at the configured BASE_URL.
 * Invoked via the `pretest` npm hook so `npm test` fails fast with a helpful
 * message if the app hasn't been started yet.
 */
const BASE_URL = process.env.BASE_URL || 'http://localhost:1420';

try {
  const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) });
  if (res.ok) {
    console.log(`\x1b[32m✓ Volt POS app is running at ${BASE_URL}\x1b[0m`);
  } else {
    console.error(`\x1b[31m✗ Volt POS app returned ${res.status} at ${BASE_URL}\x1b[0m`);
    process.exit(1);
  }
} catch {
  console.error(`\x1b[31m✗ Volt POS app is not running at ${BASE_URL}\x1b[0m`);
  console.error(`\nStart the app first:`);
  console.error(`  cd ../app && npm run start    # Full Tauri app`);
  console.error(`  cd ../app && npm run dev      # Frontend only (Vite dev server)`);
  process.exit(1);
}
