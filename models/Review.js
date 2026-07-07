const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);