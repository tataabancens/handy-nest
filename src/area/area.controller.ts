import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AreaResponseDto } from './dto/area-response.dto';
import { AreaMapper } from './mappers/area.mapper';
import { AreaEntity } from './entities/area.entity';
import { IAreaService } from './interfaces/area.service.interface';

@Controller('areas')
export class AreaController {
  constructor(
    @Inject(IAreaService) private readonly areaService: IAreaService,
  ) {}

  @Get()
  async getAllAreas(): Promise<AreaResponseDto[]> {
    const areas: AreaEntity[] = await this.areaService.getAllAreas();
    return AreaMapper.toDtoList(areas);
  }

  @Get('coordinates')
  async getAreaByCoordinates(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ): Promise<AreaResponseDto> {
    const numericLat = parseFloat(lat);
    const numericLng = parseFloat(lng);

    if (isNaN(numericLat) || isNaN(numericLng)) {
      throw new Error('Invalid Latitude or Longitude');
    }

    const area = await this.areaService.getAreaByCoordinates(
      numericLat,
      numericLng,
    );
    if (!area) {
      throw new Error(`No area found for coordinates (${lat}, ${lng})`);
    }

    return AreaMapper.toDto(area);
  }

  @Get(':id')
  async getAreaById(@Param('id') id: string): Promise<AreaResponseDto> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }

    const area = await this.areaService.getAreaById(numericId);
    if (!area) {
      throw new Error(`Area with ID ${id} not found`);
    }

    return AreaMapper.toDto(area);
  }
}
