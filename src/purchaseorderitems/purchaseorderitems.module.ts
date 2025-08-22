import { Module } from '@nestjs/common';
import { PurchaseorderitemsService } from './purchaseorderitems.service';
import { PurchaseorderitemsController } from './purchaseorderitems.controller';

@Module({
  controllers: [PurchaseorderitemsController],
  providers: [PurchaseorderitemsService],
})
export class PurchaseorderitemsModule {}
