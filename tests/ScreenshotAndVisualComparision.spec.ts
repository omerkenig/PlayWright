const {test,expect} = require('@playwright/test')

test('Screenshot & Visual comparision',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});
    await page.locator('#hide-textbox').click();

    // await page.locator('#displayed-text').screenshot({path:'..Screenshots/Screenshot.png'});
    // await page.locator("#hide-textbox").click();
    // await page.screenshot({path: '../screenshot/screenshot.png'});
    // await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only('Visual test',async({page})=>
{
    await page.goto('https://www.google.com/')
    expect(await page.screenshot()).toMatchSnapshot('../screenshots/landing.png');

});