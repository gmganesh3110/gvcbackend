export class CreateCategoryDto {
  category: string;
  description: string;
  type: string;
  createdBy: number;
  activeStatus: number;
}

export class GetAllCategoryDto {
  start: number;
  limit: number;
  category: string;
  type: string;
  status?: number;
}

export class UpdateCategoryDto {
  id: number;
  category: string;
  description: string;
  type: string;
  updatedBy: number;
  activeStatus: number;
}

export class DeleteCategoryDto {
  id: number;
  updatedBy: number;
}
