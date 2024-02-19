import { Newsletter } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { RecipientEntity } from './recipient.entity';

export class NewsletterEntity implements Newsletter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  file: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  scheduledAt: Date | null;

  @ApiProperty()
  recipients: RecipientEntity[];
}
