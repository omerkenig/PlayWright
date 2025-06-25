import {Page, Locator, expect} from "@playwright/test";

export class LoginPage {

    page: Page;

    userName: Locator;
    password: Locator;
    signInBtn: Locator;

    cardTitle: Locator;
    errorMessage: Locator;

    constructor(page) {

        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("#login");

        this.cardTitle = page.locator(".card-body a");
        this.errorMessage = page.locator(".invalid-feedback")
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

    async CheckErrorMessage() {
       const errorText =  await this.errorMessage.textContent();
       console.log(errorText);
        await expect(this.errorMessage).toContainText("*Enter Valid Email");

        // await expect(errorText.

    }

}


