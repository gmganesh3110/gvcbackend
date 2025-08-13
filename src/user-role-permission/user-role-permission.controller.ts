import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
;

@Controller('user-role-permission')
export class UserRolePermissionController {
  constructor(private readonly userRolePermissionService: UserRolePermissionService) {}

  
}
