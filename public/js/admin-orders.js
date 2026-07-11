const API="/api/orders";

const token=localStorage.getItem("token");

const currentUser=JSON.parse(localStorage.getItem("user"));

if(!token || !currentUser || currentUser.role!=="admin"){
    alert("Access Denied");
    window.location="login.html";
}

async function loadOrders(){

   // pura code

}

async function updateStatus(id){

   // pura code

}

loadOrders();