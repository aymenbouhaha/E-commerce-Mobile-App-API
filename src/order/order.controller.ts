import { OrderDTO} from './order.dto';
import {Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {JwtAuthGuard} from "../user/guard/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import {UserEntity} from "../user/entity/user.entity";
import {ChangeStateDto} from "./dto/change-state.dto";

@Controller('order')
export class OrderController {

    constructor(private orderService : OrderService) {
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    getOrderList(@User() user : Partial<UserEntity>){
        return this.orderService.getOrderList(user)
    }

    @Patch("/change/:id")
    @UseGuards(JwtAuthGuard)
    changeOrderState(@Body() newOrderState : ChangeStateDto ,@User() user : Partial<UserEntity> , @Param("id" , ParseIntPipe) id){
        return this.orderService.changeOrderState(id,user,newOrderState);
    }
    
    
     @Post('/create')
    async create(@Body() order: OrderDTO) {
    const created_order = await this.orderService.create(order); 
    return created_order;
    }


}
