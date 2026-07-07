const Review = require("../models/Review");

// Add Review
const addReview = async (req, res) => {

    try {

        const review = new Review({
            user: req.user.id,
            product: req.body.productId,
            rating: req.body.rating,
            comment: req.body.comment
        });

        await review.save();

        res.json({
            message: "Review Added Successfully ✅"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get Product Reviews
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