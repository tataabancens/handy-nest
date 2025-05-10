import { User } from '../entities/user.interface';

export abstract class AbstractUserService {
  abstract createUser(createUserDto: User): Promise<User>;
  abstract getUserById(id: number): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  // updateUser(id: number, user: Partial<User>): Promise<User>;
  // deleteUser(id: number): Promise<void>;
}
