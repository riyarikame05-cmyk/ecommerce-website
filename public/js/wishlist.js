const token = localStorage.getItem("token");

async function loadWishlist() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/wishlist",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const wishlist = await response.json();

        const container = document.getElementById("wishlist");

        container.innerHTML = "";

        if (wishlist.length === 0) {

            container.innerHTML = "<h2>Your Wishlist is Empty ❤️</h2>";

            return;

        }

        wishlist.forEach(item => {

            const product = item.product;

            container.innerHTML += `

            <div class="card">

                <img src="${product.image}" class="product-image">

                <div class="card-content">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <h2>₹${product.price}</h2>

                    <button onclick="removeWishlist('${item._id}')">
                        Remove
                    </button>

                    <button onclick="window.location.href='product-details.html?id=${product._id}'">
                        View Product
                    </button>

                </div>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

async function removeWishlist(id) {

    if (!confirm("Remove this item from wishlist?")) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/wishlist/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        loadWishlist();

    } catch (err) {

        console.log(err);

    }

}

loadWishlist();