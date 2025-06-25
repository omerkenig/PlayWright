import {Page, Locator, expect} from "@playwright/test";

export class LoginPage {

    page: Page;
    signInBtn: Locator;
    userName: Locator;
    cardTitle: Locator;
    password: Locator;
    errorMessage: Locator;

    constructor(page) {

        this.page = page;
        this.signInBtn = page.locator("#signInBtn");
        this.userName = page.locator("#username");
        this.cardTitle = page.locator(".card-body a");
        this.password = page.locator("#password");
        this.errorMessage = page.locator(".alert.alert-danger")
    }

    async goTo() {
        await this.page.goto('http://rahulshettyacademy.com/loginpagePractise/');
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

    async CheckErrorMessage() {
       const errorText =  await this.errorMessage.textContent();
       console.log(errorText);
        await expect(this.errorMessage).toContainText("Incorrect");

        // await expect(errorText.

    }

}


