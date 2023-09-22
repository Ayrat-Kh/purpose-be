import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationService } from './configuration.service';
import { getConfiguration } from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfiguration],
    }),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
