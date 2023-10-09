import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { type OnboardedUserEvent, UserEvents } from './users.event';
import { PromptsService } from 'src/prompts/prompts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersListener {
  logger = new Logger('UsersListener');

  constructor(
    private readonly promptsService: PromptsService,
    private readonly usersService: UsersService,
  ) {}

  @OnEvent(UserEvents.USER_ONBOARDED, { async: true })
  async handleOrderCreatedEvent(payload: OnboardedUserEvent) {
    try {
      const user = await this.usersService.getUserById(payload.userId);

      if (!user) {
        this.logger.error(
          `[${UserEvents.USER_ONBOARDED}]: User not found ${payload.userId}`,
        );
        return;
      }

      this.promptsService.prompt(
        {
          content: `Please advise and summarize next following statements: ${user.dreamJob} ${user.hobby} ${user.professionSkills} ${user.fearInLife}`,
        },
        {
          id: payload.userId,
        },
      );
    } catch (error) {
      this.logger.error(
        `[${UserEvents.USER_ONBOARDED}]: Error occurred.`,
        error,
      );
    }
  }
}
