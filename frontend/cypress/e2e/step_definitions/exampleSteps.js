import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the Google homepage", () => {
  cy.visit("https://www.google.com");
});

Then("I see the Google logo", () => {
  cy.get("img[alt='Google']").should("be.visible");
});
