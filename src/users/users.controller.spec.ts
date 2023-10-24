import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, mock, DeepMockProxy } from 'jest-mock-extended';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AuthorizedRequest } from 'src/auth/auth.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PatchUserDto, UpdateUserDto, UserResponseDto } from './users.dto';

let usersService: DeepMockProxy<UsersService>;
let eventEmitter: DeepMockProxy<EventEmitter2>;

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    jest.clearAllMocks();

    usersService = mockDeep<UsersService>();
    eventEmitter = mockDeep<EventEmitter2>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, EventEmitter2],
      controllers: [UsersController],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user meta info', async () => {
    const response = mock<UserResponseDto>({ id: 'id' });

    usersService.getUserById.mockResolvedValue(response);

    await expect(controller.getMe(mock<AuthorizedRequest>())).resolves.toEqual(
      response,
    );

    expect(usersService.getUserById).toHaveBeenCalled();
  });

  it('should return a user info', async () => {
    const response = mock<UserResponseDto>();

    usersService.getUserById.mockResolvedValue(response);

    await expect(controller.getUser('')).resolves.toEqual(response);
    expect(usersService.getUserById).toHaveBeenCalled();
  });

  it('should update user data', async () => {
    const response = mock<UserResponseDto>({ id: 'id' });

    usersService.updateUserData.mockResolvedValue(response);

    const user: UpdateUserDto = {
      hobby: 'dreamDescription',
      familyName: 'familyName',
      givenName: 'givenName',
      phoneNumber: 'phoneNumber',
      dreamJob: '',
      email: '',
      fearInLife: '',
      professionSkills: '',
    };

    await expect(
      controller.updateUser(
        '111',
        user,
        mock<AuthorizedRequest>({ user: { sub: '111' } }),
      ),
    ).resolves.toEqual(response);

    expect(usersService.updateUserData).toHaveBeenCalledWith('111', user);
  });

  it('should patch user data and raise onboarded event', async () => {
    const response = mock<UserResponseDto>({ id: 'id' });

    usersService.updateUserData.mockResolvedValue(response);

    const user: PatchUserDto = {
      hobby: 'dreamDescription',
      familyName: 'familyName',
      givenName: 'givenName',
      phoneNumber: 'phoneNumber',
      status: 'ONBOARDED',
    };

    await controller.patchUser(
      '',
      user,
      mock<AuthorizedRequest>({ user: { sub: '' } }),
    );

    expect(usersService.patchUserData).toHaveBeenCalledWith('', user);
  });

  it('should patch user data and not raise onboarded event if user is not onboarded', async () => {
    const response = mock<UserResponseDto>({ id: 'id' });

    usersService.updateUserData.mockResolvedValue(response);

    const user: PatchUserDto = {
      hobby: 'dreamDescription',
      familyName: 'familyName',
      givenName: 'givenName',
      phoneNumber: 'phoneNumber',
    };

    await controller.patchUser(
      '',
      user,
      mock<AuthorizedRequest>({ user: { sub: '' } }),
    );

    expect(usersService.patchUserData).toHaveBeenCalledWith('', user);
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
