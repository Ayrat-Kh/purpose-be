import { Test, TestingModule } from '@nestjs/testing';

import { PromptsService } from './prompts.service';
import { DbClient } from 'src/providers/db-client';
import { OpenAiClient } from 'src/providers/open-ai-client';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import {
  DbMockContext,
  createDbMockContext,
} from 'src/providers/db-client.mock';
import {
  OpenAiClientMockContext,
  createOpenAiClientMockContext,
} from 'src/providers/open-ai-client.mock';

let dbMockCtx: DbMockContext;
let openAiMockCtx: OpenAiClientMockContext;
let service: PromptsService;

beforeEach(async () => {
  dbMockCtx = createDbMockContext();
  openAiMockCtx = createOpenAiClientMockContext();

  const module: TestingModule = await Test.createTestingModule({
    providers: [PromptsService, DbClient, OpenAiClient],
    imports: [ConfigurationModule],
  })
    .overrideProvider(DbClient)
    .useValue(dbMockCtx.prisma)
    .overrideProvider(OpenAiClient)
    .useValue(openAiMockCtx.openAiClient)

    .compile();

  service = module.get<PromptsService>(PromptsService);
});

describe('PromptsService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new prompt', async () => {
    openAiMockCtx.openAiClientMock.chat.completions.create.mockResolvedValue({
      id: 'id',
      created: 1,
      model: '',
      object: '',
      choices: [
        {
          message: {
            content: 'open ai response',
            role: 'assistant',
          },
          index: 0,
          finish_reason: 'stop',
        },
      ],
    });

    const userPrompt = {
      id: 'id',
      prompt: 'prompt',
      responseMessage: 'responseMessage',
      sessionId: 'sessionId',
      userId: 'userId',
      createdAt: new Date(),
    };

    dbMockCtx.prismaMock.userPrompts.create.mockResolvedValue(userPrompt);

    await expect(
      service.prompt(
        {
          content: 'hello',
        },
        {
          sub: 'sub',
        },
      ),
    ).resolves.toEqual(userPrompt);
  });

  it('should return list prompts', async () => {
    const userPrompt = {
      id: 'id',
      prompt: 'prompt',
      responseMessage: 'responseMessage',
      sessionId: 'sessionId',
      userId: 'userId',
      createdAt: new Date(),
    };

    dbMockCtx.prismaMock.userPrompts.findMany.mockResolvedValue([userPrompt]);

    await expect(
      service.getUserPrompts({
        sub: 'sub',
      }),
    ).resolves.toEqual([userPrompt]);
  });
});
