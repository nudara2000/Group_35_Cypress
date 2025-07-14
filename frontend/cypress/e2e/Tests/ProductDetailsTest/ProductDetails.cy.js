import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import login from '../../Pages/LoginPage/LoginPage.cy';


Given('User logs in to the application', () => {
  login.enterUrl();
  login.enterStandardUsernamePassword('standard_user', 'secret_sauce');
  login.clickLoginButton();
});

When('User selects the product {string} from the list', function (productName) {
  this.selectedProductTitle = productName;
  cy.contains('.inventory_item_name', productName).should('be.visible').click();
});


Then('The product details page for {string} should open', function (expectedTitle) {
  cy.get('.inventory_details_name').should('have.text', expectedTitle);
});

Then('User should be able to view the hamburger menu' , () => {
    cy.get('.bm-burger-button').should("be.visible"); 
  });

  Then("User should be able to view the page title", () => {
    cy.get('.header_label').should("be.visible"); 
  });
  
  Then("User should be able to view the cart icon", () => {
    cy.get('.shopping_cart_link').should("be.visible"); 
  });
  
  Then("User should be able to view the {string} button", (buttonText) => {
    cy.contains("button", buttonText).should("be.visible");
  });
  
  Then("User should be able to view the product image", () => {
    cy.get('.inventory_details_img').should('be.visible');
  });
  
  Then("User should be able to view the product title", () => {
    cy.get('.inventory_details_name').should('be.visible');
  });
  
  Then("User should be able to view the product description", () => {
    cy.get('.inventory_details_desc').should('be.visible');
  });
  
  Then("User should be able to view the product price", () => {
    cy.get('.inventory_details_price').should('be.visible');
  });
  
  Then('User should be able to view the "Add to cart" button', () => {
    cy.get('.btn_inventory').should('be.visible').and('contain.text', 'Add to cart');
});

Then("User should be able to view the footer", () => {
    cy.get('.footer').should('be.visible');
  });

  When('User clicks on the "Add to cart" button', () => {
    cy.contains('button', 'Add to cart').click();
});

Then('User should be able to view the cart icon with the number of items in the cart', () => {
    cy.get('.shopping_cart_badge').should('be.visible').and('contain.text', '1');
  });       

Then('User should be able to view the "Remove" button', () => {         
        cy.get('.btn_inventory').should('be.visible').and('contain.text', 'Remove');
    });