const {base} = require('@playwright/test');

exports.test = base.test.extend(
    {
        testDataForOrder: {
            username: "Aa010110@aaa.com",
            password: "Aa010110",
            productName: "ADIDAS ORIGINAL"
        }
    }
)