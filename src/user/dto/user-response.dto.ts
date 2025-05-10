import { User } from '../entities/user.interface';

export class UserResponseDto {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone!;
    this.createdAt = user.createdAt;
  }
}
