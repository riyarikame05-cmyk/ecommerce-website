const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile data",
    user: req.user,
  });
});

module.exports = router;