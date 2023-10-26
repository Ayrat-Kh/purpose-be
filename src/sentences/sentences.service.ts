import { Injectable, Logger } from '@nestjs/common';
import type { User } from '@prisma/client';

import { OpenAiClient } from 'src/providers/open-ai-client';
import { DbClient } from 'src/providers/db-client';
import type {
  GetUserSentencesParams,
  UserSentenceDto,
  SentenceDto,
} from './sentences.dto';
import { getSentence } from './sentences.constants';

@Injectable()
export class SentencesService {
  private readonly logger = new Logger('SentencesService');

  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly dbClient: DbClient,
  ) {}

  public async promptSentence(
    p: SentenceDto,
    user: Pick<User, 'id'>,
  ): Promise<UserSentenceDto> {
    const requestContent = getSentence(p);

    const response = await this.openAiClient.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.4,
      messages: [
        {
          role: 'user',
          content: requestContent,
        },
      ],
    });

    this.logger.verbose(
      `Prompted to openAI for user ${user.id}, content ${JSON.stringify(
        p,
      )}, Usage: ${JSON.stringify(
        response.usage ?? {},
      )}, response: ${JSON.stringify(response.choices)}`,
    );

    console.log('response.choices', JSON.stringify(response.choices));

    const content = response.choices?.[0]?.message?.content ?? '';

    const parsedResponse = this.getStatementResponse(content);

    if (parsedResponse === null) {
      this.logger.error("Couldn't parse response", content);
    }

    return await this.dbClient.userPrompts.create({
      data: {
        prompt: requestContent,
        sessionId: response.id,
        userId: user.id,
        ...(parsedResponse ?? EMPTY_STATEMENT_RESPONSE),
      },
    });
  }

  public async getUserSentences({
    pageSize = 4,
    page = 1,
    sentenceId,
    user,
  }: GetUserSentencesParams): Promise<UserSentenceDto[]> {
    return await this.dbClient.userPrompts.findMany({
      where: this.getListQuery({ user, sentenceId }),
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  public async getUserSentencesCount({
    sentenceId,
    user,
  }: Pick<GetUserSentencesParams, 'user' | 'sentenceId'>): Promise<number> {
    return await this.dbClient.userPrompts.count({
      where: this.getListQuery({ user, sentenceId }),
    });
  }

  private getListQuery({
    user,
    sentenceId,
  }: Pick<GetUserSentencesParams, 'sentenceId' | 'user'>) {
    return {
      userId: user.id,
      ...(sentenceId
        ? {
            AND: {
              id: sentenceId,
            },
          }
        : {}),
    };
  }

  private getStatementResponse(
    content: string,
  ): Pick<
    UserSentenceDto,
    'ambition' | 'fear' | 'love' | 'statement' | 'talent'
  > | null {
    try {
      const result = /\{(?:[^{}])*\}/.exec(content);
      const {
        Ambition: ambition,
        Fear: fear,
        Love: love,
        Statement: statement,
        Talent: talent,
      } = JSON.parse(result?.[0] ?? '');

      return {
        ambition,
        fear,
        love,
        statement,
        talent,
      };
    } catch (e) {
      return null;
    }
  }
}

const EMPTY_STATEMENT_RESPONSE: Pick<
  UserSentenceDto,
  'ambition' | 'fear' | 'love' | 'statement' | 'talent'
> = {
  ambition: '',
  fear: '',
  love: '',
  statement: '',
  talent: '',
};
