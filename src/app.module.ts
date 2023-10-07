import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PingController } from './ping/ping.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { ProvidersModule } from './providers/providers.module';
import { JwtAuthGuard } from './auth/auth.strategy';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    ConfigurationModule,
    AuthModule,
    UsersModule,
    PromptsModule,
    ProvidersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [PingController],
})
export class AppModule {}
