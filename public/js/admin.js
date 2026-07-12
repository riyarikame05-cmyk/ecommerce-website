function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
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
//Load Dashboard//

async function loadDashboard() {

    try {

        const response = await fetch("/api/admin/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log("Dashboard Data:", data);

        if(document.getElementById("totalProducts"))
            document.getElementById("totalProducts").innerText = data.products;

        if(document.getElementById("totalUsers"))
            document.getElementById("totalUsers").innerText = data.users;

        if(document.getElementById("totalOrders"))
            document.getElementById("totalOrders").innerText = data.orders;

        if(document.getElementById("pendingOrders"))
            document.getElementById("pendingOrders").innerText = data.pendingOrders;

        if(document.getElementById("totalRevenue"))
            document.getElementById("totalRevenue").innerText = "₹" + data.revenue;

    }

    catch(err){

        console.log(err);

    }

}

// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response = await fetch(API);

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
                    ✏ Edit
                </button>

                <button onclick="deleteProduct('${product._id}')">
                    🗑 Delete
                </button>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

// ================= EDIT PRODUCT =================

function editProduct(encodedProduct) {

    const product = JSON.parse(decodeURIComponent(encodedProduct));

    document.getElementById("productId").value = product._id;
    document.getElementById("editName").value = product.name;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editImage").value = product.image;
    document.getElementById("editCategory").value = product.category;
    document.getElementById("editDescription").value = product.description;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}

// ================= ADD PRODUCT =================

async function addProduct() {

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!name || !price || !image || !category || !description) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";

        loadProducts();
        loadDashboard();

    } catch (err) {

        console.log(err);

    }

}

// ================= UPDATE PRODUCT =================

async function updateProduct() {

    const id = document.getElementById("productId").value;

    if (!id) {
        alert("Select a product first.");
        return;
    }

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({

                name: document.getElementById("editName").value,

                price: document.getElementById("editPrice").value,

                image: document.getElementById("editImage").value,

                category: document.getElementById("editCategory").value,

                description: document.getElementById("editDescription").value

            })

        });

        const data = await response.json();

        alert(data.message);

        loadProducts();

        loadDashboard();

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
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        alert(data.message);

        loadProducts();

        loadDashboard();

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

// ================= START =================

loadDashboard();
loadProducts();