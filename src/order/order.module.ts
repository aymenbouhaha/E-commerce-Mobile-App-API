import { Module } from '@nestjs/common';
import { orderSchema } from 'src/models/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { OrderEntity } from './entity/order.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  // execute the orders controller
  controllers: [OrderController],
  // execute the orders provider/service
  providers: [OrderService],
  // export the orders service
  exports: [OrderService],
})
export class OrderModule {}
