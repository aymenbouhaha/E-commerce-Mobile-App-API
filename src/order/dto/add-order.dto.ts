import { IsNotEmpty, } from "class-validator";
import {ProductEntity} from "../../product/entity/product.entity";

export class AddOrderDto {
  @IsNotEmpty()
  product : ProductEntity
}


