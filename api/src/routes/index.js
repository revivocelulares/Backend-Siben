const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const client = require('./client');
const cart = require('./cart');

router.use('/users', users);
router.use('/login', login);
router.use('/client', client);
router.use('/cart', cart);

module.exports = router;