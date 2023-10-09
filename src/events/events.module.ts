import { Module } from '@nestjs/common';
import { UsersListener } from './users.listener';
import { UsersModule } from 'src/users/users.module';
import { PromptsModule } from 'src/prompts/prompts.module';

@Module({
  imports: [UsersModule, PromptsModule],
  providers: [UsersListener],
})
export class EventsModule {}
