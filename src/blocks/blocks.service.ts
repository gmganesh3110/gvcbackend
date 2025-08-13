import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateBlockDto,
  DeleteBlockDto,
  GetAllBlocksDto,
  UpdateBlockDto,
} from './dto/block.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class BlocksService {
  constructor(private readonly entityManager: EntityManager) {}
  async createBlock(createBlockDto: CreateBlockDto): Promise<any> {
    try {
      const { blockName, description, createdBy, activeStatus } =
        createBlockDto;
      const query = `call blockcreateone(?,?,?,?)`;
      const params = [blockName, description, createdBy, activeStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllBlocks(getAllBlocksDto: GetAllBlocksDto): Promise<any> {
    try {
      const { blockName, status, start, limit } = getAllBlocksDto;
      const query = `call blockgetall(?,?,?,?)`;
      const params = [blockName, status, start, limit];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleBlock(id: number): Promise<any> {
    try {
      const query = `call blockgetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateBlock(updateBlockDto: UpdateBlockDto): Promise<any> {
    try {
      const { id, blockName, description, updatedBy, activeStatus } =
        updateBlockDto;
      const query = `call blockupdateone(?,?,?,?,?)`;
      const params = [id, blockName, description, activeStatus, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSingleBlock(deleteBlockDto: DeleteBlockDto): Promise<any> {
    try {
      const { id, updatedBy } = deleteBlockDto;
      const query = `call blockdeleteone(?,?)`;
      const params = [id, updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
