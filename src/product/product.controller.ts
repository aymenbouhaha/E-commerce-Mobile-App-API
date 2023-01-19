import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../order/entity/order.entity';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('/:id')
  async showDescription(@Param('id', ParseIntPipe) id): Promise<string> {
    return await this.productService.showDescription(id);
  }
}
