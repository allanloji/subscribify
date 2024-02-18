import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import EmailService from 'src/email/email.service';

@Module({
  imports: [EmailService],
  providers: [EmailSchedulingService],
  exports: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
