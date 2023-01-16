import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AdminEntity} from "../../user/entity/admin.entity";
import {ClientEntity} from "../../user/entity/client.entity";
import {ProductEntity} from "../../product/entity/product.entity";


export enum orderState {
    enCours = "EnCours",
    accepted = "accepted",
    refused = "refused"
}


@Entity("order")
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column(
        {
            type : "enum",
            enum : orderState,
            default : orderState.enCours
        }
    )
    state : string


    @ManyToOne(
        type => AdminEntity,
        (admin)=> admin.orders
    )
    admin : AdminEntity


    @ManyToOne(type => ClientEntity,
        (client) => client.orders
    )
    client: ClientEntity


    @ManyToOne(
        type => ProductEntity
    )
    product : ProductEntity

}


