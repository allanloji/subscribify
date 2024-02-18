import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import EmailService from 'src/email/email.service';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewslettersService {
  private s3Client: S3Client;

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    const s3 = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.s3Client = s3;
  }

  async findAll() {
    return this.prisma.newsletter.findMany({
      select: {
        id: true,
        name: true,
        file: true,
        recipients: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        file: true,
        recipients: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }

    return newsletter;
  }

  async create({ name, file, recipients }: CreateNewsletterDto) {
    // Create recipients if they don't exist
    await Promise.all(
      recipients.map(async (email: string) => {
        await this.prisma.recipient.upsert({
          where: { email },
          update: {},
          create: { email },
        });
      }),
    );

    return this.prisma.newsletter.create({
      data: {
        name,
        file,
        recipients: {
          connect: recipients.map((email: string) => ({ email })),
        },
      },
      include: {
        recipients: true,
      },
    });
  }

  async update(id: string, { name, file, recipients }: UpdateNewsletterDto) {
    // Create recipients if they don't exist
    await Promise.all(
      recipients.map(async (email: string) => {
        await this.prisma.recipient.upsert({
          where: { email },
          update: {},
          create: { email },
        });
      }),
    );

    // Delete the old file if a new one is provided
    if (file) {
      const newsletter = await this.prisma.newsletter.findUnique({
        where: { id },
        select: {
          file: true,
        },
      });

      if (newsletter.file) {
        this.deleteS3File(newsletter.file);
      }
    }

    try {
      const newsletter = await this.prisma.newsletter.update({
        where: { id },
        data: {
          name,
          recipients: {
            set: recipients.map((email: string) => ({ email })),
          },
          ...(file && { file }),
        },
      });
      return newsletter;
    } catch (e) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const newsletter = await this.prisma.newsletter.delete({
        where: { id },
      });
      this.deleteS3File(newsletter.file);
      return newsletter;
    } catch (e) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }
  }

  async unsubscribe(id: string, { id: recipientId }: UnsubscribeNewsletterDto) {
    const newsletter = await this.prisma.recipient.findUnique({
      where: { id: recipientId, newsletters: { some: { id } } },
    });

    if (!newsletter) {
      throw new NotFoundException(
        `Recipient #${recipientId} is not subscribed to newsletter #${id}`,
      );
    }

    await this.prisma.unsubscribeLog.create({
      data: {
        newsletter: { connect: { id } },
        recipient: { connect: { id: recipientId } },
      },
    });

    return this.prisma.newsletter.update({
      where: { id },
      data: {
        recipients: {
          disconnect: [{ id: recipientId }],
        },
      },
    });
  }

  async send(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        file: true,
        recipients: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }

    // Create a log entry for the email
    await this.prisma.emailLog.create({
      data: {
        newsletter: { connect: { id } },
        emailsSent: newsletter.recipients.length,
      },
    });

    return this.emailService.sendNewsletter(newsletter);
  }

  async deleteS3File(file: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: file,
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      console.error(err);
    }
  }
}
