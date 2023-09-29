import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class OpenAiClient extends OpenAI {
  openAi: OpenAI;

  constructor(readonly configuration: ConfigurationService) {
    super({
      apiKey: configuration.get('openAiApiKey'),
    });
  }
}
