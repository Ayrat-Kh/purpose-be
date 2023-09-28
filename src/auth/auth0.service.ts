import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { generators } from 'openid-client';
import { stringify } from 'querystring';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { SocialUserLogin } from 'src/user/user.dto';

@Injectable()
export class Auth0Service {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly httpClient: HttpService,
  ) {}

  async getAuthUrl(): Promise<{
    codeVerifier: string;
    url: string;
  }> {
    const { issuerUrl, callbackUrl, clientId, audience } =
      this.configurationService.get('auth0');

    const codeVerifier = generators.codeVerifier();

    const url = `${issuerUrl}/authorize?${stringify({
      response_type: 'code',
      client_id: clientId,
      code_challenge: generators.codeChallenge(codeVerifier),
      code_challenge_method: 'S256',
      redirect_uri: callbackUrl,
      audience,
      scope: 'profile email openid ',
    })}
    `;

    return {
      codeVerifier,
      url,
    };
  }

  async authenticate(
    code: string,
    codeVerifier: string,
  ): Promise<{
    user: SocialUserLogin;
    accessToken: string;
  }> {
    const { issuerUrl, callbackUrl, clientId } =
      this.configurationService.get('auth0');

    try {
      const { data } = await this.httpClient.axiosRef.post<{
        access_token: string;
        id_token: string;
        scope: string;
        expires_in: number;
        token_type: string;
      }>(
        `${issuerUrl}/oauth/token`,
        stringify({
          grant_type: 'authorization_code',
          client_id: clientId,
          ...(codeVerifier ? { code_verifier: codeVerifier } : {}),
          code,
          redirect_uri: callbackUrl,
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const user = JSON.parse(
        Buffer.from(data.id_token.split('.')[1], 'base64').toString(),
      );

      return {
        user: {
          auth0Id: user.sub,
          email: user.email,
          familyName: user.family_name,
          givenName: user.given_name,
        },
        accessToken: data.access_token,
      };
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Invalid token',
      });
    }
  }
}
