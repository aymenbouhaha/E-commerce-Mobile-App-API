import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {JwtAuthGuard} from "../user/guard/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import {AddProductDto} from "./dto/add-product.dto";
import {UserEntity} from "../user/entity/user.entity";

@Controller('product')
export class ProductController {

    constructor(
        private productService : ProductService
    ) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getProducts(){
        return this.productService.getProducts()
    }


    @Post("/add")
    @UseGuards(JwtAuthGuard)
    addProduct(@Body() newProduct : AddProductDto , @User() user : Partial<UserEntity>){
        return this.productService.addProduct(newProduct,user)
    }


    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    deleteProduct(
        @Param("id", ParseIntPipe) id,
        @User() user : Partial<UserEntity>
    ){
        return this.productService.deleteProduct(id,user)
    }

}
