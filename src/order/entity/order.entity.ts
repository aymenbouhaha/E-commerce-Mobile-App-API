import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../product/entity/product.entity';
import { UserEntity } from '../../user/entity/user.entity';

export enum OrderState {
  enCours = 'EnCours',
  accepted = 'Accepté',
  refused = 'Refusé',
}

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id :number

    @Column(
        {
            type : "enum",
            enum : OrderState,
            default : OrderState.enCours
        }
    )
    state : string

    @ManyToOne(
        type => ProductEntity
    )
    product : ProductEntity


    @ManyToOne(
        type => UserEntity
    )
    client : UserEntity

}
