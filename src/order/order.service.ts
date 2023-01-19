import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from '../types/order';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDTO, OrderIdDTO } from './order.dto';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrderService {
  // define a constructor to inject the model into the service
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>, // @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}
  //create new order
  async create(order: OrderDTO): Promise<OrderEntity> {
    // Get data from input and structure it.
    const new_order = {
      produit: order.product,
      client: order.client,
    };
    return await this.orderRepository.save(new_order);
  }
  // getting all orders 'EnCours' of a user
  async findAll(user_id: number): Promise<OrderEntity[]> {
    // get and return all orders associated to the user whose id is id_user
    return await this.orderRepository.find({
      relations: {
        client: true,
      },
      where: {
        state: 'EnCours',
        client: {
          id: user_id,
        },
      },
    });
  }
  // getting order by id
  // async findById(orderId: OrderIdDTO): Promise<Order> {
  //   const { id } = orderId; // Extract the ID
  //   try {
  //     // Get and return the order
  //     return await this.orderRepository.findById(id);
  //   } catch (error) {
  //     // In case of an error, show it
  //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  // updating an order
  // async update(orderId: OrderIdDTO, order: OrderDTO): Promise<Order> {
  //   const { id } = orderId; // Extract the ID
  //   const updated_order = {
  //     // Structure the update object
  //
  //     ...(order.totalPrice && {
  //       totalPrice: order.totalPrice,
  //     }),
  //   };
  //   try {
  //     return await this.orderModel
  //       .findByIdAndUpdate(id, updated_order, {
  //         new: true,
  //       })
  //       .exec(); // Update and return the updated order
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR); // In case of an error, show it.
  //   }
  // }
  // deleting an order
  async delete(orderId: OrderIdDTO): Promise<any> {
    const { id } = orderId; // Extract the ID
    try {
      return await this.orderRepository.findBy({ id: id }); // Remove an order and return it.
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR); // In case of an error, show it.
    }
  }
}
