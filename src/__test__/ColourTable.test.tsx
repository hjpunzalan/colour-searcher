import { ColourTable } from '@/src/components/ColourTable';
import { generateRGBHSL } from '@/src/lib/utils';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { readFakeData } from './__mocks__/fakeData';

test('ColoursTable should be hidden if theres no colours', () => {
  render(<ColourTable colours={[]} />);

  const table = screen.queryByRole('table');
  expect(table).not.toBeInTheDocument();
});

test('ColoursTable should be visible with valid colours', async () => {
  const { fakeColourResponse } = await readFakeData();
  const colours = generateRGBHSL(fakeColourResponse.colors);
  render(<ColourTable colours={colours} />);

  const table = await screen.findByRole('table');
  expect(table).toBeInTheDocument();
});

test('ColoursTable should have correct table heads', async () => {
  const { fakeColourResponse } = await readFakeData();
  const colours = generateRGBHSL(fakeColourResponse.colors);
  render(<ColourTable colours={colours} />);

  const tableHead = await screen.findByTestId('colour-table-head');
  expect(tableHead.children.length).toBe(5);

  expect(tableHead.children[1].textContent?.toLowerCase()).toContain('name');
  expect(tableHead.children[2].textContent?.toLowerCase()).toContain('hex');
  expect(tableHead.children[3].textContent?.toLowerCase()).toContain('rgb');
  expect(tableHead.children[4].textContent?.toLowerCase()).toContain('hsl');
});

test('table body should have correct number of children and has correct table data', async () => {
  const { fakeColourResponse } = await readFakeData();
  const dataLength = fakeColourResponse.colors.length;
  const colours = generateRGBHSL(fakeColourResponse.colors.slice(0, dataLength));
  render(<ColourTable colours={colours} />);

  const tableBody = await screen.findByTestId('colour-table-body');
  expect(tableBody.children.length).toBe(dataLength);

  expect(tableBody.children[0].children.length).toBe(5);

  // Table body should have color, color name, hex,rgb,hsl
  expect(tableBody.children[0].children[0].children[0].getAttribute('style')).toBe(
    `background-color: ${colours[0].rgb};`
  );
  expect(tableBody.children[0].children[1].textContent?.toLowerCase()).toBe(
    colours[0].color.toLowerCase()
  );
  expect(tableBody.children[0].children[2].textContent?.toLowerCase()).toBe(
    colours[0].hex.toLowerCase()
  );
  expect(tableBody.children[0].children[3].textContent?.toLowerCase()).toBe(
    colours[0].rgb.toLowerCase()
  );
  expect(tableBody.children[0].children[4].textContent?.toLowerCase()).toBe(
    colours[0].hsl.toLowerCase()
  );
});
