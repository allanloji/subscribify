import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import EmailService from 'src/email/email.service';
import { NewslettersService } from './newsletters.service';

@Module({
  imports: [ConfigModule, EmailService],
  controllers: [],
  providers: [NewslettersService],
  exports: [NewslettersService],
})
export class NewslettersModule {}
