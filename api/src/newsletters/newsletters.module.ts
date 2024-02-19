import { Module } from '@nestjs/common';

import { NewslettersService } from './newsletters.service';
import { EmailModule } from 'src/email/email.module';
import { EmailSchedulingModule } from 'src/email-scheduling/email-scheduling.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { NewslettersController } from './newsletters.controller';

@Module({
  imports: [PrismaModule, EmailModule, EmailSchedulingModule, S3Module],
  providers: [NewslettersService],
  controllers: [NewslettersController],
  exports: [NewslettersService],
})
export class NewslettersModule {}
