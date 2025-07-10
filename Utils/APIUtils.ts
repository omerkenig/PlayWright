interface ApiContext {
    post: (
        url: string,
        options: {
            data: any;
            headers?: Record<string, string>;
        }
    ) => Promise<{ json: () => Promise<any> }>;
}

interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

interface OrderPayload {
    orders: {
        country: string;
        productOrderedId: string;
    }[];
}

interface CreateOrderResponse {
    token: string;
    orderId: string;
}

class ApiUtils {
    private apiContext: ApiContext;
    private loginPayload: LoginPayload;

    constructor(apiContext: ApiContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload,
            }
        );

        const loginResponseJson: { token: string } = await loginResponse.json();
        const token = loginResponseJson.token;

        if (!token) {
            throw new Error("Token not found in login response.");
        }

        console.log("Token:", token);
        return token;
    }

    async createOrder(orderPayload: OrderPayload): Promise<CreateOrderResponse> {
        const token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        const orderResponseJson: { orders: string[] } = await orderResponse.json();

        if (!orderResponseJson.orders?.length) {
            throw new Error("Order ID not found in create-order response.");
        }

        const orderId = orderResponseJson.orders[0];

        return {
            token,
            orderId,
        };
    }
}

export { ApiUtils };
