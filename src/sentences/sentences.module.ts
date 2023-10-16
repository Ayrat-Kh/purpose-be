import { Module } from '@nestjs/common';
import { SentencesController } from './sentences.controller';
import { UsersModule } from 'src/users/users.module';
import { PromptsModule } from 'src/prompts/prompts.module';

@Module({
  imports: [UsersModule, PromptsModule],
  controllers: [SentencesController],
})
export class SentencesModule {}
