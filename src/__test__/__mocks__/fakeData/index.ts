import { ColourApiResponse } from '@/src/lib/types';
import * as colourFakeData from './json/colours.json';

export const readFakeData = () => {
  return {
    fakeColourResponse: colourFakeData as ColourApiResponse
  };
};
