function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
const API = "/api/orders";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let allOrders = [];

// ================= LOAD ORDERS =================

async function loadOrders() {

    try {

        const response = await fetch(API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Unable to load orders");
        }

        const orders = await response.json();

        allOrders = orders;

        const container = document.getElementById("orders");

        container.innerHTML = "";

        if (!orders.length) {

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

                        <p><b>Date:</b> ${new Date(order.createdAt).toLocaleDateString()}</p>

                    </div>

                    <div>

                        <span class="status ${order.status.toLowerCase()}">

                            ${order.status}

                        </span>

                    </div>

                </div>
${productsHTML}

<br>

<button onclick="downloadInvoice('${order._id}')">

    📄 Download Invoice

</button>

</div>

            `;

        });

    }

    catch (err) {

        console.log(err);

        alert("Unable to load orders.");

    }

}

// ================= DOWNLOAD PDF =================

function downloadInvoice(orderId){

    const order = allOrders.find(o => o._id === orderId);

    if(!order) return;

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(22);
    doc.text("ShopEase",20,y);

    y += 10;

    doc.setFontSize(16);
    doc.text("Invoice",20,y);

    y += 15;

    doc.setFontSize(11);

    doc.text("Order ID : " + order._id,20,y);
    y += 8;

    doc.text("Date : " + new Date(order.createdAt).toLocaleDateString(),20,y);
    y += 8;

    doc.text("Payment : " + order.paymentMethod,20,y);
    y += 8;

    doc.text("Status : " + order.status,20,y);
    y += 8;

    doc.text("Address :",20,y);
    y += 6;

    doc.text(order.address,25,y);

    y += 15;

    doc.text("Products",20,y);

    y += 10;

    order.items.forEach(item=>{

        doc.text(item.product.name,20,y);
        doc.text("Qty : "+item.quantity,110,y);
        doc.text("₹"+item.product.price,160,y);

        y += 8;

    });

    y += 10;

    doc.setFontSize(14);

    doc.text("Grand Total : ₹"+order.total,20,y);

    y += 20;

    doc.setFontSize(12);

    doc.text("Thank You For Shopping With ShopEase ❤️",20,y);

    doc.save("Invoice-"+order._id+".pdf");

}

loadOrders();