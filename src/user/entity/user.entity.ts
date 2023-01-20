import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entity/product.entity';

export enum UserRole {
  admin = 'admin',
  client = 'client',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  salt: string;

  @Column({
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    nullable: false,
  })
  image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.client,
  })
  role: string;

  @ManyToMany((type) => ProductEntity, (product) => product.clientFav)
  @JoinTable({
    name: 'user_fav',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  favoriteProduct?: ProductEntity[];
}
