import { IsEmail, IsOptional, IsString, Length, IsInt, Min } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @Length(3, 50)
    name!: string;

    @IsEmail()
    email!: string;

    @IsInt()
    @Min(18)
    age!: number;
}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    @Length(3, 50)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsInt()
    @Min(18)
    age?: number;
}
