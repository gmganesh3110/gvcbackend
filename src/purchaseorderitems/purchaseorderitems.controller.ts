import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseorderitemsService } from './purchaseorderitems.service';
import { CreatePurchaseorderitemDto } from './dto/create-purchaseorderitem.dto';
import { UpdatePurchaseorderitemDto } from './dto/update-purchaseorderitem.dto';

@Controller('purchaseorderitems')
export class PurchaseorderitemsController {
  constructor(private readonly purchaseorderitemsService: PurchaseorderitemsService) {}

  @Post()
  create(@Body() createPurchaseorderitemDto: CreatePurchaseorderitemDto) {
    return this.purchaseorderitemsService.create(createPurchaseorderitemDto);
  }

  @Get()
  findAll() {
    return this.purchaseorderitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseorderitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseorderitemDto: UpdatePurchaseorderitemDto) {
    return this.purchaseorderitemsService.update(+id, updatePurchaseorderitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseorderitemsService.remove(+id);
  }
}
