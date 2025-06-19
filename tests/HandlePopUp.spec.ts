import {test, expect} from "@playwright/test";

test("Popup validations", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await  page.pause();

    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    // page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#mousehover").hover();

});