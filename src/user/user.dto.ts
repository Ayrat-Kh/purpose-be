import { Request } from 'express';

export interface User {
  givenName: string;
  familyName: string;
  email: string;
  linkedinId?: string;
  googleId?: string;
  facebookId?: string;
}

export type RequestWithUser = Request & {
  user: User;
};
