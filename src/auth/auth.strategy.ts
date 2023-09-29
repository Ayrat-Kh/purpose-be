import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { Auth0JwtTokenVerifier } from 'src/providers/auth0-jwt-token-verifier';
import { normalizeIssuerUrl } from './auth.utils';
import { AccessTokenPayload } from './auth.dto';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configurationService: ConfigurationService,
    private readonly auth0JwtTokenVerifier: Auth0JwtTokenVerifier,
  ) {
    const { audience, issuerUrl } = configurationService.get('auth0');

    const jwksUri = `${issuerUrl}/.well-known/jwks.json`;

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      issuer: normalizeIssuerUrl(issuerUrl),
      audience,
    });
  }

  validate(payload: AccessTokenPayload): AccessTokenPayload {
    return payload;
  }
}
