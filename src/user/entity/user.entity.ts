import {Column, Entity, ManyToMany, JoinTable,PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "../../product/entity/product.entity";



export enum UserRole {
    admin ="admin",
    client = "client"
}


@Entity("user")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    username : string

    @Column()
    email : string

    @Column()
    password : string

    @Column()
    salt : string

    @Column()
    phoneNumber : string

    @Column()
    image :string

    @Column(
        {
            type : "enum",
            enum : UserRole,
            default : UserRole.client
        }
    )
    role : string

    @ManyToMany(
        type => ProductEntity,
        product => product.clientFav
    )
    @JoinTable(
        {
            name : "user_fav",
            joinColumn : {
                name : "user_id",
                referencedColumnName : "id"
            },
            inverseJoinColumn : {
                name : "product_id",
                referencedColumnName : "id"
            }
        }
    )
    favoriteProduct? : ProductEntity[]

}
