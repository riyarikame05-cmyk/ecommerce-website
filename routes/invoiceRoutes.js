const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { downloadInvoice } = require("../controllers/invoiceController");

router.get("/:id", auth, downloadInvoice);

module.exports = router;