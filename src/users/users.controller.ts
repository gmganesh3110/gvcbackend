import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registermerchant')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.registermerchant(createUserDto);
  }

  @Get('getall')
  async getall(@Query() query: any): Promise<any> {
    return await this.usersService.getall(query);
  }

  @Post('add')
  async add(@Body() body: any): Promise<any> {
    return await this.usersService.add(body);
  }

  @Get('getone/:id')
  async getone(@Param('id') id: number): Promise<any> {
    return await this.usersService.getone(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: any): Promise<any> {
    return await this.usersService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.usersService.delete(id);
  }
}
