import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseposService } from './expensepos.service';
import { CreateExpensepoDto, DeleteExpenseDto, GetAllExpensePosData, GetOneExpensePosData } from './dto/expensepo.dto';
@Controller('expensepos')
export class ExpenseposController {
  constructor(private readonly expenseposService: ExpenseposService) {}
  @Post("create")
  createExpensePo(@Body() createExpensepoDto: CreateExpensepoDto) {
    return this.expenseposService.createExpensePo(createExpensepoDto);
  }
  @Post('getall')
  getAllExpensePos(@Body() getAllExpensePosData: GetAllExpensePosData) {
    return this.expenseposService.getAllExpensePos(getAllExpensePosData);
  }
  @Post("getone")
  getOneExpensePos(@Body() getOneExpensePosData: GetOneExpensePosData) {
    return this.expenseposService.getOneExpensePos(getOneExpensePosData);
  }

  @Post("delete")
  deleteExpensePos(@Body() deleteExpenseDto: DeleteExpenseDto) {
    return this.expenseposService.deleteExpensePos(deleteExpenseDto);
  }
}