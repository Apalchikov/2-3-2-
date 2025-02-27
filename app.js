// Данные о товарах (можно заменить на загрузку с сервера)
const products = [
  {
    id: 1,
    name: "Футболка",
    price: 1500,
    image: "https://via.placeholder.com/150",
    description: "Мягкая и удобная футболка."
  },
  {
    id: 2,
    name: "Джинсы",
    price: 3000,
    image: "https://via.placeholder.com/150",
    description: "Стильные джинсы."
  },
  {
    id: 3,
    name: "Куртка",
    price: 5000,
    image: "https://via.placeholder.com/150",
    description: "Теплая куртка."
  }
];

let cart = [];

// Инициализация Telegram Web App
Telegram.WebApp.ready();

// Отображение товаров
function renderProducts() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Цена: ${product.price} руб.</p>
      <button onclick="addToCart(${product.id})">В корзину</button>
    </div>
  `).join("");
}

// Добавление товара в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  alert(`${product.name} добавлен в корзину!`);
}

// Переключение между каталогом и корзиной
function toggleCart() {
  const catalog = document.getElementById("catalog");
  const cartSection = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");

  catalog.classList.toggle("hidden");
  cartSection.classList.toggle("hidden");

  if (!cartSection.classList.contains("hidden")) {
    cartItems.innerHTML = cart.map(item => `
      <li>
        <span>${item.name}</span>
        <span>${item.price} руб.</span>
      </li>
    `).join("");
  }
}

// Оформление заказа
function checkout() {
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  Telegram.WebApp.sendData(JSON.stringify({ cart, total }));
  alert(`Заказ оформлен! Сумма: ${total} руб.`);
}

// Инициализация
document.getElementById("toggle-cart").addEventListener("click", toggleCart);
document.getElementById("checkout-button").addEventListener("click", checkout);
renderProducts();