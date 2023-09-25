import { Module } from '@nestjs/common';

import { DbClient } from 'src/providers/db-client';
import { UserService } from './user.service';

@Module({
  providers: [UserService, DbClient],
  exports: [UserService],
})
export class UserModule {}
