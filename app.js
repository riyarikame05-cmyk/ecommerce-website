const express = require("express");
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

// If you really have this route, keep it.
// Otherwise remove these two lines.
app.use("/api/invoice", require("./routes/invoiceRoutes"));

// ===========================
// Home Page
// ===========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});
// ===========================
// MongoDB Connection
// ===========================
let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000
        });

        isConnected = true;
        console.log("MongoDB Connected ✅");

        const Product = require("./models/Product");
        console.log("Products:", await Product.countDocuments());

    } catch (err) {
        console.error("MongoDB Error:", err);
    }
}

connectDB();
// ===========================
// Export Express App
// ===========================
module.exports = app;