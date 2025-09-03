import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";

export class CreateItemDto {
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: Category;
  createdBy: number;       // changed to id
  activeStatus: number;
  image: any;
  type: string;
}

export class GetAllItemsDto {
  start: number;
  limit: number;
  category?: number;
  name?: string;
  type?: string;
  status?: number;
}

export class UpdateItemDto {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
  category?: Category;
  updatedBy: User;       // changed to id
  activeStatus?: number;
  image?: any;
}

export class DeleteItemDto {
  id: number;
  updatedBy: User;       // changed to id
}
