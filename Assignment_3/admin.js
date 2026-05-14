function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    db.collection("products").add({
        name,
        price: Number(price),
        image
    }).then(() => {
        alert("Product added!");
        loadAdminProducts();
    });
}

function loadAdminProducts() {
    const container = document.getElementById("admin-products");

    db.collection("products").get().then(snapshot => {
        container.innerHTML = "";

        snapshot.forEach(doc => {
            const p = doc.data();

            container.innerHTML += `
                <div>
                    ${p.name} - $${p.price}
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </div>
            `;
        });
    });
}


function deleteProduct(id) {
    db.collection("products").doc(id).delete()
        .then(loadAdminProducts);
}



function loadOrders() {
    const container = document.getElementById("orders");

    db.collection("orders").get().then(snapshot => {
        container.innerHTML = "";

        snapshot.forEach(doc => {
            const order = doc.data();

            container.innerHTML += `
                <div>
                    <p>User: ${order.user}</p>
                    <p>Items: ${JSON.stringify(order.items)}</p>
                    <hr>
                </div>
            `;
        });
    });
}

loadAdminProducts();
loadOrders();


auth.onAuthStateChanged(user => {
    if (!user || user.email !== "youradmin@email.com") {
        alert("Access denied");
        window.location.href = "login.html";
    }
});