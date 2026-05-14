import { test, expect } from '@fixtures/index';
import { Tag } from '@/types/testTags';
import { STAFF } from '@data/static/staff';

test.describe(`API — staff ${Tag.API} ${Tag.SMOKE}`, () => {
  test('GraphQL staffList returns the seeded staff', async ({ staffService }) => {
    const list = await staffService.list();
    expect(list.length).toBeGreaterThan(0);

    const nicknames = list.map((s) => s.nickname);
    expect(nicknames).toContain(STAFF.ELISE_TERRY.nickname);
  });

  test('findByNickname returns Elise Terry with the expected staff code', async ({
    staffService,
  }) => {
    const elise = await staffService.findByNickname(STAFF.ELISE_TERRY.nickname);
    expect(elise).toBeDefined();
    expect(String(elise?.staffCode).padStart(4, '0')).toBe(STAFF.ELISE_TERRY.staffCode);
  });
});
