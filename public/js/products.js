
function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
console.log("HELLO RIYA");

const API = "/api/products";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let allProducts = [];
let selectedCategory = "All";
let selectedPrice = "";

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

// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    if (!products.length) {

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

                <p>${product.description}</p>

                <div class="price">
                    ₹${product.price}
                </div>

                <button onclick="addToCart('${product._id}')">
                    🛒 Add To Cart
                </button>

                <button class="wishlist-btn"
                    onclick="addWishlist('${product._id}')">
                    ❤️ Wishlist
                </button>

            </div>

        </div>

        `;

    });

}

// ================= OPEN PRODUCT =================

function openProduct(id) {

    window.location.href = `product-details.html?id=${id}`;

}

// ================= SEARCH =================

function searchProducts() {

    applyFilters();

}

// ================= CATEGORY =================

function filterCategory(category) {

    selectedCategory = category;

    applyFilters();

}

// ================= PRICE =================

function filterByPrice() {

    selectedPrice = document.getElementById("priceFilter").value;

    applyFilters();

}

// ================= APPLY FILTERS =================

function applyFilters() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    let filtered = [...allProducts];

    // Search

    if (search) {

        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(search)
        );

    }

    // Category

    if (selectedCategory !== "All") {

        filtered = filtered.filter(product =>
            product.category === selectedCategory
        );

    }

    // Price

    if (selectedPrice !== "") {

        if (selectedPrice === "10000") {

            filtered = filtered.filter(product =>
                Number(product.price) > 10000
            );

        }

        else {

            const [min, max] = selectedPrice.split("-").map(Number);

            filtered = filtered.filter(product =>
                Number(product.price) >= min &&
                Number(product.price) <= max
            );

        }

    }

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

    }

}

// ================= WISHLIST =================

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