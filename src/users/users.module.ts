import { Module } from '@nestjs/common';

import { MailingModule } from 'src/mailing/mailing.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PromptsModule } from 'src/prompts/prompts.module';

@Module({
  imports: [MailingModule, PromptsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
