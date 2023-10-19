import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const SentenceSchema = z.object({
  fear: z.string().optional().describe('Fear in life description'),
  love: z.string().optional().describe('Love in life'),
  talent: z.string().optional().describe('Profession skills description'),
  ambition: z.string().optional().describe('Dream description'),
});

export class SentenceDto extends createZodDto(SentenceSchema) {}
