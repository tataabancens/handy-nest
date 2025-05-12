import { Injectable, Inject } from '@nestjs/common';
import { IAreaRepository } from './interfaces/area.repository.interface';
import { IAreaService } from './interfaces/area.service.interface';
import { AreaEntity } from './entities/area.entity';

@Injectable()
export class AreaService implements IAreaService {
  constructor(
    @Inject(IAreaRepository) private readonly areaRepository: IAreaRepository,
  ) {}

  async getAllAreas(): Promise<AreaEntity[]> {
    return await this.areaRepository.findAll();
  }

  async getAreaById(id: number): Promise<AreaEntity | null> {
    return await this.areaRepository.findById(id);
  }

  async getAreaByCoordinates(
    lat: number,
    lng: number,
  ): Promise<AreaEntity | null> {
    return await this.areaRepository.findByCoordinates(lat, lng);
  }
}
