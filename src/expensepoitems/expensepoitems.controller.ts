import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensepoitemsService } from './expensepoitems.service';
import { CreateExpensepoitemDto } from './dto/create-expensepoitem.dto';
import { UpdateExpensepoitemDto } from './dto/update-expensepoitem.dto';

@Controller('expensepoitems')
export class ExpensepoitemsController {
  constructor(private readonly expensepoitemsService: ExpensepoitemsService) {}

  @Post()
  create(@Body() createExpensepoitemDto: CreateExpensepoitemDto) {
    return this.expensepoitemsService.create(createExpensepoitemDto);
  }

  @Get()
  findAll() {
    return this.expensepoitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensepoitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpensepoitemDto: UpdateExpensepoitemDto) {
    return this.expensepoitemsService.update(+id, updateExpensepoitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensepoitemsService.remove(+id);
  }
}
