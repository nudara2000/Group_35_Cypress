import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Given step - Visit the Sauce Demo login page
Given('I visit the Sauce Demo login page', () => {
  cy.visit('https://www.saucedemo.com/');
});

// When step - Enter the username and password
When('I enter the username {string} and password {string}', (username, password) => {
  cy.get('input#user-name').type(username); // Username input field
  cy.get('input#password').type(password); // Password input field
});

// When step - Click on the login button
When('I click on the login button', () => {
  cy.get('input#login-button').click(); // Login button
});

// Then step - Assert homepage with products (successful login)
Then('I should see the homepage with products', () => {
  cy.url().should('include', '/inventory.html'); // Check URL for successful login
  cy.get('.inventory_list').should('be.visible'); // Assert that products are visible
});

// Then step - Assert error message (unsuccessful login)
Then('I should see an error message', () => {
  cy.get('h3[data-test="error"]')
    .should('be.visible')
    .and('contain', 'Epic sadface: Username and password do not match any user in this service');
});
