const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const client = require('./client');
const cart = require('./cart');
const product = require('./product');
const author = require('./authors');
const payment = require('./paymentMP');
const dolar = require('./dolar');
const paypal = require('./paymentPP');
const invoices = require('./invoice');
const purchaseOrders = require('./purchaseOrders');

router.use('/users', users);
router.use('/login', login);
router.use('/client', client);
router.use('/cart', cart);
router.use('/product', product);
router.use('/author', author);
router.use('/process-payment', payment);
router.use('/payment', paypal);
router.use('/dolar', dolar);
router.use('/orders', purchaseOrders);
router.use('/invoice', invoices);

module.exports = router;