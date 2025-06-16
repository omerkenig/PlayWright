const {test, expect} = require('@playwright/test');

test("Calendar validation", async ({page}) => {

    const month = "5";
    const date = "23";
    const year = "2027";
    const expectList = [month, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const input = await page.locator(".react-date-picker__inputGroup input");

    for (let i; i < input; i++) {
        const value = input[i].getAttribute("value");
        expect (value).toEqual(expectList[i]);
    }



});