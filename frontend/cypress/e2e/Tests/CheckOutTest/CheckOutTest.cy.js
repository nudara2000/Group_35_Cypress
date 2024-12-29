import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import Overview from "../../Pages/OverviewPage/OverviewPage.cy";
import confirm from "../../Pages/ConfirmPage/ConfirmPage.cy";

Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

Given('the user goes to the cart page', () => {
    Inventory.navigateToCart();
});

Given('the user cart is empty', () => {
    Inventory.verifyCartEmpty();
});

Given('the user has the following items in the user cart', (dataTable) => {
    const items = dataTable.rows().map(row => row[0]);

    items.forEach(item => {
        Inventory.addItemToCart(item);
    });
    Inventory.navigateToCart();
    Inventory.verifyItemsInCart(items);
    Inventory.verifyCartItemCount(items.length);
});

When('the user proceeds to checkout overview', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('Test');
    cy.get('#last-name').type('Automation');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the "Item total: ${float}" information', (expectedTotal) => {
    Overview.verifyItemTotal(expectedTotal);
});

Then('the user should see the "Item total: $0" information', () => {
    Overview.verifyItemTotal(0);
});

Then('the user should see the "Tax: ${float}" information', (expectedTax) => {
    Overview.verifyTax(expectedTax);
});

Then('the user should see the "Total: ${float}" information', (expectedTotal) => {
    Overview.verifyTotal(expectedTotal);
});

Then('the user should see the "Payment Information: SauceCard #31337" information', () => {
    Overview.verifyPaymentInformation();
});

Then('the user should see the "Shipping Information: Free Pony Express Delivery!" information', () => {
    Overview.verifyShippingInformation();
});

Then('the user should see the item title {string} for item {int}', (itemTitle, itemIndex) => {
    Overview.verifyItemTitle(itemTitle, itemIndex);
});

Then('the user should see the item description for Item {int}', (itemIndex) => {
    Overview.verifyItemDescriptionIsNotEmpty(itemIndex);
});

Then('the user should see the item price {string} for Item {int}', (itemPrice, itemIndex) => {
    Overview.verifyItemPrice(itemPrice, itemIndex);
});

Then('the user should see the item quantity "{int}" for Item {int}', (itemQty, itemIndex) => {
    Overview.verifyItemQuantity(itemQty, itemIndex);
});