import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class EditUserDto {
  @IsString()
  public id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsNumber()
  public userType: number;

  @IsNumber()
  caloriesLimit: number;

  @IsNumber()
  monthlyLimit: number;
}
