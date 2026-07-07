const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const orderController = require("../controllers/orderController");

// Place Order
router.post("/", auth, orderController.placeOrder);

// Get My Orders
router.get("/", auth, orderController.getMyOrders);

// Get All Orders (Admin)
router.get("/all", auth, orderController.getAllOrders);

// Update Order Status
router.put("/:id", auth, orderController.updateOrderStatus);

module.exports = router;