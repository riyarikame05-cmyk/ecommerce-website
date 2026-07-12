function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
const API = "/api/auth";

async function register() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(API + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message || "Registration Successful");

        if (response.ok) {
            window.location.href = "login.html";
        }

    } catch (err) {

        console.log(err);
        alert("Server Error");

    }

}