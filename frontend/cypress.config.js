const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require("cypress");
// const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
// const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
// const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber())
      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
      // const bundler = createBundler({
      //   plugins: [createEsbuildPlugin(config)],
      // });
      // on("file:preprocessor", bundler);
      // await addCucumberPreprocessorPlugin(on, config);
      // return config;
    
  },
});
