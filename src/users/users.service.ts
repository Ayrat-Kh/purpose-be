import { Injectable } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import {
  UserResponseDto,
  type PatchUserDto,
  type SocialUserLogin,
  type UpdateUserDto,
} from './users.dto';
import { CacheService } from 'src/providers/cache-service';
import { SentencesService } from 'src/sentences/sentences.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbClient: DbClient,
    private readonly cacheService: CacheService,
    private readonly sentencesService: SentencesService,
  ) {}

  async upsertUser(user: SocialUserLogin): Promise<UserResponseDto> {
    const dbUser = await this.getUserById(user.id);

    if (dbUser) {
      return dbUser;
    }

    return {
      ...(await this.dbClient.user.create({
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
      })),
      lastSentenceId: null,
    };
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

    return {
      ...result,
      ...(await this.getLatestSentence(id)),
    };
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

    return {
      ...result,
      ...(await this.getLatestSentence(id)),
    };
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const result = await this.dbClient.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return result
      ? {
          ...result,
          ...(await this.getLatestSentence(id)),
        }
      : null;
  }

  private async getLatestSentence(userId: string): Promise<{
    lastSentenceId: string | null;
  }> {
    const result = await this.sentencesService.getUserSentences({
      user: {
        id: userId,
      },
      pageSize: 1,
    });

    return {
      lastSentenceId: result?.[0]?.id ?? null,
    };
  }
}
