import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class GetAllTablesDto {
  @IsOptional()
  @Type(() => Number)
  block?: number;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @Type(() => Number)
  start?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

export class AddTableDto {
  @IsString()
  tableName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  block?: number;   // ✅ blockId only

  @IsOptional()
  @Type(() => Number)
  capacity?: number;  // ✅ primitive number

  @IsOptional()
  @Type(() => Number)
  activeStatus?: number;

  @IsOptional()
  @Type(() => Number)
  createdBy?: number;  // ✅ userId only
}

export class UpdateTableDto {
  @Type(() => Number)
  id: number;

  @IsOptional()
  @Type(() => Number)
  block?: number;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  capacity?: number;

  @IsOptional()
  @Type(() => Number)
  activeStatus?: number;

  @IsOptional()
  @Type(() => Number)
  updatedBy?: number;  // ✅ userId only
}

export class DeleteTableDto {
  @Type(() => Number)
  id: number;

  @IsOptional()
  @Type(() => Number)
  updatedBy?: number;  // ✅ userId only
}
