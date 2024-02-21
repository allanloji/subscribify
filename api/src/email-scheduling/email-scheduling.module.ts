import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  providers: [EmailSchedulingService],
  exports: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
