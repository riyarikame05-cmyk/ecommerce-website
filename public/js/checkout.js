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
    const addressLine = document.getElementById("address").value.trim();

    const paymentMethod = document.getElementById("paymentMethod").value;

    if (
        !fullName ||
        !phone ||
        !addressLine ||
        !city ||
        !state ||
        !country ||
        !pincode
    ) {
        alert("Please fill all address details.");
        return;
    }

    const address = `
${fullName}
${phone}
${addressLine}
${city}, ${state} - ${pincode}
${country}
`;

    // ==========================
    // CASH ON DELIVERY
    // ==========================

    if (paymentMethod === "Cash On Delivery") {

        try {

            const response = await fetch("/api/orders", {

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

        } catch (err) {

            console.log(err);
            alert("Unable to place order.");

        }

        return;
    }

    // ==========================
    // ONLINE PAYMENT
    // ==========================

    const amount = Number(localStorage.getItem("cartTotal"));

    if (!amount || amount <= 0) {

        alert("Cart is empty.");
        return;

    }

    try {

        // Create Razorpay Order

        const orderResponse = await fetch("/api/payment/create-order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                amount
            })

        });

        const order = await orderResponse.json();

        const options = {

            key: "rzp_test_T9pp9pxS4oH9Y5",

            amount: order.amount,

            currency: order.currency,

            order_id: order.id,

            name: "ShopEase",

            description: "Product Payment",

            handler: async function () {

                const saveOrder = await fetch("/api/orders", {

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

                const data = await saveOrder.json();

                alert(data.message);

                window.location.href = "orders.html";

            },

            theme: {
                color: "#3399cc"
            }

        };

        const rzp = new Razorpay(options);

        rzp.open();

    } catch (err) {

        console.log(err);

        alert("Payment Failed");

    }

}