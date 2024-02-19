import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNewsletterDto {
  @ApiProperty({ description: 'The name of the newsletter' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'The file key name of s3' })
  @IsString()
  @IsNotEmpty()
  readonly file: string;

  @ApiProperty({
    description: 'The recipients email of the newsletter',
    example: ['test@email.com'],
  })
  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  recipients: string[];

  @ApiProperty({ description: 'The scheduled date of the newsletter' })
  @IsOptional()
  @IsDateString()
  readonly scheduledAt?: string;
}
