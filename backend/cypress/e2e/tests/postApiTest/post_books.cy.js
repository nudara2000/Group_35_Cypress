import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import login from "../../Common/login/login.cy";
import Books from "../../Common/books/books.cy";

let response;

Given("User is authenticated as {string} with password {string}", (username, password) => {
  login.loginUser(username, password).then((res) => {
    response = res;
  });
});

Given("User have a book with the following details:", (dataTable) => {
  const books = dataTable.hashes().map((row) => ({
    id: row.id ? parseInt(row.id) : undefined, 
    title: row.title.replace(/"/g, ""), 
    author: row.author.replace(/"/g, ""), 
  }));

  Books.addBook(books[0]).then((res) => {
    response = res;
  });
});

Given("User have a book with the invalid data type in title:", (dataTable) => {
  const invalidBook = dataTable.hashes()[0];
  const book = {
    id: parseInt(invalidBook.id),
    title: invalidBook.title, // Leave the title as is, even if it's not a string
    author: invalidBook.author ? invalidBook.author.replace(/"/g, "") : null, // Handle undefined author
  };

  // Attempt to add the book with an invalid title
  Books.addBook(book).then((res) => {
    response = res; // Store the response for validation
  });
});

Given("User have a book with the invalid data type in id:", (dataTable) => {
  const bookDetails = dataTable.hashes()[0];

  // Construct the book data object
  const bookData = {
    id: bookDetails.id, // Invalid ID remains a string
    title: bookDetails.title.replace(/"/g, ""),
    author: bookDetails.Author.replace(/"/g, ""),
  };

  // Store the book data for use in the test
  Cypress.env("invalidBook", bookData);
});


When("User insert the book into the database", () => {
  // POST request is already handled in the `Given` step when calling Books.addBook
});

When("User insert the book into the database with invalid data type", function () {});

When("User insert the book into the database with invalid data type", () => {
  const invalidBook = Cypress.env("invalidBook");

  // Attempt to insert the book with an invalid ID
  Books.addBook(invalidBook).then((res) => {
    response = res; // Store the response for validation
  });
});



Then("the book should be inserted into the database with the insert response {int}", (statusCode) => {
  expect(response.status).to.eq(statusCode); 
});

And("the response should be contain book details with title {string} and author {string}", (expectedTitle, expectedAuthor) => {
  expect(response.body).to.have.property("title", expectedTitle);
  expect(response.body).to.have.property("author", expectedAuthor);
});

Then("the book should not be inserted into the database with the insert response {int}", (statusCode) => {
  expect(response.status).to.eq(statusCode); // Check that insertion fails with status 400
});

And("the response should be contain error message {string}", (errorMessage) => {
  expect(response.body).to.have.property("error", errorMessage); 
});
