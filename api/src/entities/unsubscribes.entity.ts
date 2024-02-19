import { ApiProperty } from '@nestjs/swagger';

export class UnsubscribesEntity {
  @ApiProperty()
  date: string;

  @ApiProperty({ description: 'Number of unsubscribes' })
  count: number;
}
