import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  AddTableDto,
  DeleteTableDto,
  GetAllTablesDto,
  UpdateTableDto,
} from './dto/table.dto';
import { EntityManager, Not, Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/blocks/entities/block.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TablesService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Table)
    private readonly tablesRepository: Repository<Table>,
  ) {}
  async getAllTables(getAllUserRoleDto: GetAllTablesDto) {
    try {
      const { block, tableName, status, start, limit } = getAllUserRoleDto;
      const [data, total] = await this.tablesRepository.findAndCount({
        where: {
          activeStatus: status ? status : undefined,
          block: block ? { id: block } : undefined,
          tableName: tableName ? tableName : undefined,
          ...(status === undefined && { activeStatus: Not(2) }),
        },
        select: {
          id: true,
          tableName: true,
          description: true,
          capacity: true,
          activeStatus: true,
          createdBy: {
            id: true,
            firstName: true,
          },
        },
        relations: ['block'],
        skip: start,
        take: limit,
      });
      return { data, total };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async addTable(addTableDto: AddTableDto): Promise<any> {
    try {
      const {
        tableName,
        description,
        block,
        capacity,
        activeStatus,
        createdBy,
      } = addTableDto;

      const newTable = this.tablesRepository.create({
        tableName,
        description,
        capacity,
        activeStatus,
        block: block ? ({ id: block } as Block) : undefined,
        createdBy: createdBy ? ({ id: createdBy } as User) : undefined,
        updatedBy: createdBy ? ({ id: createdBy } as User) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return await this.tablesRepository.save(newTable);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getSingleTable(id: number): Promise<any> {
    try {
      return await this.tablesRepository.findOne({
        select: {
          id: true,
          tableName: true,
          description: true,
          capacity: true,
          activeStatus: true,
          createdBy: {
            id: true,
            firstName: true,
          },
        },
        where: { id },
        relations: ['block'],
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteTable(deleteTableDto: DeleteTableDto): Promise<any> {
    try {
      const { id, updatedBy } = deleteTableDto;
      const table = await this.tablesRepository.findOne({ where: { id } });
      if (!table) throw new InternalServerErrorException('Table not found');
      await this.tablesRepository.update(table.id, {
        activeStatus: 0,
        updatedBy: updatedBy ? ({ id: updatedBy } as User) : undefined,
        updatedAt: new Date(),
      });
      return { message: 'Table deleted successfully' };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateTable(updateTableDto: UpdateTableDto): Promise<any> {
    try {
      const {
        id,
        tableName,
        description,
        block,
        capacity,
        activeStatus,
        updatedBy,
      } = updateTableDto;

      const table = await this.tablesRepository.findOne({ where: { id } });
      if (!table) throw new InternalServerErrorException('Table not found');

      this.tablesRepository.update(table.id, {
        tableName,
        description,
        capacity,
        activeStatus,
        block: block ? ({ id: block } as Block) : undefined,
        updatedBy: updatedBy ? ({ id: updatedBy } as User) : undefined,
        updatedAt: new Date(),
      });

      return await this.tablesRepository.save(table);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
