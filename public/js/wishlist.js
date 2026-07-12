
function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}const API = "/api/wishlist";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================= LOAD WISHLIST =================

async function loadWishlist() {

    try {

        const response = await fetch(API, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (!response.ok) {
            throw new Error("Unable to load wishlist");
        }

        const wishlist = await response.json();

        const container = document.getElementById("wishlist");

        container.innerHTML = "";

        if (!wishlist || wishlist.length === 0) {

            container.innerHTML = `

                <div class="empty">

                    <h2>❤️ Your Wishlist is Empty</h2>

                    <p>Add your favourite products.</p>

                    <button onclick="window.location.href='products.html'">

                        Continue Shopping

                    </button>

                </div>

            `;

            return;

        }

        wishlist.forEach(item => {

            const product = item.product;

            container.innerHTML += `

                <div class="card">

                    <img
                        src="${product.image}"
                        class="product-image"
                        alt="${product.name}">

                    <div class="card-content">

                        <h3>${product.name}</h3>

                        <p>${product.description}</p>

                        <h2>₹${product.price}</h2>

                        <button onclick="window.location.href='product-details.html?id=${product._id}'">

                            View Product

                        </button>

                        <button
                            class="remove-btn"
                            onclick="removeWishlist('${item._id}')">

                            🗑 Remove

                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

        alert("Unable to load wishlist.");

    }

}

// ================= REMOVE FROM WISHLIST =================

async function removeWishlist(id) {

    if (!confirm("Remove this product from wishlist?")) return;

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        alert(data.message);

        loadWishlist();

    }

    catch (err) {

        console.log(err);

        alert("Unable to remove wishlist item.");

    }

}

// ================= START =================

loadWishlist();