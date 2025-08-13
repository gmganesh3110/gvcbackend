import { Controller, Post, Body, Query } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto, DeleteBlockDto, GetAllBlocksDto, UpdateBlockDto } from './dto/block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post('add')
  createBlock(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.createBlock(createBlockDto);
  }

  @Post('getall')
  getAllBlocks(@Body() getAllBlocksDto: GetAllBlocksDto) {
    return this.blocksService.getAllBlocks(getAllBlocksDto);
  }

  @Post('getone')
  getSingleBlock(@Body('id') id: any) {
    return this.blocksService.getSingleBlock(id);
  }

  @Post('update')
  updateSingleBlock(@Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.updateBlock(updateBlockDto);
  }

  @Post('delete')
  deleteSingleBlock(@Body() deleteBlockDto: DeleteBlockDto) {
    return this.blocksService.deleteSingleBlock(deleteBlockDto);
  }
}
