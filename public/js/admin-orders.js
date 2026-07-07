const API = "http://localhost:5000/api/orders";

const token = localStorage.getItem("token");

async function loadOrders() {

    try {

        const response = await fetch(`${API}/all`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const orders = await response.json();

        const container = document.getElementById("orders");

        container.innerHTML = "";

        orders.forEach(order => {

            container.innerHTML += `

            <div class="card">

                <h3>${order.user.name}</h3>

                <p>${order.user.email}</p>

                <p><b>Total:</b> ₹${order.total}</p>

                <p><b>Address:</b> ${order.address}</p>

                <p><b>Payment:</b> ${order.paymentMethod}</p>

                <select id="${order._id}">

                    <option ${order.status=="Pending"?"selected":""}>Pending</option>

                    <option ${order.status=="Packed"?"selected":""}>Packed</option>

                    <option ${order.status=="Shipped"?"selected":""}>Shipped</option>

                    <option ${order.status=="Delivered"?"selected":""}>Delivered</option>

                </select>

                <br><br>

                <button onclick="updateStatus('${order._id}')">

                    Update Status

                </button>

                <hr>

            </div>

            `;

        });

    } catch(err){

        console.log(err);

    }

}

async function updateStatus(id){

    const status = document.getElementById(id).value;

    const response = await fetch(`${API}/${id}`,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`

        },

        body:JSON.stringify({

            status

        })

    });

    const data = await response.json();

    alert(data.message);

    loadOrders();

}

loadOrders();