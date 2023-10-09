import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { type OnboardedUserEvent, UserEvents } from './users.event';
import { PromptsService } from 'src/prompts/prompts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersListener {
  constructor(
    private readonly promptsService: PromptsService,
    private readonly usersService: UsersService,
  ) {}

  @OnEvent(UserEvents.USER_ONBOARDED, { async: true })
  handleOrderCreatedEvent(payload: OnboardedUserEvent) {
    // handle and process "OrderCreatedEvent" event
  }
}
