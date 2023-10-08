import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

import { ConfigurationService } from 'src/configuration/configuration.service';

const OAuth2 = google.auth.OAuth2;

@Injectable()
export class MailingClient {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly mailerService: MailerService,
  ) {}

  public async sendMail({
    html,
    subject,
    to,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    const { from } = this.configurationService.get('email');

    await this.init();

    this.mailerService

      .sendMail({
        transporterName: 'gmail',
        to, // list of receivers
        from, // sender address
        subject,
        html,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private async init() {
    const { clientId, email, clientSecret, redirectUrl, refreshToken } =
      this.configurationService.get('email');

    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const accessToken = await new Promise<string | null | undefined>(
      (resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject('Failed to create access token');
          }
          resolve(token);
        });
      },
    );

    if (!accessToken) {
      throw new Error('Can not init user for email');
    }

    const config: Options = {
      service: 'gmail',

      auth: {
        type: 'OAuth2',
        user: email,
        clientId,
        clientSecret,
        accessToken,
      },
    };

    this.mailerService.addTransporter('gmail', config);
  }
}
