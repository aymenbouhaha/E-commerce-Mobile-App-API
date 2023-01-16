import {UserEntity} from "./user.entity";
import {ChildEntity, ManyToMany, OneToMany, JoinTable} from "typeorm";
import {OrderEntity} from "../../order/entity/order.entity";
import {FavoriteProductEntity} from "../../product/entity/favorite_product.entity";



@ChildEntity()
export class ClientEntity extends  UserEntity{

    @OneToMany(
        type => OrderEntity,
        (order)=>order.client
    )
    orders : OrderEntity[]

    @ManyToMany(
        type => FavoriteProductEntity,
        favProduct=> favProduct.clients
    )
    @JoinTable(
        {
            name : "client_favoriteproduct",
            joinColumn : {
                name :"client_id",
                referencedColumnName : "id"
            },
            inverseJoinColumn: {
                name : "product_id",
                referencedColumnName : "id"
            }
        }
    )
    favoriteProducts : FavoriteProductEntity[]

}
