import { Module } from '@nestjs/common';
import { ExpenseposService } from './expensepos.service';
import { ExpenseposController } from './expensepos.controller';

@Module({
  controllers: [ExpenseposController],
  providers: [ExpenseposService],
})
export class ExpenseposModule {}
