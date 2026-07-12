function showLoader(){
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
    document.getElementById("loader").classList.add("hidden");
}
const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user) {

  window.location.href =
  "login.html";

}

document.getElementById(
"userInfo"
).innerHTML = `

<h2>

Welcome ${user.name}

</h2>

<p>

${user.email}

</p>

`;

document.getElementById(
"logout"
).addEventListener(
"click",

()=>{

localStorage.clear();

window.location.href=
"login.html";

});