import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

import { Public } from 'src/auth/auth.public.decorator';

class PongResponse {
  @ApiProperty({
    type: String,
  })
  pong: 'pong';
}

@Controller('/ping')
export class PingController {
  @Public()
  @ApiOkResponse({
    status: 200,
    description: 'Health check',
    type: PongResponse,
  })
  @Get()
  getHello(): { message: 'pong' } {
    return {
      message: 'pong',
    };
  }
}
