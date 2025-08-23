import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  CreateItemDto,
  DeleteItemDto,
  GetAllItemsDto,
  UpdateItemDto,
} from './dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly entityManager: EntityManager) {}
  async createItem(createItemDto: CreateItemDto): Promise<any> {
    try {
      const {
        name,
        description,
        price,
        available,
        categoryId,
        createdBy,
        activeStatus,
        image,
        type
      } = createItemDto;
      const query = `call itemcreateone(?,?,?,?,?,?,?,?,?)`;
      const params = [
        name,
        description,
        price,
        available,
        categoryId,
        createdBy,
        activeStatus,
        image,
        type
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllItems(getAllItemsDto: GetAllItemsDto): Promise<any> {
    try {
      const { categoryId, name, type, status, start, limit } = getAllItemsDto;
      const query = `call itemgetall(?,?,?,?,?,?)`;
      const params = [categoryId, name, type, status, start, limit];
      return await this.entityManager.query(query, params);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleItem(id: number): Promise<any> {
    try {
      const query = `call itemgetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateItem(updateItemDto: UpdateItemDto): Promise<any> {
    try {
      const {
        id,
        name,
        description,
        price,
        available,
        categoryId,
        updatedBy,
        activeStatus,
        image
      } = updateItemDto;
      const query = `call itemupdateone(?,?,?,?,?,?,?,?,?)`;
      const params = [
        id,
        name,
        description,
        price,
        available,
        categoryId,
        activeStatus,
        updatedBy,
        image ?? ''
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSingleItem(deleteItemDto: DeleteItemDto): Promise<any> {
    try {
      const { id, updatedBy } = deleteItemDto;
      const query = `call itemdeleteone(?,?)`;
      const params = [id, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
