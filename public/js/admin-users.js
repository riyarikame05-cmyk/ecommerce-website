const token = localStorage.getItem("token");

let users = [];

async function loadUsers() {

    const response = await fetch("/api/admin/users", {

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    users = await response.json();

    renderUsers(users);

}

function renderUsers(data){

    const table = document.getElementById("usersTable");

    table.innerHTML="";

    data.forEach(user=>{

        table.innerHTML +=`

<tr>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.role}</td>

<td>

${user.role==="admin"

? "Admin"

: `<button class="delete"
onclick="deleteUser('${user._id}')">
Delete
</button>`}

</td>

</tr>

`;

    });

}

function searchUsers(){

    const keyword = document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered = users.filter(user=>

        user.name.toLowerCase().includes(keyword) ||

        user.email.toLowerCase().includes(keyword)

    );

    renderUsers(filtered);

}

async function deleteUser(id){

    if(!confirm("Delete User?")) return;

    const response = await fetch(`/api/admin/users/${id}`,{

        method:"DELETE",

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    const data = await response.json();

    alert(data.message);

    loadUsers();

}

loadUsers();