import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO, OrderIdDTO } from './order.dto';
import { OrderEntity } from './entity/order.entity';

@Controller('orders')
//create and export the controller
export class OrderController {
  // define the orders service
  constructor(private orderService: OrderService) {}
  @Get('/show/:id')
  async findAll(@Param('id', ParseIntPipe) id): Promise<OrderEntity[]> {
    const all_orders = await this.orderService.findAll(id); // get all orders
    return all_orders;
  }
  @Post('/create')
  async create(@Body() order: OrderDTO) {
    const created_order = await this.orderService.create(order); // Create an order
    return created_order;
  }
  @Post('/delete')
  async delete(@Query() orderId: OrderIdDTO) {
    const deleted_order = await this.orderService.delete(orderId); // delete the orderd
    return deleted_order;
  }
}
