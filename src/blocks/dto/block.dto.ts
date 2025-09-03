import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateBlockDto {
  @IsString()
  blockName: string;

  @IsString()
  description: string;
  createdBy: User;

  activeStatus: number;
}

export class GetAllBlocksDto {
  @IsNumber()
  start: number;

  @IsNumber()
  limit: number;

  @IsString()
  @IsOptional()
  blockName: string;

  @IsOptional()
  status?: number;
}

export class UpdateBlockDto {
  blockName: string;
  description: string;
  updatedBy: User;
  activeStatus: number;
}

export class DeleteBlockDto {
  updatedBy: User;
}
