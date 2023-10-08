import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';

import { MailingClient } from './mailing.client';
import { SentenceAnswers } from './templates/sentence-answers';

@Injectable()
export class MailingService {
  constructor(private readonly client: MailingClient) {}

  async sendSentenceAnswers() {
    const emailHtml = render(<SentenceAnswers />);

    await this.client.sendMail({
      html: emailHtml,
      subject: 'test',
      to: 'ayratkhisamiev@gmail.com',
    });
  }
}
