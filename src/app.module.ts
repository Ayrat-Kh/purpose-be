import { Module } from '@nestjs/common';

import { PingController } from './ping/ping.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigurationModule, AuthModule],
  controllers: [PingController],
})
export class AppModule {}
