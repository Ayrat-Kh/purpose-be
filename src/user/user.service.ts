import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DbClient } from 'src/providers/db-client';
import { type SocialUserLogin, type UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbClient: DbClient) {}

  async upsertUser(user: SocialUserLogin): Promise<User> {
    const dbUser = await this.getUserBySocialId(user);

    if (dbUser) {
      return dbUser;
    }

    return await this.dbClient.user.create({
      data: {
        dreamDescription: '',
        email: user.email,
        givenName: user.givenName,
        phoneNumber: '',
        familyName: user.familyName,
        auth0Id: user.auth0Id,
      },
    });
  }

  async updateUserData(id: string, user: UpdateUserDto): Promise<User> {
    const result = await this.dbClient.user.update({
      data: user,
      where: {
        id,
      },
    });

    return result;
  }

  async getUserBySocialId({
    auth0Id,
  }: Pick<SocialUserLogin, 'auth0Id'>): Promise<User | null> {
    const result = await this.dbClient.user.findFirst({
      where: {
        auth0Id: {
          equals: auth0Id,
        },
      },
    });

    return result;
  }

  async getUserById(id: string): Promise<User | null> {
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
