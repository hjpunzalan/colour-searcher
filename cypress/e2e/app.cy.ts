import { XKCD_JSON } from '@/src/config';
import '@testing-library/cypress';
import { checkColoursIsSorted } from './../support/utils';

import { cy, it } from 'local-cypress';
import { interceptIndefinitely } from '../support/utils';

it('Display loading initially and disable text and colour input', () => {
  const interception = interceptIndefinitely(XKCD_JSON);
  cy.visit('/');

  // Check inputs are disabled
  cy.findByLabelText(/colour/i).should('be.disabled');
  cy.findByTestId('colour-picker').should('be.disabled');

  cy.findByText(/loading.../i)
    .should('exist')
    .then(() => {
      {
        // Stop loading
        interception.sendResponse();
      }
    });
});
it('Displays correct heading when on homepage', () => {
  cy.visit('/');
  cy.findByRole('heading', {
    name: /Colour Searcher/i
  }).should('exist');
});

it('Display all colours text initially after loading', () => {
  cy.visit('/');
  cy.findByText(/all colours./i).should('exist');
});

it('Display error message when fetch fails and disable text and colour input', () => {
  cy.intercept(
    XKCD_JSON,
    { times: 1 },
    {
      statusCode: 404
    }
  ).as('fetchData');
  cy.visit('/');
  cy.wait('@fetchData');

  // Check inputs are disabled after receiving error
  cy.findByLabelText(/colour/i).should('be.disabled');
  cy.findByTestId('colour-picker').should('be.disabled');

  cy.findByText(/Error: unable to source XKCD colour file/i).should('exist');
});

it('Show button on error,  disable text and colour input and refetch on click (display all colours)', () => {
  cy.intercept(
    XKCD_JSON,
    { times: 1 },
    {
      statusCode: 404
    }
  ).as('fetchData');
  cy.visit('/');
  cy.wait('@fetchData');

  // Check inputs are disabled after receiving error
  cy.findByLabelText(/colour/i).should('be.disabled');
  cy.findByTestId('colour-picker').should('be.disabled');

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
  })
    .click()
    .wait('@refetch');
  cy.findByTestId('colour-table-body').find('tr').should('have.length.at.least', 101);
});

it('Input Text: displays top 100 similar colours with valid colour code input text', () => {
  cy.visit('/');
  cy.findByLabelText(/colour/i).type('#ff0000');

  // Check text includes results for "colour"
  cy.findByText(/results for/i).should('exist');
  cy.findByText(/ff0000"/i).should('exist');

  checkColoursIsSorted('#ff0000');
});

it('Colour Input: displays top 100 similar colours with valid colour code input color', () => {
  cy.intercept(XKCD_JSON).as('fetchData');
  cy.visit('/');
  cy.wait('@fetchData');
  cy.findByTestId('colour-picker').invoke('val', '#ff0000').trigger('input');

  checkColoursIsSorted('#ff0000');
});

it('Displays invalid colour code warning upon invalid input and hides table', () => {
  cy.visit('/');
  cy.findByLabelText(/colour/i).type('test');

  // Check text should say its not a valid code
  cy.findByText(/"test" is not a valid colour code/i).should('exist');
  cy.findByRole('table').should('not.exist');
});

it('Deleting blank input will fetch original data that is more than 100', () => {
  cy.visit('/');
  cy.findByLabelText(/colour/i).type('test');

  // Check text should say its not a valid code
  cy.findByText(/"test" is not a valid colour code/i).should('exist');

  // Clear input
  cy.findByLabelText(/colour/i).clear();
  // Should display table
  cy.findByTestId('colour-table-body').find('tr').should('have.length.at.least', 101);
});
