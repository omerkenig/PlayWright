import {chromium, firefox} from "@playwright/test";
import {DashboardPage} from "../PageObjects/DashboardPage";

const {test, expect} = require('@playwright/test');
// const {LoginPage} = require('../PageObjects/LoginPage');
// const {DashboardPage} = require('../PageObjects/DashboardPage');
import {POManagerPage} from '../PageObjects/POManagerPage';

test('Browser Context Playwright test', async ({page}) => {


    const browser = await chromium.launch({headless: false}); // Will open a visible browser window

    const poManager = new POManagerPage(page);
    const WrongUserName = 'OmerKenig';
    const WrongPassword = 'learning';
    const CorrectUserName = 'Aa010110@aaa.com';
    const CorrectPassword = 'Aa010110';
    const productName = 'ADIDAS ORIGINAL';

    const loginPage = poManager.getLoginPage();
    const dashBoard = poManager.getDashBoard();
    const cart = poManager.getCartPaged();

    // const loginPage = new LoginPage(page);
    // const dashBoard = new DashboardPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(WrongUserName, WrongPassword);
    await loginPage.CheckErrorMessage();

    await loginPage.validLogin(CorrectUserName, CorrectPassword);
    console.log(await page.title());

    await dashBoard.searchProductAndToCart(productName);
    await dashBoard.navigateToCart();


});

test('First Playwright test', async ({page}) => {

    // chrome
    await page.goto('https://www.google.com/');

    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});