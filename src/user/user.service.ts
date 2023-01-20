import {ConflictException, Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import {UserSignUpDto} from './dto/usersignup.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity, UserRole} from './entity/user.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';
import {JwtService} from '@nestjs/jwt';
import {ProductEntity} from '../product/entity/product.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private jwtService: JwtService,
    ) {
    }


    async signUp(userData: UserSignUpDto): Promise<Partial<UserEntity>> {
        const user = this.userRepository.create(
            {
                ...userData
            }
        )
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt)
        try {
            await this.userRepository.save(user);
        } catch (e) {
            throw new ConflictException(`l'email et le username doivent etre unique`)
        }
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        }
    }


    async login(credentials: LoginDto) {
        const {email, password} = credentials;
        const user = await this.userRepository.findOneBy([{email: email}])

        if (!user) {
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`)
        }
        const hashedPassword = await bcrypt.hash(password, user.salt)
        if (hashedPassword == user.password) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                image: user.image,
                phoneNumber: user.phoneNumber
            }

            const token = await this.jwtService.sign(payload)

            return {
                "token": token
            }

        } else {
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`)
        }
    }


    async addToFavorite(user : Partial<UserEntity>,productId : number ) {
        if (user.role !=UserRole.client){
            throw new ConflictException("Vous ne pouvez pas ajouter un produit a la liste des favoris")
        }
        const produit = await this.productRepository.findOneBy({id: productId });
        if (produit ==null){
            throw new ConflictException("Le produit n'existe pas")
        }
        user.favoriteProduct.push(produit)
        return await this.userRepository.save(user);
    }

    getFavoriteList(user : Partial<UserEntity>){
        if (user.role!=UserRole.client){
            throw new UnauthorizedException("L'admin ne peut pas voir la liste des favoris")
        }
        const favoriteProductList : ProductEntity[] = user.favoriteProduct
        return favoriteProductList
    }





}
