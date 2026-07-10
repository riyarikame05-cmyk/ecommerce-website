const API = "/api/products";

const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

// ================= SECURITY =================

if (!token || !currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}

if (currentUser.role !== "admin") {

    alert("Access Denied! Admin Only.");

    window.location.href = "dashboard.html";

}

// ================= LOAD DASHBOARD =================

async function loadDashboard() {

    try {

        const response = await fetch("/api/admin/dashboard", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (!response.ok) {

            throw new Error("Unable to load dashboard");

        }

        const data = await response.json();

        document.getElementById("totalProducts").innerText = data.products;
        document.getElementById("totalUsers").innerText = data.users;
        document.getElementById("totalOrders").innerText = data.orders;
        document.getElementById("pendingOrders").innerText = data.pendingOrders;
        document.getElementById("totalRevenue").innerText = "₹" + data.revenue;

    }

    catch (err) {

        console.log(err);

    }

}

// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response = await fetch(API);

        if (!response.ok) {

            throw new Error("Unable to load products");

        }

        const products = await response.json();

        const container = document.getElementById("products");

        container.innerHTML = "";

        products.forEach(product => {

            const encoded = encodeURIComponent(JSON.stringify(product));

            container.innerHTML += `

            <div class="card">

                <img src="${product.image}" width="120">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h2>₹${product.price}</h2>

                <button onclick="editProduct('${encoded}')">

                    Edit

                </button>

                <button onclick="deleteProduct('${product._id}')">

                    Delete

                </button>

            </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadDashboard();

loadProducts();

// ================= UPDATE PRODUCT =================

async function updateProduct() {

    const id = document.getElementById("productId").value;

    const name = document.getElementById("editName").value.trim();
    const price = document.getElementById("editPrice").value;
    const image = document.getElementById("editImage").value.trim();
    const category = document.getElementById("editCategory").value.trim();
    const description = document.getElementById("editDescription").value.trim();

    if (!id) {
        alert("Select a product first.");
        return;
    }

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                name,
                price,
                image,
                category,
                description
            })

        });

        const data = await response.json();

        alert(data.message);

        loadProducts();

    } catch (err) {

        console.log(err);

    }

}

// ================= DELETE PRODUCT =================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        const data = await response.json();

        alert(data.message);

        loadProducts();

    } catch (err) {

        console.log(err);

    }

}

// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}