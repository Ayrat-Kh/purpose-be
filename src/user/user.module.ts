import { Module } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UserService, DbClient],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
