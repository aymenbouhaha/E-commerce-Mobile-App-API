import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";


export class UserSignUpDto {


    @IsString()
    @IsNotEmpty()
    username : string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber : string

    @IsString()
    image : string
}