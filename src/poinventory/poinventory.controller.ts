import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoinventoryService } from './poinventory.service';
import { CreatePoinventoryDto, DeletePoinventoryDto, GetAllPoinventoryDto, UpdatePoinventoryDto } from './dto/poinventory.dto';

@Controller('poinventory')
export class PoinventoryController {
  constructor(private readonly poinventoryService: PoinventoryService) {}

   @Post('create')
    createPoInventory(@Body() createPoinventoryDto: CreatePoinventoryDto) {
      return this.poinventoryService.createPoInventory(createPoinventoryDto);
    }
  
    @Post('getall')
    getAllPoinventory(@Body() getAllPoinventoryDto: GetAllPoinventoryDto) {
      return this.poinventoryService.getAllPoinventory(getAllPoinventoryDto);
    }
  
    @Post('getone')
    getSinglePoinventory(@Body('id') id: any) {
      return this.poinventoryService.getSinglePoinventory(id);
    }
  
    @Post('update')
    updateSinglePoinventory(@Body() updatePoinventoryDto: UpdatePoinventoryDto) {
      return this.poinventoryService.updatePoinventory(updatePoinventoryDto);
    }
  
    @Post('delete')
    deleteSinglePoinventory(@Body() deletePoinventoryDto: DeletePoinventoryDto) {
      return this.poinventoryService.deleteSinglePoinventory(
        deletePoinventoryDto,
      );
    }
}
