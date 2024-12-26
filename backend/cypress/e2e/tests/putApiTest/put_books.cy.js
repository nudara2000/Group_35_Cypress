const baseUrl = Cypress.config('baseUrlAPI');
let authHeader = {};

Given('the user is authenticated as {string} with password {string}', (username, password) => {
    authHeader = {
        Authorization: `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json',
    };
});

Given('the user is not authenticated', () => {
    authHeader = {};  // Clear the authHeader when not authenticated
});

Given('a book exists with ID {int}', (id) => {
    cy.request({
        method: 'POST',
        url: `${baseUrl}/api/books`,
        headers: authHeader,
        body: {id, title: "Sample Book", author: "Sample Author"},
    }).its('status').should('be.oneOf', [201, 208]);
});

When('the user sends a PUT request to {string} with:', (path, dataTable) => {
    const data = dataTable.hashes()[0];
    cy.request({
        method: 'PUT',
        url: `${baseUrl}${path}`,
        headers: authHeader,
        failOnStatusCode: false,
        body: {
            id: data.id === "null" ? null : parseInt(data.id),
            title: data.title,
            author: data.author,
        },
    }).as('response');

});

Then('the response status code should be {int}', (statusCode) => {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then('the response should include:', (dataTable) => {
    const expectedData = dataTable.hashes()[0];
    cy.get('@response').its('body').should((body) => {
        expect(body.id).to.eq(parseInt(expectedData.id));
        expect(body.title).to.eq(expectedData.title);
        expect(body.author).to.eq(expectedData.author);
    });
});

Then('the response body should contain {string}', (message) => {
    cy.get('@response').its('body').should('include', message);
});