import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProdUserRepository
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async findById(id: number): Promise<User | null> {
    return this.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.user.findUnique({
      where: { email },
    });
  }

  async create(
    user: Omit<
      User,
      'id' | 'createdAt' | 'professional' | 'userRoles' | 'reviewsGiven'
    >,
  ): Promise<User> {
    return this.user.create({
      data: user,
    });
  }
  async findAll(): Promise<User[]> {
    return this.user.findMany();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
