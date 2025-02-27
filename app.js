// Данные о товарах
const products = [
  {
    id: 1,
    name: "Футболка Dynasty",
    price: 1500,
    image: "https://static.insales-cdn.com/r/JBn0FfTLI1A/rs:fit:1000:0:1/q:100/plain/images/products/1/5852/655922908/%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B0_%D1%87%D0%B5%D1%80%D0%BD%D0%B0%D1%8F_1.jpg@jpg", // Замени на свои фото
    description: "Черная футболка с логотипом."
  },
  {
    id: 2,
    name: "Худи Dynasty",
    price: 3000,
    image: "https://static.insales-cdn.com/r/XKMchTf_wnY/rs:fit:1000:0:1/q:100/plain/images/products/1/3574/814149110/%D0%A5%D1%83%D0%B4%D0%B8_%D1%87%D0%B5%D1%80%D0%BD_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg@jpg", // Замени на свои фото
    description: "Удобное худи с капюшоном."
  },
  {
    id: 3,
    name: "Куртка Dynasty",
    price: 5000,
    image: "https://static.shuclothes.com/sig/size:8192/aHR0cHM6Ly9zaHVjbG90aGVzLmNvbS9zdG9yYWdlLzIzNzk3L9C60L7RgNC-0YLQutCw0Y9f0LbQtdC90YHQul_Rh9C10YDQvTA2NDMuanBn", // Замени на свои фото
    description: "Стильная куртка для улицы."
  },
  {
    id: 4,
    name: "Штаны Dynasty",
    price: 2500,
    image: "https://nikifilinistore.ru/wp-content/uploads/2023/08/105.jpeg", // Замени на свои фото
    description: "Удобные штаны для повседневной носки."
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
