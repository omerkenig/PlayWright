import { test, expect, Browser, BrowserContext, Page, Locator } from '@playwright/test';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }: { browser: Browser }) =>
{
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    // console.log(await page.title());

    const userName: Locator = page.locator("#userEmail");
    const emailAddress: string = "Aa010101@aaa.com";
    const password: Locator = page.locator("#userPassword");
    const login: Locator = page.locator("#login");

    await userName.fill(emailAddress);
    await password.fill("Aa010101");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test.only('End To End Test', async () => {
    const page: Page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');

    const userName: Locator = page.locator("#userEmail");
    const emailAddress: string = "Aa010101@aaa.com";
    const password: Locator = page.locator("#userPassword");
    const login: Locator = page.locator("#login");
    const products: Locator = page.locator(".card-body");
    const cardTitle: Locator = page.locator(".card-body b");
    const productName: string = 'ADIDAS ORIGINAL';

    await page.locator(".card-body b").first().waitFor();

    const allTitles: string[] = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);
    const count: number = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('.btn.w-10').click();
            break;
        }
    }

    await page.locator("[routerlink*=\"cart\"]").click();
    await page.locator("div li").first().waitFor();
    const bool: boolean = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("israel");
    const dropDown: Locator = page.locator(".ta-results");
    await dropDown.waitFor();
    const dropDownCount: number = await dropDown.locator("button").count();

    for (let i = 0; i < dropDownCount; i++) {
        const text: string | null = await dropDown.locator("button").nth(i).textContent();
        if (text === " Israel") {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailAddress);
    await page.locator(".btnn.action__submit").click();

    await expect(page.locator(".hero-primary")).toContainText(" Thankyou for the order.");

    const orderId: string = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent())?.trim() || '';

    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows: Locator = page.locator("tbody tr");
    // await page.pause();

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId: string | null = await rows.nth(i).locator("th").textContent();
        if (rowOrderId && orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(orderIdDetails && orderId.includes(orderIdDetails)).toBeTruthy();
});

test.only('Test case 2', async () => {



    // const userName: Locator = page.locator("#userEmail");
    const emailAddress: string = "Aa010101@aaa.com";

    const page: Page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products: Locator = page.locator(".card-body");
    const cardTitle: Locator = page.locator(".card-body b");
    const productName: string = 'ADIDAS ORIGINAL';


    await page.locator(".card-body b").first().waitFor();

    const allTitles: string[] = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

});