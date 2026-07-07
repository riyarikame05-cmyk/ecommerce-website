const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================= LOAD CART =================

async function loadCart() {

    try {

        const response = await fetch("http://localhost:5000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const cart = await response.json();

        const list = document.getElementById("cartItems");

        list.innerHTML = "";

        // Empty Cart

        if (cart.length === 0) {

            list.innerHTML = `
                <div class="empty-cart">

                    <h2>🛒 Your Cart is Empty</h2>

                    <p>Looks like you haven't added anything yet.</p>

                    <button onclick="window.location.href='products.html'">
                        Continue Shopping
                    </button>

                </div>
            `;

            document.getElementById("total").innerHTML = "Total : ₹0";

            localStorage.setItem("cartTotal", 0);

            return;
        }

        let total = 0;

        cart.forEach(item => {

            total += item.product.price * item.quantity;

            list.innerHTML += `

            <div class="card">

                <img src="${item.product.image}" class="product-image">

                <div class="details">

                    <h3>${item.product.name}</h3>

                    <p>${item.product.description}</p>

                    <h2>₹${item.product.price}</h2>

                    <div class="quantity">

                        <button onclick="decreaseQuantity('${item._id}')">−</button>

                        <span class="qty">${item.quantity}</span>

                        <button onclick="increaseQuantity('${item._id}')">+</button>

                    </div>

                    <button class="remove-btn" onclick="removeItem('${item._id}')">
                        🗑 Remove
                    </button>

                </div>

            </div>

            `;

        });

        document.getElementById("total").innerHTML = `Total : ₹${total}`;

        localStorage.setItem("cartTotal", total);

    } catch (err) {

        console.log(err);

        alert("Unable to load cart.");

    }

}

// ================= INCREASE =================

async function increaseQuantity(id) {

    try {

        const response = await fetch(`http://localhost:5000/api/cart/increase/${id}`, {

            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (response.ok) {

            loadCart();

        }

    } catch (err) {

        console.log(err);

    }

}

// ================= DECREASE =================

async function decreaseQuantity(id) {

    try {

        const response = await fetch(`http://localhost:5000/api/cart/decrease/${id}`, {

            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (response.ok) {

            loadCart();

        }

    } catch (err) {

        console.log(err);

    }

}

// ================= REMOVE =================

async function removeItem(id) {

    if (!confirm("Remove this product from cart?")) return;

    try {

        const response = await fetch(`http://localhost:5000/api/cart/remove/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        alert(data.message);

        loadCart();

    } catch (err) {

        console.log(err);

        alert("Failed to remove product.");

    }

}

loadCart();