import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";



@Module({
  imports: [OrderModule, ProductModule, UserModule ,
  TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'mini_projet_junior',
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }
  )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
