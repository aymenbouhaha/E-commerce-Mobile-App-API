import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "./entity/product.entity";
import {Repository} from "typeorm";
import {AddProductDto} from "./dto/add-product.dto";
import {UserEntity, UserRole} from "../user/entity/user.entity";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository : Repository<ProductEntity>
    ) {
    }


    async getProducts() {
        return await this.productRepository.find()
    }

    async addProduct(product : AddProductDto, user : Partial<UserEntity>){
        if(user.role != UserRole.admin){
            throw new UnauthorizedException()
        }
        const newProduct = this.productRepository.create({
            ...product
        });
        try {
            return await this.productRepository.save(newProduct);
        }catch (e){
            throw new ConflictException("Un erreur est survenue lors de l'ajout du produit")
        }
    }


    async deleteProduct(id : number , user : Partial<UserEntity>){
        if (user.role != UserRole.admin){
            throw new UnauthorizedException()
        }
        const product = await this.productRepository.findOneBy({id : id});
        if (product ==null){
            throw new NotFoundException("Le produit n'existe pas")
        }
        try {
            return await this.productRepository.remove(product)
        }catch (e){
            throw new ConflictException("Une erreur est survenue lors de la suppression du produit")
        }

    }




}
