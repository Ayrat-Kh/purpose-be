import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { type OnboardedUserEvent, UserEvents } from './users.event';
import { UsersService } from 'src/users/users.service';
import { CreateSentenceEvent, SentencesEvents } from './sentences.event';
import { type SentenceDto } from 'src/sentences/sentences.dto';

@Injectable()
export class UsersListener {
  logger = new Logger('UsersListener');

  constructor(
    private readonly usersService: UsersService,
    private readonly eventService: EventEmitter2,
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

      this.eventService.emit(
        SentencesEvents.CREATE_SENTENCE,
        new CreateSentenceEvent(
          {
            dreamJob: user.dreamJob,
            fearInLife: user.fearInLife,
            hobby: user.hobby,
            professionSkills: user.professionSkills,
          } as unknown as SentenceDto,
          user,
        ),
      );
    } catch (error) {
      this.logger.error(
        `[${UserEvents.USER_ONBOARDED}]: Error occurred.`,
        error,
      );
    }
  }
}
