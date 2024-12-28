const baseUrl = Cypress.config("baseUrl");

class InventoryPage {
    attemptVisitProductPage() {
      cy.visit(baseUrl + 'inventory.html', { failOnStatusCode: false });
    }
  
    addProductToCart(productName) {
      cy.contains('.inventory_item', productName)
        .find('button[data-test^="add-to-cart"]')
        .click();
    }
     
    navigateToCart() {
        cy.get('.shopping_cart_link').click();
      }
}
const inventory = new InventoryPage();
export default inventory;