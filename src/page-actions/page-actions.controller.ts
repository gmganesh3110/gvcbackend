import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageActionsService } from './page-actions.service';
import { CreatePageActionDto } from './dto/create-page-action.dto';
import { UpdatePageActionDto } from './dto/update-page-action.dto';

@Controller('page-actions')
export class PageActionsController {
  constructor(private readonly pageActionsService: PageActionsService) {}

  @Post()
  create(@Body() createPageActionDto: CreatePageActionDto) {
    return this.pageActionsService.create(createPageActionDto);
  }

  @Get()
  findAll() {
    return this.pageActionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageActionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageActionDto: UpdatePageActionDto) {
    return this.pageActionsService.update(+id, updatePageActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageActionsService.remove(+id);
  }
}
