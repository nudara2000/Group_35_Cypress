import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given('I open the Google homepage', () => {
  cy.visit('https://www.google.com');
});

Then('The page title should be {string}', (expectedTitle) => {
  console.log("Expected title:", expectedTitle); // Debugging log
  cy.title().should('eq', expectedTitle); 
});
