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

When("User insert the book into the database", () => {
  // POST request is already handled in the `Given` step when calling Books.addBook
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
