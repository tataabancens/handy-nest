import { PlaceCoordinates, PlaceSuggestion } from '../entities/place.entity';

export interface IPlaceService {
  getCoordinatesFromPlaceId(placeId: string): Promise<PlaceCoordinates | null>;
  getAutocompleteSuggestions(
    input: string,
    location?: { lat: number; lng: number },
    radius?: number
  ): Promise<PlaceSuggestion[]>;
}

export const IPlaceService = Symbol('IPlaceService'); 