const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 10000;

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})
.catch(console.error);