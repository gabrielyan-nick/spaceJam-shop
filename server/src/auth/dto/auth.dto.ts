import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;

  @MaxLength(30, { message: 'Maximum 30 characters' })
  @IsString()
  name: string;
}

export type LoginDto = Omit<AuthDto, 'name'>;
