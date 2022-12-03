const route = require("express").Router();
const verify_admin_token = require('../controllers/verify_admin_token.js');
const { addAuthor, getAuthors, getbyBook } = require('../controllers/Authors');

route.post("/", verify_admin_token, addAuthor);
route.get("/", getAuthors);
route.get("/:name", getbyBook);

module.exports = route;