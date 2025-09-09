export class GetAllUserRoleDto {
  userRole?: string;
  restuarent:number;
  start: number;
  limit: number;
}

export class AddUserRoleDto {
  userRole: string;
  status: number;
  createdBy: number;
  restuarent:number;
}

export class UpdateUserRoleDto {
  id: number;
  userRole: string;
  status: number;
  updatedBy: number;
  restuarent:number;
}

export class DeleteUserRoleDto {
  id: number;
  updatedBy: number;
}
