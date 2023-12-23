import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(
        '[UsersService] validateUser: found and password matches',
        user,
      );
      return { ...user, password: undefined }; 
    }

    console.log(
      '[UsersService] validateUser: user not found or password does not match',
    );
    return undefined;
  }
}
