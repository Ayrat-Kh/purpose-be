import { z } from 'zod';

import { createZodDto } from '@anatine/zod-nestjs';
import { type User } from '@prisma/client';
import { type Request } from 'express';
import { phoneRegex } from 'src/utils/phone-regex';

export type AuthorizedUser = Pick<
  User,
  'id' | 'familyName' | 'givenName' | 'email' | 'phoneNumber'
>;

export type SocialUserLogin = Pick<
  User,
  | 'email'
  | 'linkedinId'
  | 'googleId'
  | 'facebookId'
  | 'familyName'
  | 'givenName'
>;

export type AuthorizeRequest = Request & {
  user: SocialUserLogin;
};

export type AuthorizedRequest = Request & {
  user: AuthorizedUser;
};

const UpdateUserSchema = z.object({
  familyName: z.string().nonempty(),
  givenName: z.string().nonempty(),
  phoneNumber: z.string().nonempty().regex(phoneRegex),
  dreamDescription: z.string().nonempty(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
