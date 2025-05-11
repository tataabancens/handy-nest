import { User } from '../entities/user.interface';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export const IUserRepository = Symbol("IUserRepository");
