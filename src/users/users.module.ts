import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersListener } from './users.listener';

@Module({
  providers: [UsersService, UsersListener],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
