/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import login from "../../Pages/LoginPage/LoginPage.cy";

Given("User visit the Sauce Demo login page", () => {
  login.enterUrl();
});

When('User enter the username {string} and password {string}', (username,password) => {
  login.enterStandardUsernamePassword(username, password);
});
And("User click on the login button", () => {
  login.clickLoginButton();
});
Then("Validate the title after login", () => {
  login.verifyPagetitle();
});
  

When("User enter the username {string} and password {string}", (username,password) => {
  login.enterLockedOutUsernamePassword(username, password);
});
And("User click on the login button", () => {
  login.clickLoginButton();
});
Then("User should see an error message {string}", (errorMessage) => {
  login.LockedUserErrorMessage(errorMessage);
});