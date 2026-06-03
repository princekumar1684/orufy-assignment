const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const productController = require("../controllers/product.controller");

router.post("/create", authMiddleware, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/update/:id", authMiddleware, productController.updateProduct);
router.post("/delete/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
