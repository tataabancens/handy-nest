import { Area } from '@prisma/client';
import { AreaEntity } from '../entities/area.entity';
import { AreaResponseDto } from '../dto/area-response.dto';

export class AreaMapper {
  static toEntity(prismaArea: Area): AreaEntity {
    return {
      id: prismaArea.id,
      nombre: prismaArea.nombre,
      comuna: prismaArea.comuna || 0,
      perimetro: prismaArea.perimetro,
      area: prismaArea.area,
      type: prismaArea.type,
    };
  }

  static toEntityList(prismaAreas: Area[]): AreaEntity[] {
    return prismaAreas.map((area) => this.toEntity(area));
  }

  static toDto(area: AreaEntity): AreaResponseDto {
    return new AreaResponseDto(area);
  }

  static toDtoList(areas: AreaEntity[]): AreaResponseDto[] {
    return areas.map((area) => this.toDto(area));
  }
}
