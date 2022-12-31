const route = require("express").Router();
const { paymentmethod } = require('../controllers/PaymentMP');

route.post('/MELI', paymentmethod);

module.exports = route;