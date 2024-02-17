import { Module } from '@nestjs/common';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';
import { NewslettersService } from 'src/newsletters/newsletters.service';

@Module({
  imports: [ConfigModule, NewslettersService],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
