const route = require("express").Router();
const verify_client_token = require('../controllers/verify_client_token.js');
const { addClient, verify, resetPassword, getClientbyID, getAllClients, updateClient, deleteClient, getClientByemail_pass } = require('../controllers/Client');

route.get('/:email', getClientbyID);
route.post('/verify/:token', verify);
route.post("/resetPass",resetPassword);
route.get('/', getAllClients);
route.post("/",addClient);
route.patch("/:email", verify_client_token, updateClient);
route.delete("/:email",verify_client_token, deleteClient);
route.get('/bymail_pass', getClientByemail_pass);

module.exports = route;