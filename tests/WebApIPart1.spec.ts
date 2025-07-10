import { test, expect, request, Page, APIRequestContext } from '@playwright/test';
import { ApiUtils  } from '../Utils/APIUtils';
import { getBaseUrl } from '../utils/envHelper';


interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

interface OrderPayload {
    orders: { country: string; productOrderedId: string }[];
}

interface ResponseData {
    token: string;
    orderId: string[];
}

const loginPayload: LoginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};

const orderPayload: OrderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }]
};

let response: ResponseData;

test.beforeAll(async () => {
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils = new APiUtils (apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

    if (!response?.token) {
        throw new Error("Token not generated.");
    }
});

test('@API Place the order', async ({ page }: { page: Page }) => {

    const apiContext = await request.newContext();

    // Inject token to local storage
    await page.addInitScript((token: string) => {
        window.localStorage.setItem('token', token);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (rowOrderId && response.orderId.includes(rowOrderId.trim())) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails?.trim() || '')).toBeTruthy();
});
