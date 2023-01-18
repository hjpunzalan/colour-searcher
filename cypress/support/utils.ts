import { colourDistance } from '@/src/lib/utils';
import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from 'cypress/types/net-stubbing';
import { cy } from 'local-cypress';
// Create a Promise and capture a reference to its resolve
// function so that we can resolve it when we want to:
export const interceptIndefinitely = (
  requestMatcher: RouteMatcher,
  response?: StaticResponse | HttpResponseInterceptor
): { sendResponse: (value?: unknown) => void } => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let sendResponse: (value?: unknown) => void = () => {};
  const trigger = new Promise((resolve) => {
    sendResponse = resolve;
  });

  // Intercept requests to the URL we are loading data from and do not
  // let the response occur until our above Promise is resolved
  cy.intercept(requestMatcher, (request) => {
    return trigger.then(() => {
      request.reply(response);
    });
  });
  return { sendResponse };
};

// Check if colour table is sorted by colour distance correctly
export const checkColoursIsSorted = (colourCode: string) => {
  // Check number of similar colours is 100
  cy.findByTestId('colour-table-body').find('tr').should('have.length', 100);

  // Check result is in order
  const colourDistanceFromRed: number[] = [];
  for (let i = 0; i <= 99; i++) {
    cy.findByTestId('colour-table-body')
      .children()
      .eq(i)
      .children()
      .eq(3)
      .then((el) => {
        const clrDistance = colourDistance(colourCode, el.text());
        colourDistanceFromRed.push(clrDistance);
        if (i !== 0 && clrDistance < colourDistanceFromRed[i - 1]) {
          throw new Error(`Colour distance of index ${i} is less than previous index.`);
        }
      });
  }
};
