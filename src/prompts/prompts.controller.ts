import { Controller, Post } from '@nestjs/common';

@Controller('prompts')
export class PromptsController {
  @Post()
  prompt() {}
}
