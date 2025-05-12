import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPlaceRepository } from './interfaces/place.repository.interface';
import { PlaceCoordinates, PlaceSuggestion } from './entities/place.entity';
import {
  GooglePlacesDetailsResponse,
  GooglePlacesAutocompleteResponse,
} from './interfaces/google-places.interface';
import { ApiError } from './interfaces/error.interface';
import { PlaceMapper } from './mappers/place.mapper';

@Injectable()
export class PlaceRepository
  implements OnModuleInit, OnModuleDestroy, IPlaceRepository
{
  private readonly GOOGLE_API_KEY: string;
  private readonly BASE_URL =
    'https://maps.googleapis.com/maps/api/place/details/json';
  private readonly AUTOCOMPLETE_URL =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not defined');
    }
    this.GOOGLE_API_KEY = apiKey;
  }

  onModuleInit() {
    if (!this.GOOGLE_API_KEY) {
      throw new Error('Missing Google Maps API Key');
    }
  }

  async onModuleDestroy() {}

  async getCoordinatesFromPlaceId(
    placeId: string,
  ): Promise<PlaceCoordinates | null> {
    const url = `${this.BASE_URL}?place_id=${placeId}&fields=geometry&key=${this.GOOGLE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = (await response.json()) as GooglePlacesDetailsResponse;

      if (data.status !== 'OK' || !data.result?.geometry?.location) {
        console.error(
          'Google Places API Error:',
          data.status,
          data.error_message,
        );
        return null;
      }

      const location = data.result.geometry.location;
      return PlaceMapper.toPlaceCoordinates(location);
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching place details:', apiError.message);
      return null;
    }
  }

  async getAutocompleteSuggestions(
    input: string,
    location?: { lat: number; lng: number },
    radius?: number,
  ): Promise<PlaceSuggestion[]> {
    let url = `${this.AUTOCOMPLETE_URL}?input=${encodeURIComponent(input)}&key=${this.GOOGLE_API_KEY}`;

    if (location) {
      url += `&location=${location.lat},${location.lng}`;
    }

    if (radius) {
      url += `&radius=${radius}`;
    }

    try {
      const response = await fetch(url);
      const data = (await response.json()) as GooglePlacesAutocompleteResponse;

      if (data.status !== 'OK' || !data.predictions) {
        console.error(
          'Google Places Autocomplete API Error:',
          data.status,
          data.error_message,
        );
        return [];
      }

      return PlaceMapper.toPlaceSuggestionList(data.predictions);
    } catch (error) {
      const apiError = error as ApiError;
      console.error(
        'Error fetching autocomplete suggestions:',
        apiError.message,
      );
      return [];
    }
  }
}
