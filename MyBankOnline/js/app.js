const API = "https://mybankonline.onrender.com";

function register(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

fetch(API+"/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})
.then(r=>r.json())
.then(data=>{
if(data.success){
alert("Account created");
window.location="login.html";
}
});

}

function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})
.then(r=>r.json())
.then(data=>{

if(data.success){

localStorage.setItem("token",data.token);
localStorage.setItem("balance",data.balance);

window.location="dashboard.html";

}

});

}

function transfer(){

const to=document.getElementById("toUser").value;
const amount=document.getElementById("amount").value;

fetch(API+"/transfer",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":localStorage.getItem("token")
},
body:JSON.stringify({to,amount})
});

}

function loadTransactions(){

fetch(API+"/transactions",{
headers:{
"Authorization":localStorage.getItem("token")
}
})
.then(r=>r.json())
.then(data=>{

document.getElementById("transactions").innerHTML=
"<pre>"+JSON.stringify(data,null,2)+"</pre>";

});

}
