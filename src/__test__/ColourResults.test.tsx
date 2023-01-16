import { ColourResults } from '@/src/components/ColourResults';
import { generateRGBHSL } from '@/src/lib/utils';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { readFakeData } from './__mocks__/fakeData';

test('ColourResults show error message when theres an error', async () => {
  render(<ColourResults searchColour="" rawColours={[]} error={true} colours={[]} />);

  const errorMessage = await screen.findByText(/Error: unable to source XKCD colour file/i);
  expect(errorMessage).toBeInTheDocument();
});

test('ColourResults shows button on error', async () => {
  render(<ColourResults searchColour="" rawColours={[]} error={true} colours={[]} />);

  const refetchButton = await screen.findByRole('button', {
    name: /refetch/i
  });
  expect(refetchButton).toBeInTheDocument();
});

test('ColourResults shows loading when theres no raw data yet', async () => {
  render(<ColourResults searchColour="" rawColours={undefined} error={undefined} colours={[]} />);

  const loadingText = await screen.findByText(/loading/i);
  expect(loadingText).toBeInTheDocument();
});

test('Display not valid colour code when search colour is not valid', async () => {
  render(<ColourResults searchColour="test" rawColours={[]} error={undefined} colours={[]} />);

  const invalidText = await screen.findByText(/"test" is not a valid colour code/i);
  expect(invalidText).toBeInTheDocument();
});

test('Display result text for search colour', async () => {
  render(<ColourResults searchColour="#fff000" rawColours={[]} error={undefined} colours={[]} />);

  const resultText = await screen.findByText(/results for/i);
  const searchColourText = await screen.findByText(/"#fff000"/);
  expect(resultText).toBeInTheDocument();
  expect(searchColourText).toBeInTheDocument();
});

test('Display all colours text when search color is empty', async () => {
  render(<ColourResults searchColour="" rawColours={[]} error={undefined} colours={[]} />);

  const allColoursText = await screen.findByText(/all colours./i);
  expect(allColoursText).toBeInTheDocument();
});

test('Display Colour table when search colour is empty', async () => {
  const { fakeColourResponse } = await readFakeData();
  const colours = generateRGBHSL(fakeColourResponse.colors);
  render(<ColourResults searchColour="" rawColours={[]} error={undefined} colours={colours} />);

  const colourTable = await screen.findByRole('table');
  expect(colourTable).toBeInTheDocument();
});

test('Display Colour table when search colour is valid', async () => {
  const { fakeColourResponse } = await readFakeData();
  const colours = generateRGBHSL(fakeColourResponse.colors);
  render(
    <ColourResults searchColour="#fff000" rawColours={[]} error={undefined} colours={colours} />
  );

  const colourTable = await screen.findByRole('table');
  expect(colourTable).toBeInTheDocument();
});

test('Hide Colour table when search colour is not valid', async () => {
  const { fakeColourResponse } = await readFakeData();
  const colours = generateRGBHSL(fakeColourResponse.colors);
  render(<ColourResults searchColour="test" rawColours={[]} error={undefined} colours={colours} />);

  const colourTable = screen.queryByRole('table');
  expect(colourTable).not.toBeInTheDocument();
});
