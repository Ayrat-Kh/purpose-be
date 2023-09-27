import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response, type Request } from 'express';
import { ApiFoundResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { UserService } from 'src/user/user.service';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Auth0Service } from './auth0.service';
import { CODE_VERIFIER_KEY } from './auth.constants';
import { Auth0CallbackGuard } from './auth0-callback.guard';
import { AuthorizeRequest } from 'src/user/user.dto';

@Controller('sso')
export class SsoController {
  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly configurationService: ConfigurationService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    description: 'auth0 start login',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend then the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @HttpCode(HttpStatus.FOUND)
  @Get('/auth0')
  async auth(@Res() response: Response) {
    const { codeVerifier, url } = await this.auth0Service.getAuthUrl();

    response.cookie(CODE_VERIFIER_KEY, codeVerifier, {
      httpOnly: true,
      signed: true,
    });

    return response.redirect(url);
  }

  @ApiQuery({
    name: 'code',
    type: String,
  })
  @ApiOperation({
    description: 'auth0 callback. Should not be used by clients',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend after the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @Get('/auth0/callback')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(Auth0CallbackGuard)
  async auth0Callback(
    @Req() request: AuthorizeRequest,
    @Res() response: Response,
  ) {
    await this.userService.upsertUser(request.user);

    response.clearCookie(CODE_VERIFIER_KEY);

    const url = new URL(this.configurationService.get('frontendAuthCallback'));
    url.searchParams.append('access_token', request.accessToken);

    return response.redirect(url.toString());
  }
}
