import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import CartPage from "../../Pages/CartPage/CartPage.cy";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";

// Background step
Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

// Scenario 1: Adding an item to the cart
When('the user adds a "Sauce Labs Backpack" to the cart', () => {
    Inventory.addItemToCart('Sauce Labs Backpack');
});

Then('the user should see the item in the cart', () => {
    Inventory.navigateToCart();
    CartPage.varifyProductsInCart('Sauce Labs Backpack');
});

Then('the user should see the item price "$29.99" for the "Sauce Labs Backpack"', () => {
    // Assuming verifyItemPrice method exists in CartPage
    CartPage.verifyItemPrice('Sauce Labs Backpack', '$29.99');
});

//Scenario 02: Remove a product from the cart
Given('the user have added the following products to the cart:', (dataTable) => {
    const products = dataTable.rows().map(row => row[0]);
    products.forEach(product => {
        InventoryPage.addItemToCart(product);
    });
    InventoryPage.navigateToCart();
    CartPage.varifyProductsInCart(products);
});

When('the user remove {string} from the cart', (productName) => {
    CartPage.removeProductFromCart(productName);
});

Then('the cart should not contain {string}', (productName) => {
    cy.get('.cart_item').should('not.contain', productName);
});

Then('the cart should contain {string}', (productName) => {
    cy.get('.cart_item').should('contain', productName);
});

