import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PromptsService } from 'src/prompts/prompts.service';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { type CreateSentenceEvent, SentencesEvents } from './sentences.event';
import { getSentence } from './events.open-ai.constants';

@Injectable()
export class SentencesListener {
  logger = new Logger('SentencesListener');

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly emailService: MailingService,
    private readonly promptsService: PromptsService,
  ) {}

  @OnEvent(SentencesEvents.CREATE_SENTENCE, { async: true })
  async handleOrderCreatedEvent({ payload }: { payload: CreateSentenceEvent }) {
    const { sentence, user } = payload;

    const frontendUrl = this.configurationService.get('frontendUrl');

    try {
      this.logger.verbose(
        `[${SentencesEvents.CREATE_SENTENCE}]: Prompting to ${user.email}`,
      );
      const response = await this.promptsService.prompt(
        {
          content: getSentence(sentence),
        },
        {
          id: user.id,
        },
      );

      this.logger.verbose(
        `[${SentencesEvents.CREATE_SENTENCE}]: Send email for ${user.email}`,
      );

      await this.emailService.sendSentenceAnswers({
        answer: response.responseMessage,
        link: frontendUrl,
        to: user.email,
      });
    } catch (error) {
      this.logger.error(
        `[${SentencesEvents.CREATE_SENTENCE}]: Error occurred.`,
        error,
      );
    }
  }
}
