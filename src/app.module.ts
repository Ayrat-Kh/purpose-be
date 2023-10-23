import { join } from 'node:path';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PingController } from './ping/ping.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { ProvidersModule } from './providers/providers.module';
import { JwtAuthGuard } from './auth/auth.strategy';
import { MailingModule } from './mailing/mailing.module';
import { EventsModule } from './events/events.module';
import { SentencesModule } from './sentences/sentences.module';

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
    MailingModule,
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'assets',
    }),
    SentencesModule,
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
