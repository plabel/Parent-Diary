import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  otp: string;

  @IsString()
  @IsOptional()
  recoveryCode: string;
}
