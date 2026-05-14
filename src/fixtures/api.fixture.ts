import { test as base } from '@playwright/test';
import { GraphQLClient } from '@api/clients/GraphQLClient';
import { StaffService } from '@api/services/StaffService';

export interface ApiFixture {
  graphql: GraphQLClient;
  staffService: StaffService;
}

export const apiFixture = base.extend<ApiFixture>({
  graphql: async ({}, use) => {
    await use(new GraphQLClient());
  },
  staffService: async ({ graphql }, use) => {
    await use(new StaffService(graphql));
  },
});
