import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
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

  @Get('getall')
  getAll(@Query() getAllExpenseitemsDto: GetAllExpenseitemsDto) {
    return this.expenseitemsService.getAllExpenseitems(getAllExpenseitemsDto);
  }

  @Get('getone/:id')
  getSingle(@Param('id') id: any) {
    return this.expenseitemsService.getSingleExpenseitem(id);
  }

  @Put('update/:id')
  updateSingle(@Param('id') id: any,@Body() updateExpenseitemDto: UpdateExpenseitemDto) {
    return this.expenseitemsService.updateExpenseitem(updateExpenseitemDto);
  }

  @Delete('delete')
  deleteSingle(@Body() deleteExpenseitemDto: DeleteExpenseitemDto) {
    return this.expenseitemsService.deleteSingleExpenseitem(
      deleteExpenseitemDto,
    );
  }
}
