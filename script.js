
let cart = [];

let openCart = document.getElementById("openCart");
let closeCart = document.getElementById("closeCart");
let cartWindow = document.getElementById("cart");

let cartItems = document.getElementById("cartItems");
let count = document.getElementById("count");
let total = document.getElementById("total");
let orderButton = document.getElementById("orderButton");

// Відкриваємо кошик

openCart.addEventListener("click", function() {
    cartWindow.classList.add("show");
});

// Закриваємо кошик

closeCart.addEventListener("click", function() {
    cartWindow.classList.remove("show");
});

// Додаємо товар

let buttons = document.querySelectorAll(".add-button");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let name = button.dataset.name;
        let price = Number(button.dataset.price);
        let sizeId = button.dataset.size;
        let size = document.getElementById(sizeId).value;

        let found = false;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name && cart[i].size === size) {
                cart[i].quantity++;
                found = true;
            }
        }

        if (found === false) {
            cart.push({
                name: name,
                price: price,
                size: size,
                quantity: 1
            });
        }

        showCart();
    });
});

// Показуємо товари в кошику

function showCart() {
    cartItems.innerHTML = "";

    let sum = 0;
    let number = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty">Тут поки нічого немає.</p>';
    }

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        sum = sum + item.price * item.quantity;
        number = number + item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Розмір: ${item.size}</p>
                <p>Ціна: ₴ ${item.price * item.quantity}</p>

                <button onclick="changeQuantity(${i}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${i}, 1)">+</button>
                <button onclick="removeItem(${i})">Видалити</button>
            </div>
        `;
    }

    count.innerHTML = number;
    total.innerHTML = "₴ " + sum.toLocaleString("uk-UA");
}

// Змінюємо кількість товару

function changeQuantity(index, change) {
    cart[index].quantity = cart[index].quantity + change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    showCart();
}

// Видаляємо товар

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

// Кнопка оформлення

orderButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Твій кошик порожній!");
    } else {
        alert("Це демонстраційний сайт. Реальне замовлення не створюється.");
        cart = [];
        showCart();
        cartWindow.classList.remove("show");
    }
});

showCart();
