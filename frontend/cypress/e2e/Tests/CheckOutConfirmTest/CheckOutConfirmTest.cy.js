import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import confirm from "../../Pages/ConfirmPage/ConfirmPage.cy";
import overview from "../../Pages/OverviewPage/OverviewPage.cy";

Given('the user is logged in', () => {
  cy.login('standard_user', 'secret_sauce');
});

When("the user adds the {string} to the cart", (itemName) => {
  Inventory.addItemToCart(itemName);
});

When("the user views the cart", () => {
  Inventory.navigateToCart();
});

Then("the user should see the {string} in the cart", (itemName) => {
  Inventory.verifyItemsInCart(itemName);
});

Then("the cart item count should be {int}", (expectedCount) => {
  Inventory.verifyCartItemCount(expectedCount);
});

Given(
  "the user has added the {string} and {string} to the cart",
  (item1, item2) => {
    Inventory.addItemToCart(item1);
    Inventory.addItemToCart(item2);
    Inventory.navigateToCart();
    Inventory.verifyItemsInCart([item1, item2]);
    Inventory.verifyCartItemCount(2);
  }
);

When("the user proceeds to checkout overview", () => {
  cy.contains("button", "Checkout").click();
  cy.get("#first-name").type("John");
  cy.get("#last-name").type("Doe");
  cy.get("#postal-code").type("12345");

  cy.get("#first-name").should("have.value", "John");
  cy.get("#last-name").should("have.value", "Doe");
  cy.get("#postal-code").should("have.value", "12345");

  cy.get('input[value="Continue"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

When("the user clicks the finish button", () => {
  overview.finishCheckout();
});

Then("the user should be navigated to the Checkout Complete page", () => {
  cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
});

Then("the user should see the {string} message", (message) => {
  confirm.verifyHeaderText();
});

Then(
  "the user should see the confirmation text {string}",
  (confirmationText) => {
    confirm.verifyConfirmationText();
  }
);

Then("the user clicks the {string} button", (buttonName) => {
  confirm.clickBackHome();
});

Then("the user should be navigated back to the products page", () => {
  confirm.verifyRedirectToProductsPage();
});
