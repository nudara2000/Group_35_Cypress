Feature: Login functionality for Sauce Demo

  Scenario: Successful login with valid credentials
    Given I visit the Sauce Demo login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click on the login button
    Then I should see the homepage with products

  Scenario: Unsuccessful login with invalid credentials
    Given I visit the Sauce Demo login page
    When I enter the username "invalid_user" and password "wrong_password"
    And I click on the login button
    Then I should see an error message
