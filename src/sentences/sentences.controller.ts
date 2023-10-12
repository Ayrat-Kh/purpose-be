import { Controller, Post } from '@nestjs/common';

@Controller('sentences')
export class SentencesController {
  @Post()
  async createCentence() {}
}
