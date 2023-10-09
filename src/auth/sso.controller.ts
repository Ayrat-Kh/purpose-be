import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, type Response } from 'express';
import { ApiFoundResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { UsersService } from 'src/users/users.service';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Auth0Service } from './auth0.service';
import { CODE_VERIFIER_KEY, RETURN_TO } from './auth.constants';
import { Auth0CallbackGuard } from './auth0-callback.guard';
import { type AuthorizeRequest } from 'src/users/users.dto';
import { Public } from './auth.public.decorator';

@Controller('sso')
export class SsoController {
  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly configurationService: ConfigurationService,
    private readonly usersService: UsersService,
  ) {}

  @ApiQuery({
    name: 'return_to',
    type: String,
    required: false,
  })
  @ApiOperation({
    description: 'auth0 start login',
  })
  @ApiFoundResponse({
    description:
      'Redirect to frontend then the success auth. Example: http://frontend.com?access_token=TOKEN',
  })
  @HttpCode(HttpStatus.FOUND)
  @Get('/auth0')
  @Public()
  async auth(@Req() request: Request, @Res() response: Response) {
    const { codeVerifier, url } = await this.auth0Service.getAuthUrl();

    response.cookie(CODE_VERIFIER_KEY, codeVerifier, {
      httpOnly: true,
      signed: true,
    });

    if (request.query.return_to) {
      response.cookie(RETURN_TO, request.query.return_to, {
        httpOnly: true,
        signed: true,
      });
    }

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
  @Public()
  @UseGuards(Auth0CallbackGuard)
  async auth0Callback(
    @Req() request: AuthorizeRequest,
    @Res() response: Response,
  ) {
    await this.usersService.upsertUser(request.user);

    const returnTo = request.signedCookies[RETURN_TO];

    response.clearCookie(CODE_VERIFIER_KEY);
    response.clearCookie(RETURN_TO);

    const url = new URL(returnTo);
    url.searchParams.append('access_token', request.accessToken);

    return response.redirect(url.toString());
  }
}
