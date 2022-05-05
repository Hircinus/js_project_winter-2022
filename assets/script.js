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

//End of product list
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

// show description

function showDesc(index) {
    let el = document.getElementsByClassName("desc-li")[index];
    let me = document.getElementsByClassName("desc-btn")[index];
    el.classList.toggle("show");
    me.classList.toggle("show");
}

// localstorage
if(localStorage.getItem("products") == null) {
    localStorage.setItem("products", "");
}
if(localStorage.getItem("amounts") == null) {
    localStorage.setItem("amounts", "");
}

//Adding event click to each element with class addCart
var temp = [];
let obj;

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

function exists(id) {
    for(product in localStorage.getItem("products").split(" ")) {
        if(product == id) {
            return id;
        }
    }
    return false;
}

let sub = document.getElementById("sub");
let tax = document.getElementById("tax");
let total = document.getElementById("total");

function loadCart() {
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

function clearCart() {
    localStorage.setItem("products", "");
    location.reload();
}
/*Load the products in the product.html page*/
function loadProducts() {
    let wrap = document.getElementById("wrapper");
    console.log(Array_Products[0].brand);
    for (i = 0; i < Array_Products.length; i++) {

        let div = document.createElement("div");
        div.style.width = "20%";

        div.style.padding = "50px 10px 10px 10px";
        div.style.margin = "50px 10px 10px 10px";

        let title = document.createTextNode(Array_Products[i].name);

        let img = document.createElement("img");
        img.src = Array_Products[i].imageSRC;
        img.style.height = "50%";
        img.style.maxWidth = "100%";

        let AnchorName = document.createElement("a");
        let desc = document.createTextNode(Array_Products[i].description);
        let btn = document.createElement("button");
        btn.innerHTML = "Add to cart";
        btn.classList.add("addCart");
        btn.value = i;
        let newBr = document.createElement("br");
        let newBr2 = document.createElement("br");

        wrap.appendChildren(div, title);
        div.appendChildren(img, newBr2, AnchorName);
        AnchorName.appendChild(desc);
        div.appendChildren(newBr, btn);
    }
    var adding = document.querySelectorAll('.addCart');

    adding.forEach(el => el.addEventListener('click', function() {
        addToCart(el.value);
    }));

}