import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateSentenceEvent,
  SentencesEvents,
} from 'src/events/sentences.event';
import { SentenceDto } from './sentences.dto';
import { UsersService } from 'src/users/users.service';
import { AuthorizedRequest } from 'src/auth/auth.dto';

@Controller('sentences')
export class SentencesController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(ZodValidationPipe)
  async createCentence(
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
