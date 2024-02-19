import { ApiProperty } from '@nestjs/swagger';

export class NewsletterDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  file: string;

  @ApiProperty({ required: false, nullable: true })
  scheduledAt: string | null;
}
