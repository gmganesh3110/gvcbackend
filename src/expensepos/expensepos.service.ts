import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateExpensepoDto, DeleteExpenseDto, GetAllExpensePosData, GetOneExpensePosData } from './dto/expensepo.dto';
import { EntityManager } from 'typeorm';
@Injectable()
export class ExpenseposService {
  constructor(private readonly entityManager: EntityManager) {}
  async createExpensePo(createExpensepoDto: CreateExpensepoDto) {
    try {
      const query = `call expensepocreateone(?,?,?,?,?)`;
      const params = [
        createExpensepoDto.billNo,
        createExpensepoDto.totalAmount,
        createExpensepoDto.date,
        createExpensepoDto.paymentMethod,
        createExpensepoDto.createdBy,
      ];
      const res = await this.entityManager.query(query, params);
      const expensePoId = res[0][0]?.pid;
      const expensePoItemsQuery = `call expensepocreateitemscreateone(?,?,?,?,?,?)`;
      for (const item of createExpensepoDto.expenseItems) {
        await this.entityManager.query(expensePoItemsQuery, [
          expensePoId,
          item.item,
          item.qty,
          item.price,
          item.amount,
          createExpensepoDto.createdBy,
        ]);
      }
      return { id: expensePoId };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllExpensePos(getAllExpensePosData: GetAllExpensePosData) {
    try {
      const query = `call expensepogetall(?,?,?,?,?)`;
      const params = [
        getAllExpensePosData.billNo,
        getAllExpensePosData.fromDate,
        getAllExpensePosData.toDate,
        getAllExpensePosData.start,
        getAllExpensePosData.limit,
      ];
      const res = await this.entityManager.query(query, params);
      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getOneExpensePos(getOneExpensePosData: GetOneExpensePosData) {
    try {
      const query = `call expensepogetone(?)`;
      const params = [getOneExpensePosData.id];
      const res = await this.entityManager.query(query, params);
      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteExpensePos(deleteExpenseDto: DeleteExpenseDto) {
    try {
      const query = `call expensepodeleteone(?,?)`;
      const params = [deleteExpenseDto.id, deleteExpenseDto.updatedBy];
      const res = await this.entityManager.query(query, params);
      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}