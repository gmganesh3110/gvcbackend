export class GetAllUserRoleDto {
  userRole?: string;
  start: number;
  limit: number;
}

export class AddUserRoleDto {
  userRole: string;
  status: number;
  createdBy: number;
}

export class UpdateUserRoleDto {
  id: number;
  userRole: string;
  status: number;
  updatedBy: number;
}

export class DeleteUserRoleDto {
  id: number;
  updatedBy: number;
}
