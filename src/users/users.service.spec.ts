import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { DbClient } from 'src/providers/db-client';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import {
  DbMockContext,
  createDbMockContext,
} from 'src/providers/db-client.mock';
import { type User } from '@prisma/client';
import { mock, mockDeep } from 'jest-mock-extended';
import { PatchUserDto, SocialUserLogin, UpdateUserDto } from './users.dto';
import { CacheService } from 'src/providers/cache-service';
import { SentencesService } from 'src/sentences/sentences.service';

let dbMockCtx: DbMockContext;

let service: UsersService;

beforeEach(async () => {
  dbMockCtx = createDbMockContext();

  const module: TestingModule = await Test.createTestingModule({
    providers: [UsersService, DbClient, CacheService, SentencesService],
    imports: [ConfigurationModule],
  })
    .overrideProvider(DbClient)
    .useValue(dbMockCtx.prisma)
    .overrideProvider(CacheService)
    .useValue(mockDeep())
    .overrideProvider(SentencesService)
    .useValue(mockDeep())
    .compile();

  service = module.get<UsersService>(UsersService);
});

describe('UsersService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    const response = mock<User>({ email: 'foo@goo.com' });

    const userInfo: SocialUserLogin = {
      id: 'id',
      email: 'email',
      familyName: 'familyName',
      givenName: 'givenName',
    };

    dbMockCtx.prismaMock.user.create.mockResolvedValue(response);

    await expect(service.upsertUser(userInfo)).resolves.toEqual(
      expect.objectContaining(response),
    );
  });

  it('should update user', async () => {
    const response = mock<User>({ email: 'foo@goo.com' });

    const userInfo: UpdateUserDto = {
      hobby: 'dreamDescription',
      phoneNumber: 'phoneNumber',
      familyName: 'familyName',
      givenName: 'givenName',
      dreamJob: '',
      email: '',
      fearInLife: '',
      professionSkills: '',
    };

    dbMockCtx.prismaMock.user.update.mockResolvedValue(response);

    await expect(service.updateUserData('', userInfo)).resolves.toEqual(
      expect.objectContaining(response),
    );
  });

  it('should patch user and not emit onboarded event if status is CREATED', async () => {
    const response = mock<User>({ email: 'foo@goo.com' });

    const userInfo: PatchUserDto = {
      hobby: 'dreamDescription',
      phoneNumber: 'phoneNumber',
      familyName: 'familyName',
      givenName: 'givenName',
      dreamJob: '',
      email: '',
      fearInLife: '',
      professionSkills: '',
      status: 'CREATED',
    };

    dbMockCtx.prismaMock.user.update.mockResolvedValue(response);

    await expect(service.patchUserData('', userInfo)).resolves.toEqual(
      expect.objectContaining(response),
    );
  });

  it('should patch user and emit onboarded event if status is ONBOARDED', async () => {
    const response = mock<User>({ id: 'id' });

    const userInfo: PatchUserDto = {
      hobby: 'dreamDescription',
      phoneNumber: 'phoneNumber',
      familyName: 'familyName',
      givenName: 'givenName',
      dreamJob: '',
      email: '',
      fearInLife: '',
      professionSkills: '',
      status: 'ONBOARDED',
    };

    dbMockCtx.prismaMock.user.update.mockResolvedValue(response);

    await expect(service.patchUserData('', userInfo)).resolves.toEqual(
      expect.objectContaining(response),
    );
  });

  it('should get user by id', async () => {
    const response = mock<User>({ id: 'id' });

    dbMockCtx.prismaMock.user.findFirst.mockResolvedValue(response);

    await expect(service.getUserById('')).resolves.toEqual(
      expect.objectContaining(response),
    );
  });
});
