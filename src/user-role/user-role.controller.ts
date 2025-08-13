import { Controller, Post, Body } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { AddUserRoleDto, DeleteUserRoleDto, GetAllUserRoleDto, UpdateUserRoleDto } from './dto/user-role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post('getall')
  async getAllUserRole(
    @Body() getAllUserRoleDto: GetAllUserRoleDto,
  ): Promise<any> {
    return await this.userRoleService.getAllUserRole(getAllUserRoleDto);
  }

  @Post('add')
  async addUserRole(@Body() addUserRoleDto: AddUserRoleDto): Promise<any> {
    return await this.userRoleService.addUserRole(addUserRoleDto);
  }

  @Post('getone')
  async getSingleUserRole(@Body() id: any): Promise<any> {
    return await this.userRoleService.getSingleUserRole(id.id);
  }

  @Post('delete')
  async deleteSingleUserRole(@Body() deleteUserRoleDto: DeleteUserRoleDto): Promise<any> {
    return await this.userRoleService.deleteSingleUserRole(deleteUserRoleDto);
  }

  @Post('update')
  async updateUserRole(@Body()updateUserRoleDto:UpdateUserRoleDto):Promise<any>{
       return await this.userRoleService.updateUserRole(updateUserRoleDto);    
  }
}
