import { IsNumber, IsOptional } from 'class-validator';

export class CreateUserRolePermissionDto {
  @IsNumber()
  menuId: number;

  @IsNumber()
  subMenuId: number;

  @IsNumber()
  pageActionId: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;

  @IsNumber()
  activeStatus: number;
}
