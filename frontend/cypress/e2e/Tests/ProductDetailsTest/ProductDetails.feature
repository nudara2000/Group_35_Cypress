Feature: After Selecting an item from the product list, the user should be able to view the product details page

Background:
    Given User logs in to the application 
    When User selects the item from the product list
    Then The correct product details page should open
    
Scenario: User should be able to view the product details page
    Then User should be able to view the hamburger menu
    And User should be able to view the page title
    And User should be able to view the cart icon
    And User should be able to view the "Back to products" button
    And User should be able to view the product image
    And User should be able to view the product title
    And User should be able to view the product description
    And User should be able to view the product price
    And User should be able to view the "Add to cart" button
    And User should be able to view the footer

Scenario: Add product to the cart
    When User clicks on the "Add to cart" button
    Then User should be able to view the cart icon with the number of items in the cart
    And User should be able to view the "Remove" button



