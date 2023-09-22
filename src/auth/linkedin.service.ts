import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';

import { ConfigurationService } from 'src/configuration/configuration.service';

export interface LinkedinUserInfo {
  sub: string;
  email_verified: boolean;
  name: string;
  locale: { country: string; language: string };
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}

export interface LinkedinAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
}

@Injectable()
export class LinkedinService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly httpService: HttpService,
  ) {}

  getAuthorizationUrl(): URL {
    const linkedinConfig = this.configurationService.get('linkedIn');
    const url = new URL('https://www.linkedin.com/oauth/v2/authorization');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', linkedinConfig.clientId);
    url.searchParams.append('redirect_uri', linkedinConfig.callbackUrl);
    url.searchParams.append('scope', 'email,openid,profile');

    return url;
  }

  async authenticateUser(code: string): Promise<LinkedinUserInfo> {
    const linkedinConfig = this.configurationService.get('linkedIn');

    const {
      data: { access_token },
    } = await this.httpService.axiosRef.post<LinkedinAccessToken>(
      'https://www.linkedin.com/oauth/v2/accessToken',
      stringify({
        grant_type: 'authorization_code',
        code,
        client_id: linkedinConfig.clientId,
        client_secret: linkedinConfig.clientSecret,
        redirect_uri: linkedinConfig.callbackUrl,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { data: me } = await this.httpService.axiosRef.get<LinkedinUserInfo>(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return me;
  }
}
