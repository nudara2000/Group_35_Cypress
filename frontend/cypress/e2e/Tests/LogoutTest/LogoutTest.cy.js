import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from '../../Pages/LoginPage/LoginPage.cy'
import SideMenuBar from '../../Pages/sideMenuBar/SideMenuBar.cy'
import InventoryPage from '../../Pages/InventoryPage/InventoryPage.cy'
const sideMenuBar = new SideMenuBar();

Given('User Logged in to the application', () => {
    login.enterUrl();
    login.enterStandardUsernamePassword('standard_user', 'secret_sauce');
    login.clickLoginButton();
});

Given('User logout using the logout button', () => {
    sideMenuBar.logoutfunction();
});

When('User tries to access the restricted page', () => {
    InventoryPage.navigateToProductPageFail();
});

Then('User should be redirected to the login page', () => {
    login.enterUrl();
});