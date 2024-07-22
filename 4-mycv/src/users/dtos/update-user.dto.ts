import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

@IsEmail()
@IsOptional() // optional because the user can update any field, or none
email: string;

@IsString()
@IsOptional()
password: string;
}