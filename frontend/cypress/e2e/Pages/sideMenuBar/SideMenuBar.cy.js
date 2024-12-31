const baseUrl = Cypress.config('baseUrl');

class SideMenuBar {
    logoutfunction(){
        cy.get('#react-burger-menu-btn').click(); //  side menu button selector
        cy.get('#logout_sidebar_link').should('be.visible').click(); // logout button selector
        cy.url().should('include', baseUrl); // User should redirected to the login page
    }
}

export default SideMenuBar;