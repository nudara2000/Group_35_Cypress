import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import inventory from "../../Pages/InventoryPage/InventoryPage.cy";

Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

When('the user selects {string} from the dropdown', (sortOption) => {
    inventory.selectFilterOption(sortOption);
});

Then('the items should be sorted by price in ascending order', () => {
    inventory.sortByPrice();
});

Then('the items should be sorted alphabetically by name in descending order', () => {
    inventory.sortByNameDesc();
});

Then('the items should be sorted by price in descending order', () => {
    inventory.sortByPriceDesc();
});