import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PromptsModule } from 'src/prompts/prompts.module';
import { MailingModule } from 'src/mailing/mailing.module';
import { UsersListener } from './users.listener';
import { SentencesListener } from './sentences.listener';

@Module({
  imports: [UsersModule, PromptsModule, MailingModule],
  providers: [UsersListener, SentencesListener],
})
export class EventsModule {}
