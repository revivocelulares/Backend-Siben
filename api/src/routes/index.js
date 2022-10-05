const router = require('express').Router();
const users = require('./users');
const login = require('./login');

router.use('/users', users);
router.use('/login', login);

module.exports = router;