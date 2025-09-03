import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registermerchant')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.registermerchant(createUserDto);
  }
}
