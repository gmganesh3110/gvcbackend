import { Injectable } from '@nestjs/common';
import { CreateExpensepoitemDto } from './dto/create-expensepoitem.dto';
import { UpdateExpensepoitemDto } from './dto/update-expensepoitem.dto';

@Injectable()
export class ExpensepoitemsService {
  create(createExpensepoitemDto: CreateExpensepoitemDto) {
    return 'This action adds a new expensepoitem';
  }

  findAll() {
    return `This action returns all expensepoitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expensepoitem`;
  }

  update(id: number, updateExpensepoitemDto: UpdateExpensepoitemDto) {
    return `This action updates a #${id} expensepoitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} expensepoitem`;
  }
}
