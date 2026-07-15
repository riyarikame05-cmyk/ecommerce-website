function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}

// ================= AUTH =================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Share with review.js
window.token = token;
window.productId = productId;

// ================= LOAD PRODUCT =================

async function loadProduct() {

    try {

        showLoader();

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products = await response.json();

        const product = products.find(p => p._id === productId);

        if (!product) {

            document.getElementById("productDetails").innerHTML = `
                <h2 style="text-align:center;margin-top:50px;">
                    Product Not Found
                </h2>
            `;

            hideLoader();
            return;
        }

        document.getElementById("productDetails").innerHTML = `
        <div class="product-container">

            <div class="left">
                <img
                    src="${product.image}"
                    class="big-image"
                    alt="${product.name}">
            </div>

            <div class="right">

                <span class="category">
                    ${product.category}
                </span>

                <h1>${product.name}</h1>

                <p class="rating">
                    ⭐ ${product.averageRating || 4.5}
                    (${product.totalReviews || 0}
                    ${product.totalReviews == 1 ? "Review" : "Reviews"})
                </p>

                <h2 class="price">
                    ₹${product.price}
                </h2>

                <p class="description">
                    ${product.description}
                </p>

                <div class="buttons">

                    <button
                        class="cart-btn"
                        onclick="addToCart('${product._id}')">

                        🛒 Add To Cart

                    </button>

                    <button
                        class="wishlist-btn"
                        onclick="addWishlist('${product._id}')">

                        ❤️ Wishlist

                    </button>

                </div>

            </div>

        </div>
        `;

        hideLoader();

    }

    catch (err) {

        console.error(err);

        hideLoader();

        document.getElementById("productDetails").innerHTML = `
            <h2 style="text-align:center;color:red;">
                Failed to Load Product
            </h2>
        `;
    }
}

// ================= ADD TO CART =================

async function addToCart(productId) {

    try {

        const response = await fetch("/api/cart/add", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                productId
            })

        });

        const data = await response.json();

        alert(data.message);

    }

    catch (err) {

        console.error(err);

        alert("Unable to add product.");

    }

}

// ================= ADD TO WISHLIST =================

async function addWishlist(productId) {

    try {

        const response = await fetch("/api/wishlist", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                productId
            })

        });

        const data = await response.json();

        alert(data.message);

    }

    catch (err) {

        console.error(err);

        alert("Unable to add wishlist.");

    }

}

// ================= START =================

loadProduct();