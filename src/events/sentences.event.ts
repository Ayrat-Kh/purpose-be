import { type User } from '@prisma/client';
import { type SentenceDto } from 'src/sentences/sentences.dto';

export const SentencesEvents = {
  CREATE_SENTENCE: 'sentences.created',
} as const;

export class CreateSentenceEvent {
  constructor(
    public readonly sentenceId: string,
    public readonly sentence: SentenceDto,
    public readonly user: Pick<User, 'id' | 'email'>,
  ) {}
}
