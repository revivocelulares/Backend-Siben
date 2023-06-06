const mercadopago = require('mercadopago');
require('dotenv').config();

const payment = {
    paymentmethod: (req, res) => {
        mercadopago.configure({ access_token: process.env.ACCESS_TOKEN_MP});
        let preference = {
            binary_mode: true,
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity)
                }
            ],
            back_urls: {
                "success": "https://testfront.app.worldwidelab.com.ar/",
                "failure": "https://testfront.app.worldwidelab.com.ar/",
                "pending": "https://testfront.app.worldwidelab.com.ar/"
            },
            auto_return: "approved"
        };
        console.log('-------------------- ' + JSON.stringify(preference));
        mercadopago.preferences
        .create(preference)
        .then(function (response) {
			res.json({
				id: response.body.id
			});
		})
        .catch((error) => {
            console.log('ERROR: ' + error);
            return res.status(500).send(error);
        });
    }
};

module.exports = payment;