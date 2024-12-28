Feature: Checkout process

  Background:
    Given the user logs into the application
    And the user navigates to the product listing page

  Scenario: Add a product to the shopping cart
    When the user adds the "Sauce Labs Backpack" to the shopping cart
    And the user navigates to the shopping cart
    Then the user should see the "Sauce Labs Backpack" listed in the cart
    And the cart badge displays a count of 1

  Scenario: Add multiple products to the shopping cart
    Given the user adds the "Sauce Labs Bike Light" and "Sauce Labs Bolt T-Shirt" to the cart
    Then the cart badge displays a count of 2

  Scenario: Proceed to checkout with valid information
    Given the user adds the "Sauce Labs Onesie" to the cart
    When the user clicks on the checkout button
    Then the user should be taken to the Checkout: Your Information page
    When the user provides valid checkout information
    Then the user should proceed to the Checkout Overview page

  Scenario: Checkout with empty fields
    Given the user adds the "Test.allTheThings() T-Shirt (Red)" to the cart
    When the user clicks on the checkout button
    And the user submits the form with empty checkout fields
    Then the user should see an error message about empty fields

  Scenario: Checkout with an invalid postal code
    Given the user adds the "Sauce Labs Fleece Jacket" to the cart
    When the user clicks on the checkout button
    And the user submits the form with an invalid postal code
    Then the user should see an error message about an invalid postal code

  Scenario: Cancel checkout
    Given the user adds the "Sauce Labs Backpack" to the cart
    When the user clicks on the checkout button
    And the user cancels during checkout
    Then the user should return to the product listing page after canceling

