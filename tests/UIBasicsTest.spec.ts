import {chromium, firefox} from "@playwright/test";

const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({ page }) => {


    const browser = await chromium.launch({ headless: false }); // Will open a visible browser window

    // const context = await browser.newContext();
    // const context = await browser.newContext({
    //     userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
    // });
    // const page = await context.newPage();



    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");


    console.log(await page.title());
    await userName.fill("OmerKenig");
    await page.locator("input[id='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body a").first().waitFor();
    // await page.locator(".card-body a").first().textContent();
    // console.log(await page.locator(".card-body a").nth(1).textContent());
    // const allTitle = await cardTitle.allTextContents();
    const allTitle = await page.locator(".card-body a").allTextContents();
    console.log(allTitle);


});

test('First Playwright test', async ({page}) => {

    // chrome
    await page.goto('https://www.google.com/');

    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});