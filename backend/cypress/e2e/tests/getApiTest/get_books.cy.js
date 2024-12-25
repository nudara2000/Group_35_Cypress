import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import login from '../../Common/login/login.cy';
import books from '../../Common/books/books.cy';

let response;
let bookData = {
  id: 1,
  title: 'Book1',
  author: 'Author1',
};

// Step Definition: Given user adds a book and sends a GET request to get all books
Given('user adds a book and sends a GET request to get all books', () => {
  login.loginUser('user', 'password'); // Log in as a user

  // Add the book to the system
  books.addBook(bookData).then(() => {
    // After adding the book, fetch the list of books
    books.getBooks().then((res) => {
      response = res;
    });
  });
});

console.log('response:', response);
Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);  // Check that status code is correct
});

And('the response should contain a list of books', () => {
  expect(response.body[0]).to.deep.equal(bookData);  // Check that the book is added correctly
});


// Test Case 2: Verify Response Contains Multiple Books
Given('there are multiple books in the system', () => {
  login.loginUser('user', 'password');
  // Add multiple books
  const booksData = [
    { id: 1, title: 'Book1', author: 'Author1' },
    { id: 2, title: 'Book2', author: 'Author2' },
    { id: 3, title: 'Book3', author: 'Author3' }
  ];

  // Add each book
  booksData.forEach((book) => {
    books.addBook(book);
  });
});

Then('the response should contain multiple books', () => {
  books.getBooks().then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.length).to.be.greaterThan(1); // Check that there are multiple books
  });
});

// Test Case 3: Verify Response Returns Empty List When No Books Exist
Given('there are no books in the system', () => {
  login.loginUser('user', 'password');
  // Ensure there are no books by deleting them (if needed)
  books.getBooks().then((res) => {
    res.body.forEach((book) => {
      books.deleteBook(book.id); // Delete all existing books
    });
  });
});

Then('the response should be an empty list', () => {
  books.getBooks().then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.be.an('array').that.is.empty; // Check if the list is empty
  });
});

// Test Case 4: Verify Response Contains Correct Fields
Given('user adds a book with correct fields and sends a GET request', () => {
  login.loginUser('user', 'password');
  // Add the book with required fields
  books.addBook(bookData).then(() => {
    // After adding, fetch the list of books
    books.getBooks().then((res) => {
      response = res;
    });
  });
});

Then('the response should contain books with correct fields', () => {
  expect(response.body[0]).to.have.all.keys('id', 'title', 'author'); // Check if each book has 'id', 'title', and 'author'
});
