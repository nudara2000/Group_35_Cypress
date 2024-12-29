class ConfirmPage {
    verifyThankYouMessage() {
        cy.contains('h2', 'Thank you for your order!').should('be.visible');
    }
}
const confirm = new ConfirmPage();
export default confirm;
