import { XKCD_JSON } from '@/src/config';
import '@testing-library/cypress';

import { cy, it } from 'local-cypress';
import { interceptIndefinitely } from '../support/utils';

it('should display loading initially', () => {
  cy.visit('/');

  const interception = interceptIndefinitely(XKCD_JSON);

  cy.findByText(/loading.../i)
    .should('exist')
    .then(() => {
      {
        // Stop loading
        interception.sendResponse();
      }
    });
});
it('displays correct heading when on homepage', () => {
  cy.visit('/');
  cy.findByRole('heading', {
    name: /Colour Searcher/i
  }).should('exist');
});

it('should display all colours text initially after loading', () => {
  cy.visit('/');
  cy.findByText(/all colours./i).should('exist');
});

it('display error message when fetch fails', () => {
  cy.visit('/')
    .intercept(
      {
        method: 'GET',
        url: XKCD_JSON
      },
      {
        statusCode: 404
      }
    )
    .as('fetchData');
  cy.findByText(/Error: unable to source XKCD colour file/i).should('exist');
});

it('show button on error and refetch on click (display all colours)', () => {
  cy.visit('/')
    .intercept(
      {
        method: 'GET',
        url: XKCD_JSON
      },
      {
        statusCode: 404
      }
    )
    .as('fetchData');
  cy.intercept(
    {
      method: 'GET',
      url: XKCD_JSON
    },
    (req) => req.continue()
  ).as('refetch');

  // Refetch
  cy.findByRole('button', {
    name: /refetch/i
  }).click();
  cy.findByTestId('colour-table-body').find('tr').should('have.length.at.least', 101);
});

it('displays top 100 similar colours with valid colour code input text', () => {
  cy.visit('/');
  cy.findByLabelText(/colour/i).type('#ff0000');

  // Check text includes results for "colour"
  cy.findByText(/results for/i).should('exist');
  cy.findByText(/ff0000"/i).should('exist');

  // Check number of similar colours is 100
  cy.findByTestId('colour-table-body').find('tr').should('have.length', 100);

  // Check top 3 result is very close to red
  for (let i = 0; i <= 2; i++) {
    cy.findByTestId('colour-table-body')
      .children()
      .eq(i)
      .children()
      .eq(1)
      .findByText(/red/i)
      .should('exist');
  }
});
