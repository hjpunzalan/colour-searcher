import { colord } from 'colord';
import { ColourApiData } from './types';
// 3D analog to the Pythagorean Theorem
// 3 dimensional distance sorting
export const colourDistance = (color1: string, color2: string) => {
  const rgb1 = colord(color1).toRgb();
  const rgb2 = colord(color2).toRgb();

  const x =
    Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2);
  return Math.sqrt(x);
};

export const generateRGBHSL = (colourData: ColourApiData[]) => {
  return colourData.map((c) => {
    return {
      ...c,
      rgb: colord(c.hex).toRgbString(),
      hsl: colord(c.hex).toHslString()
    };
  });
};
