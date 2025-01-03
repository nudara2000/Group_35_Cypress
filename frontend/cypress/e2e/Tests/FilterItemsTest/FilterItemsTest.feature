Feature: Sort Items in the Porducts page
  Background:
    Given the user is logged in

  Scenario: Sort items by price low to high
    When the user selects "Price (low to high)" from the dropdown
    Then the items should be sorted by price in ascending order

  Scenario: Sort items by name Z-A
    When the user selects "Name (Z to A)" from the dropdown
    Then the items should be sorted alphabetically by name in descending order

  Scenario: Sort items by price high to low
    When the user selects "Price (high to low)" from the dropdown
    Then the items should be sorted by price in descending order