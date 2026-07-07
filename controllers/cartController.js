const Cart = require("../models/Cart");

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
    try {

        const { productId } = req.body;
        const userId = req.user.id;

        const existingCart = await Cart.findOne({
            user: userId,
            product: productId
        });

        if (existingCart) {
            existingCart.quantity += 1;
            await existingCart.save();

            return res.json({
                message: "Quantity Updated ✅"
            });
        }

        const cart = new Cart({
            user: userId,
            product: productId,
            quantity: 1
        });

        await cart.save();

        res.json({
            message: "Product Added To Cart ✅"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= GET CART =================
const getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.json(cart);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= INCREASE QUANTITY =================
const increaseQuantity = async (req, res) => {
    try {

        const cart = await Cart.findOne({
    _id: req.params.id,
    user: req.user.id
});

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        cart.quantity += 1;
        await cart.save();

        res.json({
            message: "Quantity Increased",
            cart
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= DECREASE QUANTITY =================
const decreaseQuantity = async (req, res) => {
    try {

        const cart = await Cart.findOne({
    _id: req.params.id,
    user: req.user.id
});

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (cart.quantity > 1) {
            cart.quantity -= 1;
            await cart.save();
        } else {
            await Cart.findByIdAndDelete(req.params.id);
        }

        res.json({
            message: "Cart Updated",
            cart
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= REMOVE FROM CART =================

const removeFromCart = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Removed Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    addToCart,
    getCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
};