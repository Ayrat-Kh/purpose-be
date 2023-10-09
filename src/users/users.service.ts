import { BadRequestException, Injectable } from '@nestjs/common';
import { type User } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DbClient } from 'src/providers/db-client';
import { OnboardedUserEvent, UserEvents } from 'src/events/users.event';
import {
  type PatchUserDto,
  type SocialUserLogin,
  type UpdateUserDto,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbClient: DbClient,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async upsertUser(user: SocialUserLogin): Promise<User> {
    const dbUser = await this.getUserById(user.id);

    if (dbUser) {
      return dbUser;
    }

    return await this.dbClient.user.create({
      data: {
        status: 'CREATED',
        hobby: '',
        dreamJob: '',
        fearInLife: '',
        professionSkills: '',
        email: user.email ?? '',
        givenName: user.givenName ?? '',
        phoneNumber: '',
        familyName: user.familyName ?? '',
        id: user.id,
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

  async patchUserData(id: string, user: PatchUserDto): Promise<User> {
    if (user.status === 'ONBOARDED') {
      const dbUser = await this.dbClient.user.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
        select: {
          status: true,
        },
      });

      if (dbUser?.status === 'ONBOARDED') {
        throw new BadRequestException({
          message: `Can not update status for ONBOARDED user`,
        });
      }
    }

    const result = await this.dbClient.user.update({
      data: user,
      where: {
        id,
      },
    });

    if (user.status === 'ONBOARDED') {
      this.eventEmitter.emit(
        UserEvents.USER_ONBOARDED,
        new OnboardedUserEvent(id),
      );
    }

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
