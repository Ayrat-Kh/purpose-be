import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailingService } from './mailing.service';
import { MailingClient } from './mailing.client';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    }),
  ],
  providers: [MailingService, MailingClient],
  exports: [MailingService],
})
export class MailingModule {}
