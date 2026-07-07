const Wishlist = require("../models/Wishlist");

// Add to Wishlist
const addWishlist = async (req, res) => {

    try {

        const exists = await Wishlist.findOne({
            user: req.user.id,
            product: req.body.productId
        });

        if (exists) {

            return res.json({
                message: "Already in Wishlist ❤️"
            });

        }

        await Wishlist.create({
            user: req.user.id,
            product: req.body.productId
        });

        res.json({
            message: "Added to Wishlist ❤️"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get Wishlist
const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({
            user: req.user.id
        }).populate("product");

        res.json(wishlist);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Remove Wishlist
const removeWishlist = async (req, res) => {

    try {

        await Wishlist.findByIdAndDelete(req.params.id);

        res.json({
            message: "Removed from Wishlist"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
};