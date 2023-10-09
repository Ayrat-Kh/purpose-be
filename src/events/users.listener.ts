import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { type OnboardedUserEvent, UserEvents } from './users.event';
import { PromptsService } from 'src/prompts/prompts.service';
import { UsersService } from 'src/users/users.service';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class UsersListener {
  logger = new Logger('UsersListener');

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly emailService: MailingService,
    private readonly promptsService: PromptsService,
    private readonly usersService: UsersService,
  ) {}

  @OnEvent(UserEvents.USER_ONBOARDED, { async: true })
  async handleOrderCreatedEvent(payload: OnboardedUserEvent) {
    const frontendUrl = this.configurationService.get('frontendUrl');

    try {
      const user = await this.usersService.getUserById(payload.userId);

      if (!user) {
        this.logger.error(
          `[${UserEvents.USER_ONBOARDED}]: User not found ${payload.userId}`,
        );
        return;
      }

      this.logger.verbose(
        `[${UserEvents.USER_ONBOARDED}]: Prompting to ${payload.userId}`,
      );
      const response = await this.promptsService.prompt(
        {
          content: `Please advise and summarize next following statements: ${user.dreamJob} ${user.hobby} ${user.professionSkills} ${user.fearInLife}`,
        },
        {
          id: payload.userId,
        },
      );

      this.logger.verbose(
        `[${UserEvents.USER_ONBOARDED}]: Send email for ${payload.userId}`,
      );

      await this.emailService.sendSentenceAnswers({
        answer: response.responseMessage,
        link: frontendUrl,
        to: user.email,
      });
    } catch (error) {
      this.logger.error(
        `[${UserEvents.USER_ONBOARDED}]: Error occurred.`,
        error,
      );
    }
  }
}
