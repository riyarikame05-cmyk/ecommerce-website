const token = localStorage.getItem("token");

const productId = new URLSearchParams(window.location.search).get("id");

// ================= LOAD REVIEWS =================

async function loadReviews() {

    try {

        const response = await fetch(`/api/reviews/${productId}`);

        const reviews = await response.json();

        const container = document.getElementById("reviews");

        container.innerHTML = "";

        if (!reviews || reviews.length === 0) {

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

    } catch (err) {

        console.error("Load Reviews Error:", err);

    }

}

// ================= ADD REVIEW =================

async function addReview() {

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const rating = document.getElementById("rating").value;

    const comment = document.getElementById("comment").value.trim();

    if (comment === "") {

        alert("Please write your review.");

        return;

    }

    try {

        const response = await fetch("/api/reviews", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`

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

    } catch (err) {

        console.error("Add Review Error:", err);

    }

}

// Make function available to HTML onclick
window.addReview = addReview;

// Load reviews when page opens
loadReviews();