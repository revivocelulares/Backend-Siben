const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const client = require('./client');
const cart = require('./cart');
const product = require('./product');

router.use('/users', users);
router.use('/login', login);
router.use('/client', client);
router.use('/cart', cart);
router.use('/product', product);

module.exports = router;