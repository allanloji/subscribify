import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UnsubscribeNewsletterDto {
  @ApiProperty({ description: 'The id of the recipient that is unsubscribing' })
  @IsString()
  readonly id: string;
}
