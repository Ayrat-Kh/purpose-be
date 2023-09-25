import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { LinkedinService } from './linkedin.service';
import { LinkedinCallbackGuard } from './linkedin-callback.guard';
import { SignInService } from './sign-in.service';
import { type AuthorizeRequest } from 'src/user/user.dto';
import {
  ApiFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('sso')
export class SsoController {
  constructor(
    private readonly linkedinService: LinkedinService,
    private readonly signInService: SignInService,
  ) {}

  @ApiResponse({
    description: 'Google Oauth',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(@Res() response: Response): Promise<void | Response> {
    const url = this.linkedinService.getAuthorizationUrl();

    return response.redirect(url.toString());
  }

  @ApiQuery({
    name: 'code',
    type: String,
  })
  @ApiOperation({
    description: 'Google Oauth callback. Should not be used by clients',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend after the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleCallback(
    @Req() request: AuthorizeRequest,
    @Res() response: Response,
  ): Promise<void | Response> {
    const { url } = await this.signInService.signIn(request.user);

    return response.redirect(url);
  }

  @ApiResponse({
    description: 'Linkedin Oauth',
  })
  @HttpCode(HttpStatus.OK)
  @Get('linkedin')
  async linkedinLogin(@Res() response: Response): Promise<void | Response> {
    const url = this.linkedinService.getAuthorizationUrl();

    return response.redirect(url.toString());
  }

  @ApiQuery({
    name: 'code',
    type: String,
  })
  @ApiOperation({
    description: 'Linkedin Oauth callback. Should not be used by clients',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend after the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(LinkedinCallbackGuard)
  @Get('/linkedin/callback')
  async linkedinCallback(
    @Req() request: AuthorizeRequest,
    @Res() response: Response,
  ): Promise<void | Response> {
    const { url } = await this.signInService.signIn(request.user);

    return response.redirect(url);
  }

  @ApiOperation({
    description: 'Facebook Oauth',
  })
  @HttpCode(HttpStatus.OK)
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @ApiQuery({
    name: 'code',
    type: String,
  })
  @ApiOperation({
    description: 'Facebook Oauth callback. Should not be used by clients',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend after the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @HttpCode(HttpStatus.FOUND)
  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(
    @Req() request: AuthorizeRequest,
    @Res() response: Response,
  ): Promise<any> {
    const { url } = await this.signInService.signIn(request.user);

    return response.redirect(url);
  }
}
