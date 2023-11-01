import { Injectable, Logger } from '@nestjs/common';
import type { User } from '@prisma/client';

import { OpenAiClient } from 'src/providers/open-ai-client';
import { DbClient } from 'src/providers/db-client';
import type {
  GetUserSentencesParams,
  UserSentenceDto,
  SentenceDto,
  GetUserSentenceParams,
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

  public async getUserSentence({
    sentenceId,
    user,
  }: GetUserSentenceParams): Promise<UserSentenceDto | null> {
    return await this.dbClient.userPrompts.findFirst({
      where:
        sentenceId === 'latest'
          ? {
              userId: user.id,
            }
          : {
              userId: user.id,
              id: sentenceId,
            },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });
  }

  public async getUserSentences({
    pageSize = 4,
    page = 1,
    user,
  }: GetUserSentencesParams): Promise<UserSentenceDto[]> {
    return await this.dbClient.userPrompts.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  public async getUserSentencesCount({
    user,
  }: Pick<GetUserSentencesParams, 'user'>): Promise<number> {
    return await this.dbClient.userPrompts.count({
      where: {
        userId: user.id,
      },
    });
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
