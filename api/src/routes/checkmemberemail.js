const route = require("express").Router();
const { checkSibenEmail } = require('../controllers/CheckMemberEmail');

route.get('/', checkSibenEmail);

module.exports = route;