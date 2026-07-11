const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {

    try {

        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const orders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$total"
                    }
                }
            }
        ]);

        res.json({

            users,

            products,

            orders,

            pendingOrders,

            revenue: revenue.length ? revenue[0].total : 0

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= GET USERS =================

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ================= DELETE USER =================

exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.role === "admin") {

            return res.status(400).json({
                message: "Admin cannot be deleted"
            });

        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted Successfully ✅"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};