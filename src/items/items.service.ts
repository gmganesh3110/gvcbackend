import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Like, Not, Repository } from 'typeorm';
import {
  CreateItemDto,
  DeleteItemDto,
  GetAllItemsDto,
  UpdateItemDto,
} from './dto/item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './entities/item.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,
  ) {}

  async createItem(createItemDto: CreateItemDto): Promise<Items> {
    try {
      const itemData = {
        name: createItemDto.name,
        description: createItemDto.description,
        activeStatus: createItemDto.activeStatus,
        available: createItemDto.available,
        category: createItemDto.category,
        image: createItemDto.image,
        price: createItemDto.price,
        type: createItemDto.type,
        createdBy: createItemDto.createdBy
          ? ({ id: createItemDto.createdBy } as User)
          : undefined,
        updatedBy: createItemDto.createdBy
          ? ({ id: createItemDto.createdBy } as User)
          : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const item=await this.itemsRepository.create(itemData);
      return this.itemsRepository.save(item);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllItems(
    getAllItemsDto: GetAllItemsDto,
  ): Promise<{ data: Items[]; total: number }> {
    try {
      const {
        category,
        name,
        type,
        status,
        start = 0,
        limit = 10,
      } = getAllItemsDto;

      const where: any = {};
      if (category !== undefined) where.categoryId = category;
      if (status !== undefined) where.activeStatus = status;
      else where.activeStatus = Not(2);
      if (type !== undefined) where.type = type;
      if (name !== undefined) where.name = Like(`%${name}%`);

      const [data, total] = await this.itemsRepository.findAndCount({
        relations: ['createdBy', 'updatedBy', 'category', 'orderitems'],
        select: {
          id: true,
          name: true,
          price: true,
          available: true,
          image: true,
          activeStatus: true,
          type: true,
          category: {
            id: true,
            category: true,
          },
        },
        where,
        skip: start,
        take: limit,
      });

      return { data, total };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getSingleItem(id: number): Promise<Items> {
    try {
      const item = await this.itemsRepository.findOne({
        where: { id },
        relations: ['createdBy', 'updatedBy', 'category'],
      });

      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      return item;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateItem(id:number,updateItemDto: UpdateItemDto): Promise<Items> {
    try {
      const {
        name,
        description,
        price,
        available,
        category,
        updatedBy,
        activeStatus,
        image,
      } = updateItemDto;

      const item = await this.itemsRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      item.name = name ?? item.name;
      item.description = description ?? item.description;
      item.price = price ?? item.price;
      item.available = available ?? item.available;
      item.category = category ?? item.category;
      item.activeStatus = activeStatus ?? item.activeStatus;
      item.image = image ?? item.image;
      item.updatedBy = updatedBy;
      item.updatedAt = new Date();

      return await this.itemsRepository.save(item);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteSingleItem(id:number,deleteItemDto: DeleteItemDto): Promise<any> {
    try {
      const item = await this.itemsRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      item.activeStatus=2;
      item.updatedAt=new Date();
      item.updatedBy=deleteItemDto.updatedBy;

      await this.itemsRepository.remove(item);
      return { message: 'Item deleted successfully' };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
