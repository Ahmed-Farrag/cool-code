import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    return await this.usersService.validateUser(email, password);
  }

  async login(user: User) {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`);
    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
    };
  }
}
