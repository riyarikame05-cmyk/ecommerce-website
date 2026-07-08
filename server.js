const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});
mongoose
.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected ✅");

    const Product = require("./models/Product");

    const count = await Product.countDocuments();

    console.log("Total Products:", count);

    const first = await Product.findOne();

    console.log(first);

})
.catch(err => console.log(err));