import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

import { type User } from '@prisma/client';
import { type Request } from 'express';
import { phoneRegex } from 'src/utils/phone-regex';
import { ApiProperty } from '@nestjs/swagger';

export type AuthorizedUser = Pick<
  User,
  'id' | 'familyName' | 'givenName' | 'email' | 'phoneNumber'
>;

export type SocialUserLogin = Pick<
  User,
  'email' | 'id' | 'familyName' | 'givenName'
>;

export type AuthorizeRequest = Request & {
  user: SocialUserLogin;
  accessToken: string;
};

const UpdateUserSchema = z.object({
  familyName: z.string().nonempty().describe('First name'),
  givenName: z.string().nonempty().describe('Last name'),
  phoneNumber: z.string().nonempty().regex(phoneRegex).describe('Phone number'),
  dreamDescription: z.string().nonempty(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

export class UserResponseDto implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  givenName: string;

  @ApiProperty()
  familyName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  dreamDescription: string;

  @ApiProperty({
    type: String,
  })
  auth0Id: string | null;
}
