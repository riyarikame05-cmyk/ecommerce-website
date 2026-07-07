const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

window.token = token;
window.productId = productId;

async function loadProduct() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        const products = await response.json();

        const product = products.find(p => p._id === productId);

        if (!product) {

            document.getElementById("productDetails").innerHTML = `
                <h2 style="text-align:center;margin-top:50px;">
                    Product Not Found
                </h2>
            `;

            return;
        }

        document.getElementById("productDetails").innerHTML = `

        <div class="product-container">

            <div class="left">

                <img src="${product.image}" class="big-image">

            </div>

            <div class="right">

                <span class="category">
                    ${product.category}
                </span>

                <h1>${product.name}</h1>

                <p class="rating">
                    ⭐ ${product.averageRating || 0}
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

                    <button class="cart-btn"
                        onclick="addToCart('${product._id}')">

                        🛒 Add To Cart

                    </button>

                    <button class="wishlist-btn"
                        onclick="addWishlist('${product._id}')">

                        ❤️ Wishlist

                    </button>

                </div>

            </div>

        </div>

        `;

    }

    catch (err) {

        console.log(err);

    }

}

// ================= ADD TO CART =================

async function addToCart(productId) {

    try {

        const response = await fetch(
            "http://localhost:5000/api/cart/add",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    productId

                })

            }
        );

        const data = await response.json();

        alert(data.message);

    }

    catch (err) {

        console.log(err);

    }

}

// ================= ADD TO WISHLIST =================

async function addWishlist(productId) {

    try {

        const response = await fetch(
            "http://localhost:5000/api/wishlist",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    productId

                })

            }
        );

        const data = await response.json();

        alert(data.message);

    }

    catch (err) {

        console.log(err);

    }

}

loadProduct();