import { Body, Controller, Request, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post()
  async registerUser(@Body() user: User): Promise<User> {
    const registeredUser = await this.UserService.createUser(user);
    return registeredUser;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<
    | {
        email: string;
        linkedInName: string;
        linkedInPhotoUrl: string;
      }
    | undefined
  > {
    const foundUser = await this.UserService.findUserById(parseInt(id, 10));
    if (foundUser) {
      const { email, linkedInName, linkedInPhotoUrl } = foundUser;
      return { email, linkedInName, linkedInPhotoUrl };
    }
    return undefined;
  }
}
