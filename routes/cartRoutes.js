const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} = require("../controllers/cartController");


// ================= CART ROUTES =================

// Add product to cart
router.post("/add", auth, addToCart);

// Get user cart
router.get("/", auth, getCart);

// Increase quantity
router.put("/increase/:id", auth, increaseQuantity);

// Decrease quantity
router.put("/decrease/:id", auth, decreaseQuantity);

// Remove item from cart
router.delete("/remove/:id", auth, removeFromCart);


module.exports = router;