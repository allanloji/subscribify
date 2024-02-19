import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const s3 = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.s3Client = s3;
  }

  async getS3File(file: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: file,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return { fileName: file, path: url };
  }

  async deleteS3File(file: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: file,
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      console.error(err);
    }
  }
}
