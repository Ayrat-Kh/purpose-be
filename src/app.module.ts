import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PingController } from './ping/ping.controller';
import { getConfiguration } from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfiguration],
    }),
  ],
  controllers: [PingController],
})
export class AppModule {}
