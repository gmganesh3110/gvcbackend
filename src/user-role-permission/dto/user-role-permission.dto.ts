import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class CreateUserRolePermissionItemDto {
  userRoleId: number;
  menuId: number;
  subMenuId: number;
  createdBy: number;
  updatedBy: number;
  activeStatus: number;
  restuarent: number;
}

export class CreateUserRolePermissionDto {
  @ValidateNested({ each: true })
  @Type(() => CreateUserRolePermissionItemDto)
  permissionsToSave: CreateUserRolePermissionItemDto[];
}

export class GetMenuSubmenuDto {
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @IsNumber()
  @IsOptional()
  restuarent?: number;
}
