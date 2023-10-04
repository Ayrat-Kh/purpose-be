import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { DbClient } from 'src/providers/db-client';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import {
  DbMockContext,
  createDbMockContext,
} from 'src/providers/db-client.mock';
import { type User } from '@prisma/client';
import { mock } from 'jest-mock-extended';
import { SocialUserLogin, UpdateUserDto } from './users.dto';

let dbMockCtx: DbMockContext;

let service: UsersService;

beforeEach(async () => {
  dbMockCtx = createDbMockContext();

  const module: TestingModule = await Test.createTestingModule({
    providers: [UsersService, DbClient],
    imports: [ConfigurationModule],
  })
    .overrideProvider(DbClient)
    .useValue(dbMockCtx.prisma)
    .compile();

  service = module.get<UsersService>(UsersService);
});

describe('PromptsService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    const response = mock<User>();

    const userInfo: SocialUserLogin = {
      id: 'id',
      email: 'email',
      familyName: 'familyName',
      givenName: 'givenName',
    };

    dbMockCtx.prismaMock.user.create.mockResolvedValue(response);

    await expect(service.upsertUser(userInfo)).resolves.toEqual(response);
  });

  it('should update user', async () => {
    const response = mock<User>();

    const userInfo: UpdateUserDto = {
      dreamDescription: 'dreamDescription',
      phoneNumber: 'phoneNumber',
      familyName: 'familyName',
      givenName: 'givenName',
    };

    dbMockCtx.prismaMock.user.update.mockResolvedValue(response);

    await expect(service.updateUserData('', userInfo)).resolves.toEqual(
      response,
    );
  });

  it('should get user by id', async () => {
    const response = mock<User>({});

    dbMockCtx.prismaMock.user.findFirst.mockResolvedValue(response);

    await expect(service.getUserById('')).resolves.toEqual(response);
  });

  // it('should return list prompts', async () => {
  //   const userPrompt = {
  //     id: 'id',
  //     prompt: 'prompt',
  //     responseMessage: 'responseMessage',
  //     sessionId: 'sessionId',
  //     userId: 'userId',
  //     createdAt: new Date(),
  //   };

  //   dbMockCtx.prismaMock.userPrompts.findMany.mockResolvedValue([userPrompt]);

  //   await expect(
  //     service.getUserPrompts({
  //       sub: 'sub',
  //     }),
  //   ).resolves.toEqual([userPrompt]);
  // });
});
