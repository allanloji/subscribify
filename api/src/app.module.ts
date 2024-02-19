import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NewslettersModule } from './newsletters/newsletters.module';
import { EmailModule } from './email/email.module';
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    NewslettersModule,
    EmailModule,
    EmailSchedulingModule,
    S3Module,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
