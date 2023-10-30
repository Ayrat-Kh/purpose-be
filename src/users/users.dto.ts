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
  accessTokenExpiresIn: number;
};

const UpdateUserSchema = z.object({
  familyName: z.string().nonempty().describe('First name'),
  givenName: z.string().nonempty().describe('Last name'),
  phoneNumber: z.string().nonempty().regex(phoneRegex).describe('Phone number'),
  email: z.string().nonempty().describe('Email'),
  hobby: z.string().nonempty().describe('(Deprecated) Dream description'),
  dreamJob: z
    .string()
    .nonempty()
    .describe('(Deprecated) Dream job description'),
  fearInLife: z
    .string()
    .nonempty()
    .describe('(Deprecated) Fear in life description'),
  professionSkills: z
    .string()
    .nonempty()
    .describe('(Deprecated) Profession skills description'),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

const PatchUserSchema = z.object({
  familyName: z.string().optional().describe('First name'),
  givenName: z.string().optional().describe('Last name'),
  phoneNumber: z.string().regex(phoneRegex).optional().describe('Phone number'),
  email: z.string().optional().describe('Email'),
  hobby: z.string().optional().describe('(Deprecated) Dream description'),
  dreamJob: z
    .string()
    .optional()
    .describe('(Deprecated) Dream job description'),
  fearInLife: z
    .string()
    .optional()
    .describe('(Deprecated) Fear in life description'),
  professionSkills: z
    .string()
    .optional()
    .describe('(Deprecated) Profession skills description'),
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

  @ApiProperty({
    type: String,
  })
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: String,
  })
  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  givenName: string;

  @ApiProperty({
    type: String,
  })
  familyName: string;

  @ApiProperty({
    type: String,
    example: '9537775544',
  })
  phoneNumber: string;

  @ApiProperty({
    deprecated: true,
  })
  hobby: string;

  @ApiProperty({
    deprecated: true,
  })
  dreamJob: string;

  @ApiProperty({
    deprecated: true,
  })
  fearInLife: string;

  @ApiProperty({
    deprecated: true,
  })
  professionSkills: string;

  @ApiProperty({
    type: String,
  })
  lastSentenceId: string | null;
}
