const Review = require("../models/Review");
const Product = require("../models/Product");

// ================= GET ALL PRODUCTS =================

const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        const productsWithRating = await Promise.all(

            products.map(async (product) => {

                const reviews = await Review.find({
                    product: product._id
                });

                let averageRating = 0;

                if (reviews.length > 0) {

                    const total = reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                    );

                    averageRating = (total / reviews.length).toFixed(1);

                }

                return {

                    ...product._doc,

                    averageRating,

                    totalReviews: reviews.length

                };

            })

        );

        res.json(productsWithRating);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= ADD PRODUCT =================

const addProduct = async (req, res) => {

    try {
const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category
});



        await product.save();

        res.status(201).json({
            message: "Product Added Successfully ✅",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= UPDATE PRODUCT =================

const updateProduct = async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        if (!updatedProduct) {

            return res.status(404).json({
                message: "Product Not Found"
            });

        }

        res.json({
            message: "Product Updated Successfully ✅",
            updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= DELETE PRODUCT =================

const deleteProduct = async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {

            return res.status(404).json({
                message: "Product Not Found"
            });

        }

        res.json({
            message: "Product Deleted Successfully ✅"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};