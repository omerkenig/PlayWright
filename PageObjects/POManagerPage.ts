import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';

class POManager {
    private page: any;  // Consider using specific type (e.g., Page from Playwright)
    private loginPage: LoginPage;
    private dashBoard: DashboardPage;

    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoard = new DashboardPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getDashBoard(): DashboardPage {
        return this.dashBoard;  // Fixed: Removed function call ()
    }
}