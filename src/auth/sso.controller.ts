import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LinkedinService } from './linkedin.service';
import { LinkedinCallbackGuard } from './linkedin-callback.guard';
import { SignInService } from './sign-in.service';
import { type RequestWithUser } from 'src/user/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sso')
export class SsoController {
  constructor(
    private readonly linkedinService: LinkedinService,
    private readonly signInService: SignInService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(@Res() response: Response): Promise<void | Response> {
    const url = this.linkedinService.getAuthorizationUrl();

    return response.redirect(url.toString());
  }

  @HttpCode(HttpStatus.FOUND)
  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleCallback(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<void | Response> {
    const { url } = await this.signInService.signIn(request.user);

    console.log('request', request);

    return response.redirect(url);
  }

  @Get('linkedin')
  async linkedinLogin(@Res() response: Response): Promise<void | Response> {
    const url = this.linkedinService.getAuthorizationUrl();

    return response.redirect(url.toString());
  }

  @HttpCode(HttpStatus.FOUND)
  @UseGuards(LinkedinCallbackGuard)
  @Get('/linkedin/callback')
  async linkedinCallback(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<void | Response> {
    const { url } = await this.signInService.signIn(request.user);

    return response.redirect(url);
  }
}
