import {
  Controller, Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const bucket = process.env.AWS_S3_BUCKETNAME!;
    return this.s3Service.uploadFile(file, bucket);
  }
}
