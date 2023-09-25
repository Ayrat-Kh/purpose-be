import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DbClient } from 'src/providers/db-client';
import { SocialUserLoginDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbClient: DbClient) {}

  async upsertUser(user: SocialUserLoginDto): Promise<User> {
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
        facebookId: user.facebookId,
        googleId: user.googleId,
        linkedinId: user.linkedinId,
      },
    });
  }

  async getUserBySocialId({
    facebookId,
    googleId,
    linkedinId,
  }: Pick<
    SocialUserLoginDto,
    'facebookId' | 'googleId' | 'linkedinId'
  >): Promise<User | null> {
    const result = await this.dbClient.user.findFirst({
      where: {
        ...(facebookId
          ? {
              facebookId: {
                equals: facebookId,
              },
            }
          : {}),
        ...(googleId
          ? {
              googleId: {
                equals: googleId,
              },
            }
          : {}),
        ...(linkedinId
          ? {
              facebookId: {
                equals: linkedinId,
              },
            }
          : {}),
      },
    });

    return result;
  }
}
