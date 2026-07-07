const API = "http://localhost:5000/api/products";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let allProducts = [];

// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response = await fetch(API);

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        console.log(error);

    }

}

// ================= OPEN PRODUCT =================

function openProduct(id) {

    window.location.href = `product-details.html?id=${id}`;

}

// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    if(products.length===0){

        container.innerHTML=`
        <h2 style="text-align:center;width:100%;margin-top:40px;">
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

// ================= SEARCH =================

function searchProducts(){

    const value=document
    .getElementById("search")
    .value
    .toLowerCase()
    .trim();

    const filtered=allProducts.filter(product=>

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

    const filtered = allProducts.filter(product => {

        switch (category) {

            case "Laptop":
                return product.category === "Laptop";

            case "Mobile":
                return product.category === "Mobile";

            case "Shoes":
                return product.category === "Shoes";

            case "Clothes":
                return product.category === "Clothes";

            case "Speaker":
                return product.category === "Speaker";

            case "Watch":
                return product.category === "Watch";

            default:
                return false;
        }

    });

    displayProducts(filtered);

}

// ================= ADD TO CART =================

async function addToCart(productId){

    try{

        const response=await fetch("http://localhost:5000/api/cart/add",{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },

            body:JSON.stringify({
                productId
            })

        });

        const data=await response.json();

        alert(data.message);

    }catch(err){

        console.log(err);

        alert("Unable to add product.");

    }

}

// ================= WISHLIST =================

async function addWishlist(productId){

    try{

        const response=await fetch(
            "http://localhost:5000/api/wishlist",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },

                body:JSON.stringify({
                    productId
                })

            }
        );

        const data=await response.json();

        alert(data.message);

    }catch(err){

        console.log(err);

    }

}

// ================= LOGOUT =================

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="login.html";

}

// ================= START =================

loadProducts();