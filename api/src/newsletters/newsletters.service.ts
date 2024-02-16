import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';

@Injectable()
export class NewslettersService {
  constructor(private prisma: PrismaService) {}

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
        data: updateNewsletterDto,
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
}
