Feature: Checkout: Order Completion
 
  Background:
    Given the user is logged in
    
  Scenario: User adds an item to the cart
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user views the cart
    Then the user should see the "Sauce Labs Backpack" in the cart
    And the cart item count should be 1

  Scenario: User proceeds to checkout and Confirm the Order
    Given the user has added the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When the user proceeds to checkout overview
    And the user clicks the finish button
    Then the user should be navigated to the Checkout Complete page
    And the user should see the "Thank you for your order!" message
    And the user should see the confirmation text "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    And the user clicks the "Back Home" button
    Then the user should be navigated back to the products page