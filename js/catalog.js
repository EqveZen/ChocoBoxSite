// === ЗАГРУЗКА КАТАЛОГА ===
fetch('data/catalog.json')
  .then(res => res.json())
  .then(data => {
    renderCategories(data.categories);
    renderProducts(data.products);
  })
  .catch(err => {
    console.error('Ошибка загрузки каталога:', err);
  });

const categoriesEl = document.getElementById('categories');
const productsEl = document.getElementById('products');

let allProducts = [];

// === КАТЕГОРИИ ===
function renderCategories(categories) {
  categoriesEl.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.textContent = 'Все';
  allBtn.className = 'btn-neon';
  allBtn.onclick = () => filterProducts('all');
  categoriesEl.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.title;
    btn.className = 'btn-neon';
    btn.onclick = () => filterProducts(cat.id);
    categoriesEl.appendChild(btn);
  });
}

// === ТОВАРЫ ===
function renderProducts(products) {
  allProducts = products;
  productsEl.innerHTML = '';
  products.forEach(createCard);
}

// === КАРТОЧКА ТОВАРА ===
function createCard(product) {
  const card = document.createElement('div');
  card.className = 'dessert-card fade-up';

  // главное фото
  const mainImage = product.images && product.images.length
    ? product.images[0]
    : '';

  // бейджи
  let badgesHTML = '';
  if (product.badges?.includes('hit')) {
    badgesHTML += `<span class="badge hit">ХИТ</span>`;
  }
  if (product.badges?.includes('new')) {
    badgesHTML += `<span class="badge new">NEW</span>`;
  }

  // цена
  let priceHTML = `<span class="price">${product.price} ₽</span>`;
  if (product.oldPrice) {
    priceHTML = `
      <span class="price old">${product.oldPrice} ₽</span>
      <span class="price new">${product.price} ₽</span>
    `;
  }

  card.innerHTML = `
    ${badgesHTML}
    <img src="${mainImage}" class="main-image" alt="${product.title}">
    <div class="card-info">
      <h3>${product.title}</h3>
      ${priceHTML}
      <button class="btn-neon add-to-cart">В корзину</button>
    </div>
  `;

  // hover: смена фото
  if (product.images && product.images.length > 1) {
    let index = 0;
    card.addEventListener('mouseenter', () => {
      index = 1;
      card.querySelector('img').src = product.images[index];
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img').src = product.images[0];
    });
  }

  // добавить в корзину
  card.querySelector('.add-to-cart').onclick = () => {
    addToCart(product);
  };

  productsEl.appendChild(card);
  setTimeout(() => card.classList.add('visible'), 100);
}

// === ФИЛЬТР ===
function filterProducts(category) {
  productsEl.innerHTML = '';

  const filtered = category === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === category);

  filtered.forEach(createCard);
}
