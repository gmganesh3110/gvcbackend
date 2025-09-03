import { Controller, Post, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';
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

  @Get('getall')
  getAllCategories(@Query() getAllCategoryDto: GetAllCategoryDto) {
    return this.categoriesService.getAllCategories(getAllCategoryDto);
  }

  @Get('getone/:id')
  getSingleCategory(@Param('id') id: number) {
    return this.categoriesService.getSingleCategory(id);
  }

  @Put('update/:id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id,  updateCategoryDto);
  }

  @Delete('delete/:id')
  deleteSingleCategory(@Param('id')id:number,@Body() deleteCategoryDto: DeleteCategoryDto) {
    return this.categoriesService.deleteSingleCategory(id,deleteCategoryDto);
  }
}
