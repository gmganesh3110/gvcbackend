import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import {
  AddUserRoleDto,
  DeleteUserRoleDto,
  GetAllUserRoleDto,
  UpdateUserRoleDto,
} from './dto/user-role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get('getall')
  async getAllUserRole(
    @Query() getAllUserRoleDto: GetAllUserRoleDto,
  ): Promise<any> {
    return await this.userRoleService.getAllUserRole(getAllUserRoleDto);
  }

  @Post('add')
  async addUserRole(@Body() addUserRoleDto: AddUserRoleDto): Promise<any> {
    return await this.userRoleService.addUserRole(addUserRoleDto);
  }

  @Get('getone/:id')
  async getSingleUserRole(@Param('id') id: number): Promise<any> {
    return await this.userRoleService.getSingleUserRole(id);
  }

  @Delete('delete/:id')
  async deleteSingleUserRole(
    @Param('id') id: number,
    @Body() deleteUserRoleDto: DeleteUserRoleDto,
  ): Promise<any> {
    return await this.userRoleService.deleteSingleUserRole(
      id,
      deleteUserRoleDto,
    );
  }

  @Put('update/:id')
  async updateUserRole(
    @Param('id') id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<any> {
    return await this.userRoleService.updateUserRole(id, updateUserRoleDto);
  }
}
