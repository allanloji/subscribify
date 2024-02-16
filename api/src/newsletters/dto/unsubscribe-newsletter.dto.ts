import { IsEmail } from 'class-validator';

export class UnsubscribeNewsletterDto {
  @IsEmail()
  readonly email: string;
}
