import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { PrismaAreaRepository } from './prisma-area.repository';
import { IAreaRepository } from './interfaces/area.repository.interface';
import { IAreaService } from './interfaces/area.service.interface';

@Module({
  controllers: [AreaController],
  providers: [
    {
      provide: IAreaService,
      useClass: AreaService,
    },
    {
      provide: IAreaRepository,
      useClass: PrismaAreaRepository,
    },
  ],
  exports: [IAreaService],
})
export class AreaModule {}
