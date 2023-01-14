const route = require("express").Router();
const { createOrder, captureOrder, cancelOrder, sendResponse } = require('../controllers/PaymentPP');

route.post('/paypal/create-order', createOrder);
route.get('/paypal/capture-order', captureOrder);
route.get('/paypal/cancel-order', cancelOrder);
route.get('/paypal/send-response', sendResponse)

module.exports = route;