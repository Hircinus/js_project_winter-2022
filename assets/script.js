let products = [
    golden_teacher =  {
        id: 0,
        name: "Golden Teacher",
        active: "psilocybin",
        description: "",
        ppg: 8
    }
]

//End of product list

//Adding event click to each element with class addCart
let clear = document.getElementById("pages");
clear.addEventListener('click', clearCart)
var temp = [];
let obj;

function addToCart(value) {
    var temp = [];
    obj = Array_Products[value];
    if (JSON.parse(localStorage.getItem("products")) != null) {
        temp = JSON.parse(localStorage.getItem("products"));
    }
    temp.push(obj);
    localStorage.setItem("products", JSON.stringify(temp));
};

function loadCart() {
    /*Call back the array*/
    var retrievedData = localStorage.getItem("products");
    var arr = JSON.parse(retrievedData);
    console.log(arr);

    let wrap = document.getElementById("inCart");
    for (i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        div.style.width = "80%";
        div.style.paddingTop = "4em";
        div.style.paddingBottom = "4em";
        div.style.float = "left";
        let AnchorName = document.createElement("a");
        AnchorName.style.float = "left";
        let desc = document.createTextNode(arr[i].name);

        wrap.appendChild(div);
        div.appendChild(AnchorName);
        AnchorName.appendChild(desc);
    }
}

function clearCart() {
    localStorage.clear();
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