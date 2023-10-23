import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PromptsService } from 'src/prompts/prompts.service';
import { MailingService } from 'src/mailing/mailing.service';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { type CreateSentenceEvent, SentencesEvents } from './sentences.event';

@Injectable()
export class SentencesListener {
  logger = new Logger('SentencesListener');

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly emailService: MailingService,
    private readonly promptsService: PromptsService,
  ) {}

  @OnEvent(SentencesEvents.CREATE_SENTENCE, { async: true })
  async handleOrderCreatedEvent(payload: CreateSentenceEvent) {
    const { sentence, user } = payload;

    const frontendUrl = this.configurationService.get('frontendUrl');

    try {
      this.logger.verbose(
        `[${SentencesEvents.CREATE_SENTENCE}]: Prompting for ${user.email}`,
      );
      const response = await this.promptsService.promptSentence(sentence, {
        id: user.id,
      });

      this.logger.verbose(
        `[${SentencesEvents.CREATE_SENTENCE}]: Sending email for ${user.email}`,
      );

      await this.emailService.sendSentenceAnswers({
        statement: response,
        link: frontendUrl,
        to: user.email,
      });

      this.logger.verbose(
        `[${SentencesEvents.CREATE_SENTENCE}]: Sent email for ${user.email}`,
      );
    } catch (error) {
      this.logger.error(
        `[${SentencesEvents.CREATE_SENTENCE}]: Error occurred.`,
        error,
      );
    }
  }
}
