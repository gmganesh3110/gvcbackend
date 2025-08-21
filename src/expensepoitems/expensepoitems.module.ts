import { Module } from '@nestjs/common';
import { ExpensepoitemsService } from './expensepoitems.service';
import { ExpensepoitemsController } from './expensepoitems.controller';

@Module({
  controllers: [ExpensepoitemsController],
  providers: [ExpensepoitemsService],
})
export class ExpensepoitemsModule {}
