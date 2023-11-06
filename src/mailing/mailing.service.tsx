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
    statement,
  }: Pick<SentenceAnswersProps, 'statement'> & { to: string }) {
    const { from } = this.configurationService.get('email');
    const backendUrl = this.configurationService.get('backendUrl');
    const { logoUrl, fontsUrl } = this.configurationService.get('assets');
    const frontendUrl = this.configurationService.get('frontendUrl');
    const dashboardLink = `${frontendUrl}/dashboard?id=${statement.id}`;

    await this.resend.sendEmail({
      from,
      subject: 'Science Of Abundance - Mailling',
      to,
      react: (
        <SentenceAnswers
          logoUrl={`${backendUrl}/${logoUrl}`}
          fontsUrl={`${backendUrl}/${fontsUrl}`}
          statement={statement}
          dashboardLink={dashboardLink}
        />
      ),
    });

    this.logger.verbose(`[sendSentenceAnswers] Send email for ${to}`);
  }
}
