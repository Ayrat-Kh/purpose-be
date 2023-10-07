import { Injectable } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import { OnEvent } from '@nestjs/event-emitter';
import { type OnboardedUserEvent, UserEvents } from './users.event';

@Injectable()
export class UsersListener {
  constructor(private readonly dbClient: DbClient) {}

  @OnEvent(UserEvents.USER_ONBOARDED, { async: true })
  handleOrderCreatedEvent(payload: OnboardedUserEvent) {
    // handle and process "OrderCreatedEvent" event
  }
}
