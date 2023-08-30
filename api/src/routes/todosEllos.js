const route = require("express").Router();
const { traerTodos } = require('../controllers/TodoProduct');

route.get("/", traerTodos);

module.exports = route;