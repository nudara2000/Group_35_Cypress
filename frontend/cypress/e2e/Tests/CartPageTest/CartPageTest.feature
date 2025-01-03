Feature: Cart Page Testing

  Background:
    Given the user is logged in as Standard User


  Scenario: Adding an item to the cart
    When the user adds a "Sauce Labs Backpack" to the cart
    Then the user should see the item in the cart
    And the user should see the item price "$29.99" for the "Sauce Labs Backpack"

  Scenario: Remove a product from the cart
    Given the user have added the following products to the cart:
      | Product Name      |
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Bike Light |
    When the user remove "Sauce Labs Bolt T-Shirt" from the cart
    Then the cart should not contain "Sauce Labs Bolt T-Shirt"
    And the cart should contain "Sauce Labs Bike Light"