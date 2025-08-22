export class CreateExpenseitemDto {
  expenseItem: string;
  description: string;
  createdBy: number;
  activeStatus: number;
}

export class GetAllExpenseitemsDto {
  start: number;
  limit: number;
  expenseItem: string;
  status?: number;
}

export class UpdateExpenseitemDto {
  id: number;
  expenseItem: string;
  description: string;
  updatedBy: number;
  activeStatus: number;
}

export class DeleteExpenseitemDto {
  id: number;
  updatedBy: number;
}
