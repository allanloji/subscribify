import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma.service';
import { NewslettersService } from './newsletters/newsletters.service';
import { NewslettersController } from './newsletters/newsletters.controller';
import EmailService from './email/email.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, NewslettersController],
  providers: [AppService, PrismaService, NewslettersService, EmailService],
})
export class AppModule {}
