import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.interface';

export function mapUserDtoToUser(createUserDto: CreateUserDto): User {
  return {
    password: '',
    phone: createUserDto.phone || '',
    id: 0,
    name: createUserDto.name,
    lastName: createUserDto.lastName,
    email: createUserDto.email,
    createdAt: new Date(),
  };
}