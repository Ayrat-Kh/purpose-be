import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Auth0Service } from './auth0.service';
import { type AuthorizeRequest } from 'src/users/users.dto';
import { CODE_VERIFIER_KEY } from './auth.constants';

@Injectable()
export class Auth0CallbackGuard implements CanActivate {
  constructor(readonly auth0Service: Auth0Service) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthorizeRequest;

    if (!request.query.code || !request.signedCookies[CODE_VERIFIER_KEY]) {
      throw new UnauthorizedException({
        message: 'Unauthorized',
        code: 401,
      });
    }

    try {
      const { accessTokenExpiresIn, accessToken, user } =
        await this.auth0Service.authenticate(
          request.query.code as string,
          request.signedCookies[CODE_VERIFIER_KEY],
        );

      request.user = user;
      request.accessToken = accessToken;
      request.accessTokenExpiresIn = accessTokenExpiresIn;

      return true;
    } catch (e) {
      return false;
    }
  }
}
