export interface PlaceCoordinatesResponseDto {
  lat: number;
  lng: number;
}

export interface PlaceSuggestionResponseDto {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  types: string[];
}
