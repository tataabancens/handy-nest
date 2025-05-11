import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProdUserRepository } from './user/prisma-user.repository';
import { IUserRepository } from './user/interfaces/user.repository.interface';
import { IUserService } from './user/interfaces/user.service.interface';

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
export class AppModule {}
