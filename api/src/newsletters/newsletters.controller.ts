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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { NewsletterEntity } from './entities/newsletter.entity';
import { NewsletterDto } from './dto/newsletter.dto';

@Controller('newsletters')
export class NewslettersController {
  constructor(private newslettersService: NewslettersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all newsletters' })
  @ApiOkResponse({
    type: NewsletterEntity,
    isArray: true,
  })
  async findAll() {
    return this.newslettersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a newsletter' })
  @ApiOkResponse({ type: NewsletterEntity })
  async findOne(@Param('id') id: string) {
    return this.newslettersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a newsletter' })
  @ApiCreatedResponse({ type: NewsletterEntity })
  async create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newslettersService.create(createNewsletterDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a newsletter' })
  @ApiOkResponse({ type: NewsletterEntity })
  async update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newslettersService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a newsletter' })
  @ApiOkResponse({ type: NewsletterDto })
  async remove(@Param('id') id: string) {
    return this.newslettersService.remove(id);
  }

  @Post(':id/unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe the recipient from the newsletter' })
  @ApiCreatedResponse({
    type: NewsletterDto,
  })
  async unsubscribe(
    @Param('id') id: string,
    @Body() unsubscribeNewsletterDto: UnsubscribeNewsletterDto,
  ) {
    return this.newslettersService.unsubscribe(id, unsubscribeNewsletterDto);
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Send the newsletter to all recipients' })
  @ApiCreatedResponse()
  async send(@Param('id') id: string) {
    return this.newslettersService.send(id);
  }
}
