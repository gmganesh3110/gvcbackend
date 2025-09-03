import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Like, Not, Repository } from 'typeorm';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  GetAllCategoryDto,
  GetAllCategoryResponse,
  UpdateCategoryDto,
} from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const { category, description, createdBy, activeStatus } =
        createCategoryDto;

      return this.categoryRepository.create({
        category: category,
        description,
        createdBy: { id: createdBy } as User,
        activeStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: { id: createdBy } as User,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllCategories(
    getAllCategoryDto: GetAllCategoryDto,
  ): Promise<GetAllCategoryResponse> {
    try {
      const { category, status, start = 0, limit = 5 } = getAllCategoryDto;
      const [data, total] = await this.categoryRepository.findAndCount({
        select: {
          id: true,
          category: true,
          description: true,
          createdBy: { id: true, firstName: true },
          updatedBy: { id: true, firstName: true },
          createdAt: true,
          updatedAt: true,
          type: true,
        },
        relations: {
          createdBy: true,
          updatedBy: true,
        },
        where: {
          ...(category && { blockName: Like(`%${category}%`) }),
          ...(status !== undefined && { activeStatus: status }),
          ...(status === undefined && { activeStatus: Not(2) }),
        },
        skip: start,
        take: limit,
      });
      return { data, total };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getSingleCategory(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['createdBy', 'updatedBy'], // include relations if needed
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return category;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const { category, description, updatedBy, activeStatus } =
        updateCategoryDto;

      const categories = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categories) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      categories.category = category ?? categories.category;
      categories.description = description ?? categories.description;
      categories.activeStatus = activeStatus ?? categories.activeStatus;
      categories.updatedBy = { id: updatedBy } as User;
      categories.updatedAt = new Date();

      return await this.categoryRepository.save(categories);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteSingleCategory(
    id: number,
    deleteCategoryDto: DeleteCategoryDto,
  ): Promise<Category> {
    try {
      const deleteCategory = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!deleteCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      deleteCategory.activeStatus = 2;
      deleteCategory.updatedAt = new Date();
      deleteCategory.updatedBy = { id: deleteCategoryDto.updatedBy } as User;
      return await this.categoryRepository.save(deleteCategory);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
