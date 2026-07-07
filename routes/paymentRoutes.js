const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const { createOrder } = require("../controllers/paymentController");

router.post("/create-order", auth, createOrder);

module.exports = router;