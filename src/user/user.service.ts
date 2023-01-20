import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UserSignUpDto} from "./dto/usersignup.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
        private jwtService : JwtService
    ) {
    }

    async signUp(userData: UserSignUpDto) : Promise<Partial<UserEntity>>{
        const user = this.userRepository.create(
            {
                ...userData
            }
        )
        user.salt = await bcrypt.genSalt();
        user.password= await bcrypt.hash(user.password,user.salt)
        try {
            await this.userRepository.save(user);
        }catch (e){
            throw new ConflictException(`l'email et le username doivent etre unique`)
        }
        return {
            id : user.id,
            email : user.email,
            username : user.username,
            role : user.role
        }
    }


    async login(credentials : LoginDto){
        const {email , password} =credentials;
        const user = await this.userRepository.findOneBy([{email : email}])

        if (!user){
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`)
        }
        const hashedPassword = await bcrypt.hash(password, user.salt)
        if (hashedPassword== user.password){
            const payload = {
                id : user.id,
                username : user.username,
                email :user.email ,
                role : user.role ,
                image : user.image ,
                phoneNumber : user.phoneNumber
            }

            const token = await this.jwtService.sign(payload)

            return {
                "token" : token
            }

        }else
        {
            throw new NotFoundException(`l'email ou le mot de passe sont incorrecte`)
        }
    }

    modifyProfile(){

    }

}
