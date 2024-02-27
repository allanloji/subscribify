import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import EmailService from '../email/email.service';
import { EmailSchedulingService } from '../email-scheduling/email-scheduling.service';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewslettersService {
  private readonly logger = new Logger(NewslettersService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly emailSchedulingService: EmailSchedulingService,
    private readonly s3Service: S3Service,
  ) {}

  async findAll() {
    return this.prisma.newsletter.findMany({
      select: {
        id: true,
        name: true,
        file: true,
        scheduledAt: true,
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
        scheduledAt: true,
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

    // Schedule the email if the scheduledAt field is provided
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
        this.s3Service.deleteS3File(newsletter.file);
      }
    }

    // Cancel the scheduled email if the scheduledAt field is removed or a new one is provided
    if (
      (!scheduledAt && newsletter.scheduledAt) ||
      (scheduledAt &&
        new Date(scheduledAt).toISOString() !==
          newsletter.scheduledAt?.toISOString())
    ) {
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
          scheduledAt: scheduledAt || null,
        },
      });

      if (scheduledAt) {
        this.emailSchedulingService.scheduleEmail(updatedNewsletter);
      }

      return updatedNewsletter;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`Newsletter #${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const newsletter = await this.prisma.newsletter.delete({
        where: { id },
      });
      this.s3Service.deleteS3File(newsletter.file);
      if (newsletter.scheduledAt) {
        this.emailSchedulingService.cancelScheduledEmail(id);
      }
      return newsletter;
    } catch (error) {
      this.logger.error(error);
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

    return this.emailService.sendNewsletter(newsletter);
  }
}
