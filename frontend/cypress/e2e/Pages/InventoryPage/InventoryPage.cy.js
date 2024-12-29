const baseUrl = Cypress.config("baseUrl");

class InventoryPage {

  navigateToCart() {
    cy.get('.shopping_cart_link').click();
  }

  addItemToCart(itemName) {
    cy.contains('.inventory_item', itemName)
      .find('button[data-test^="add-to-cart"]')
      .click();
  }
  
  verifyCartEmpty() {
    cy.get('.cart_item').should('not.exist');
  }

  verifyItemsInCart(itemNames) {

    const items = Array.isArray(itemNames) ? itemNames : [itemNames];

    cy.get('.cart_item').should('have.length', items.length);

    items.forEach((itemName) => {
      cy.get('.cart_item').should('contain', itemName);
    });
  }

  verifyCartItemCount(expectedCount) {
    cy.get('.shopping_cart_badge').should('have.text', String(expectedCount));
  }
}
const inventory = new InventoryPage();
export default inventory;