export interface ColourApiData {
  color: string;
  hex: string;
}

export interface ColourData extends ColourApiData {
  rgb: string;
  hsl: string;
}

export interface ColourApiResponse {
  description: string;
  colors: ColourApiData[];
}
