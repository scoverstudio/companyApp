const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");

router.get("/products", productsController.getAll);
router.get("/products/random", productsController.getRandom);
router.get("/products/:id", productsController.getByID);
router.post("/products", productsController.addProduct);
router.put("/products/:id", productsController.modifyProduct);
router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;
