import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SsoController } from './sso.controller';
import { LinkedinService } from './linkedin.service';

@Module({
  imports: [HttpModule],
  providers: [LinkedinService],
  controllers: [SsoController],
})
export class AuthModule {}
