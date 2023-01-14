const route = require("express").Router();
const { createOrder, captureOrder, cancelOrder } = require('../controllers/PaymentPP');

route.post('/paypal/create-order', createOrder);
route.get('/paypal/capture-order', captureOrder);
route.get('/paypal/cancel-order', cancelOrder);

module.exports = route;