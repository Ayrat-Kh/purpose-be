import { Module, forwardRef } from '@nestjs/common';

import { SentencesController } from './sentences.controller';
import { UsersModule } from 'src/users/users.module';
import { SentencesService } from './sentences.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [SentencesService],
  controllers: [SentencesController],
  exports: [SentencesService],
})
export class SentencesModule {}
