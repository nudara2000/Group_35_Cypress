const baseUrl = Cypress.config('baseUrlAPI');

class Login {
  
    loginUser(username, password) {
      return cy.request({
        method: 'OPTIONS',
        url: baseUrl, // Replace with your actual login API endpoint
        auth: {
            username: username,
            password: password,
          }, 
        failOnStatusCode: false,       
      });
    }
  }
  
  export default new Login();