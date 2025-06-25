import {Page, Locator, expect} from "@playwright/test";

export class DashboardPage {

    page: Page;
    products: Locator;
    cardText: Locator;
    cart: Locator;


    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.cardText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink=\"/dashboard/cart\"]");

    }

    async searchProductAndToCart(productName: string) {

        await this.cardText.first().waitFor();
        const allTitle = this.cardText.allTextContents();
        console.log(allTitle);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {

            if (await this.products.nth(i).locator('b').textContent() === productName) {
                // add to cart
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart() {

        await this.cart.click();
    }

}


