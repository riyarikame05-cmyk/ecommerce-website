const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ================= PLACE ORDER =================

const placeOrder = async (req, res) => {

    try {

        const { address, paymentMethod } = req.body;

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let total = 0;

        const items = cart.map(item => {

            total += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };

        });

        const order = new Order({
            user: req.user.id,
            items,
            total,
            address,
            paymentMethod
        });

        await order.save();

        await Cart.deleteMany({
            user: req.user.id
        });

        res.json({
            message: "Order Placed Successfully ✅",
            order
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= GET MY ORDERS =================

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("items.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= GET ALL ORDERS (ADMIN) =================

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        res.json({
            message: "Order Status Updated ✅",
            order
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};