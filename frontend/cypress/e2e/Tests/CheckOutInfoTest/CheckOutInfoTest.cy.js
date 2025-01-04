import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import checkout from "../../Pages/CheckoutPage/CheckoutPage.cy";

Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

Given('the user goes to the cart page', () => {
    Inventory.navigateToCart();
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

// Scenario 1: Valid Information Submission
When('the user proceeds to checkout overview with valid information', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
});

Then('the user should be navigated to the "Checkout: Overview" page', () => {
    cy.url().should('include', '/checkout-step-two');
});

Then('no error messages should be displayed', () => {
    cy.get('.error-message').should('not.exist');
});

// Scenario 2 : Missing First Name
When('the user proceeds to checkout overview with missing first name', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').clear(); // Leaving the field blank
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the following error message1', () => {
    checkout.verifyFormValidationError("Error: First Name is required");
});

// Scenario: Missing Last Name
When('the user proceeds to checkout overview with missing last name', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').clear(); // Leaving the field blank
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the following error message2', () => {
    checkout.verifyFormValidationError("Error: Last Name is required");
});

// Scenario: Missing Postal Code
When('the user proceeds to checkout overview with missing postal code', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').clear(); // Leaving the field blank
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the following error message3', () => {
    checkout.verifyFormValidationError("Error: Postal Code is required");
});

// Scenario: Invalid Postal Code
When('the user proceeds to checkout overview with invalid postal code', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('abcde'); // Invalid postal code
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the following error message4', () => {
    checkout.verifyFormValidationError('Error: Postal Code is invalid');
});

// Scenario: Cancel Checkout
When('the user clicks the cancel button on the "Checkout: Your Information" page', () => {
    cy.contains('button', 'Checkout').click(); 
    cy.get('.cart_cancel_link').click();      
});

Then('the user should be navigated back to the cart page', () => {
    cy.url().should('include', '/cart.html'); 
});
