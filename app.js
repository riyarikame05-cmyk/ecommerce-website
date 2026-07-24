app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/invoice", require("./routes/invoiceRoutes")); // ✅const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ===========================
// Middleware
// ===========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===========================
// Static Folder
// ===========================
app.use(express.static(path.join(__dirname, "public")));

// ===========================
// Routes
// ===========================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// ===========================
// Home Page
// ===========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

// ===========================
// MongoDB Connection
// ===========================
if (mongoose.connection.readyState === 0) {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(async () => {
            console.log("MongoDB Connected ✅");

            const Product = require("./models/Product");

            console.log(
                "Products:",
                await Product.countDocuments()
            );
        })
        .catch((err) => console.log(err));
}

// ===========================
// Export App
// ===========================
module.exports = app;