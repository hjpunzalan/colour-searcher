import '@testing-library/jest-dom/extend-expect';
import { server } from './src/__test__/__mocks__/msw/server';

// Establish API mocking before all tests.
beforeAll(() => {
  console.log('IT WORKS');
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
