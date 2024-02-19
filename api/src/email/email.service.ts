import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import * as aws from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import NewsletterEmail from './templates/email';
import { Newsletter, Recipient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {
    const ses = new aws.SESClient({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.nodemailerTransport = createTransport({
      SES: { ses, aws },
    });
  }

  async sendEmail(
    name: string,
    recipient: Recipient,
    file: { fileName: string; path: string },
    id: string,
  ) {
    const emailHtml = render(
      NewsletterEmail({
        newsletterName: name,
        link: `${this.configService.get('WEB_URL')}/unsubscribe?recipient=${recipient.id}&newsletter=${id}`,
      }),
    );

    return this.nodemailerTransport.sendMail({
      from: 'allanloji@gmail.com',
      to: recipient.email,
      subject: 'New message from the newsletter!',
      html: emailHtml,
      attachments: [file],
    });
  }

  async sendNewsletter(newsletter: Newsletter & { recipients: Recipient[] }) {
    const { file, name, recipients, id } = newsletter;
    const fileObject = await this.s3Service.getS3File(file);

    // Create a log entry for the email
    await this.prisma.emailLog.create({
      data: {
        newsletter: { connect: { id } },
        emailsSent: newsletter.recipients.length,
      },
    });

    await Promise.all(
      recipients.map(
        async (recipient: any) =>
          await this.sendEmail(name, recipient, fileObject, id),
      ),
    );
  }
}
