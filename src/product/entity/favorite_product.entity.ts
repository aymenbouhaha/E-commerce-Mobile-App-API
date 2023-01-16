import {ChildEntity, ManyToMany} from "typeorm";
import {ProductEntity} from "./product.entity";
import {ClientEntity} from "../../user/entity/client.entity";

@ChildEntity()
export class FavoriteProductEntity extends ProductEntity {


    @ManyToMany(
        type => ClientEntity ,
        client => client.favoriteProducts
    )
    clients : ClientEntity[]
}
