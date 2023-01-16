import { SearchBar } from '@/src/components/SearchBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('SearchBar should display label, input text and colour', async () => {
  render(<SearchBar colour="" setColour={jest.fn()} disabled={false} />);

  let inputText = await screen.findByLabelText(/colour/i);
  expect(inputText).toBeInTheDocument();

  inputText = await screen.findByTestId('colour-search');
  expect(inputText).toBeInTheDocument();

  const inputColor = await screen.findByTestId('colour-picker');
  expect(inputColor).toBeInTheDocument();
});
