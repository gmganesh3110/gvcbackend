import { Controller, Post, Body, Query, Get, Param, Put, Delete } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto, DeleteBlockDto, GetAllBlocksDto, UpdateBlockDto } from './dto/block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post('add')
  createBlock(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.createBlock(createBlockDto);
  }

  @Get('getall')
  getAllBlocks(@Query() getAllBlocksDto: GetAllBlocksDto) {
    return this.blocksService.getAllBlocks(getAllBlocksDto);
  }

  @Get('getone/:id')
  getSingleBlock(@Param('id') id: number) {
    return this.blocksService.getSingleBlock(id);
  }

  @Put('update/:id')
  updateSingleBlock(@Param('id') id: number, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.updateBlock(id, updateBlockDto);
  }

  @Delete('delete/:id')
  deleteSingleBlock(@Param('id') id: number, @Body() deleteBlockDto: DeleteBlockDto) {
    return this.blocksService.deleteSingleBlock(id, deleteBlockDto);
  }
}
