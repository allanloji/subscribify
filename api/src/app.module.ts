import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma.service';
import { NewslettersService } from './newsletters/newsletters.service';
import { NewslettersController } from './newsletters/newsletters.controller';
import EmailService from './email/email.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingService } from './email-scheduling/email-scheduling.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [AppController, NewslettersController],
  providers: [
    AppService,
    PrismaService,
    NewslettersService,
    EmailService,
    EmailSchedulingService,
  ],
})
export class AppModule {}
