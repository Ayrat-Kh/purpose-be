import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { type OnboardedUserEvent, UserEvents } from './users.event';
import { PromptsService } from 'src/prompts/prompts.service';

@Injectable()
export class UsersListener {
  constructor(private readonly promptsService: PromptsService) {}

  @OnEvent(UserEvents.USER_ONBOARDED, { async: true })
  handleOrderCreatedEvent(payload: OnboardedUserEvent) {
    // handle and process "OrderCreatedEvent" event
  }
}
