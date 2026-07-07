const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getDashboard } = require("../controllers/adminController");

router.get("/dashboard", auth, admin, getDashboard);

module.exports = router;