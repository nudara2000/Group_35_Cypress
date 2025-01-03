Feature: DELETE API Tests
  Background:
    Given user is logged into the service

  Scenario: User deletes an existing book
    Given the user has posted a book with a valid ID
    When the user sends a DELETE request to remove a book with a valid ID
    Then the response status should be 200
    And the book should no longer exist in the list when a GET request is made

  Scenario: User deletes a non-existing book
    When the user sends a DELETE request to remove a book with a non-existing ID
    Then the response status should be 404
    And the response message should indicate the book was not found

  Scenario: Authorized admin deletes a book successfully
    Given the user is logged in as "Admin"
    When the user sends a DELETE request to remove a book with a valid ID
    Then the response status should be 200

  Scenario: Unauthorized user attempts to delete a book
    Given the user is logged in as "User"
    When the user sends a DELETE request to remove a book with a valid ID
    Then the response status should be 403
    And the response message should indicate "User is not permitted."

