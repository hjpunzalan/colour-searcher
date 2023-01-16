import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from 'cypress/types/net-stubbing';
import { cy } from 'local-cypress';
// Create a Promise and capture a reference to its resolve
// function so that we can resolve it when we want to:
export function interceptIndefinitely(
  requestMatcher: RouteMatcher,
  response?: StaticResponse | HttpResponseInterceptor
): { sendResponse: (value?: unknown) => void } {
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
}
