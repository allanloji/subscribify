import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [ConfigModule, PrismaModule, S3Module],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
