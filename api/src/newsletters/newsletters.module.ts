import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import EmailService from 'src/email/email.service';
import { NewslettersService } from './newsletters.service';
import { EmailSchedulingService } from 'src/email-scheduling/email-scheduling.service';

@Module({
  imports: [ConfigModule, EmailService, EmailSchedulingService],
  controllers: [],
  providers: [NewslettersService],
  exports: [NewslettersService],
})
export class NewslettersModule {}
