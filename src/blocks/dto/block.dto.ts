export class CreateBlockDto {
  blockName: string;
  description: string;
  createdBy: number;
  activeStatus: number;
}

export class GetAllBlocksDto {
  start: number;
  limit: number;
  blockName: string;
  status?: number;
}

export class UpdateBlockDto {
  id: number;
  blockName: string;
  description: string;
  updatedBy: number;
  activeStatus: number;
}

export class DeleteBlockDto {
  id: number;
  updatedBy: number;
}
