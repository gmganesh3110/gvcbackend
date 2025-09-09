import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
import {
  CreateUserRolePermissionDto,
  GetMenuSubmenuDto,
} from './dto/user-role-permission.dto';

@Controller('user-role-permission')
export class UserRolePermissionController {
  constructor(
    private readonly userRolePermissionService: UserRolePermissionService,
  ) {}

  @Get('getmenusubmenu')
  getMenuSubmenu(@Query() getMenuSubmenuDto: GetMenuSubmenuDto) {
    return this.userRolePermissionService.getMenuSubmenu(getMenuSubmenuDto);
  }

  @Post('save')
  save(@Body() saveDto: CreateUserRolePermissionDto) {
    return this.userRolePermissionService.saveUserRolePermission(saveDto);
  }
}
