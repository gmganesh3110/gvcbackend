import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import {
  CreateExpenseitemDto,
  DeleteExpenseitemDto,
  GetAllExpenseitemsDto,
  UpdateExpenseitemDto,
} from './dto/expenseitem.dto';

@Injectable()
export class ExpenseitemsService {
  constructor(private readonly entityManager: EntityManager) {}
  async createExpenseitem(
    createExpenseitemDto: CreateExpenseitemDto,
  ): Promise<any> {
    try {
      const { expenseItem, description, createdBy, activeStatus } =
        createExpenseitemDto;
      const query = `call expenseitemcreateone(?,?,?,?)`;
      const params = [expenseItem, description, createdBy, activeStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllExpenseitems(
    getAllExpenseitemsDto: GetAllExpenseitemsDto,
  ): Promise<any> {
    try {
      const { expenseItem, status, start, limit } = getAllExpenseitemsDto;
      const query = `call expenseitemgetall(?,?,?,?)`;
      const params = [expenseItem, status, start, limit];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleExpenseitem(id: number): Promise<any> {
    try {
      const query = `call expenseitemgetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateExpenseitem(
    updateExpenseitemDto: UpdateExpenseitemDto,
  ): Promise<any> {
    try {
      const { id, expenseItem, description, updatedBy, activeStatus } =
        updateExpenseitemDto;
      const query = `call expenseitemupdateone(?,?,?,?,?)`;
      const params = [id, expenseItem, description, activeStatus, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSingleExpenseitem(
    deleteExpenseitemDto: DeleteExpenseitemDto,
  ): Promise<any> {
    try {
      const { id, updatedBy } = deleteExpenseitemDto;
      const query = `call expenseitemdeleteone(?,?)`;
      const params = [id, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
