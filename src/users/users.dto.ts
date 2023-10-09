import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

import { $Enums, type User } from '@prisma/client';
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
  hobby: z.string().nonempty().describe('Dream description'),
  email: z.string().nonempty().describe('Email'),
  dreamJob: z.string().nonempty().describe('Dream job description'),
  fearInLife: z.string().nonempty().describe('Fear in life description'),
  professionSkills: z
    .string()
    .nonempty()
    .describe('Profession skills description'),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

const PatchUserSchema = z.object({
  familyName: z.string().optional().describe('First name'),
  givenName: z.string().optional().describe('Last name'),
  phoneNumber: z.string().regex(phoneRegex).optional().describe('Phone number'),
  hobby: z.string().optional().describe('Dream description'),
  email: z.string().optional().describe('Email'),
  dreamJob: z.string().optional().describe('Dream job description'),
  fearInLife: z.string().optional().describe('Fear in life description'),
  professionSkills: z
    .string()
    .optional()
    .describe('Profession skills description'),
  status: z
    .enum([$Enums.UserStatus.CREATED, $Enums.UserStatus.ONBOARDED])
    .optional()
    .describe('User status'),
});

export class PatchUserDto extends createZodDto(PatchUserSchema) {}

export class UserResponseDto implements User {
  @ApiProperty({
    enum: [$Enums.UserStatus.CREATED, $Enums.UserStatus.ONBOARDED],
  })
  status: $Enums.UserStatus;

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
  hobby: string;

  @ApiProperty()
  dreamJob: string;

  @ApiProperty()
  fearInLife: string;

  @ApiProperty()
  professionSkills: string;

  @ApiProperty({
    type: String,
  })
  auth0Id: string | null;
}
