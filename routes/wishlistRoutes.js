const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    addWishlist,

    getWishlist,

    removeWishlist

} = require("../controllers/wishlistController");

router.post("/", auth, addWishlist);

router.get("/", auth, getWishlist);

router.delete("/:id", auth, removeWishlist);

module.exports = router;