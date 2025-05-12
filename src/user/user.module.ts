import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './user.service';
import { IUserRepository } from './interfaces/user.repository.interface';
import { ProdUserRepository } from './prisma-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: ProdUserRepository,
    },
  ],
})
export class UserModule {}
