import { Controller, Get } from '@nestjs/common';

@Controller('/ping')
export class PingController {
  @Get()
  getHello(): { message: 'pong' } {
    return {
      message: 'pong',
    };
  }
}
