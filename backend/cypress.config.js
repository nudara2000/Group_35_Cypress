const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:7081', // Base URL for API requests
    
    // Customizing timeouts for waiting for requests
    defaultCommandTimeout: 10000, // 10 seconds
    responseTimeout: 15000, // 15 seconds

    // Enable the screenshot feature on failure (optional)
    screenshotOnRunFailure: false,

  },
});
