let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Update cart count
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Attach event listeners
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        addToCart(name, price);
    });
});

/* =========================
   UPDATE CART COUNT
========================= */
function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

/* =========================
   SAVE CART
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price: Number(price), qty: 1 });
    }

    saveCart();
    alert(name + " added to cart!");
}

/* =========================
   BUTTON CLICK EVENTS
========================= */
document.querySelectorAll(".product").forEach(product => {
    const btn = product.querySelector(".add-to-cart");

    if (btn) {
        btn.addEventListener("click", () => {
            const name = product.querySelector(".name").textContent;
            const price = product.querySelector(".price").dataset.price;
            addToCart(name, price);
        });
    }
});

/* =========================
   DISPLAY CART PAGE
========================= */
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartContainer.appendChild(div);
    });

    totalEl.textContent = total;
}

/* =========================
   CHANGE QUANTITY
========================= */
function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

/* =========================
   CLEAR CART
========================= */
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}


/* =========================
   CHECKOUT FORM
========================= */
const form = document.getElementById("checkout-form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Save order (optional)
        localStorage.setItem("lastOrder", JSON.stringify(cart));

        // Clear cart
        cart = [];
        localStorage.removeItem("cart");

        // Redirect
        window.location.href = "confirmation.html";
    });
}

// SIGN UP
function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            alert("Account created!");
        })
        .catch(err => alert(err.message));
}

// // LOGIN
// function login(email, password) {
//     auth.signInWithEmailAndPassword(email, password)
//         .then(user => {
//             window.location.href = "index_2.html";
//         })
//         .catch(err => alert(err.message));
// }


const loginForm =
document.getElementById("login-form");

if(loginForm){

    loginForm.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        const username =
        document.getElementById(
        "username").value;

        const password =
        document.getElementById(
        "password").value;

        const storedUser =
        JSON.parse(
        localStorage.getItem("user"));

        if(
            storedUser &&
            username === storedUser.email &&
            password === storedUser.password
        ){

            alert("Login successful!");

            window.location.href =
            "index_2.html";

        }else{

            alert("Invalid login");

        }

    });

}

/* =========================
   PROTECT CHECKOUT PAGE
========================= */
if (window.location.pathname.includes("checkout.html")) {
    const user = localStorage.getItem("user");

    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

/* =========================
   INIT
========================= */
updateCartCount();
displayCart();

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if (toggle) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


const searchInput = document.getElementById("searchInput");

if(searchInput){
    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product");

        products.forEach(product => {

            const name = product.querySelector(".name").textContent.toLowerCase();

            if(name.includes(value)){
                product.style.display = "block";
            }else{
                product.style.display = "none";
            }

        });

    });
}


function filterCategory(category){

    const products = document.querySelectorAll(".product");

    products.forEach(product => {

        if(category === "all"){
            product.style.display = "block";
            return;
        }

        if(product.dataset.category === category){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }

    });
}


function openProduct(name, price, image){

    localStorage.setItem("detailName", name);
    localStorage.setItem("detailPrice", price);
    localStorage.setItem("detailImage", image);

    window.location.href = "product.html";
}

if(window.location.pathname.includes("product.html")){

    const name = localStorage.getItem("detailName");
    const price = localStorage.getItem("detailPrice");
    const image = localStorage.getItem("detailImage");

    document.getElementById("detail-name").textContent = name;
    document.getElementById("detail-price").textContent = "$" + price;
    document.getElementById("detail-image").src = image;

    document.getElementById("detail-cart")
    .addEventListener("click", () => {
        addToCart(name, price);
    });
}


// .product{
//     transition: 0.3s ease;
// }

// .product:hover{
//     transform: translateY(-8px);
//     box-shadow: 0 6px 15px rgba(0,0,0,0.2);
// }

// button{
//     transition: 0.3s;
// }

// button:hover{
//     transform: scale(1.05);
// }



function openProduct(name, price, image){

    localStorage.setItem("detailName", name);
    localStorage.setItem("detailPrice", price);
    localStorage.setItem("detailImage", image);

    window.location.href = "product.html";
}

if(window.location.pathname.includes("product.html")){

    const name = localStorage.getItem("detailName");
    const price = localStorage.getItem("detailPrice");
    const image = localStorage.getItem("detailImage");

    document.getElementById("detail-name").textContent = name;
    document.getElementById("detail-price").textContent = "$" + price;
    document.getElementById("detail-image").src = image;

    document.getElementById("detail-cart")
    .addEventListener("click", () => {
        addToCart(name, price);
    });
}


/* =========================
   SIGN UP
========================= */

const signupForm =
document.getElementById("signup-form");

if(signupForm){

    signupForm.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        const name =
        document.getElementById(
        "signup-name").value;

        const email =
        document.getElementById(
        "signup-email").value;

        const password =
        document.getElementById(
        "signup-password").value;

        const user = {
            name,
            email,
            password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Account created!");

        window.location.href =
        "index_2.html";
    });

}



/* =========================
   PROFILE PAGE
========================= */

if(window.location.pathname
.includes("profile.html")){

    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    if(!user){

        window.location.href =
        "login.html";
    }

    document.getElementById(
    "profile-name").textContent =
    user.name;

    document.getElementById(
    "profile-email").textContent =
    user.email;
}


/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem("user");

    alert("Logged out!");

    window.location.href =
    "index_2.html";
}



/* =========================
   NAVBAR USER UI
========================= */

const shopBtn =
document.getElementById("shop-btn");

const profileBtn =
document.getElementById("profile-btn");

const currentUser =
localStorage.getItem("user");

if(currentUser){

    if(shopBtn){
        shopBtn.style.display = "none";
    }

    if(profileBtn){
        profileBtn.style.display = "inline-block";
    }

}