import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import Overview from "../../Pages/OverviewPage/OverviewPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";
import Cart from "../../Pages/CartPage/CartPage.cy";
import checkout from "../../Pages/CheckOutPage/CheckOutPage.cy";


Given("the user logs into the application", () => {
  Login.enterUrl();
  Login.enterStandardUsernamePassword("standard_user", "secret_sauce");
  Login.clickLoginButton();
});

Given("the user navigates to the product listing page", () => {
  Inventory.attemptVisitProductPage();
});

When("the user adds the {string} to the shopping cart", (productName) => {
  Inventory.addProductToCart(productName);
});

When("the user navigates to the shopping cart", () => {
  Inventory.navigateToCart();
});

Then("the user should see the {string} listed in the cart", () => {
  Cart.clickCheckoutButton();
});

Then("the cart badge displays a count of {int}", (expectedCount) => {
  Cart.verifyCartBadgeCount(expectedCount);
});

Given("the user adds the {string} and {string} to the cart", (product1, product2) => {
  Inventory.addProductToCart(product1);
  Inventory.addProductToCart(product2);
  Inventory.navigateToCart();
  Cart.varifyProductsInCart([product1, product2]);
  Cart.verifyCartBadgeCount(2);
});


When("the user clicks on the checkout button", () => {
  Cart.proceedToCheckout();
});

Then("the user should be taken to the Checkout: Your Information page", () => {
  checkout.verifyPageTitle();
});


When("the user provides valid checkout information", () => {
  checkout.fillCheckoutForm("John", "Doe", "12345");
  checkout.submitCheckoutForm();
});


When("the user submits the form with empty checkout fields", () => {
  checkout.fillCheckoutForm("", "", "");
  checkout.submitCheckoutForm();
});

When("the user submits the form with an invalid postal code", () => {
  checkout.fillCheckoutForm("John", "Doe", "abcde");
  checkout.submitCheckoutForm();
});


When("the user cancels during checkout", () => {
  checkout.cancelCheckout();
});

Then("the user should see an error message about empty fields", () => {
  checkout.validateErrorMessage("Error: First Name is required");
});

Then("the user should see an error message about an invalid postal code", () => {
  checkout.validateErrorMessage("Error: Postal Code is invalid");
});

Then("the user should return to the product listing page after canceling", () => {
  cy.url().should("eq", `${Cypress.config("baseUrl")}inventory.html`);
});





// // Checkout overview validations
// Given("the user navigates to the cart", () => {
//   inventoryPage.openCart();
// });

// Given("the user's cart is empty", () => {
//   inventoryPage.verifyCartIsEmpty();
// });

// Given("the user adds the following products to the cart", (dataTable) => {
//   const products = dataTable.rows().map((row) => row[0]);

//   products.forEach((product) => {
//     inventoryPage.addProduct(product);
//   });
//   inventoryPage.openCart();
//   inventoryPage.checkProductsInCart(products);
//   inventoryPage.checkCartBadgeCount(products.length);
// });

// When("the user proceeds to the checkout overview page", () => {
//   cy.contains("button", "Checkout").click();
//   cy.get("#first-name").type("John");
//   cy.get("#last-name").type("Doe");
//   cy.get("#postal-code").type("12345");
//   cy.get('input[value="Continue"]').click();
// });

// Then('the user should see the item total as "${float}"', (expectedSubtotal) => {
//   overviewPage.validateItemSubtotal(expectedSubtotal);
// });

// Then('the user should see the tax amount as "${float}"', (expectedTax) => {
//   overviewPage.validateTaxAmount(expectedTax);
// });

// Then('the user should see the total amount as "${float}"', (expectedTotal) => {
//   overviewPage.validateFinalTotal(expectedTotal);
// });

// Then('the user should see the payment details as "SauceCard #31337"', () => {
//   overviewPage.validatePaymentDetails();
// });

// Then('the user should see the shipping details as "Free Pony Express Delivery!"', () => {
//   overviewPage.validateShippingDetails();
// });

// Then("the user should see the title {string} for product {int}", (productTitle, productIndex) => {
//   overviewPage.validateProductTitle(productTitle, productIndex);
// });

// Then("the user should see a description for product {int}", (productIndex) => {
//   overviewPage.validateProductDescriptionExists(productIndex);
// });

// Then("the user should see the price {string} for product {int}", (productPrice, productIndex) => {
//   overviewPage.validateProductPrice(productPrice, productIndex);
// });

// Then("the user should see the quantity {int} for product {int}", (productQty, productIndex) => {
//   overviewPage.validateProductQuantity(productQty, productIndex);
// });

// Then("the user should see the item total {string} for product {int}", (productTotal, productIndex) => {
//   overviewPage.validateProductTotal(productTotal, productIndex);
// });

// // Checkout completion