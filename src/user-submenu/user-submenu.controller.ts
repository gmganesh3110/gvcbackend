import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSubmenuService } from './user-submenu.service';
import { CreateUserSubmenuDto } from './dto/create-user-submenu.dto';
import { UpdateUserSubmenuDto } from './dto/update-user-submenu.dto';

@Controller('user-submenu')
export class UserSubmenuController {
  constructor(private readonly userSubmenuService: UserSubmenuService) {}

  @Post()
  create(@Body() createUserSubmenuDto: CreateUserSubmenuDto) {
    return this.userSubmenuService.create(createUserSubmenuDto);
  }

  @Get()
  findAll() {
    return this.userSubmenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSubmenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSubmenuDto: UpdateUserSubmenuDto) {
    return this.userSubmenuService.update(+id, updateUserSubmenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSubmenuService.remove(+id);
  }
}
