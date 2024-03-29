import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "./entity/order.entity";


@Module({
  imports :[TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
