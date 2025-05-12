import { AreaEntity } from '../entities/area.entity';

export interface IAreaRepository {
  findAll(): Promise<AreaEntity[]>;
  findById(id: number): Promise<AreaEntity | null>;
  findByCoordinates(lat: number, lng: number): Promise<AreaEntity | null>;
}

export const IAreaRepository = Symbol('IAreaRepository');
