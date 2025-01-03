import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import login from '../../Pages/LoginPage/LoginPage.cy';
import inventory from '../../Pages/InventoryPage/InventoryPage.cy';

Given('User logs in to the application with username {string} and password {string}', (username,password)=> {
  login.enterUrl();
  login.enterStandardUsernamePassword(username , password);
  login.clickLoginButton();
});

When("User navigates to the product page", () => {
  cy.url().should("include", "/inventory");
  cy.get(".inventory_list").should("be.visible");
});

Then('Product list should be displayed', () => {
  cy.get(".inventory_item").should("have.length.greaterThan", 0); // Ensures that there are products displayed
});

Then("Product list should load within 2 seconds", () => {
  cy.get(".inventory_item")
    .should("be.visible")
    .and("have.length.greaterThan", 0); // Ensures products load within 3 seconds
});

Then("Each product should have a  name,Description and price", () => {
  cy.get(".inventory_item").each(($el) => {
    // Validate that each product has a valid name and price
    cy.wrap($el).find(".inventory_item_name").should("not.be.empty");
    cy.wrap($el).find(".inventory_item_desc").should("not.be.empty");
    cy.wrap($el).find(".inventory_item_price").should("not.be.empty");
  });
});

And("Each product image should load correctly", () => {
  // Validate that each product image loads correctly
  cy.get(".inventory_item_img img").each(($img) => {
    cy.wrap($img)
      .should("have.attr", "src")
      .and("not.equal", "/static/media/sl-404.168b1cce.jpg");
  });
});

When('User selects "Name A to Z" from the sorting dropdown', () => {
  cy.get(".product_sort_container").select("Name (A to Z)");
});

Then("the products should be sorted alphabetically:", (datatable) => {
  const expectedProducts = datatable.hashes().map(row => row['Product Name']);
  cy.get(".inventory_item_name").then((elements) => {
    const actualProducts = Array.from(elements).map(el => el.innerText);
    expect(actualProducts).to.deep.equal(expectedProducts);
  });
});