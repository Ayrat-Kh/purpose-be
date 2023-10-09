import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

import SentenceAnswers, {
  type SentenceAnswersProps,
} from './templates/sentence-answers';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class MailingService {
  private readonly logger = new Logger('MailingService');

  private readonly resend: Resend;

  constructor(private readonly configurationService: ConfigurationService) {
    this.resend = new Resend(configurationService.get('email').resendKey);
  }

  async sendSentenceAnswers({
    to,
    ...props
  }: SentenceAnswersProps & { to: string }) {
    const { from } = this.configurationService.get('email');

    await this.resend.sendEmail({
      from,
      subject: 'Welcome',
      to,
      react: <SentenceAnswers {...props} />,
    });

    this.logger.verbose(`[sendSentenceAnswers] Send email for ${to}`);
  }
}
