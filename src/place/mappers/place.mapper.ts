import { PlaceCoordinates, PlaceSuggestion } from '../entities/place.entity';
import {
  PlaceCoordinatesResponseDto,
  PlaceSuggestionResponseDto,
} from '../dto/place-response.dto';
import { GooglePlacesPrediction } from '../interfaces/google-places.interface';

export class PlaceMapper {
  static toCoordinatesDto(
    coordinates: PlaceCoordinates,
  ): PlaceCoordinatesResponseDto {
    return { ...coordinates };
  }

  static toSuggestionDto(
    suggestion: PlaceSuggestion,
  ): PlaceSuggestionResponseDto {
    return { ...suggestion };
  }

  static toSuggestionDtoList(
    suggestions: PlaceSuggestion[],
  ): PlaceSuggestionResponseDto[] {
    return suggestions.map((suggestion) => this.toSuggestionDto(suggestion));
  }

  static toPlaceCoordinates(location: {
    lat: number;
    lng: number;
  }): PlaceCoordinates {
    return {
      lat: location.lat,
      lng: location.lng,
    };
  }

  static toPlaceSuggestion(
    prediction: GooglePlacesPrediction,
  ): PlaceSuggestion {
    return {
      placeId: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
      types: prediction.types,
    };
  }

  static toPlaceSuggestionList(
    predictions: GooglePlacesPrediction[],
  ): PlaceSuggestion[] {
    return predictions.map((prediction) => this.toPlaceSuggestion(prediction));
  }
}
