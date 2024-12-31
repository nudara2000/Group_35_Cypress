Feature: Inserting books into the database

Background: 
    Given User is authenticated as "user" with password "password"

  Scenario: Inserting a book into the database
    Given User have a book with the following details:
      | id  | title                   | author             | 
      | 01  | "Rich Dad and Poor Dad" | "Robert Kiyosaki"  | 
    When User insert the book into the database
    Then the book should be inserted into the database with the insert response 201
    And the response should be contain book details with title "Rich Dad and Poor Dad" and author "Robert Kiyosaki"

   
   Scenario: Inserting another book into the database
    Given User have a book with the following details:
      | id | title                   | author             | 
      | 02 | "The Alchemist"         | "Paulo Coelho"     | 
    When User insert the book into the database
    Then the book should be inserted into the database with the insert response 201
    And the response should be contain book details with title "The Alchemist" and author "Paulo Coelho"


  Scenario: Inserting a book with missing mandoatory fields -  title
    Given User have a book with the following details:
      | id | title                   | author             | 
      | 03 |                         | "James Clear"     | 
    When User insert the book into the database
    Then the book should not be inserted into the database with the insert response 400
    And the response should be contain error message "Title is required"


    Scenario: Inserting a book with missing mandoatory fields -  author
    Given User have a book with the following details:
      | id | title                   | author             | 
      | 04 | "Atomic Habits"         |                    | 
    When User insert the book into the database
    Then the book should not be inserted into the database with the insert response 400
    And the response should be contain error message "Author is required"
