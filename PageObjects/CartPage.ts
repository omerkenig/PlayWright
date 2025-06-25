import {Page, Locator, expect} from "@playwright/test";

export class CartPage {

    page: Page;
    products: Locator;
    cardText: Locator;
    cart: Locator;
    cartProducts: Locator;
    productText: Locator;
    order: Locator;
    checkout: Locator;


    constructor(page) {

        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink *=\"cart\"]").click();
        this.order = page.locator("button[routerlink*='myorders']").click();
        this.checkout = page.locator("text=Checkout").click();

    }

    async VerifyProductIsDisplayed(productName: string) {

        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName: string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }


}




























