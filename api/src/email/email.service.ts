import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import * as aws from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import NewsletterEmail from './templates/email';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Newsletter, Recipient } from '@prisma/client';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const ses = new aws.SESClient({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    const s3 = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.s3Client = s3;

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
    const fileObject = await this.getS3File(file);

    await Promise.all(
      recipients.map(
        async (recipient: any) =>
          await this.sendEmail(name, recipient, fileObject, id),
      ),
    );
  }

  async getS3File(file: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: file,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return { fileName: file, path: url };
  }
}
