console.log("HELLO RIYA");
const API = "/api/products";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let allProducts = [];

// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response = await fetch(API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        allProducts = await response.json();

        console.log("Products:", allProducts);

        displayProducts(allProducts);

    } catch (err) {

        console.error(err);

        document.getElementById("products").innerHTML = `
            <h2 style="text-align:center;padding:40px;color:red;">
                Failed to Load Products
            </h2>
        `;

    }

}

// ================= OPEN PRODUCT =================

function openProduct(id) {

    window.location.href = `product-details.html?id=${id}`;

}

// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    const container = document.getElementById("products");

    if (!container) return;

    container.innerHTML = "";

    if (!products || products.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;padding:40px;">
                No Products Found 😔
            </h2>
        `;

        return;

    }

    products.forEach(product => {

        container.innerHTML += `

        <div class="card">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                onclick="openProduct('${product._id}')">

            <div class="card-content">

                <h3 onclick="openProduct('${product._id}')">
                    ${product.name}
                </h3>

                <div class="rating">

                    ⭐ ${product.averageRating || 4.5}

                    (${product.totalReviews || 0} Reviews)

                </div>

                <p>

                    ${product.description}

                </p>

                <div class="price">

                    ₹${product.price}

                </div>

                <button onclick="addToCart('${product._id}')">

                    🛒 Add To Cart

                </button>

                <button
                    class="wishlist-btn"
                    onclick="addWishlist('${product._id}')">

                    ❤️ Wishlist

                </button>

            </div>

        </div>

        `;

    });

}
// ================= SEARCH =================

function searchProducts() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);

}

// ================= CATEGORY FILTER =================

function filterCategory(category) {

    if (category === "All") {

        displayProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product =>
        product.category === category
    );

    displayProducts(filtered);

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

        console.log(err);

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

        console.log(err);

        alert("Unable to add wishlist.");

    }

}

// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// ================= START =================

loadProducts();