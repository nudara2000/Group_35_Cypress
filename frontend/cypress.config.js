// const cucumber = require("cypress-cucumber-preprocessor").default;
// const { defineConfig } = require("cypress");
// // const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
// // const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
// // const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'https://www.saucedemo.com',
//     specPattern: "**/*.feature",
//     setupNodeEvents(on, config) {
//       on("file:preprocessor", cucumber());
//     },
//   },
//   chromeWebSecurity: false,
// });


const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const cypressMochawesomeReporter = require("cypress-mochawesome-reporter").default;
const cypressOnFix = require("cypress-on-fix");

async function setupNodeEvents(on, config) {
  on = cypressOnFix(on);

  cypressMochawesomeReporter(on);

  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

export default defineConfig({
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