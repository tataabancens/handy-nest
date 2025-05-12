import { User } from '../entities/user.interface';

export interface IUserService {
  createUser(createUserDto: User): Promise<User>;
  getUserById(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  // updateUser(id: number, user: Partial<User>): Promise<User>;
  // deleteUser(id: number): Promise<void>;
}

export const IUserService = Symbol('IUserService');
