import { Injectable } from '@nestjs/common';
import { CreateExpensepoDto } from './dto/create-expensepo.dto';
import { UpdateExpensepoDto } from './dto/update-expensepo.dto';

@Injectable()
export class ExpenseposService {
  create(createExpensepoDto: CreateExpensepoDto) {
    return 'This action adds a new expensepo';
  }

  findAll() {
    return `This action returns all expensepos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expensepo`;
  }

  update(id: number, updateExpensepoDto: UpdateExpensepoDto) {
    return `This action updates a #${id} expensepo`;
  }

  remove(id: number) {
    return `This action removes a #${id} expensepo`;
  }
}
