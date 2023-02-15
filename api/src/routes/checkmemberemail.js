const route = require("express").Router();
const { checkSibenEmail } = require('../controllers/CheckMemberEmail');

route.get('/:email', checkSibenEmail);

module.exports = route;