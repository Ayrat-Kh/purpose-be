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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PatchUserDto, SocialUserLogin, UpdateUserDto } from './users.dto';

let dbMockCtx: DbMockContext;

let service: UsersService;

let eventEmitterMock = mockDeep<EventEmitter2>();

beforeEach(async () => {
  dbMockCtx = createDbMockContext();

  const module: TestingModule = await Test.createTestingModule({
    providers: [UsersService, DbClient, EventEmitter2],
    imports: [ConfigurationModule],
  })
    .overrideProvider(DbClient)
    .useValue(dbMockCtx.prisma)
    .overrideProvider(EventEmitter2)
    .useValue(eventEmitterMock)
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
      dreamJob: '',
      email: '',
      fearInLife: '',
      professionSkills: '',
    };

    dbMockCtx.prismaMock.user.update.mockResolvedValue(response);

    await expect(service.updateUserData('', userInfo)).resolves.toEqual(
      response,
    );
  });

  it('should patch user and not emit onboarded event if status is CREATED', async () => {
    const response = mock<User>();

    const userInfo: PatchUserDto = {
      dreamDescription: 'dreamDescription',
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
      response,
    );

    expect(eventEmitterMock.emit).not.toHaveBeenCalled();
  });

  it('should patch user and emit onboarded event if status is ONBOARDED', async () => {
    const response = mock<User>();

    const userInfo: PatchUserDto = {
      dreamDescription: 'dreamDescription',
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
      response,
    );

    expect(eventEmitterMock.emit).toHaveBeenCalled();
  });

  it('should get user by id', async () => {
    const response = mock<User>({});

    dbMockCtx.prismaMock.user.findFirst.mockResolvedValue(response);

    await expect(service.getUserById('')).resolves.toEqual(response);
  });
});
