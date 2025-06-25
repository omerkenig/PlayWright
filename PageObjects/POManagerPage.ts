import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from "./CartPage";


export class POManagerPage {
    private page: any;  // Consider using specific type (e.g., Page from Playwright)
    private loginPage: LoginPage;
    private dashBoard: DashboardPage;
    private CartPage: CartPage;

    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoard = new DashboardPage(this.page);
        this.CartPage = new CartPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getDashBoard(): DashboardPage {
        return this.dashBoard;  // Fixed: Removed function call ()
    }

    getCartPaged(): CartPage {
        return this.CartPage;  // Fixed: Removed function call ()
    }
}