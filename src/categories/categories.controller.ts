import { Controller, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  GetAllCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('add')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Post('getall')
  getAllCategories(@Body() getAllCategoryDto: GetAllCategoryDto) {
    return this.categoriesService.getAllCategories(getAllCategoryDto);
  }

  @Post('getone')
  getSingleCategory(@Body('id') id: any) {
    return this.categoriesService.getSingleCategory(id);
  }

  @Post('update')
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(updateCategoryDto);
  }

  @Post('delete')
  deleteSingleCategory(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return this.categoriesService.deleteSingleCategory(deleteCategoryDto);
  }
}
