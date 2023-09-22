import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/user/user.dto';
import { LinkedinService } from './linkedin.service';

@Injectable()
export class LinkedinCallbackGuard implements CanActivate {
  constructor(private readonly linkedinService: LinkedinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      user: User;
    };

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
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
