import '@testing-library/jest-dom';
import { colourDistance } from '../lib/utils';

test('colourDistance should return the correct value', async () => {
  const testColour1 = 'rgb(1,2,3)';
  const testColour2 = 'rgb(2,3,4)';

  const distance = Math.sqrt(3);
  const calcDistance = colourDistance(testColour1, testColour2);

  expect(calcDistance).toEqual(distance);
});
