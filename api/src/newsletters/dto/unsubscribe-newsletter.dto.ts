import { IsString } from 'class-validator';

export class UnsubscribeNewsletterDto {
  @IsString()
  readonly id: string;
}
