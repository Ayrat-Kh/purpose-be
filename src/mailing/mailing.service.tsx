import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import { Resend } from 'resend';

import SentenceAnswers from './templates/sentence-answers';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class MailingService {
  resend: Resend;

  constructor(private readonly configurationService: ConfigurationService) {
    this.resend = new Resend(configurationService.get('email').resendKey);
  }

  async sendSentenceAnswers() {
    const { from } = this.configurationService.get('email');

    await this.resend.sendEmail({
      from,
      subject: 'Welcome',
      to: 'ayratkhisamiev@gmail.com',
      html: render(<SentenceAnswers />, {
        plainText: true,
        pretty: false,
      }),
    });
  }
}
