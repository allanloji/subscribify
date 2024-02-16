import { IsEmail, IsString } from 'class-validator';

export class CreateNewsletterDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly file: string;

  @IsEmail({}, { each: true })
  recipients: string[];
}
