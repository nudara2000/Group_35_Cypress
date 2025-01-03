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
    emptyCart() {
        cy.get('.cart_item').each(($el) => {
            cy.wrap($el)
                .find('button[data-test^="remove"]')
                .click();
        });
    }

    verifyCartBadgeCount(expectedCount) {
      cy.get('.shopping_cart_badge').should('have.text', String(expectedCount));
    }
    clickCheckoutButton() {
        cy.get('button[data-test="checkout"]').click();
    }
  }


const cart = new CartPage();
export default cart;