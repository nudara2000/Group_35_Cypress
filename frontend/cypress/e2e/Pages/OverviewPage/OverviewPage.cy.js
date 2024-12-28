class OverviewPage {

    validateItemSubtotal(expectedSubtotal) {
        cy.get('.summary_subtotal_label')
            .should('contain.text', `Item total: $${expectedSubtotal}`);
    }

    validateTaxAmount(expectedTax) {
        cy.get('.summary_tax_label')
            .should('contain.text', `Tax: $${expectedTax}`);
    }

    validateFinalTotal(expectedTotal) {
        cy.get('.summary_total_label')
            .should('contain.text', `Total: $${expectedTotal}`);
    }

    validatePaymentDetails(expectedPaymentInfo = 'SauceCard #31337') {
        cy.get('.summary_value_label[data-test="payment-info-value"]')
            .should('contain.text', expectedPaymentInfo);
    }

    validateShippingDetails(expectedShippingInfo = 'Free Pony Express Delivery!') {
        cy.get('.summary_value_label[data-test="shipping-info-value"]')
            .should('contain.text', expectedShippingInfo);
    }

    validateProductTitle(productTitle, productIndex) {
        cy.get('.cart_item')
            .eq(productIndex - 1)
            .find('.inventory_item_name')
            .should('have.text', productTitle);
    }

    validateProductDescriptionExists(productIndex) {
        cy.get('.cart_item')
            .eq(productIndex - 1)
            .find('.inventory_item_desc')
            .should('not.be.empty');
    }

    validateProductPrice(productPrice, productIndex) {
        cy.get('.cart_item')
            .eq(productIndex - 1)
            .find('.inventory_item_price')
            .should('have.text', productPrice);
    }

    validateProductQuantity(productQuantity, productIndex) {
        cy.get('.cart_item')
            .eq(productIndex - 1)
            .find('.cart_quantity')
            .should('have.text', String(productQuantity));
    }

    completeCheckout() {
        cy.get('button[data-test="finish"]').click();
    }

    abortCheckout() {
        cy.get('button[data-test="cancel"]').click();
    }
}

const overview = new OverviewPage();
export default overview;

