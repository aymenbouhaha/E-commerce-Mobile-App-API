import {Body, Controller, Post} from '@nestjs/common';
import {UserSignUpDto} from "./dto/usersignup.dto";
import {UserService} from "./user.service";
import {LoginDto} from "./dto/login.dto";



@Controller('user')
export class UserController {

    constructor(
        private userService : UserService
    ) {
    }


    @Post()
    signUp(@Body() userData :UserSignUpDto){
        return this.userService.signUp(userData)
    }

    @Post('login')
    login (@Body() credentials : LoginDto){
        return this.userService.login(credentials)
    }



}




