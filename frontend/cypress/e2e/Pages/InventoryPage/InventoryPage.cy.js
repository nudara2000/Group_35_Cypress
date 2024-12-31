const baseUrl = Cypress.config("baseUrl");

class InventoryPage {

  navigateToProductPageFail() {
    cy.visit(baseUrl+'/inventory.html',{failOnStatusCode: false});
  }

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
  selectFilterOption(sortOption) {
    cy.get(".product_sort_container") // Replace '#sortDropdown' with the actual dropdown selector
      .select(sortOption); // Select the option by visible text
  }

  sortByName() {
    cy.get(".inventory_item_name ") // Replace '.item-name' with the selector for item names
      .then(($items) => {
        const names = $items.map((_, el) => Cypress.$(el).text()).get();
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
  }

  sortByPrice() {
    cy.get(".inventory_item_price") // Replace '.item-price' with the selector for item prices
      .then(($prices) => {
        const prices = $prices
          .map((_, el) => parseFloat(Cypress.$(el).text()))
          .get();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
  }

  sortByNameDesc() {
    cy.get('.inventory_item_name').then(($items) => {
        const names = $items.map((_, el) => Cypress.$(el).text()).get(); // Correctly map text values
        const sortedNames = [...names].sort().reverse();
        expect(names).to.deep.equal(sortedNames);
    });
}

sortByPriceDesc() {
    cy.get('.inventory_item_price').then(($prices) => {
        const priceValues = $prices
            .map((_, el) => parseFloat(Cypress.$(el).text().replace('$', ''))) // Correctly parse price values
            .get();
        const sortedPrices = [...priceValues].sort((a, b) => b - a);
        expect(priceValues).to.deep.equal(sortedPrices);
    });
}

}
const inventory = new InventoryPage();
export default inventory;