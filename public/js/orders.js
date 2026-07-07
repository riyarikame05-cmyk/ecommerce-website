const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadOrders() {

    try {

        const response = await fetch("http://localhost:5000/api/orders", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const orders = await response.json();

        const container = document.getElementById("orders");

        container.innerHTML = "";

        if (orders.length === 0) {

            container.innerHTML = `

            <div class="empty">

                <h2>📦 No Orders Yet</h2>

                <p>You haven't placed any order.</p>

                <button onclick="window.location.href='products.html'">

                    Shop Now

                </button>

            </div>

            `;

            return;

        }

        orders.reverse().forEach(order => {

            let productsHTML = "";

            order.items.forEach(item => {

                productsHTML += `

                <div class="product">

                    <img src="${item.product.image}">

                    <div class="product-details">

                        <h3>${item.product.name}</h3>

                        <p>₹${item.product.price}</p>

                        <p>Quantity : ${item.quantity}</p>

                    </div>

                </div>

                `;

            });

            container.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div class="order-info">

                        <p><b>Order ID:</b> ${order._id}</p>

                        <p><b>Total:</b> ₹${order.total}</p>

                        <p><b>Payment:</b> ${order.paymentMethod}</p>

                        <p><b>Address:</b> ${order.address}</p>

                        <p><b>Ordered On:</b>

                        ${new Date(order.createdAt).toLocaleDateString()}</p>

                    </div>

                    <div>

                        <span class="status ${order.status.toLowerCase()}">

                            ${order.status}

                        </span>

                    </div>

                </div>

                ${productsHTML}

            </div>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

loadOrders();