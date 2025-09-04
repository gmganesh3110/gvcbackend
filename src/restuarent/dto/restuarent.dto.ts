import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUrl,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateRestuarentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  state: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 250)
  country: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 20)
  phone: string;
  // 👉 if you want stricter validation, use: @IsPhoneNumber('IN') for India

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}

export class UpdateRestuarentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @Length(7, 20)
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  banner?: string;

  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}
