import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { generators } from 'openid-client';
import { stringify } from 'querystring';
import { type JwtHeader, type SigningKeyCallback, verify } from 'jsonwebtoken';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { type SocialUserLogin } from 'src/users/users.dto';
import { Auth0JwtTokenVerifier } from 'src/providers/auth0-jwt-token-verifier';
import { normalizeIssuerUrl } from './auth.utils';
import {
  AccessTokenPayload,
  ExchangeTokenResponse,
  IdTokenResponse,
} from './auth.dto';

@Injectable()
export class Auth0Service {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly httpClient: HttpService,
    private readonly auth0JwtTokenVerifier: Auth0JwtTokenVerifier,
  ) {
    this.getKey = this.getKey.bind(this);
  }

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
    const { issuerUrl, callbackUrl, clientId, audience } =
      this.configurationService.get('auth0');

    try {
      const { data } =
        await this.httpClient.axiosRef.post<ExchangeTokenResponse>(
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

      const { iss, aud } = await new Promise<AccessTokenPayload>((resolve) => {
        verify(data.access_token, this.getKey, function (_err, decoded) {
          resolve(decoded as AccessTokenPayload);
        });
      });

      const audiences = Array.isArray(aud) ? aud : [aud];
      const normalizedIssuerUrl = normalizeIssuerUrl(issuerUrl);

      if (iss !== normalizedIssuerUrl || !audiences.includes(audience)) {
        throw new UnauthorizedException({
          message: 'Invalid token',
        });
      }

      const user = await new Promise<IdTokenResponse>((resolve) => {
        verify(data.id_token, this.getKey, function (_err, decoded) {
          resolve(decoded as IdTokenResponse);
        });
      });

      return {
        user: {
          id: user.sub,
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

  getKey(header: JwtHeader, callback: SigningKeyCallback) {
    this.auth0JwtTokenVerifier.getSigningKey(header.kid, function (_err, key) {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  }
}
