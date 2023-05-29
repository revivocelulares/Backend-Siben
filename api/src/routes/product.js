const route = require("express").Router();
const verify_admin_token = require('../controllers/verify_admin_token.js');
const { addProduct, updateProduct, deleteProduct, hard_deleteProduct, getAllProducts, getProductByID, uploadCaratula, getbyPrice } = require('../controllers/Product');

route.post("/", verify_admin_token, addProduct);
route.post("/foto-tapa", verify_admin_token, uploadCaratula);
route.put("/:id_product", verify_admin_token, updateProduct);
route.put("/delete/:id_product", verify_admin_token, deleteProduct);
route.delete("/:id_product", verify_admin_token, hard_deleteProduct);
route.get("/", getAllProducts);
route.get("/:id_product", getProductByID);
route.get("/price/:type", getbyPrice);

module.exports = route;