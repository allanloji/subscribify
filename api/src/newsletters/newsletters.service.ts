import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import EmailService from 'src/email/email.service';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EmailSchedulingService } from 'src/email-scheduling/email-scheduling.service';

@Injectable()
export class NewslettersService {
  private s3Client: S3Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly emailSchedulingService: EmailSchedulingService,
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

  async create({ name, file, recipients, scheduledAt }: CreateNewsletterDto) {
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

    const newsletter = await this.prisma.newsletter.create({
      data: {
        name,
        file,
        scheduledAt,
        recipients: {
          connect: recipients.map((email: string) => ({ email })),
        },
      },
      include: {
        recipients: true,
      },
    });

    if (scheduledAt) {
      this.emailSchedulingService.scheduleEmail(newsletter);
    }

    return newsletter;
  }

  async update(
    id: string,
    { name, file, recipients, scheduledAt }: UpdateNewsletterDto,
  ) {
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
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
      select: {
        file: true,
        scheduledAt: true,
      },
    });

    // Delete the old file if a new one is provided
    if (file) {
      if (newsletter.file) {
        this.deleteS3File(newsletter.file);
      }
    }

    // Cancel the scheduled email if the scheduledAt field is removed
    if (!scheduledAt && newsletter.scheduledAt) {
      await this.emailSchedulingService.cancelScheduledEmail(id);
    }

    try {
      const updatedNewsletter = await this.prisma.newsletter.update({
        where: { id },
        include: {
          recipients: true,
        },
        data: {
          name,
          recipients: {
            set: recipients.map((email: string) => ({ email })),
          },
          ...(file && { file }),
          ...(scheduledAt && { scheduledAt }),
        },
      });

      if (scheduledAt) {
        this.emailSchedulingService.scheduleEmail(updatedNewsletter);
      }
      return updatedNewsletter;
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
      if (newsletter.scheduledAt) {
        this.emailSchedulingService.cancelScheduledEmail(id);
      }
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
        scheduledAt: true,
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

    if (newsletter.scheduledAt) {
      return this.emailSchedulingService.scheduleEmail(newsletter);
    }

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
