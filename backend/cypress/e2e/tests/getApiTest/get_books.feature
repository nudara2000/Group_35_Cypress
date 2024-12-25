Feature: Manage and fetch books

  Scenario: User adds a book and retrieves the list of books
    Given user adds a book and sends a GET request to get all books
    Then the response status should be 200
    And the response should contain a list of books

  Scenario: Verify response contains multiple books
    Given there are multiple books in the system
    Then the response should contain multiple books

  Scenario: Verify response returns empty list when no books exist
    Given there are no books in the system
    Then the response should be an empty list

  Scenario: Verify response contains books with correct fields
    Given user adds a book with correct fields and sends a GET request
    Then the response should contain books with correct fields
