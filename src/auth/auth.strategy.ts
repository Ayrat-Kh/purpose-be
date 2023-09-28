import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configurationService: ConfigurationService) {
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
      issuer: `${issuerUrl}/`, // / - is important
      audience,
    });
  }

  validate(payload: unknown): unknown {
    console.log('payload');

    return payload;
  }
}
