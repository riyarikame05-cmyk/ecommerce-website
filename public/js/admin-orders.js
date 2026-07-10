const API = "/api/orders";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || user.role !== "admin") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

// ================= LOAD ORDERS =================

async function loadOrders() {

    try {

        const response = await fetch(`${API}/all`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        if (!response.ok) {

            throw new Error("Unable to load orders");

        }

        const orders = await response.json();

        const container = document.getElementById("orders");

        container.innerHTML = "";

        if (!orders.length) {

            container.innerHTML = `
                <h2 style="text-align:center;margin-top:40px;">
                    No Orders Found
                </h2>
            `;

            return;

        }

        orders.forEach(order => {

            container.innerHTML += `

            <div class="card">

                <h3>${order.user.name}</h3>

                <p>${order.user.email}</p>

                <p><b>Total:</b> ₹${order.total}</p>

                <p><b>Address:</b> ${order.address}</p>

                <p><b>Payment:</b> ${order.paymentMethod}</p>

                <select id="${order._id}">

                    <option value="Pending" ${order.status==="Pending"?"selected":""}>Pending</option>

                    <option value="Packed" ${order.status==="Packed"?"selected":""}>Packed</option>

                    <option value="Shipped" ${order.status==="Shipped"?"selected":""}>Shipped</option>

                    <option value="Delivered" ${order.status==="Delivered"?"selected":""}>Delivered</option>

                </select>

                <br><br>

                <button onclick="updateStatus('${order._id}')">

                    Update Status

                </button>

                <hr>

            </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

// ================= UPDATE STATUS =================

async function updateStatus(id) {

    const status = document.getElementById(id).value;

    try {

        const response = await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                status

            })

        });

        const data = await response.json();

        alert(data.message);

        loadOrders();

    }

    catch (err) {

        console.log(err);

    }

}

loadOrders();