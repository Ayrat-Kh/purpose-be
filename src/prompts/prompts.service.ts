import { Injectable, Logger } from '@nestjs/common';

import { OpenAiClient } from 'src/providers/open-ai-client';
import { DbClient } from 'src/providers/db-client';
import {
  type CreatePromptDto,
  type StatementResponse,
  type UserPromptDto,
} from './prompts.dto';
import { type User } from '@prisma/client';

@Injectable()
export class PromptsService {
  private readonly logger = new Logger('PromptsService');

  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly dbClient: DbClient,
  ) {}

  public async prompt(
    p: CreatePromptDto,
    user: Pick<User, 'id'>,
  ): Promise<UserPromptDto> {
    const response = await this.openAiClient.chat.completions.create({
      model: 'gpt-4',
      temperature: p.temperature,
      messages: [
        {
          role: 'user',
          content: p.content,
        },
      ],
    });

    this.logger.verbose(
      `Prompted to openAI for user ${user.id}, content ${
        p.content
      }, Usage: ${JSON.stringify(
        response.usage ?? {},
      )}, response: ${JSON.stringify(response.choices)}`,
    );

    console.log('response.choices', JSON.stringify(response.choices));

    let message: StatementResponse = {
      ambition: '',
      fear: '',
      love: '',
      statement: '',
      talent: '',
    };

    let content = response.choices?.[0]?.message?.content ?? '';
    if (!content.startsWith('{')) {
      content = `{${content}`;
    }

    if (!content.endsWith('}')) {
      content = `${content}}`;
    }
    try {
      const {
        Ambition: ambition,
        Fear: fear,
        Love: love,
        Statement: statement,
        Talent: talent,
      } = JSON.parse(content);

      message = {
        ambition,
        fear,
        love,
        statement,
        talent,
      };
    } catch (e) {
      this.logger.error("Couldn't parse response", content);
    }

    const result = await this.dbClient.userPrompts.create({
      data: {
        prompt: p.content,
        sessionId: response.id,
        userId: user.id,
        ...message,
      },
    });

    return result;
  }

  public async getUserPrompts(
    user: Pick<User, 'id'>,
    promptId: string | undefined = undefined,
  ): Promise<UserPromptDto[]> {
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
    });

    return userPrompts;
  }
}
