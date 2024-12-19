describe('API Automation Tests', () => {
    it('GET - Validate API Endpoint', () => {
      cy.request('GET', 'http://localhost:8080/api/endpoint')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('key');
        });
    });
  
    it('POST - Test API with Payload', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/endpoint',
        body: {
          key: 'value'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('key', 'value');
      });
    });
  });
  