import { Injectable, Inject } from '@nestjs/common';
import { IPlaceService } from './interfaces/place.service.interface';
import { IPlaceRepository } from './interfaces/place.repository.interface';
import { PlaceCoordinates, PlaceSuggestion } from './entities/place.entity';

@Injectable()
export class PlaceService implements IPlaceService {
  constructor(
    @Inject(IPlaceRepository)
    private readonly placeRepository: IPlaceRepository,
  ) {}

  async getCoordinatesFromPlaceId(
    placeId: string,
  ): Promise<PlaceCoordinates | null> {
    return await this.placeRepository.getCoordinatesFromPlaceId(placeId);
  }

  async getAutocompleteSuggestions(
    input: string,
    location?: { lat: number; lng: number },
    radius?: number,
  ): Promise<PlaceSuggestion[]> {
    return await this.placeRepository.getAutocompleteSuggestions(
      input,
      location,
      radius,
    );
  }
}
