import { PlaceCoordinates, PlaceSuggestion } from '../entities/place.entity';

export interface IPlaceRepository {
  getCoordinatesFromPlaceId(placeId: string): Promise<PlaceCoordinates | null>;
  getAutocompleteSuggestions(
    input: string,
    location?: { lat: number; lng: number },
    radius?: number
  ): Promise<PlaceSuggestion[]>;
}

export const IPlaceRepository = Symbol('IPlaceRepository'); 