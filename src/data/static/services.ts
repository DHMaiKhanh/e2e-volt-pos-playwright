export interface Service {
  /** Real DB id (GraphQL `serviceList.id`). */
  id: string;
  name: string;
  /** Display price, pre-tax (e.g. "$10.00"). Mirrors GraphQL `serviceList.price` (cents). */
  price: string;
  /** Raw price in cents as stored in the DB (GraphQL `serviceList.price`). */
  priceCents: number;
}

/**
 * Service catalogue available in the Volt POS dev environment.
 *
 * Values are sourced from the live GraphQL DB (`query { serviceList { id name
 * price type status } }`, `type = "service"` AND `status = "active"`) — NOT
 * hand-typed. Re-run that query and update here if the seed catalogue changes.
 * Prices are stored in cents; `price` is the pre-tax display string.
 *
 * IMPORTANT: only ACTIVE services belong here. Soft-deleted records still come
 * back from `serviceList` but won't appear in the POS UI, so selecting them by
 * name fails. Re-scanned 2026-07-20 — the previous catalogue (Gel Removal,
 * Dipping Ombre, Waxing (Lip / Chin), Spa Service, Black & White Full Set,
 * Red & White Full Set, Acrylic Removal, Eyebrow Wax, Classic Manicure,
 * Pedicure, Express Mani-Pedi, Acrylic Fill-in, Acrylic Refill, Pink & White
 * Full Set, Dip Powder, Callus Treatment, Nail Art Design) no longer exists at
 * all in this environment; every key below now maps to a currently-active
 * replacement.
 */
export const SERVICES = {
  GEL_REMOVAL: {
    id: '019ef27b-c7fd-71e3-8ee0-a42555fea12a',
    name: 'Gel Polish Removal',
    price: '$10.00',
    priceCents: 1000,
  },
  DIPPING_OMBRE: {
    id: '019ef27b-c780-76c5-93f8-41029d4514d1',
    name: "Ombre'",
    price: '$65.00',
    priceCents: 6500,
  },
  WAXING_LIP_CHIN: {
    id: '019ef27b-c815-7361-8092-123fad7c0d64',
    name: 'Lip',
    price: '$8.00',
    priceCents: 800,
  },
  SPA_SERVICE: {
    id: '019ef27b-c728-79a2-a178-69545bfaa3e9',
    name: 'Deluxe Pedicure',
    price: '$65.00',
    priceCents: 6500,
  },
  BLACK_WHITE_FULL_SET: {
    id: '019ef27b-c75c-7c4a-a01a-e5a5ec448a2c',
    name: 'Full Set',
    price: '$35.00',
    priceCents: 3500,
  },
  RED_WHITE_FULL_SET: {
    id: '019ef27b-c7a0-750e-a4bd-188631d249c4',
    name: 'Pink & White',
    price: '$55.00',
    priceCents: 5500,
  },
  ACRYLIC_REMOVAL: {
    id: '019ef27b-c80a-7e09-b7c0-7288f6e46b89',
    name: 'Acrylic Soak-Off',
    price: '$15.00',
    priceCents: 1500,
  },
  EYEBROW_WAX: {
    id: '019ef27b-c82a-733e-9cf8-2c659b9b00fd',
    name: 'Sideburn',
    price: '$15.00',
    priceCents: 1500,
  },
  // ── Replacements for since-deleted entries (all currently active) ──
  CLASSIC_MANICURE: {
    id: '019ef27b-c8c1-71cb-9642-746c8a632ab8',
    name: 'Regular Manicure',
    price: '$25.00',
    priceCents: 2500,
  },
  PEDICURE: {
    id: '019ef27b-c6f9-7dc3-97c2-6c0e7c757c8c',
    name: 'Regular Pedicure',
    price: '$40.00',
    priceCents: 4000,
  },
  EXPRESS_MANI_PEDI: {
    id: '019ef27b-c8c6-742d-9727-9d01fe4304c7',
    name: 'Regular Manicure/Pedicure',
    price: '$50.00',
    priceCents: 5000,
  },
  ACRYLIC_FILL_IN: {
    id: '019ef27b-c76b-7aac-bfd3-fa6725c51732',
    name: 'Fill',
    price: '$30.00',
    priceCents: 3000,
  },
  ACRYLIC_REFILL: {
    id: '019ef27b-c774-7013-82a7-ab39e06e182c',
    name: 'Fill/Gel',
    price: '$40.00',
    priceCents: 4000,
  },
  PINK_WHITE_FULL_SET: {
    id: '019ef27b-c7a0-750e-a4bd-188631d249c4',
    name: 'Pink & White',
    price: '$55.00',
    priceCents: 5500,
  },
  DIP_POWDER: {
    id: '019ef27b-c794-7134-8a93-1388bb1ef1cc',
    name: 'Dip Powder',
    price: '$50.00',
    priceCents: 5000,
  },
  CALLUS_TREATMENT: {
    id: '019ef27b-c90e-7b5d-a207-4ca681c1366b',
    name: 'Plus callus removed ',
    price: '$10.00',
    priceCents: 1000,
  },
  NAIL_ART_DESIGN: {
    id: '019ef27b-c7b7-7004-92f6-84d9dbbd6a7f',
    name: 'Nail Art',
    price: '$5.00',
    priceCents: 500,
  },
} as const satisfies Record<string, Service>;
