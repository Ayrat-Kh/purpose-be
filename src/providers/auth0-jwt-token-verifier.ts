import { Injectable } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';

import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class Auth0JwtTokenVerifier extends JwksClient {
  constructor(readonly configurationService: ConfigurationService) {
    const { issuerUrl } = configurationService.get('auth0');

    const jwksUri = `${issuerUrl}/.well-known/jwks.json`;

    super({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri,
    });
  }
}
