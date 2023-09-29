import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class OpenAiClient {
  openAi: OpenAI;

  constructor(private readonly configuration: ConfigurationService) {
    this.openAi = new OpenAI({
      apiKey: this.configuration.get('openAiApiKey'),
    });
  }
}
