// import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post()
  async createUser(@Body() user: User) {
    const hashedPass = await bcrypt.hash(user.password, 10);
    const newUser = {
      ...user,
      password: hashedPass,
    };
    return this.UserService.createUser(newUser);
  }
}
