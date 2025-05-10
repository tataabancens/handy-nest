import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProdUserRepository } from './user/prisma-user.repository';
import { AbstractUserService } from './user/interfaces/user.service.interface';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService,
    },
    {
      provide: ProdUserRepository,
      useClass: ProdUserRepository,
    },
  ],
})
export class AppModule {}
