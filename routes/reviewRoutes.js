const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addReview,
    getReviews
} = require("../controllers/reviewController");

// Add Review
router.post("/", auth, addReview);

// Get Reviews of Product
router.get("/:productId", getReviews);

module.exports = router;