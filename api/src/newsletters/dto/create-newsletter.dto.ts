import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNewsletterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly file: string;

  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  recipients: string[];

  @IsOptional()
  @IsDateString()
  readonly scheduledAt?: string;
}
