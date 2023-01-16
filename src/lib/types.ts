export interface ColourData {
  color: string;
  hex: string;
}

export interface ColourApiResponse {
  description: string;
  colors: ColourData[];
}
