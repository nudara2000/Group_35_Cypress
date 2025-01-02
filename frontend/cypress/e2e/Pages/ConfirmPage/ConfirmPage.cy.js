class ConfirmPage {
    verifyThankYouMessage() {
        cy.contains('h2', 'Thank you for your order!').should('be.visible');
    }

        verifyHeaderText() {
          cy.get(".complete-header")
            .should("be.visible")
            .and("contain.text", "Thank you for your order!");
        }
      
        verifyConfirmationText() {
          cy.get(".complete-text")
            .should("be.visible")
            .and(
              "contain.text",
              "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
            );
        }
      
        clickBackHome() {
          cy.get('button[data-test="back-to-products"]').click();
        }
      
        verifyRedirectToProductsPage() {
          cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
        }
      }
      
const confirm = new ConfirmPage();
export default confirm;
