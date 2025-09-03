import { IsEmail, IsString } from "class-validator"; import { User } from "src/users/entities/user.entity";

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class LoginResponse {
  user: User;
  token: string;
}