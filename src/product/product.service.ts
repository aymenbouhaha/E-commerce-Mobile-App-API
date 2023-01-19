import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { UserEntity } from '../user/entity/user.entity';
import { OrderDTO } from '../order/order.dto';
import { OrderEntity } from '../order/entity/order.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  //showing a product description :
  async showDescription(id_product: number): Promise<string> {
    // Get data from input and structure it.
    const product = await this.productRepository.findOneBy({ id: id_product });
    return product.description;
  }
}
// async create(
//   product: ProductEntity,
//   user: UserEntity,
// ): Promise<ProductEntity> {
//   if (user.role == 'admin') {
//     return await this.productRepository.save(product);
//   }
//   throw new UnauthorizedException();
// }

// async update(
//   id: number,
//   product: ProductEntity,
//   user: UserEntity,
// ): Promise<UpdateResult> {
//   if (user.role == 'admin') {
//     return await this.productRepository.update(id, product);
//   }
//   throw new UnauthorizedException();
// }

// async delete(id: number, user: UserEntity): Promise<DeleteResult> {
//   if (user.role == 'admin') {
//     return await this.productRepository.delete(id);
//   }
//   throw new UnauthorizedException();
// }
