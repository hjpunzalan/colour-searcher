import { readFakeData } from '../__mocks__/fakeData';

test('should first', async () => {
  const { fakeColourResponse } = await readFakeData();
  console.log(fakeColourResponse);
  expect(true).toBe(true);
});
