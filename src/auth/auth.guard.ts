import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Request } from 'express';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { type AuthorizedUser } from 'src/user/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const { secret } = this.configurationService.get('jwt');

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret,
      })) as AuthorizedUser;

      request.user = payload;

      return true;
    } catch (e) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
