import {test, expect} from '@playwright/test';
import { env } from './env';
import { Constants } from '../constants';


const {POManager} = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../Json/Int/Int_placeOrder.json')));

test("@Web Client App login", async ({page}) => {

    const poManager = new POManager(page);
    //js file- Login js, DashboardPage

    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await page.goto(env.BASE_URL);

    await page.goto(process.env.BASE_URL!);
    console.log('Working in env:', process.env.ENV);

    await loginPage.validLogin(dataSet.username, dataSet.password);

   // await loginPage.validLogin(Constants.LOGIN_SUCCESS, Constants.LOGIN_ERROR);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);

    // await dashboardPage.searchProductAddCart(Constants.ENABLE_LOGIN_TESTS);

    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("isr", "Israel");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


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