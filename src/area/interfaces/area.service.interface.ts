import { AreaEntity } from '../entities/area.entity';

export interface IAreaService {
  getAllAreas(): Promise<AreaEntity[]>;
  getAreaById(id: number): Promise<AreaEntity | null>;
  getAreaByCoordinates(lat: number, lng: number): Promise<AreaEntity | null>;
}

export const IAreaService = Symbol('IAreaService');
