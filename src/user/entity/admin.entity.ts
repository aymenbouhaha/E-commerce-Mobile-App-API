import {UserEntity} from "./user.entity";
import {ChildEntity, OneToMany} from "typeorm";
import {OrderEntity} from "../../order/entity/order.entity";


@ChildEntity()
export class AdminEntity extends UserEntity {


    @OneToMany(
        type => OrderEntity,
        (order)=>order.admin
    )
    orders : OrderEntity[]

}
