import { Global, Module } from '@nestjs/common';

import { DbClient } from './db-client';
import { OpenAiClient } from './open-ai-client';
import { Auth0JwtTokenVerifier } from './auth0-jwt-token-verifier';

@Global()
@Module({
  providers: [DbClient, OpenAiClient, Auth0JwtTokenVerifier],
  exports: [DbClient, OpenAiClient, Auth0JwtTokenVerifier],
})
export class ProvidersModule {}
