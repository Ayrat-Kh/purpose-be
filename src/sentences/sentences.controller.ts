import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import {
  CreateSentenceEvent,
  SentencesEvents,
} from 'src/events/sentences.event';
import {
  SentenceDto,
  UserSentenceDto,
  UserSentencesListResponse,
} from './sentences.dto';
import { UsersService } from 'src/users/users.service';
import { AuthorizedRequest } from 'src/auth/auth.dto';
import { SentencesService } from './sentences.service';

@Controller('sentences')
export class SentencesController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UsersService,
    private readonly sentencesService: SentencesService,
  ) {}

  @ApiResponse({
    type: UserSentencesListResponse,
  })
  @Get()
  async getAllSentences(
    @Req() request: AuthorizedRequest,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<UserSentencesListResponse> {
    let parsedPage = Number(page);
    parsedPage = Number.isNaN(parsedPage) ? 1 : parsedPage;

    let parsedPageSize = Number(pageSize);
    parsedPageSize = Number.isNaN(parsedPageSize) ? 4 : parsedPageSize;

    const user = {
      id: request.user.sub,
    };

    const sentences = await this.sentencesService.getUserSentences({
      user,
      page: parsedPage,
      pageSize: parsedPageSize,
    });

    return {
      sentences,
      meta: {
        pageSize: parsedPageSize,
        page: parsedPage,
        total: await this.sentencesService.getUserSentencesCount({
          user,
        }),
      },
    };
  }

  @ApiResponse({
    type: UserSentenceDto,
  })
  @Get('/:sentenceId')
  async getSentence(
    @Req() request: AuthorizedRequest,
    @Param('sentenceId') sentenceId: string,
  ) {
    const result = await this.sentencesService.getUserSentences({
      user: {
        id: request.user.sub,
      },
      sentenceId,
    });

    if (!result?.[0]) {
      throw new NotFoundException('Sentence not found');
    }

    return result[0];
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(ZodValidationPipe)
  async createSentense(
    @Req() request: AuthorizedRequest,
    @Body() sentences: SentenceDto,
  ) {
    const user = await this.userService.getUserById(request.user.sub);

    if (!user) {
      throw new NotFoundException(
        `User with id: ${request.user.sub} does not exist`,
      );
    }

    this.eventEmitter.emit(
      SentencesEvents.CREATE_SENTENCE,
      new CreateSentenceEvent(sentences, user),
    );
  }
}
