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
  }: Pick<SentenceAnswersProps, 'statement' | 'link'> & { to: string }) {
    const { from } = this.configurationService.get('email');
    const backendUrl = this.configurationService.get('backendUrl');
    const { logoUrl, fontsUrl } = this.configurationService.get('assets');

    await this.resend.sendEmail({
      from,
      subject: 'Welcome',
      to,
      react: (
        <SentenceAnswers
          logoUrl={`${backendUrl}/${logoUrl}`}
          fontsUrl={`${backendUrl}/${fontsUrl}`}
          {...props}
        />
      ),
    });

    this.logger.verbose(`[sendSentenceAnswers] Send email for ${to}`);
  }
}
