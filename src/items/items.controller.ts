import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, DeleteItemDto, GetAllItemsDto, UpdateItemDto } from './dto/item.dto';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('add')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  @Post('getall')
  getAll(@Body() getAllItemsDto: GetAllItemsDto) {
    return this.itemsService.getAllItems(getAllItemsDto);
  }

  @Post('getone')
  getSingleItem(@Body('id') id: any) {
    return this.itemsService.getSingleItem(id);
  }

  @Post('update')
  updateItem(@Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.updateItem(updateItemDto);
  }

  @Post('delete')
  deleteSingleItem(@Body() deleteItemDto: DeleteItemDto) {
    return this.itemsService.deleteSingleItem(deleteItemDto);
  }
}
