const API = "https://mybankonline.onrender.com";

function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

fetch(API + "/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({username,password})
})
.then(res => res.json())
.then(data => {

if(data.success){

localStorage.setItem("token",data.token);
localStorage.setItem("balance",data.balance);

window.location="dashboard.html";

}else{

alert("Login failed");

}

});

}

function transfer(){

const to = document.getElementById("toUser").value;
const amount = document.getElementById("amount").value;

fetch(API + "/transfer",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":localStorage.getItem("token")
},
body:JSON.stringify({to,amount})
})
.then(res => res.json())
.then(data => {

if(data.success){
alert("Transfer complete");
}else{
alert("Transfer failed");
}

});

}

function loadUsers(){

fetch(API + "/admin/users")
.then(res => res.json())
.then(data => {

document.getElementById("users").innerHTML =
"<pre>"+JSON.stringify(data,null,2)+"</pre>";

});

}
