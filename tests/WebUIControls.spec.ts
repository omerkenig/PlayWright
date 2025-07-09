import {chromium} from "@playwright/test";

const {test, expect} = require('@playwright/test');

test('Web UI Controls', async ({page}) => {

    // const browser = await chromium.launch({headless: false}); // Will open a visible browser window

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());

    await page.locator(('#terms')).click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    // await page.pause();

});
