class CheckPage {
    visitCheckoutPage() {
        cy.url().should("include", "checkout-step-one.html");
      }
    
      verifyTitle(expectedTitle) {
        cy.get(".title").should("contain.text", expectedTitle);
      }
    
      fillCheckoutForm(firstName, lastName, postalCode) {
        if (firstName) {
          cy.get('[data-test="firstName"]').clear().type(firstName);
        } else {
          cy.get('[data-test="firstName"]').clear();
        }
    
        if (lastName) {
          cy.get('[data-test="lastName"]').clear().type(lastName);
        } else {
          cy.get('[data-test="lastName"]').clear();
        }
    
        if (postalCode) {
          cy.get('[data-test="postalCode"]').clear().type(postalCode);
        } else {
          cy.get('[data-test="postalCode"]').clear();
        }
      }
    
      submitForm() {
        cy.get('[data-test="continue"]').click();
      }
    
      verifyFormValidationError(expectedMessage) {
        cy.get('[data-test="error"]',)
          .should("be.visible")
          .and("contain.text", expectedMessage);
      }
    
      verifyInvalidPostalCodeError() {
        cy.get('[data-test="error"]', { timeout: 15000 }).should("not.exist");
      }
    
      clickCancelButton() {
        cy.get('[data-test="cancel"]').click();
      }
    
      verifyPreviousPage() {
        cy.url().should("include", "cart.html");
      }
    
      verifyCheckoutButton() {
        cy.get('button[data-test="checkout"]')
          .should("be.visible")
          .and("not.be.disabled");
      }
    
      clickCheckoutButton() {
        cy.get('button[data-test="checkout"]')
          .should("be.visible")
          .and("not.be.disabled")
          .click();
      }
  }

const checkout = new CheckPage();
export default checkout;
