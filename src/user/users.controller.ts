import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { type User } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthorizedRequest, UpdateUserDto, UserResponseDto } from './user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxx',
})
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserResponseDto,
  })
  @Get('me')
  async getMe(@Req() req: AuthorizedRequest): Promise<User | null> {
    return await this.userService.getUserById(req.user.id);
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
  ): Promise<User> {
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
}
