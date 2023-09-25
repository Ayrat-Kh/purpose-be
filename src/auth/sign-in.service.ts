import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { type User } from '@prisma/client';
import { type AuthorizedUser, type SocialUserLogin } from 'src/user/user.dto';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SignInService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(user: SocialUserLogin): Promise<{
    url: string;
    token: string;
    user: User;
  }> {
    const dbUser = await this.userService.upsertUser(user);

    const authorizedUser: AuthorizedUser = {
      id: dbUser.id,
      email: dbUser.email,
      givenName: dbUser.givenName,
      familyName: dbUser.familyName,
      phoneNumber: dbUser.phoneNumber,
    };

    const token = await this.jwtService.signAsync(authorizedUser);

    const url = new URL(this.configurationService.get('frontendAuthCallback'));
    url.searchParams.append('access_token', token);

    return {
      url: url.toString(),
      token,
      user: dbUser,
    };
  }
}
