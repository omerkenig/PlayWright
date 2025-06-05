const {test} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser}) => {

    // chrome
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

});

test('First Playwright test', async ({page}) => {

    // chrome
    await page.goto('https://www.google.com/');

});