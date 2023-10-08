import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersListener } from './users.listener';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [MailingModule],
  providers: [UsersService, UsersListener],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
