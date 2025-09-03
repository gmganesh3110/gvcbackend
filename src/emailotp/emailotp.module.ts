import { Module } from '@nestjs/common';
import { EmailotpService } from './emailotp.service';
import { EmailotpController } from './emailotp.controller';

@Module({
  controllers: [EmailotpController],
  providers: [EmailotpService],
})
export class EmailotpModule {}
