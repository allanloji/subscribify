import { ApiProperty } from '@nestjs/swagger';

export class StatisticsEntity {
  @ApiProperty({ description: 'Total number of recipients' })
  totalRecipients: number;

  @ApiProperty({ description: 'Total number of emails sent' })
  totalEmailsSent: number;

  @ApiProperty({ description: 'Total number of unsubscribes' })
  totalUnsubscribes: number;
}
