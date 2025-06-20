interface ApiContext {
    post: (url: string, options: { data: any; headers?: Record<string, string> }) => Promise<any>;
}

interface LoginPayload {
    [key: string]: any;
}

interface OrderPayload {
    [key: string]: any;
}

interface Response {
    token: string;
    orderId?: string;
}

class APiUtils {
    private apiContext: ApiContext;
    private loginPayLoad: LoginPayload;

    constructor(apiContext: ApiContext, loginPayLoad: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        const loginResponseJson: { token: string } = await loginResponse.json();
        const token: string = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad: OrderPayload): Promise<Response> {
        let response: Response = { token: '' };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson: { orders: string[] } = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId: string = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

export { APiUtils };