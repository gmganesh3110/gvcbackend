import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
private s3 = new S3Client({
  region: process.env.AWS_S3_REGION , 
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESSKEY!,
    secretAccessKey: process.env.AWS_S3_SECRETKEY!,
  },
});

  async uploadFile(file: Express.Multer.File, bucket: string) {
    const key = `${uuid()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
  }
}
