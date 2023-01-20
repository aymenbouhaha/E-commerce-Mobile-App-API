import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddProductDto {

    @IsString()
    @IsNotEmpty()
    name : string ;

    @IsNumber()
    @IsNotEmpty()
    price : number ;

    @IsString()
    @IsNotEmpty()
    description : string;

    @IsString()
    image : string;





}