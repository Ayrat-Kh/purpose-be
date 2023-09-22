import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { User } from 'src/user/user.dto';

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verified: boolean }[];
  photos: {
    value: string;
  }[];
  provider: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configurationService: ConfigurationService) {
    const google = configurationService.get('google');

    super({
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const user: User = {
      email: emails[0].value,
      familyName: name.familyName,
      givenName: name.givenName,
      googleId: id,
    };

    return user;
  }
}
