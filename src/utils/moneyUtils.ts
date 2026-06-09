export const toMinorUnits = (amount: number, decimals = 2): number =>
  Math.round(amount * Math.pow(10, decimals));

export const fromMinorUnits = (minor: number, decimals = 2): number =>
  minor / Math.pow(10, decimals);

export const formatCurrency = (amount: number, currency = 'VND', locale = 'vi-VN'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

/**
 * Formats integer cents the same way Volt POS's `money(cents)` helper does —
 * `$#,##0.00`. Use this to assemble expected text for UI assertions.
 */
export const formatUsdFromCents = (cents: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

/** Strips currency formatting back to integer cents — useful for parsing UI text. */
export const parseCentsFromUsd = (text: string): number => {
  const cleaned = text.replace(/[^\d.-]/g, '');
  if (!cleaned) return 0;
  return Math.round(parseFloat(cleaned) * 100);
};
