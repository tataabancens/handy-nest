import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.interface';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

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
