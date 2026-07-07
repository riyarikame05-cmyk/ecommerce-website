const express = require("express");
const router = express.Router();

const {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ================= PRODUCT ROUTES =================

// Get all products (Public)
router.get("/", getProducts);

// Add product (Admin Only)
router.post("/", auth, admin, addProduct);

// Update product (Admin Only)
router.put("/:id", auth, admin, updateProduct);

// Delete product (Admin Only)
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;