import '@testing-library/cypress';

import { cy, it } from 'local-cypress';

it('displays correct heading when on homepage', () => {
  cy.visit('/');
  cy.findByRole('heading', {
    name: /Colour Searcher/i
  }).should('exist');
});
