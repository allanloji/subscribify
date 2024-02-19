import { ApiProperty } from '@nestjs/swagger';
import { Recipient } from '@prisma/client';

export class RecipientEntity implements Partial<Recipient> {
  @ApiProperty()
  email: string;
}
