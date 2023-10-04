import { Test, TestingModule } from '@nestjs/testing';

import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';
import { mockDeep, mock, DeepMockProxy } from 'jest-mock-extended';
import { AuthorizedRequest } from 'src/auth/auth.dto';
import { UserPromptDto } from './prompts.dto';

let promptsService: DeepMockProxy<PromptsService>;

describe('PromptsController', () => {
  let controller: PromptsController;

  beforeEach(async () => {
    promptsService = mockDeep<PromptsService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptsService],
      controllers: [PromptsController],
    })
      .overrideProvider(PromptsService)
      .useValue(promptsService)
      .compile();

    controller = module.get<PromptsController>(PromptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created prompt', async () => {
    const response = mock<UserPromptDto>();

    promptsService.prompt.mockResolvedValue(response);

    await expect(
      controller.prompt({ content: 'content' }, mock<AuthorizedRequest>()),
    ).resolves.toEqual(response);
  });

  it('should return list prompts', async () => {
    const response = mock<UserPromptDto>();

    promptsService.getUserPrompts.mockResolvedValue([response]);

    await expect(
      controller.getUserPrompts(mock<AuthorizedRequest>()),
    ).resolves.toEqual([response]);
  });
});
