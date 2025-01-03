Feature: Manage and fetch books

  Scenario: Verify response contains multiple books
    Given there are multiple books in the system
    Then the response should contain multiple books

  Scenario: Verify response returns empty list when no books exist
    Given there are no books in the system
    Then the response should be an empty list

  Scenario: Verify response contains books with correct fields
    Given user adds a book with correct fields and sends a GET request
    Then the response should contain books with correct fields