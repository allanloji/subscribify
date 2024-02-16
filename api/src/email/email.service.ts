import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import * as aws from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import NewsletterEmail from './templates/email';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    const ses = new aws.SESClient({
      region: 'us-east-1',
      //@ts-expect-error - This is a valid property
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    this.nodemailerTransport = createTransport({
      SES: { ses, aws },
    });
  }

  sendMail() {
    const emailHtml = render(
      NewsletterEmail({ email: 'allanloji@gmail.com', newsletterName: 'Test' }),
    );

    return this.nodemailerTransport.sendMail({
      to: 'allanloji@gmail.com',
      subject: 'Test',
      html: emailHtml,
      //   attachments: [
      //     {
      //       // utf-8 string as an attachment
      //       filename: 'text1.txt',
      //       content: 'hello world!',
      //     },
      //   ],
    });
  }
}
