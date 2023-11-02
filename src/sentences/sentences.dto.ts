import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma, User, UserPrompts } from '@prisma/client';

const SentenceSchema = z.object({
  fear: z
    .array(z.string())
    .or(z.null())
    .catch([])
    .describe('Fear in life description'),
  love: z.array(z.string()).or(z.null()).catch([]).describe('Love in life'),
  talent: z
    .array(z.string())
    .or(z.null())
    .catch([])
    .describe('Profession skills description'),
  ambition: z
    .array(z.string())
    .or(z.null())
    .catch([])
    .describe('Dream description'),
});

export class SentenceDto extends createZodDto(SentenceSchema) {}

export class UserSentenceDto implements UserPrompts {
  @ApiProperty({
    description: 'Prompt execution status',
    enum: [$Enums.PromptStatus.CREATED, $Enums.PromptStatus.EXECUTED],
  })
  status: $Enums.PromptStatus;

  @ApiProperty({ description: 'Open AI response overall response' })
  statement: string;

  @ApiProperty({ description: 'Open AI response fear statement' })
  fear: string;

  @ApiProperty({ description: 'Open AI response love statement' })
  love: string;

  @ApiProperty({ description: 'Open AI response talent statement' })
  talent: string;

  @ApiProperty({ description: 'Open AI response ambition statement' })
  ambition: string;

  @ApiProperty({ description: 'Database prompt id' })
  id: string;

  @ApiProperty({ description: 'Created at' })
  createdAt: Date;

  @ApiProperty({ description: 'User prompt' })
  prompt: string;

  @ApiProperty({ description: 'User which made a prompt' })
  userId: string;

  @ApiProperty({ description: 'Open AI conversation Id' })
  sessionId: string;

  @ApiProperty({ description: 'Request object', type: SentenceDto })
  request: Prisma.JsonValue;
}

export class UserSentencesListResponseMeta {
  @ApiProperty({
    type: String,
  })
  pageSize: number;

  @ApiProperty({
    type: String,
  })
  page: number;

  @ApiProperty({
    type: String,
  })
  total: number;
}

export class UserSentencesListResponse {
  @ApiProperty({
    type: UserSentenceDto,
  })
  sentences: UserSentenceDto[];

  @ApiProperty()
  meta: UserSentencesListResponseMeta;
}

export interface GetUserSentencesParams {
  user: Pick<User, 'id'>;
  page?: number;
  pageSize?: number;
}

export interface GetUserSentenceParams {
  user: Pick<User, 'id'>;
  sentenceId: 'latest' | (string & object);
}
