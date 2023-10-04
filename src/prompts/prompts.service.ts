import { Injectable } from '@nestjs/common';

import { OpenAiClient } from 'src/providers/open-ai-client';
import { DbClient } from 'src/providers/db-client';
import { CreatePromptDto, UserPromptDto } from './prompts.dto';
import { AccessTokenPayload } from 'src/auth/auth.dto';

@Injectable()
export class PromptsService {
  constructor(
    private readonly openAiClient: OpenAiClient,
    private readonly dbClient: DbClient,
  ) {}

  public async prompt(
    p: CreatePromptDto,
    user: Pick<AccessTokenPayload, 'sub'>,
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

    const message = response.choices?.[0]?.message?.content ?? '';

    const result = await this.dbClient.userPrompts.create({
      data: {
        prompt: p.content,
        sessionId: response.id,
        userId: user.sub,
        responseMessage: message,
      },
    });

    return result;
  }

  public async getUserPrompts(
    user: Pick<AccessTokenPayload, 'sub'>,
  ): Promise<UserPromptDto[]> {
    const userPrompts = await this.dbClient.userPrompts.findMany({
      where: {
        userId: user.sub,
      },
    });

    return userPrompts;
  }
}
