import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import inventory from "../../Pages/InventoryPage/InventoryPage.cy";


Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});
  
  When("the user adds the {string} to the cart", (itemName) => {
    inventory.addItemToCart(itemName);
  });
  
  When("the user views the cart", () => {
    inventory.navigateToCart();
  });
  
  Then("the user should see the {string} in the cart", (itemName) => {
    inventory.verifyItemsInCart(itemName);
  });
  
  Then(
    "the user should see the {string} and {string} in the cart",
    (item1, item2) => {
      const itemNames = [item1, item2];
      inventory.verifyItemsInCart(itemNames);
    }
  );
  
  Then("the cart item count should be {int}", (expectedCount) => {
    inventory.verifyCartItemCount(expectedCount);
  });
  
  Given(
    "the user has added the {string} and {string} to the cart",
    (item1, item2) => {
      inventory.addItemToCart(item1);
      inventory.addItemToCart(item2);
      inventory.navigateToCart();
      inventory.verifyItemsInCart([item1, item2]);
      inventory.verifyCartItemCount(2);
    }
);