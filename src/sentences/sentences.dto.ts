import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const SentenceSchema = z.object({
  hobby: z.string().optional().describe('Dream description'),
  dreamJob: z.string().optional().describe('Dream job description'),
  fearInLife: z.string().optional().describe('Fear in life description'),
  professionSkills: z
    .string()
    .optional()
    .describe('Profession skills description'),
});

export class SentenceDto extends createZodDto(SentenceSchema) {}
