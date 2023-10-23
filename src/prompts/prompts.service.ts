import { Injectable, Logger } from '@nestjs/common';

import { OpenAiClient } from 'src/providers/open-ai-client';
import { DbClient } from 'src/providers/db-client';
import type { StatementResponse, UserPromptDto } from './prompts.dto';
import type { User } from '@prisma/client';
import type { SentenceDto } from 'src/sentences/sentences.dto';
import { getSentence } from './events.open-ai.constants';

interface GetUserPromptsParams {
  user: Pick<User, 'id'>;
  promptId?: string | undefined;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class PromptsService {
  private readonly logger = new Logger('PromptsService');

  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly dbClient: DbClient,
  ) {}

  public async promptSentence(
    p: SentenceDto,
    user: Pick<User, 'id'>,
  ): Promise<UserPromptDto> {
    const requestContent = getSentence(p);

    const response = await this.openAiClient.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.4,
      messages: [
        {
          role: 'user',
          content: getSentence(p),
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

    const result = await this.dbClient.userPrompts.create({
      data: {
        prompt: requestContent,
        sessionId: response.id,
        userId: user.id,
        ...(parsedResponse ?? EMPTY_STATEMENT_RESPONSE),
      },
    });

    return result;
  }

  public async getUserPrompts({
    pageSize = 4,
    page = 1,
    promptId,
    user,
  }: GetUserPromptsParams): Promise<UserPromptDto[]> {
    const userPrompts = await this.dbClient.userPrompts.findMany({
      where: {
        userId: user.id,
        ...(promptId
          ? {
              AND: {
                id: promptId,
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return userPrompts;
  }

  private getStatementResponse(content: string): StatementResponse | null {
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

const EMPTY_STATEMENT_RESPONSE: StatementResponse = {
  ambition: '',
  fear: '',
  love: '',
  statement: '',
  talent: '',
};
