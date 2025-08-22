import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseitemsService } from './expenseitems.service';
import {
  CreateExpenseitemDto,
  DeleteExpenseitemDto,
  GetAllExpenseitemsDto,
  UpdateExpenseitemDto,
} from './dto/expenseitem.dto';

@Controller('expenseitems')
export class ExpenseitemsController {
  constructor(private readonly expenseitemsService: ExpenseitemsService) {}

  @Post('add')
  create(@Body() createExpenseitemDto: CreateExpenseitemDto) {
    return this.expenseitemsService.createExpenseitem(createExpenseitemDto);
  }

  @Post('getall')
  getAll(@Body() getAllExpenseitemsDto: GetAllExpenseitemsDto) {
    return this.expenseitemsService.getAllExpenseitems(getAllExpenseitemsDto);
  }

  @Post('getone')
  getSingle(@Body('id') id: any) {
    return this.expenseitemsService.getSingleExpenseitem(id);
  }

  @Post('update')
  updateSingle(@Body() updateExpenseitemDto: UpdateExpenseitemDto) {
    return this.expenseitemsService.updateExpenseitem(updateExpenseitemDto);
  }

  @Post('delete')
  deleteSingle(@Body() deleteExpenseitemDto: DeleteExpenseitemDto) {
    return this.expenseitemsService.deleteSingleExpenseitem(
      deleteExpenseitemDto,
    );
  }
}
