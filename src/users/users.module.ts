import { Module } from '@nestjs/common';

import { MailingModule } from 'src/mailing/mailing.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MailingModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
