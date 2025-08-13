export class CreateCategoryDto {
  category: string;
  description: string;
  createdBy: number;
  activeStatus: number;
}

export class GetAllCategoryDto {
  start: number;
  limit: number;
  category: string;
  status?: number;
}

export class UpdateCategoryDto {
  id: number;
  category: string;
  description: string;
  updatedBy: number;
  activeStatus: number;
}

export class DeleteCategoryDto {
  id: number;
  updatedBy: number;
}
