import { Test, TestingModule } from '@nestjs/testing';
import { type User } from '@prisma/client';
import { mockDeep, mock, DeepMockProxy } from 'jest-mock-extended';

import { AuthorizedRequest } from 'src/auth/auth.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';

let usersService: DeepMockProxy<UsersService>;

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    usersService = mockDeep<UsersService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user meta info', async () => {
    const response = mock<User>();

    usersService.getUserById.mockResolvedValue(response);

    await expect(controller.getMe(mock<AuthorizedRequest>())).resolves.toEqual(
      response,
    );

    expect(usersService.getUserById).toHaveBeenCalled();
  });

  it('should return a user info', async () => {
    const response = mock<User>();

    usersService.getUserById.mockResolvedValue(response);

    await expect(controller.getUser('')).resolves.toEqual(response);
    expect(usersService.getUserById).toHaveBeenCalled();
  });

  it('should update user data', async () => {
    const response = mock<User>();

    usersService.updateUserData.mockResolvedValue(response);

    const user: UpdateUserDto = {
      dreamDescription: 'dreamDescription',
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
        '',
        user,
        mock<AuthorizedRequest>({ user: { sub: '' } }),
      ),
    ).resolves.toEqual(response);
    expect(usersService.updateUserData).toHaveBeenCalledWith('', user);
  });
});
