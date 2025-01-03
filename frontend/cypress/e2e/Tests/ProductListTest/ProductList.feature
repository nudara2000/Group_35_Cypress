Feature: User wants to ensure the product list loads correctly

  Background:
    Given User logs in to the application with username "standard_user" and password "secret_sauce"

    Scenario: Verify Product list should load correctly
    When User navigates to the product page
    Then Product list should be displayed
    And Product list should load within 2 seconds

    Scenario: Verify Product Items Have  Name, Price,Description and Image
    When User navigates to the product page
    Then Each product should have a  name,Description and price
    And Each product image should load correctly

    Scenario: Verify product sorting by name (A to Z)
    When User selects "Name A to Z" from the sorting dropdown
    Then  the products should be sorted alphabetically:
      | Product Name                        |
      | Sauce Labs Backpack                 |
      | Sauce Labs Bike Light               |
      | Sauce Labs Bolt T-Shirt             |
      | Sauce Labs Fleece Jacket            |
      | Sauce Labs Onesie                   |
      | Test.allTheThings() T-Shirt (Red)   |
  



    