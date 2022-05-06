// Store products

let products = [
    daddy_long_legs =  {
        id: 0,
        name: "Daddy long legs",
        active: "Psilocybe Cubensis",
        source: "Fraser Valley, British Columbia",
        description: "Daddy Long Legs Psilocybe Cubensis are a unique strain from the Fraser Valley region of the Lower Mainland of British Columbia. It is speculated this strain has been growing naturally for millenia, although the cultivation of the strain has been ongoing since the ’90s.",
        price: 75
    },
    alacabenzi =  {
        id: 1,
        name: "Alacabenzi",
        active: "Psilocybe Cubensis",
        source: "Alabama, US & Mexico",
        description: "Daddy Long Legs Psilocybe Cubensis are a unique strain from the Fraser Valley region of the Lower Mainland of British Columbia. It is speculated this strain has been growing naturally for millenia, although the cultivation of the strain has been ongoing since the ’90s.",
        price: 60
    },
    amazonians =  {
        id: 2,
        name: "Amazonians",
        active: "Psilocybe Cubensis",
        source: "Amazon rainforest",
        description: "Daddy Long Legs Psilocybe Cubensis are a unique strain from the Fraser Valley region of the Lower Mainland of British Columbia. It is speculated this strain has been growing naturally for millenia, although the cultivation of the strain has been ongoing since the ’90s.",
        price: 95
    },
    blue_meanies =  {
        id: 3,
        name: "Blue meanies",
        active: "Psilocybe Cubensis",
        source: "Sub-tropical climates (The Americas, Africa, Southeast Asia, Australia)",
        description: "Daddy Long Legs Psilocybe Cubensis are a unique strain from the Fraser Valley region of the Lower Mainland of British Columbia. It is speculated this strain has been growing naturally for millenia, although the cultivation of the strain has been ongoing since the ’90s.",
        price: 125
    }
]

// Handle navbar collapse and expansion (not necessary)
let navContent = document.getElementById('navContent');
let menuButton = document.getElementById('menuButton');
let navbar = document.getElementById("navbar");
var ogImg;
function navbarExtend() {
    navContent.classList.toggle("show");
    if(navContent.classList.contains("show")) {
        ogImg = menuButton.src;
        menuButton.src = menuButton.dataset.src;
        menuButton.dataset.src = ogImg;
    } else {
        altImg = menuButton.src;
        menuButton.src = menuButton.dataset.src;
        menuButton.dataset.src = altImg;
    }
  }

// Toggle product description boxes
function showDesc(index) {
    let el = document.getElementsByClassName("desc-li")[index];
    let me = document.getElementsByClassName("desc-btn")[index];
    el.classList.toggle("show");
    me.classList.toggle("show");
}

// Store products added to cart
if(localStorage.getItem("products") == null) {
    localStorage.setItem("products", "");
}


var temp = [];
let obj;

// Adding event click to "add to cart" buttons
let count = 0;
document.getElementsByClassName("add_btn").forEach(function (el) {
    el.addEventListener("click", function() {
        addToCart(count);
    }, false);
    count++;
})

// Add product of ID "value" to the cart (stored in localStorage)
function addToCart(value) {
    var temp = [];
    obj = products[value];
    temp = localStorage.getItem("products");
    if(exists(value)==value) {
        alert("Product already added");
        return;
    }
    if(temp == "") {
        temp += obj.id;
    } else {
        temp += " " + obj.id;
    }
    localStorage.setItem("products", temp);
}

// Check if product already is added to cart
function exists(id) {
    for(product in localStorage.getItem("products").split(" ")) {
        if(product == id) {
            return id;
        }
    }
    return false;
}

// Generate cart in "cart.html"
function loadCart() {
    let sub = document.getElementById("sub");
    let tax = document.getElementById("tax");
    let total = document.getElementById("total");
    /*Call back the array*/
    var retrievedData = localStorage.getItem("products");
    var amountData = localStorage.getItem("amounts");
    var ids = retrievedData.split(" ");
    let cart = document.getElementById("cart");
    let row = document.createElement("div");
    row.classList.add("row");
    cart.appendChild(row);
    let subtotal = 0;
    for (i=0;i<ids.length;i++) {
        let el = products[ids[i]];
        let col = document.createElement("div");
        col.classList.add("col-12");
        let h3 = document.createElement("h3");
        h3.textContent = el.name;
        let desc = document.createElement("p");
        desc.innerHTML = el.description + "<br>Price: $" + el.price;
        row.appendChild(col);
        col.appendChild(h3);
        col.appendChild(desc);
        subtotal += parseInt(el.price);
    }
    if(ids.length == 0) {
        sub.textContent = "$0";
        tax.textContent = "$0";
        total.textContent = "$0";
    } else {
        sub.textContent = "$" + subtotal;
        tax.textContent = "$" + (subtotal * 0.15);
        total.textContent = "$" + (subtotal + (subtotal * 0.15));
    }
}

// Clear cart by emptying localStorage value and refreshing page
function clearCart() {
    localStorage.setItem("products", "");
    location.reload();
}