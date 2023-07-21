const route = require("express").Router();
const verify_client_token = require('../controllers/verify_client_token.js');
const verify_admin_token = require('../controllers/verify_admin_token.js');
const { createPR, listar_todas_respuestas } = require('../controllers/PaymentResponse.js');

route.post("/", verify_client_token, createPR);
route.get("/", verify_admin_token, listar_todas_respuestas);

module.exports = route;