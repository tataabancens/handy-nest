import { User } from '../entities/user.interface';

export abstract class AbstractUserRepository {
  abstract create(data: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
