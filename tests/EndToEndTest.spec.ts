// import {chromium, firefox} from "@playwright/test";
import { getBaseUrl, getEnv } from '../utils/envHelper';
const {test, expect} = require('@playwright/test');

import {chromium} from "@playwright/test";


test('End To End Test on ${getEnv()}', async ({page}) => {


    // const browser = await chromium.launch({headless: false}); // Will open a visible browser window
    await page.goto(`${getBaseUrl()}`);
    console.log(getEnv);
    await page.goto('https://rahulshettyacademy.com/client/');

    const userName = page.locator("#userEmail");
    const emailAddress = "Aa010101@aaa.com";
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const products = page.locator(".card-body");
    const cardTitle = page.locator(".card-body b");
    const productName = 'ADIDAS ORIGINAL';

    console.log(await page.title());
    await userName.fill(emailAddress);
    await password.fill("Aa010101");
    await login.click();

    await page.locator(".card-body b").first().waitFor();

    const allTitle = await page.locator(".card-body b").allTextContents();
    console.log(allTitle);
    const count = await products.count();
    for (let i = 0; i < count; i++) {

        if (await products.nth(i).locator('b').textContent() === productName) {
            // add to cart
            await products.nth(i).locator('.btn.w-10').click();
            break;
        }
    }

    await page.locator("[routerlink *=\"cart\"]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("israel");
    const dropDown = await page.locator(".ta-results");
    await dropDown.waitFor();
    const dropDownCount = await dropDown.locator("button").count();

    for (let i = 0; i < dropDownCount; i++) {
        if (await (await dropDown.locator("button").nth(i).textContent()) === " Israel") {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    await expect (page.locator(".user__name [type='text']").first()).toHaveText(emailAddress);
    await page.locator(".btnn.action__submit").click();

    await expect (page.locator(".hero-primary")).toContainText(" Thankyou for the order.");

    const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim();

    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
//    await page.pause();


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});