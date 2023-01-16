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

it('should display all colours text', () => {
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

it('show button on error and refetch on click ', () => {
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

  const interception = interceptIndefinitely(XKCD_JSON);
  cy.intercept(
    {
      method: 'GET',
      url: XKCD_JSON
    },
    (req) => req.continue()
  ).as('refetch');

  cy.findByRole('button', {
    name: /refetch/i
  })
    .click()
    .then(() => {
      interception.sendResponse();
    });
});
