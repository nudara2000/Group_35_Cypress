const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Replace <port> with the actual port number
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
