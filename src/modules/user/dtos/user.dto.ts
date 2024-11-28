import { IsEmail, IsOptional, IsString, Length, IsInt, Min } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters long.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsInt({ message: 'Age must be an integer.' })
  @Min(1, { message: 'Age must be at least 1' })
  age: number;

  @IsString({ message: 'City must be a string.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters long.' })
  city: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters long.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be an integer.' })
  @Min(18, { message: 'Age must be at least 18.' })
  age?: number;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  @Length(3, 50, { message: 'City must be between 3 and 50 characters long.' })
  city?: string;
}
