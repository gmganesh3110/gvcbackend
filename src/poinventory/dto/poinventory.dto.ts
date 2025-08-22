export class CreatePoinventoryDto {
  itemname: string;
  description: string;
  createdBy: number;
  activeStatus: number;
}

export class GetAllPoinventoryDto {
  start: number;
  limit: number;
  itemname: string;
  status?: number;
}

export class UpdatePoinventoryDto {
  id: number;
  itemname: string;
  description: string;
  updatedBy: number;
  activeStatus: number;
}

export class DeletePoinventoryDto {
  id: number;
  updatedBy: number;
}
