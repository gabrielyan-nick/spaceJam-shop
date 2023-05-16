import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString()
  password: string;

  @IsOptional()
  @MaxLength(30, { message: 'Maximum 30 characters' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatarPath: string;

  @IsOptional()
  @IsString()
  phone: string;
}
