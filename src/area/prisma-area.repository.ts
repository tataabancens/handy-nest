import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Area, PrismaClient } from '@prisma/client';
import { IAreaRepository } from './interfaces/area.repository.interface';
import { AreaEntity } from './entities/area.entity';
import { AreaMapper } from './mappers/area.mapper';

@Injectable()
export class PrismaAreaRepository
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, IAreaRepository
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findAll(): Promise<AreaEntity[]> {
    const areas = await this.area.findMany();
    return AreaMapper.toEntityList(areas);
  }

  async findById(id: number): Promise<AreaEntity | null> {
    const area = await this.area.findUnique({
      where: { id },
    });
    return area ? AreaMapper.toEntity(area) : null;
  }

  async findByCoordinates(
    lat: number,
    lng: number,
  ): Promise<AreaEntity | null> {
    const result = await this.$queryRaw<Area[]>`
      SELECT id, nombre, comuna, perimetro, area, type FROM areas 
      WHERE ST_Contains(wkb_geometry, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) 
      LIMIT 1;
    `;

    return result.length ? AreaMapper.toEntity(result[0]) : null;
  }
}
