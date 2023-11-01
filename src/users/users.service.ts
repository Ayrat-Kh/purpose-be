import { Injectable } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import {
  UserResponseDto,
  type PatchUserDto,
  type SocialUserLogin,
  type UpdateUserDto,
} from './users.dto';
import { CacheService } from 'src/providers/cache-service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbClient: DbClient,
    private readonly cacheService: CacheService,
  ) {}

  async upsertUser(user: SocialUserLogin): Promise<UserResponseDto> {
    const dbUser = await this.getUserById(user.id);

    if (dbUser) {
      return dbUser;
    }

    return await this.dbClient.user.create({
      data: {
        status: 'CREATED',
        email: user.email ?? '',
        givenName: user.givenName ?? '',
        phoneNumber: '',
        familyName: user.familyName ?? '',
        id: user.id,
      },
    });
  }

  async updateUserData(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const result = await this.dbClient.user.update({
      data: user,
      where: {
        id,
      },
    });

    await this.cacheService.dropUser(id);

    return result;
  }

  async patchUserData(
    id: string,
    user: PatchUserDto,
  ): Promise<UserResponseDto> {
    const result = await this.dbClient.user.update({
      data: user,
      where: {
        id,
      },
    });

    await this.cacheService.dropUser(id);

    return result;
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const result = await this.dbClient.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return result;
  }
}
