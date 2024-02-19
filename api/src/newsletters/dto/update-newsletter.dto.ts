import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateNewsletterDto {
  @ApiProperty({ description: 'The name of the newsletter' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The file key name of s3' })
  readonly file?: string;

  @ApiProperty({
    description: 'The recipients email of the newsletter',
    example: ['test@email.com'],
  })
  @IsEmail({}, { each: true })
  recipients: string[];

  @ApiProperty({ description: 'The scheduled date of the newsletter' })
  @IsOptional()
  readonly scheduledAt?: string;
}
