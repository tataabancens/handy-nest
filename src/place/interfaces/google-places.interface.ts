export interface GooglePlacesGeometryResponse {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GooglePlacesDetailsResponse {
  status: string;
  result?: {
    geometry: GooglePlacesGeometryResponse;
  };
  error_message?: string;
}

export interface GooglePlacesStructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface GooglePlacesPrediction {
  place_id: string;
  description: string;
  structured_formatting: GooglePlacesStructuredFormatting;
  types: string[];
}

export interface GooglePlacesAutocompleteResponse {
  status: string;
  predictions: GooglePlacesPrediction[];
  error_message?: string;
} 