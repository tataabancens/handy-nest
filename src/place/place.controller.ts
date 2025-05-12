import { Controller, Get, Query, Inject } from '@nestjs/common';
import { IPlaceService } from './interfaces/place.service.interface';
import { PlaceMapper } from './mappers/place.mapper';
import {
  PlaceCoordinatesResponseDto,
  PlaceSuggestionResponseDto,
} from './dto/place-response.dto';

@Controller('places')
export class PlaceController {
  constructor(
    @Inject(IPlaceService) private readonly placeService: IPlaceService,
  ) {}

  @Get('coordinates')
  async getCoordinatesFromPlaceId(
    @Query('placeId') placeId: string,
  ): Promise<PlaceCoordinatesResponseDto | null> {
    const coordinates =
      await this.placeService.getCoordinatesFromPlaceId(placeId);
    return coordinates ? PlaceMapper.toCoordinatesDto(coordinates) : null;
  }

  @Get('autocomplete')
  async getAutocompleteSuggestions(
    @Query('input') input: string,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radius') radius?: number,
  ): Promise<PlaceSuggestionResponseDto[]> {
    const location = lat && lng ? { lat, lng } : undefined;
    const suggestions = await this.placeService.getAutocompleteSuggestions(
      input,
      location,
      radius,
    );
    return PlaceMapper.toSuggestionDtoList(suggestions);
  }
}
