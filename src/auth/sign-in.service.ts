import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { type SocialUserLoginDto } from 'src/user/user.dto';

@Injectable()
export class SignInService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: SocialUserLoginDto): Promise<{
    url: string;
    token: string;
  }> {
    const token = await this.jwtService.signAsync(user);

    const url = new URL(this.configurationService.get('frontendAuthCallback'));
    url.searchParams.append('access_token', token);

    return {
      url: url.toString(),
      token,
    };
  }
}
