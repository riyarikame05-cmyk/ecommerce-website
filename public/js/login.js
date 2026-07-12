function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
const API = "/api/auth";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter Email and Password");
        return;
    }

    try {

        const response = await fetch(`${API}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Login Failed");
            return;
        }

        // Save Login

        localStorage.setItem("token", result.token);

        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Login Successful ✅");

        // Redirect

        if (result.user.role === "admin") {

            window.location.href = "admin.html";

        } else {

            window.location.href = "dashboard.html";

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

});