import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Newsletter, Recipient } from '@prisma/client';
import { CronJob } from 'cron';
import EmailService from '../email/email.service';

@Injectable()
export class EmailSchedulingService {
  private readonly logger = new Logger(EmailSchedulingService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleEmail(newsletter: Newsletter & { recipients: Recipient[] }) {
    this.logger.log(
      `Scheduling email for newsletter #${newsletter.id} at ${newsletter.scheduledAt}`,
    );
    const date = new Date(newsletter.scheduledAt);
    const job = new CronJob(date, () => {
      this.emailService.sendNewsletter(newsletter);
    });

    this.schedulerRegistry.addCronJob(`Newsletter-${newsletter.id}`, job);

    job.start();
  }

  cancelScheduledEmail(newsletterId: string) {
    this.logger.log(JSON.stringify(this.schedulerRegistry.getCronJobs()));
    try {
      const job = this.schedulerRegistry.getCronJob(
        `Newsletter-${newsletterId}`,
      );
      job.stop();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
