Feature: Access pages after logout

Background: 
  Given User Logged in to the application

Scenario: User tries to access the restricited page after logout
  Given User logout using the logout button
  When User tries to access the restricted page
  Then User should be redirected to the login page
