class CartPage {

    removeProductFromCart(productName) {
      cy.contains('.cart_item', productName)
        .find('button[data-test^="remove"]')
        .click();
    }

    confirmCartIsEmpty() {
      cy.get('.cart_item').should('not.exist');
    }
  
    varifyProductsInCart(productNames) {
      const products = Array.isArray(productNames) ? productNames : [productNames];
  
      cy.get('.cart_item').should('have.length', products.length);
  
      products.forEach((productName) => {
        cy.get('.cart_item').should('contain', productName);
      });
    }
  
    verifyCartBadgeCount(expectedCount) {
      cy.get('.shopping_cart_badge').should('have.text', String(expectedCount));
    }
  
    selectSortingOption(optionText) {
      cy.get('.product_sort_container').select(optionText);
    }
  
    validateSortByName() {
      cy.get('.inventory_item_name')
        .then(($items) => {
          const names = $items.map((_, el) => Cypress.$(el).text()).get();
          const sortedNames = [...names].sort();
          expect(names).to.deep.equal(sortedNames);
        });
    }
  
    validateSortByPrice() {
      cy.get('.inventory_item_price')
        .then(($prices) => {
          const prices = $prices
            .map((_, el) => parseFloat(Cypress.$(el).text()))
            .get();
          const sortedPrices = [...prices].sort((a, b) => a - b);
          expect(prices).to.deep.equal(sortedPrices);
        });
    }

    clickCheckoutButton() {
        cy.get('button[data-test="checkout"]').click();
    }
  }

  
const cart = new CartPage();
export default cart;