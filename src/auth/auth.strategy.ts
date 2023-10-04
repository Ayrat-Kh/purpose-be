import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { passportJwtSecret } from 'jwks-rsa';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { normalizeIssuerUrl } from './auth.utils';
import { AccessTokenPayload } from './auth.dto';

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
      issuer: normalizeIssuerUrl(issuerUrl),
      audience,
    });
  }

  validate(payload: AccessTokenPayload): AccessTokenPayload {
    return payload;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
