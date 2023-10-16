import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { SentencesController } from './sentences.controller';
import { UsersService } from 'src/users/users.service';
import { PromptsService } from 'src/prompts/prompts.service';

let usersService: DeepMockProxy<UsersService>;
let eventEmitter: DeepMockProxy<EventEmitter2>;
let promptsService: DeepMockProxy<PromptsService>;

describe('SentencesController', () => {
  let controller: SentencesController;

  beforeEach(async () => {
    usersService = mockDeep<UsersService>();
    eventEmitter = mockDeep<EventEmitter2>();
    promptsService = mockDeep<PromptsService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEmitter2, UsersService, PromptsService],
      controllers: [SentencesController],
    })
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(PromptsService)
      .useValue(promptsService)
      .compile();

    controller = module.get<SentencesController>(SentencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
