import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/entity/product.entity';
import { UserEntity } from '../user/entity/user.entity';
import { OrderState } from './entity/order.entity';
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDTO {
  // createdAt: Date;
  @IsNotEmpty()
  product: ProductEntity;
  @IsNotEmpty()
  client: UserEntity;
}

export interface OrderIdDTO {
  id: string;
}
