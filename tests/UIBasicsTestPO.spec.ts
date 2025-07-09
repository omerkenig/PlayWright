import {chromium, firefox} from "@playwright/test";
import {DashboardPage} from "../PageObjects/DashboardPage";

import {test, expect} from '@playwright/test';
// const {LoginPage} = require('../PageObjects/LoginPage');
// const {DashboardPage} = require('../PageObjects/DashboardPage');
const {POManager} = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../Json/Int/Int_placeOrder.json')));
//const dataSet = JSON.parse(JSON.stringify(require('../Json/'+env+'/Int_placeOrder.json')));
// require('../Json/'+env+'/Int_placeOrder.json')

test("@Web Client App login", async ({page}) =>
{

    const poManager = new POManager(page);
    //js file- Login js, DashboardPage

    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username,dataSet.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("isr","Israel");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


    // const browser = await chromium.launch({headless: false}); // Will open a visible browser window
    //
    // const poManager = new POManager(page);
    // const WrongUserName = 'OmerKenig';
    // const WrongPassword = 'learning';
    // const CorrectUserName = 'Aa010110@aaa.com';
    // const CorrectPassword = 'Aa010110';
    // const productName = 'ADIDAS ORIGINAL';
    //
    // const loginPage = poManager.getLoginPage();
    // const dashBoard = poManager.getDashboardPage();
    // const cart = poManager.getCartPage();
    //
    // // const loginPage = new LoginPage(page);
    // // const dashBoard = new DashboardPage(page);
    //
    // await loginPage.goTo();
    // await loginPage.validLogin(WrongUserName, WrongPassword);
    // await loginPage.CheckErrorMessage();
    //
    // await loginPage.validLogin(CorrectUserName, CorrectPassword);
    // console.log(await page.title());
    //
    // await dashBoard.searchProductAndToCart(productName);
    // await dashBoard.navigateToCart();



});

// test('First Playwright test', async ({page}) => {
//
//     // chrome
//     await page.goto('https://www.google.com/');
//
//     // get title - assertion
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google");
//
// });