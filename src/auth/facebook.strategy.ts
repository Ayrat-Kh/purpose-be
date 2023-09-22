import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Profile, Strategy } from 'passport-facebook';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { User } from 'src/user/user.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configurationService: ConfigurationService) {
    const facebook = configurationService.get('facebook');

    super({
      clientID: facebook.clientId,
      clientSecret: facebook.clientSecret,
      callbackURL: facebook.callbackUrl,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, emails, name } = profile;
    const user: User = {
      email: emails?.[0].value ?? '',
      familyName: name?.familyName ?? '',
      givenName: name?.givenName ?? '',
      facebookId: id,
    };

    return user;
  }
}
