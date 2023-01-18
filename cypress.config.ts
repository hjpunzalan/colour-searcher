import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
    baseUrl: 'http://127.0.0.1:4173/colour-searcher/'
  }
});
