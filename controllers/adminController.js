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