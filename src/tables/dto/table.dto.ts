export class GetAllTablesDto {
  blockId: number;
  tableName?: string;
  status: number;
  start: number;
  limit: number;
}

export class AddTableDto {
  blockId: number;
  tableName: string;
  description:string;
  capacity: string;
  activeStatus: number;
  createdBy: number;
}

export class UpdateTableDto {
  id: number;
  blockId: number;
  tableName: string;
  description:string;
  capacity: string;
  activeStatus: number;
  updatedBy: number;
}

export class DeleteTableDto {
  id: number;
  updatedBy: number;
}
