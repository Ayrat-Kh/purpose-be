import { Module } from '@nestjs/common';

import { PingController } from './ping/ping.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    UsersModule,
    PromptsModule,
    ProvidersModule,
  ],
  controllers: [PingController],
})
export class AppModule {}
