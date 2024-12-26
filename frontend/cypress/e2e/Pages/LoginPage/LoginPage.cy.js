/// <reference types="cypress" />
const baseUrl = Cypress.config('baseUrl');

class LoginPage {
  enterUrl() {
    cy.visit(baseUrl);
  }

  enterStandardUsernamePassword(username, password) {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    return this;
  }

  enterLockedOutUsernamePassword(username,password) {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    return this;
  }
 
  clickLoginButton() {
    cy.get('[type="submit"]').eq(0).click();
    return this;
  }

  verifyPagetitle() {
    return cy.title().should('eq', 'Swag Labs');
  }

  LockedUserErrorMessage(errorMessage) {
    cy.get('[data-test="error"]').should("have.text", errorMessage);
    return this;
  }
}

const login = new LoginPage();
export default login;