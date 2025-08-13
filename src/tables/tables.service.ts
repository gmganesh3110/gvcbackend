import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  AddTableDto,
  DeleteTableDto,
  GetAllTablesDto,
  UpdateTableDto,
} from './dto/table.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(private readonly entityManager: EntityManager) {}
  async getAllTables(getAllUserRoleDto: GetAllTablesDto) {
    try {
      const query = `call tablegetall(?,?,?,?,?)`;
      const params = [
        getAllUserRoleDto.tableName,
        getAllUserRoleDto.blockId,
        getAllUserRoleDto.status||null,
        getAllUserRoleDto.start,
        getAllUserRoleDto.limit,
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async addTable(addTableDto: AddTableDto): Promise<any> {
    try {
      const query = `call tableaddone(?,?,?,?,?,?)`;
      const params = [
        addTableDto.blockId,
        addTableDto.tableName,
        addTableDto.description,
        addTableDto.capacity,
        addTableDto.activeStatus,
        addTableDto.createdBy,
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleTable(id: number): Promise<any> {
    try {
      const query = `call tablegetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteTable(deleteTableDto: DeleteTableDto): Promise<any> {
    try {
      const query = `call tabledeleteone(?,?)`;
      const params = [deleteTableDto.id, deleteTableDto.updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateTable(updateUserRoleDto: UpdateTableDto): Promise<any> {
    try {
      const {
        id,
        tableName,
        description,
        blockId,
        capacity,
        activeStatus,
        updatedBy,
      } = updateUserRoleDto;
      const query = `call tableupdateone(?,?,?,?,?,?,?)`;
      const params = [
        id,
        tableName,
        description,
        capacity,
        blockId,
        activeStatus,
        updatedBy,
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
