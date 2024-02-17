import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import EmailService from 'src/email/email.service';

@Injectable()
export class NewslettersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async findAll() {
    return this.prisma.newsletter.findMany();
  }

  async findOne(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }

    return newsletter;
  }

  async create(createNewsletterDto: CreateNewsletterDto) {
    return this.prisma.newsletter.create({
      data: createNewsletterDto,
    });
  }

  async update(id: string, updateNewsletterDto: UpdateNewsletterDto) {
    try {
      const newsletter = await this.prisma.newsletter.update({
        where: { id },
        data: {
          name: updateNewsletterDto.name,
          recipients: {
            set: updateNewsletterDto.recipients,
          },
          ...(updateNewsletterDto.file && { file: updateNewsletterDto.file }),
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
      return newsletter;
    } catch (e) {
      throw new NotFoundException(`Newsletter #${id} not found`);
    }
  }

  async unsubscribe(
    id: string,
    unsubscribeNewsletterDto: UnsubscribeNewsletterDto,
  ) {
    const { email } = unsubscribeNewsletterDto;
    const newsletter = await this.findOne(id);

    return this.prisma.newsletter.update({
      where: { id },
      data: {
        recipients: {
          set: newsletter.recipients.filter((recipient) => recipient !== email),
        },
      },
    });
  }

  async send(id: string) {
    const newsletter = await this.findOne(id);

    return this.emailService.sendNewsletter(newsletter);
  }
}
