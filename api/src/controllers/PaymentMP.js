const mercadopago = require('mercadopago');
require('dotenv').config();

const payment = {
    paymentmethod: (req, res) => {
        mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_MP);
        const payment_data = {
            transaction_amount: req.body.transaction_amount,
            token: req.body.token,
            description: req.body.description,
            installments: Number(req.body.installments),
            payment_method_id: req.body.paymentMethodId,
            issuer_id: req.body.issuer,
            payer: {
                email: req.body.payer.email,
                identification: {
                    type: req.body.payer.docType,
                    number: req.body.payer.docNumber,
                },
            },
        };
        
        mercadopago.payment
        .save(payment_data)
        .then((response) => {
            return res.status(response.status).json({
                id: response.body.id,
                status: response.body.status,
                status_detail: response.body.status_detail,
            });
        })
        .catch((err) => {
            console.log('ERROR: ' + err);
            return res.status(500).send(err);
        });
    }
};

module.exports = payment;