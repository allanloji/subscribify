import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import EmailService from 'src/email/email.service';

@Controller('newsletters')
export class NewslettersController {
  constructor(
    private newslettersService: NewslettersService,
    private emailService: EmailService,
  ) {}

  @Get()
  async findAll() {
    return this.newslettersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newslettersService.findOne(id);
  }

  @Post()
  async create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newslettersService.create(createNewsletterDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newslettersService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.newslettersService.remove(id);
  }

  @Post(':id/unsubscribe')
  async unsubscribe(
    @Param('id') id: string,
    @Body() unsubscribeNewsletterDto: UnsubscribeNewsletterDto,
  ) {
    return this.newslettersService.unsubscribe(id, unsubscribeNewsletterDto);
  }

  @Post(':id/send')
  async send(@Param('id') id: string) {
    return this.emailService.sendMail();
  }
}
