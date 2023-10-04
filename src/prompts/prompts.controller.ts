import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreatePromptDto, UserPromptDto } from './prompts.dto';
import { PromptsService } from './prompts.service';
import { AuthorizedRequest } from 'src/auth/auth.dto';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxx',
})
@UseGuards(AuthGuard('jwt'))
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  @ApiOperation({
    description: 'Get list of all user prompts sorted by createdAt desc order',
  })
  @ApiResponse({
    type: UserPromptDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async getUserPrompts(
    @Req() request: AuthorizedRequest,
  ): Promise<UserPromptDto[]> {
    return await this.promptsService.getUserPrompts(request.user);
  }

  @Post()
  @ApiBody({
    type: CreatePromptDto,
  })
  @ApiOperation({
    description: 'Create a prompt to open API',
  })
  @ApiResponse({
    type: UserPromptDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ZodValidationPipe)
  async prompt(
    @Body() prompt: CreatePromptDto,
    @Req() request: AuthorizedRequest,
  ): Promise<UserPromptDto> {
    return await this.promptsService.prompt(prompt, request.user);
  }
}
