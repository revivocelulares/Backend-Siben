const route = require("express").Router();
const verify_admin_token = require('../controllers/verify_admin_token.js');
const { addProduct, updateProduct, deleteProduct, hard_deleteProduct } = require('../controllers/Product');

route.post("/", verify_admin_token, addProduct);
route.patch("/:id_product", verify_admin_token, updateProduct);
route.patch("/:id_product", verify_admin_token, deleteProduct);
route.delete("/:id_product", verify_admin_token, hard_deleteProduct);

module.exports = route;