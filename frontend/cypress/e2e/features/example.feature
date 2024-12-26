Feature: step_definitions validation
   
  Scenario: Check Google Homepage
    Given I open the Google homepage
    Then The page title should be "Google"
