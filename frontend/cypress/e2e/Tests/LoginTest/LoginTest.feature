Feature: User want to login into the site with valid data

Background:Navigate to the Sauce Demo login page
    Given User visit the Sauce Demo login page

  Scenario: Login as standard_user with valid data
    When User enter the username "standard_user" and password "secret_sauce"
    And User click on the login button
    Then Validate the title after login
    
  Scenario:Login as locked out user with valid data
    When User enter the username "locked_out_user" and password "secret_sauce"
    And User click on the login button
    Then User should see an error message "Epic sadface: Sorry, this user has been locked out."
