import { IsEmail, IsString } from 'class-validator';

export class UpdateNewsletterDto {
  @IsString()
  readonly name: string;

  readonly file?: string;

  @IsEmail({}, { each: true })
  recipients: string[];

  readonly scheduledAt?: string;
}
