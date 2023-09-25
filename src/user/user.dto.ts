import { Request } from 'express';

export interface SocialUserLoginDto {
  givenName: string;
  familyName: string;
  email: string;
  linkedinId?: string;
  googleId?: string;
  facebookId?: string;
}

export type RequestWithUser = Request & {
  user: SocialUserLoginDto;
};
