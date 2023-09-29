import { Global, Module } from '@nestjs/common';

import { DbClient } from './db-client';
import { OpenAiClient } from './open-ai-client';

@Global()
@Module({
  providers: [DbClient, OpenAiClient],
  exports: [DbClient, OpenAiClient],
})
export class ProvidersModule {}
