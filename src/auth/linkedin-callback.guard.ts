import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { type AuthorizeRequest } from 'src/user/user.dto';
import { LinkedinService } from './linkedin.service';

@Injectable()
export class LinkedinCallbackGuard implements CanActivate {
  constructor(private readonly linkedinService: LinkedinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthorizeRequest;

    const { code } = (request.query ?? {}) as { code: string };

    if (!code) {
      throw new UnauthorizedException();
    }

    try {
      const res = await this.linkedinService.authenticateUser(code);

      request.user = {
        givenName: res.given_name,
        familyName: res.family_name,
        email: res.email,
        linkedinId: res.sub,
        facebookId: null,
        googleId: null,
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
