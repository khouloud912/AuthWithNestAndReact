import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    fullName: string;

    @IsNotEmpty()
    password: string;
    @IsOptional()
    role?: string;
}
