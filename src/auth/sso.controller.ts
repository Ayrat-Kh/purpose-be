import { Body, Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { Login } from './auth.dto';
import { LinkedinService } from './linkedin.service';
import { LinkedinCallbackGuard } from './linkedin-callback.guard';

@Controller('sso')
export class SsoController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Get('linkedin')
  async linkedinLogin(@Res() response: Response): Promise<void | Response> {
    const url = this.linkedinService.getAuthorizationUrl();

    return response.redirect(url.toString());
  }

  @UseGuards(LinkedinCallbackGuard)
  @Get('/linkedin/callback')
  async linkedinCallback(
    @Body() request: Login,
    @Res() response: Response,
  ): Promise<void | Response> {
    if (request.type === 'facebook') {
      const url = this.linkedinService.getAuthorizationUrl();

      return response.redirect(url.toString());
    }

    return response
      .status(400)
      .json({
        message: 'Unsupported login type',
      })
      .send();
  }
}
