const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function placeOrder() {

    const fullName = document.getElementById("fullName").value.trim();

const phone = document.getElementById("phone").value.trim();

const pincode = document.getElementById("pincode").value.trim();

const city = document.getElementById("city").value.trim();

const state = document.getElementById("state").value.trim();

const country = document.getElementById("country").value.trim();

const address = `
${fullName}
${phone}
${document.getElementById("address").value.trim()}
${city}, ${state} - ${pincode}
${country}
`;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!address) {
        alert("Please enter shipping address.");
        return;
    }

    // ================= CASH ON DELIVERY =================

    if (paymentMethod === "Cash On Delivery") {

        const response = await fetch("http://localhost:5000/api/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                address,
                paymentMethod
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "orders.html";
        }

        return;
    }

    // ================= RAZORPAY =================

    const amount = Number(localStorage.getItem("cartTotal"));

    if (!amount || amount <= 0) {
        alert("Cart is empty.");
        return;
    }

    const orderResponse = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                amount
            })
        }
    );

    const order = await orderResponse.json();

    console.log("Order Response:", order);

    const options = {

        key: "rzp_test_T9pp9pxS4oH9Y5",

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "ShopEase",

        description: "Product Payment",

        handler: async function (response) {

            console.log("Payment Success", response);

            const saveOrder = await fetch(
                "http://localhost:5000/api/orders",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        address,
                        paymentMethod
                    })

                }
            );

            const data = await saveOrder.json();

            alert("Payment Successful ✅");

            window.location.href = "orders.html";

        },

        theme: {
            color: "#3399cc"
        }

    };

    console.log(options);

    const rzp = new Razorpay(options);

    rzp.open();

}