import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  GetAllCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly entityManager: EntityManager) {}
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    try {
      const { category, description, createdBy, activeStatus } =
        createCategoryDto;
      const query = `call categorycreateone(?,?,?,?)`;
      const params = [category, description, createdBy, activeStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllCategories(getAllCategoryDto: GetAllCategoryDto): Promise<any> {
    try {
      const { category, status, start, limit } = getAllCategoryDto;
      const query = `call categorygetall(?,?,?,?)`;
      const params = [category, status, start, limit];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleCategory(id: number): Promise<any> {
    try {
      const query = `call categorygetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<any> {
    try {
      const { id, category, description, updatedBy, activeStatus } =
        updateCategoryDto;
      const query = `call categoryupdateone(?,?,?,?,?)`;
      const params = [id, category, description, activeStatus, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSingleCategory(
    deleteCategoryDto: DeleteCategoryDto,
  ): Promise<any> {
    try {
      const { id, updatedBy } = deleteCategoryDto;
      const query = `call categorydeleteone(?,?)`;
      const params = [id, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
