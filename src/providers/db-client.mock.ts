import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { DbClient } from '../providers/db-client';

export type DbMockContext = {
  prismaMock: DeepMockProxy<DbClient>;
  prisma: DbClient;
};

export const createDbMockContext = (): DbMockContext => {
  const prismaMock = mockDeep<DbClient>();

  return {
    prismaMock,
    prisma: prismaMock as unknown as DbClient,
  };
};
