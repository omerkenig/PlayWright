import {test, expect} from "@playwright/test";

test("Popup validations", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // //    await page.pause();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});