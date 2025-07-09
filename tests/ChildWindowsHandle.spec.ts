import {chromium, firefox} from "@playwright/test";
import {text} from "node:stream/consumers";

const {test, expect} = require('@playwright/test');

test('Child Windows Handle', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");

    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');

    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),// listen for ant new page
    ])
    const text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());



});
