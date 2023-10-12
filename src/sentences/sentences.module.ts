import { Module } from '@nestjs/common';
import { SentencesController } from './sentences.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SentencesController],
})
export class SentencesModule {}
