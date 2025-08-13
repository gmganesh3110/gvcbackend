import { Module } from '@nestjs/common';
import { UserRolePermissionService } from './user-role-permission.service';
import { UserRolePermissionController } from './user-role-permission.controller';

@Module({
  controllers: [UserRolePermissionController],
  providers: [UserRolePermissionService],
})
export class UserRolePermissionModule {}
