const API = "/api/orders";

const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

if (!token || !currentUser || currentUser.role !== "admin") {
    alert("Access Denied!");
    window.location.href = "login.html";
}

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

                <h3>${order.user?.name || "Unknown User"}</h3>

<p>${order.user?.email || "No Email"}</p>

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
async function loadOrders() {

    console.log("loadOrders called");

    try {

        const response = await fetch(`${API}/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Status:", response.status);

        const orders = await response.json();

        console.log("Orders:", orders);

        const container = document.getElementById("orders");

        console.log("Container:", container);

        container.innerHTML = "";

        orders.forEach(order => {

            console.log("Rendering:", order);

            container.innerHTML += `
                <div class="card">
                    <h3>${order.user?.name || "Unknown User"}</h3>
                    <p>${order.user?.email || "No Email"}</p>
                    <p><b>Total:</b> ₹${order.total}</p>
                    <p><b>Address:</b> ${order.address}</p>
                    <p><b>Payment:</b> ${order.paymentMethod}</p>

                    <select id="${order._id}">
                        <option value="Pending" ${order.status==="Pending"?"selected":""}>Pending</option>
                        <option value="Packed" ${order.status==="Packed"?"selected":""}>Packed</option>
                        <option value="Shipped" ${order.status==="Shipped"?"selected":""}>Shipped</option>
                        <option value="Delivered" ${order.status==="Delivered"?"selected":""}>Delivered</option>
                    </select>

                    <button onclick="updateStatus('${order._id}')">
                        Update Status
                    </button>
                </div>
            `;
        });

        console.log("Children:", container.children.length);

    } catch(err) {

        console.error(err);

    }

}

loadOrders();