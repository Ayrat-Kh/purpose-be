import { ApiProperty } from '@nestjs/swagger';
import { UserPrompts } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreatePromptDtoSchema = z.object({
  content: z.string().nonempty().describe('Prompt content'),
  temperature: z
    .number()
    .min(0)
    .max(2)
    .default(0.4)
    .describe('Value between 0 and 2. Value towards 2 gives more random result')
    .optional(),
});

export class CreatePromptDto extends createZodDto(CreatePromptDtoSchema) {}

export class UserPromptDto implements UserPrompts {
  @ApiProperty({ description: 'Open AI response' })
  responseMessage: string;

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
}
