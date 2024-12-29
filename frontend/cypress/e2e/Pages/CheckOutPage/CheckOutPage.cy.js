class CheckoutPage {
    verifyPageTitle(expectedTitle = "Checkout: Your Information") {
        cy.get('.title').should('have.text', expectedTitle);
    }

    fillCheckoutForm(firstName, lastName, postalCode) {
        cy.get('#first-name').clear().type(firstName);
        cy.get('#last-name').clear().type(lastName);
        cy.get('#postal-code').clear().type(postalCode);
    }

    submitCheckoutForm() {
        cy.get('input[data-test="continue"]').click();
    }

    cancelCheckout() {
        cy.get('button[data-test="cancel"]').click();
    }

    validateErrorMessage(expectedMessage) {
        cy.get('h3[data-test="error"]').should('contain.text', expectedMessage);
    }
}

const checkout = new CheckoutPage();
export default checkout;
