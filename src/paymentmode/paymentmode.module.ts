import { Module } from '@nestjs/common';
import { PaymentmodeService } from './paymentmode.service';
import { PaymentmodeController } from './paymentmode.controller';

@Module({
  controllers: [PaymentmodeController],
  providers: [PaymentmodeService],
})
export class PaymentmodeModule {}
