import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get<TKey extends keyof Configuration>(key: TKey): Configuration[TKey] {
    return this.configService.get(key) as Configuration[TKey];
  }
}
