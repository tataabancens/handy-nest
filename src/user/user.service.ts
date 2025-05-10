import { Injectable } from '@nestjs/common';
import { User } from './entities/user.interface';
import { AbstractUserService } from './interfaces/user.service.interface';
import { ProdUserRepository } from './prisma-user.repository';

@Injectable()
export class UserService extends AbstractUserService {
  constructor(private userRepository: ProdUserRepository) {
    super();
  }

  async createUser(createUserDto: User): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  getUserByEmail(email: string): Promise<User> {
    console.log('getUserByEmail', email);
    return Promise.resolve({
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: email,
      phone: '1234567890',
    } as User);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  }
}
