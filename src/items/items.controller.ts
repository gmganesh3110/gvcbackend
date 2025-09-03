import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, DeleteItemDto, GetAllItemsDto, UpdateItemDto } from './dto/item.dto';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('add')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  @Get('getall')
  getAll(@Query() getAllItemsDto: GetAllItemsDto) {
    return this.itemsService.getAllItems(getAllItemsDto);
  }

  @Get('getone/:id')
  getSingleItem(@Param('id') id: any) {
    return this.itemsService.getSingleItem(id);
  }

  @Put('update/:id')
  updateItem(@Param('id') id: any,@Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.updateItem(id,updateItemDto);
  }

  @Delete('delete/:id')
  deleteSingleItem(@Param('id') id: any,@Body() deleteItemDto: DeleteItemDto) {
    return this.itemsService.deleteSingleItem(id,deleteItemDto);
  }
}
