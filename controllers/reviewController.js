const Review = require("../models/Review");

const addReview = async (req, res) => {

    try {

        console.log("USER:", req.user);
        console.log("BODY:", req.body);

        if (!req.body.productId) {
            return res.status(400).json({
                message: "Product ID missing"
            });
        }

        const review = new Review({

            user: req.user.id,

            product: req.body.productId,

            rating: Number(req.body.rating),

            comment: req.body.comment

        });

        await review.save();

        console.log("Review Saved Successfully");

        res.status(201).json({
            message: "Review Added Successfully ✅"
        });

    } catch (err) {

        console.log("ERROR:", err);

        res.status(500).json({
            message: err.message
        });

    }

};

const getReviews = async (req, res) => {

    try {

        const reviews = await Review.find({
            product: req.params.productId
        }).populate("user", "name");

        res.json(reviews);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    addReview,
    getReviews
};