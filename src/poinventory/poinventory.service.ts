import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  CreatePoinventoryDto,
  DeletePoinventoryDto,
  GetAllPoinventoryDto,
  UpdatePoinventoryDto,
} from './dto/poinventory.dto';

@Injectable()
export class PoinventoryService {
  constructor(private readonly entityManager: EntityManager) {}
  async createPoInventory(
    createPoinventoryDto: CreatePoinventoryDto,
  ): Promise<any> {
    try {
      const { itemname, description, createdBy, activeStatus } =
        createPoinventoryDto;
      const query = `call poinventorycreateone(?,?,?,?)`;
      const params = [itemname, description, createdBy, activeStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllPoinventory(
    getAllPoinventoryDto: GetAllPoinventoryDto,
  ): Promise<any> {
    try {
      const { itemname, status, start, limit } = getAllPoinventoryDto;
      const query = `call poinventorygetall(?,?,?,?)`;
      const params = [itemname, status, start, limit];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSinglePoinventory(id: number): Promise<any> {
    try {
      const query = `call poinventorygetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updatePoinventory(
    updatePoinventoryDto: UpdatePoinventoryDto,
  ): Promise<any> {
    try {
      const { id, itemname, description, updatedBy, activeStatus } =
        updatePoinventoryDto;
      const query = `call poinventoryupdateone(?,?,?,?,?)`;
      const params = [id, itemname, description, updatedBy, activeStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSinglePoinventory(
    deletePoinventoryDto: DeletePoinventoryDto,
  ): Promise<any> {
    try {
      const { id, updatedBy } = deletePoinventoryDto;
      const query = `call poinventorydeleteone(?,?)`;
      const params = [id, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
