Feature: Checkout: Your Information Form Validation

  Background: 
    Given the user is logged in
    And the user has the following items in the user cart
      | item                |
      | Sauce Labs Backpack |

  Scenario: Valid Information Submission
    When the user proceeds to checkout overview with valid information
      | Field        | Value  |
      |--------------|--------|
      | First Name   | John   |
      | Last Name    | Doe    |
      | Postal Code  | 12345  |
  Then the user should be navigated to the "Checkout: Overview" page
  Then no error messages should be displayed
  
  Scenario: Missing First Name
    When the user proceeds to checkout overview with missing first name
      | Field        | Value  |
      |--------------|--------|
      | Last Name    | Doe    |
      | Postal Code  | 12345  |
    Then the user should see the following error message1
    | Error                         |
    | Error: First Name is required |

  Scenario: Missing Last Name
    When the user proceeds to checkout overview with missing last name
      | Field        | Value  |
      |--------------|--------|
      | First Name   | John   |
      | Postal Code  | 12345  |
    Then the user should see the following error message2
    | Error                         |
    | Error: Last Name is required  |

  Scenario: Missing Postal Code
    When the user proceeds to checkout overview with missing postal code
      | Field        | Value  |
      |--------------|--------|
      | First Name   | John   |
      | Last Name    | Doe    |
    Then the user should see the following error message3
     | Error                         |
     | Error: Last Name is required  |


  Scenario: Invalid Postal Code
    When the user proceeds to checkout overview with invalid postal code
      | Field        | Value  |
      |--------------|--------|
      | First Name   | John   |
      | Last Name    | Doe    |
      | Postal Code  | abcde  |
    Then the user should see the following error message4
     | Error                         |
     | Error: Last Name is required  |

    Scenario: Cancel the process
    When the user clicks the cancel button on the "Checkout: Your Information" page
    Then the user should be navigated back to the cart page