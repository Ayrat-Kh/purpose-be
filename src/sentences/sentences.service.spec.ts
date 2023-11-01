import { Test, TestingModule } from '@nestjs/testing';

import { SentencesService } from './sentences.service';
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
import { UserPrompts } from '@prisma/client';

let dbMockCtx: DbMockContext;
let openAiMockCtx: OpenAiClientMockContext;
let service: SentencesService;

beforeEach(async () => {
  dbMockCtx = createDbMockContext();
  openAiMockCtx = createOpenAiClientMockContext();

  const module: TestingModule = await Test.createTestingModule({
    providers: [SentencesService, DbClient, OpenAiClient],
    imports: [ConfigurationModule],
  })
    .overrideProvider(DbClient)
    .useValue(dbMockCtx.prisma)
    .overrideProvider(OpenAiClient)
    .useValue(openAiMockCtx.openAiClient)

    .compile();

  service = module.get<SentencesService>(SentencesService);
});

describe('SentencesService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new sentence', async () => {
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

    const userSentence: UserPrompts = {
      id: 'id',
      request: {},
      ambition: '',
      fear: '',
      love: '',
      statement: '',
      talent: '',
      sessionId: 'sessionId',
      userId: 'userId',
      createdAt: new Date(),
    };

    dbMockCtx.prismaMock.userPrompts.create.mockResolvedValue(userSentence);

    await expect(
      service.promptSentence(
        {
          ambition: 'ambition',
          fear: 'fear',
          love: 'love',
          talent: 'talent',
        },
        {
          id: 'sub',
        },
      ),
    ).resolves.toEqual(userSentence);
  });

  it('should return list prompts', async () => {
    const userSentence: UserPrompts = {
      id: 'id',
      request: {},
      sessionId: 'sessionId',
      userId: 'userId',
      createdAt: new Date(),
      fear: '',
      love: '',
      statement: '',
      talent: '',
      ambition: '',
    };

    dbMockCtx.prismaMock.userPrompts.findMany.mockResolvedValue([userSentence]);

    await expect(
      service.getUserSentences({
        user: {
          id: 'sub',
        },
      }),
    ).resolves.toEqual([userSentence]);
  });
});
