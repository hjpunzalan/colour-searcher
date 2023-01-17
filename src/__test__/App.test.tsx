import App from '@/src/App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('Heading should display colour searcher', async () => {
  render(<App />);

  const heading = await screen.findByRole('heading', {
    name: /colour searcher/i
  });

  expect(heading).toBeInTheDocument();
});
