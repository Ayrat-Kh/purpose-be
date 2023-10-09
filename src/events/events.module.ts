import { Module } from '@nestjs/common';
import { UsersListener } from './users.listener';
import { UsersModule } from 'src/users/users.module';
import { PromptsModule } from 'src/prompts/prompts.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [UsersModule, PromptsModule, MailingModule],
  providers: [UsersListener],
})
export class EventsModule {}
