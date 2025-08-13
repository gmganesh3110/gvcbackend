import { User } from "src/users/entities/user.entity";

export class LoginDto {
  email: string;

  password: string;
}
export class LoginResponse {
  user: User;
  token: string;
}