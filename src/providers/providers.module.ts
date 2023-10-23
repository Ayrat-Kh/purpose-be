import { Global, Module } from '@nestjs/common';

import { DbClient } from './db-client';
import { OpenAiClient } from './open-ai-client';
import { Auth0JwtTokenVerifier } from './auth0-jwt-token-verifier';
import { CacheService } from './cache-service';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [DbClient, OpenAiClient, Auth0JwtTokenVerifier, CacheService],
  exports: [DbClient, OpenAiClient, Auth0JwtTokenVerifier, CacheService],
})
export class ProvidersModule {}
