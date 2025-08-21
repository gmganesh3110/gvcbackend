import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseposService } from './expensepos.service';
import { CreateExpensepoDto } from './dto/create-expensepo.dto';
import { UpdateExpensepoDto } from './dto/update-expensepo.dto';

@Controller('expensepos')
export class ExpenseposController {
  constructor(private readonly expenseposService: ExpenseposService) {}

  @Post()
  create(@Body() createExpensepoDto: CreateExpensepoDto) {
    return this.expenseposService.create(createExpensepoDto);
  }

  @Get()
  findAll() {
    return this.expenseposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpensepoDto: UpdateExpensepoDto) {
    return this.expenseposService.update(+id, updateExpensepoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseposService.remove(+id);
  }
}
