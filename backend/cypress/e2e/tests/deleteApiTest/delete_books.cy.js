import {
    Given,
    Then,
    And,
    When
} from 'cypress-cucumber-preprocessor/steps';
import login from '../../Common/login/login.cy';
import books from '../../Common/books/books.cy';

let response;
let bookData = {
    id: 2,
    title: 'Book1',
    author: 'Author1',
};

// Background: Given user is logged into the service
Given('user is logged into the service', () => {
    login.loginUser('user', 'password');
});

Given('four books exist', () => {
    const bookList = [
        { id: 1, title: 'Good Book', author: 'Author1' },
        { id: 2, title: 'Better Book', author: 'Author2' }
    ];

    // Add each book to the list
    bookList.forEach(book => {
        books.addBook(bookData).then(() => {
            books.getBooks().then((res) => {
                response = res;
            });
        });
    });
});
// Scenario: User deletes an existing book
When('the user sends a DELETE request to remove a book with a valid ID', () => {
    books.getBooks().then((res) => {
        const highestId = Math.max(...res.body.map(book => book.id));
        books.deleteBook(highestId).then((deleteRes) => {
            response = deleteRes;
        });
    });
});

Then('the response status should be {int}', (statusCode) => {
    expect(response.status).to.eq(statusCode);
});

And('the book should no longer exist in the list when a GET request is made', () => {
    books.getBooks().then((res) => {
        expect(res.body.find(book => book.id === bookData.id)).to.be.undefined;
    });
});

// Scenario: User deletes a non-existing book
When('the user sends a DELETE request to remove a book with a non-existing ID', () => {
    const nonExistingId = 9999;
    books.deleteBook(nonExistingId).then((res) => {
        response = res;
    });
});

Then('the response status should be 404', () => {
    expect(response.status).to.eq(404);
});

And('the response message should indicate the book was not found', () => {
    expect(response.body).to.contain('Book not found');
});

// Scenario: Authorized admin deletes a book successfully
Given('the user is logged in as "Admin"', () => {
    login.loginUser('admin', 'password');
});

When('the user sends a DELETE request to remove a book with a valid ID', () => {
    books.getBooks().then((res) => {
        const highestId = Math.max(...res.body.map(book => book.id));
        books.deleteBook(highestId).then((deleteRes) => {
            response = deleteRes;
        });
    });
});

Then('the response status should be 200', () => {
    expect(response.status).to.eq(200);
});

// Scenario: Unauthorized user attempts to delete a book
Given('the user is logged in as "User"', () => {
    login.loginUser('user', 'password');
});

When('the user sends a DELETE request to remove a book with a valid ID', () => {
    books.getBooks().then((res) => {
        const highestId = Math.max(...res.body.map(book => book.id));
        books.deleteBook(highestId).then((deleteRes) => {
            response = deleteRes;
        });
    });
});


Then('the response status should git be 403', () => {
    expect(response.status).to.eq(403);
});

And('the response message should indicate "User is not permitted."', () => {
    expect(response.body).to.contain('User is not permitted.');
});
