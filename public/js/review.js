async function loadReviews() {

    const response = await fetch(
        `http://localhost:5000/api/reviews/${window.productId}`
    );

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
                <h3>${review.user.name}</h3>
                <p>⭐ ${review.rating}/5</p>
                <p>${review.comment}</p>
            </div>
        `;

    });

}

async function addReview() {

    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value.trim();

    if (!comment) {
        alert("Please write a review.");
        return;
    }

    const response = await fetch(
        "http://localhost:5000/api/reviews",
        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Bearer ${window.token}`

            },

            body: JSON.stringify({

                productId: window.productId,
                rating,
                comment

            })

        }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById("comment").value = "";

    loadReviews();
}

window.addReview = addReview;

loadReviews();