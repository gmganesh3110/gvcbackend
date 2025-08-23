export class CreateItemDto {
  name: string;
  description: string;
  price: string;
  available: boolean;
  categoryId: number;
  createdBy: number;
  activeStatus: number;
  image: any;
  type: string;
}

export class GetAllItemsDto {
  start: number;
  limit: number;
  categoryId: number;
  name: string;
  type: string;
  status?: number;
}

export class UpdateItemDto {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  categoryId: number;
  updatedBy: number;
  activeStatus: number;
  image: any;
}

export class DeleteItemDto {
  id: number;
  updatedBy: number;
}
