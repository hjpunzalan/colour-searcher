import { SearchBar } from '@/src/components/SearchBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('SearchBar should display label, input text and colour', async () => {
  render(<SearchBar colour="" setColour={jest.fn()} disabled={false} />);

  const inputText = await screen.findByLabelText(/colour/i);
  expect(inputText).toHaveAttribute('type', 'text');

  const inputColor = await screen.findByTestId('colour-picker');
  expect(inputColor).toHaveAttribute('type', 'color');
});

test('Disable search bar and colour picker if disabled is true', async () => {
  render(<SearchBar colour="" setColour={jest.fn()} disabled={true} />);

  const inputText = await screen.findByTestId('colour-search');
  expect(inputText).toBeDisabled();

  const inputColor = await screen.findByTestId('colour-picker');
  expect(inputColor).toBeDisabled();
});

test('Colour displayed in input text and input color', async () => {
  const colour = '#ff0000';
  render(<SearchBar colour={colour} setColour={jest.fn()} disabled={false} />);

  const inputText = await screen.findByLabelText(/colour/i);
  expect(inputText).toHaveAttribute('value', colour);

  const inputColor = await screen.findByTestId('colour-picker');
  expect(inputColor).toHaveAttribute('value', colour);
});
