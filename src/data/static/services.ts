export interface Service {
  name: string;
  price: string;
}

/**
 * Service catalogue available in the Volt POS dev environment.
 * Update prices / names if the seed catalogue changes.
 */
export const SERVICES = {
  GEL_REMOVAL: { name: 'Gel Removal', price: '$10.90' },
  DIPPING_OMBRE: { name: 'Dipping Ombre', price: '$27.25' },
  WAXING_LIP_CHIN: { name: 'Waxing (Lip / Chin)', price: '$8.00' },
  SPA_SERVICE: { name: 'Spa Service', price: '$5.80' },
  BLACK_WHITE_FULL_SET: { name: 'Black & White Full Set', price: '$20.00' },
  RED_WHITE_FULL_SET: { name: 'Red & White Full Set', price: '$15.00' },
  ACRYLIC_REMOVAL: { name: 'Acrylic Removal', price: '$18.75' },
} as const satisfies Record<string, Service>;
