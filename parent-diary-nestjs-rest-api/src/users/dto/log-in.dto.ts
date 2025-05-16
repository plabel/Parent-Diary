
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty() @IsString()
  password: string;
}
