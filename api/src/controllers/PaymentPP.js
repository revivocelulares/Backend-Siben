require('dotenv').config();
const axios = require('axios');

const paypal = {
    createOrder: async (req, res) => {
        const value = req.body.data;
        try {
            const order = {
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: value,
                    },
                  },
                ],
                application_context: {
                  brand_name: "EdiSiben",
                  landing_page: "NO_PREFERENCE",
                  user_action: "PAY_NOW",
                  return_url: 'https://apisiben.onrender.com/api/payment/paypal/capture-order',
                  cancel_url: 'https://apisiben.onrender.com/api/payment/paypal/cancel-order',
                },
            };
            
            // format the body
            const params = new URLSearchParams();
            params.append("grant_type", "client_credentials");

            // Generate an access token
            const {
                data: { access_token },
            } = await axios.post(
                `${process.env.URL_BASE_PP}/v1/oauth2/token`,
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    auth: {
                        username: process.env.CLIENT_ID_PP,
                        password: process.env.SECRET_PP,
                    },
                }
            );

            // make a request
            const response = await axios.post(
                `${process.env.URL_BASE_PP}/v2/checkout/orders`,
                order,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            console.log(response.data);

            return res.status(200).json(response.data);
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json('Something goes wrong');
        }
    },
    captureOrder: async (req, res) => {
        const { token } = req.query;

        try {
            const response = await axios.post(
                `${process.env.URL_BASE_PP}/v2/checkout/orders/${token}/capture`,
                {},
                {
                    auth: {
                        username: process.env.CLIENT_ID_PP,
                        password: process.env.SECRET_PP,
                    },
                }
            );
            console.log(response.data);
            res.redirect('https://edisiben.vercel.app/payment/complete');
        }
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server error');
        }
    },
    sendResponse: async (req, res) => {
        const orderID = req.body.data;
        try {
            console.log('ORDER_ID: ' + orderID);
            const response = await axios.get(
                `${process.env.URL_BASE_PP}/v2/checkout/orders/${orderID}`,
                {
                    auth: {
                        username: process.env.CLIENT_ID_PP,
                        password: process.env.SECRET_PP,
                    }
                }
            );
            return res.status(200).send({
                'Order ID': response.data.id,
                'Status': response.data.status,
                'Purchase Units': response.data.purchase_units
            }); 
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server error');
        }
    },
    cancelOrder: (req, res) => {
        res.redirect('https://edisiben.vercel.app/cart');
    }
}

module.exports = paypal;