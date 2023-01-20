import {
  Body,
  Controller, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
} from '@nestjs/common';
import { UserSignUpDto } from './dto/usersignup.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {User} from "../decorator/user.decorator";


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  signUp(@Body() userData: UserSignUpDto) {
    return this.userService.signUp(userData);
  }

  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.userService.login(credentials);
  }

  @Patch('/favorite/add/:id')
  @UseGuards(JwtAuthGuard)
  addTofavorite(
    @Param('id', ParseIntPipe) idProduct,
    @User() user
  ) {
    return this.userService.addToFavorite(user, idProduct);
  }

  @Get("/favorite")
  @UseGuards(JwtAuthGuard)
  getFavoriteList(@User() user){
    return this.userService.getFavoriteList(user)
  }

}



