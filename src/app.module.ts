import { Module } from '@nestjs/common';

import { PingController } from './ping/ping.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, AuthModule, UserModule],
  controllers: [PingController],
})
export class AppModule {}
