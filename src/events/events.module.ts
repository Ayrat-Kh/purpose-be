import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

import { MailingModule } from 'src/mailing/mailing.module';
import { SentencesModule } from 'src/sentences/sentences.module';
import { UsersListener } from './users.listener';
import { SentencesListener } from './sentences.listener';

@Module({
  imports: [UsersModule, SentencesModule, MailingModule],
  providers: [UsersListener, SentencesListener],
})
export class EventsModule {}
