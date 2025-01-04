const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require("cypress");
const cypressOnFix = require("cypress-on-fix");

async function setupNodeEvents(on, config) {
  on = cypressOnFix(on);
  require('cypress-mochawesome-reporter/plugin')(on)
  on("file:preprocessor", cucumber());

  return config;
}

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports",
    overwrite: false,
    saveJson: true,
    saveHtml: true,
    code: false,
  },
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: "**/*.feature",
    setupNodeEvents,
    video: true,
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true,
    videoCompression: 32,
    screenshotsFolder: "cypress/screenshots",
  },
});