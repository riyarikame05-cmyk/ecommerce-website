const token = localStorage.getItem("token");
const productId = new URLSearchParams(window.location.search).get("id");

// ================= LOAD REVIEWS =================

async function loadReviews() {

    try {

        const response = await fetch(`/api/reviews/${productId}`);
        const reviews = await response.json();

        const container = document.getElementById("reviews");

        container.innerHTML = "";

        if (!reviews.length) {

            container.innerHTML = "<p>No reviews yet.</p>";
            return;

        }

        reviews.forEach(review => {

            container.innerHTML += `

                <div class="card">

                    <h3>${review.user?.name || "User"}</h3>

                    <p>⭐ ${review.rating}/5</p>

                    <p>${review.comment}</p>

                </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

// ================= ADD REVIEW =================

async function addReview() {

    if (!token) {

        alert("Please Login First");

        window.location.href = "login.html";

        return;

    }

    const rating = document.getElementById("rating").value;

    const comment = document.getElementById("comment").value.trim();

    if (comment === "") {

        alert("Please enter review");

        return;

    }

    try {

        const response = await fetch("/api/reviews", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                productId,
                rating,
                comment

            })

        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("comment").value = "";

        loadReviews();

    }

    catch (err) {

        console.log(err);

    }

}

// ================= BUTTON EVENT =================

document.addEventListener("DOMContentLoaded", () => {

    loadReviews();

    const btn = document.getElementById("reviewBtn");

    if (btn) {

        btn.addEventListener("click", addReview);

    }

});