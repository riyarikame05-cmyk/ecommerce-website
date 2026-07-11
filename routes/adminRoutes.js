const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    getDashboard,
    getUsers,
    deleteUser
} = require("../controllers/adminController");

router.get("/dashboard", auth, admin, getDashboard);
// Get All Users
router.get("/users", auth, admin, getUsers);

// Delete User
router.delete("/users/:id", auth, admin, deleteUser);

module.exports = router;