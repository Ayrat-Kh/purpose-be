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
import { User } from '@prisma/client';

import { AuthorizedRequest, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthorizedRequest): Promise<User | null> {
    return await this.userService.getUserById(req.user.id);
  }

  @UseGuards(AuthGuard)
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

  @UsePipes(ZodValidationPipe)
  @UseGuards(AuthGuard)
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
