import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateBlockDto,
  DeleteBlockDto,
  GetAllBlocksDto,
  UpdateBlockDto,
} from './dto/block.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';

@Injectable()
export class BlocksService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}
  async createBlock(createBlockDto: CreateBlockDto): Promise<any> {
    try {
      const { blockName, description, createdBy, activeStatus } =
        createBlockDto;
      const block = this.blockRepository.create({
        blockName,
        description,
        createdBy,
        activeStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: createdBy,
      });
      return await this.blockRepository.save(block);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllBlocks(getAllBlocksDto: GetAllBlocksDto): Promise<any> {
    try {
      let { blockName, status, start, limit } = getAllBlocksDto;

      const [data, total] = await this.blockRepository.findAndCount({
        select: {
          id: true,
          blockName: true,
          description: true,
          activeStatus: true,
          createdBy: {
            id: true,
            firstName: true,
          },
        },
        relations: ['createdBy'],
        where: {
          ...(blockName ? { blockName: blockName.toLowerCase() } : {}),
          ...(status !== undefined ? { activeStatus: status } : {}),
        },
        skip: Number(start) || 0, 
        take: Number(limit) || 10, 
      });

      return { data, total };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getSingleBlock(id: number): Promise<any> {
    try {
      return await this.blockRepository.findOne({
        where: { id },
        relations: ['createdBy'],
        select: {
          id: true,
          blockName: true,
          description: true,
          activeStatus: true,
          createdBy: {
            id: true,
            firstName: true,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateBlock(id:number, updateBlockDto: UpdateBlockDto): Promise<any> {
    try {
      const { blockName, description, updatedBy, activeStatus } = updateBlockDto;
      return await this.blockRepository.update(id, {
        blockName,
        description,
        activeStatus,
        updatedAt: new Date(),
        updatedBy,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteSingleBlock(id:number, deleteBlockDto: DeleteBlockDto): Promise<any> {
    try {
      const { updatedBy } = deleteBlockDto;
      return await this.blockRepository.update(id, {
        updatedAt: new Date(),
        updatedBy,
        activeStatus: 2,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
