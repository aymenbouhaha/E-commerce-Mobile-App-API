import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column()
  image: string;
  @Column()
  description: string;

  @ManyToMany((type) => UserEntity, (user) => user.favoriteProduct)
  clientFav?: UserEntity[];
}
