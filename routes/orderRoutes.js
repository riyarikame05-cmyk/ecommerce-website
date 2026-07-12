const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const orderController = require("../controllers/orderController");

// ================= PLACE ORDER =================
router.post("/", auth, orderController.placeOrder);

// ================= MY ORDERS =================
router.get("/", auth, orderController.getMyOrders);

// ================= ADMIN ALL ORDERS =================
router.get("/all", auth, orderController.getAllOrders);

// ================= DOWNLOAD INVOICE =================
router.get("/invoice/:id", auth, orderController.downloadInvoice);

// ================= UPDATE STATUS =================
router.put("/:id", auth, orderController.updateOrderStatus);

module.exports = router;