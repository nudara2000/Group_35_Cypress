describe('Library System API Tests', () => {
  const baseUrl = 'http://localhost:7081/api/books';
  const adminCredentials = { username: 'admin', password: 'password' };
  const userCredentials = { username: 'user', password: 'password' };
  let bookId;

  // Test for POST /api/books - Create a book
  it('should create a book (POST)', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: {
        title: 'Cypress Testing 101',
        author: 'John Doe'
      },
      auth: adminCredentials, // Only admin can create a book
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201); // Book created successfully
      bookId = response.body.id; // Save the book ID for further tests
    });
  });

  // Test for GET /api/books - Get all books
  it('should fetch all books (GET)', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      auth: adminCredentials // Admin user has access
    }).then((response) => {
      expect(response.status).to.eq(200); // Successfully fetched books
      expect(response.body).to.be.an('array');
    });
  });

  // Test for GET /api/books/{id} - Get a book by ID
  it('should fetch a book by ID (GET)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/${bookId}`, // Use the bookId from the previous test
      auth: adminCredentials
    }).then((response) => {
      expect(response.status).to.eq(200); // Successfully fetched book
      expect(response.body).to.have.property('id', bookId);
    });
  });

  // Test for PUT /api/books/{id} - Update a book
  it('should update a book (PUT)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${bookId}`,
      body: {
        id: bookId,
        title: 'Updated Cypress Testing',
        author: 'Jane Doe'
      },
      auth: adminCredentials
    }).then((response) => {
      expect(response.status).to.eq(200); // Successfully updated book
      expect(response.body).to.have.property('title', 'Updated Cypress Testing');
      expect(response.body).to.have.property('author', 'Jane Doe');
    });
  });

  // Test for DELETE /api/books/{id} - Delete a book
  it('should delete a book (DELETE)', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${bookId}`,
      auth: adminCredentials
    }).then((response) => {
      expect(response.status).to.eq(200); // Successfully deleted book
    });
  });

  // Special Notes - Check invalid request (Empty body)
  it('should return 400 for invalid book creation (POST)', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: {}, // Empty body
      auth: adminCredentials,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); // Invalid parameters
    });
  });

  // Test unauthorized access for non-admin users
  it('should return 403 for non-admin trying to create a book (POST)', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: {
        title: 'Unauthorized Book',
        author: 'Unauthorized Author'
      },
      auth: userCredentials, // Non-admin user
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403); // Forbidden access
    });
  });

  // Test for GET /api/books/{id} - Unauthorized access (user)
  it('should return 404 for non-existent book (GET)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/999999`, // Invalid book ID
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404); // Book not found
    });
  });
});
