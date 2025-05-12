import { AreaEntity } from '../entities/area.entity';

export class AreaResponseDto {
  id: number;
  nombre: string;
  comuna: number;
  perimetro: number | null;
  area: number | null;
  type: string;

  constructor(area: AreaEntity) {
    this.id = area.id;
    this.nombre = area.nombre;
    this.comuna = area.comuna;
    this.perimetro = area.perimetro;
    this.area = area.area;
    this.type = area.type;
  }
}
