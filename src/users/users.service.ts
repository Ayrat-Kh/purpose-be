import { Injectable } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import {
  UserResponseDto,
  type PatchUserDto,
  type SocialUserLogin,
  type UpdateUserDto,
} from './users.dto';
import { CacheService } from 'src/providers/cache-service';
import { PromptsService } from 'src/prompts/prompts.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbClient: DbClient,
    private readonly cacheService: CacheService,
    private readonly promptsService: PromptsService,
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
      ...(await this.getLatestPrompt(id)),
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
      ...(await this.getLatestPrompt(id)),
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
          ...(await this.getLatestPrompt(id)),
        }
      : null;
  }

  private async getLatestPrompt(userId: string): Promise<{
    lastSentenceId: string | null;
  }> {
    const result = await this.promptsService.getUserPrompts({
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
