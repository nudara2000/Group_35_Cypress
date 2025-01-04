Feature: Manage and fetch book by ID

  Background:

    Given the user logs in with username 'admin' with password 'password'

  Scenario: Fetching a valid book by ID as admin
    Given a valid book ID exists
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details

  Scenario: Fetching a valid book by ID with "user"
    Given a valid book ID exists
    And the user logs in with username 'user' with password 'password'
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details
