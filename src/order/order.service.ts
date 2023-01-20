import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "./entity/order.entity";
import {Repository} from "typeorm";
import {UserEntity, UserRole} from "../user/entity/user.entity";
import {ChangeStateDto} from "./dto/change-state.dto";

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>
    ) {
    }

    async getOrderList(user : Partial<UserEntity>) {
        if (user.role== UserRole.admin){
            return await this.orderRepository.find({relations : ["product" , "client"]})
        }else
            return await this.orderRepository.find({where : {client : user}, relations : ["product" , "client"] } )
    }


    async changeOrderState(id: number,user: Partial<UserEntity>, newState : ChangeStateDto){
        if (user.role !=UserRole.admin){
            throw new UnauthorizedException()
        }
        try {
            return this.orderRepository.update(id,{state : newState.state})
        }catch (e){
            throw new ConflictException("Un erreur est survenue lors du changement de l'etat de la commande")
        }


    }






}
