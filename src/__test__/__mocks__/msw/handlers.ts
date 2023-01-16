import { XKCD_JSON } from '@/src/config';
import { rest } from 'msw';
import { readFakeData } from '../fakeData';

export const handlers = [
  rest.get(XKCD_JSON, async (req, res, ctx) => {
    const { fakeColourResponse } = await readFakeData();
    return res(ctx.json(fakeColourResponse));
  })
];
