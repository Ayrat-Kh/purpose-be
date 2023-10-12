import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { type User } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PatchUserDto, UpdateUserDto, UserResponseDto } from './users.dto';
import { UsersService } from './users.service';
import { type AuthorizedRequest } from 'src/auth/auth.dto';
import { OnboardedUserEvent, UserEvents } from 'src/events/users.event';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxx',
})
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Get('me')
  async getMe(@Req() req: AuthorizedRequest): Promise<User | null> {
    return await this.userService.getUserById(req.user.sub);
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(
        {
          message: `User with id: ${id} not found`,
        },
        {
          description: 'description',
        },
      );
    }

    return user;
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UsePipes(ZodValidationPipe)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Req() req: AuthorizedRequest,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new BadRequestException({
        message: `Not allowed to edit the user with id: ${id}`,
      });
    }

    const dbUser = await this.userService.updateUserData(id, user);

    if (!user) {
      throw new NotFoundException(
        {
          message: `User with id: ${id} not found`,
        },
        {
          description: 'description',
        },
      );
    }

    return dbUser;
  }

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UsePipes(ZodValidationPipe)
  @Patch(':id')
  async patchUser(
    @Param('id') id: string,
    @Body() user: PatchUserDto,
    @Req() req: AuthorizedRequest,
    @Query('ignore_onboarded_event') ignoreOnboardedEvent?: boolean,
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new BadRequestException({
        message: `Not allowed to edit the user with id: ${id}`,
      });
    }

    const dbUser = await this.userService.patchUserData(id, user);

    if (!ignoreOnboardedEvent && user.status === 'ONBOARDED') {
      this.eventEmitter.emit(
        UserEvents.USER_ONBOARDED,
        new OnboardedUserEvent(id),
      );
    }

    return dbUser;
  }
}
